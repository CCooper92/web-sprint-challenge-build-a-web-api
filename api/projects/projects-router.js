// Write your "projects" router here!

const express = require('express')
const Projects = require('./actions-model.js')
// const mw = require('./../middleware/middleware.js')
const router = express.Router()


//WORKING
router.get('/', (req,res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project) 
       })
       .catch(err => {
           res.status(500).json({message:"cant find project"})
       })
})

//WORKING
router.get('/:id', mw.getActionById, (req,res) => {
    res.status(200).json(req.project)
})


//NOT WORKING
router.post('/', mw.validateAction, (req,res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({message: "error posting project"})
    })
})


//NOT WORKING
router.put('/:id',   (req,res) => {
    Projects.update(req.params.id, req.body)
  .then(actions=> {
    if(project){
      res.status(200).json(project);
    }else{
      res.status(404).json({message:"The project can not be found"})
    }
  })
  .catch(error => {
    res.status(500).json({message: "error updating project"})
  })
});

//NOT WORKING
router.delete('/id:', async (req,res) => {
  try{
      const {id} = req.params
      const deletedProject = await Projects.remove(id)
      if(!deletedProject){
          res.status(404).json({message: "Project with id does not exist"})
      }else{
          res.status(201).json(deletedProject)
      }
  }catch(err){
      res.status(500).json({message: "project could not be removed"})
  }
})



module.exports = router;