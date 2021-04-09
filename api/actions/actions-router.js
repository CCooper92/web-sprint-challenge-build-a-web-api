// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model.js')
const mw = require('./../middleware/middleware.js')

const router = express.Router()


//WORKING
router.get('/', (req,res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions) 
       })
       .catch(err => {
           res.status(500).json({message:"cant find actions"})
       })
})

//WORKING
router.get('/:id', mw.getActionById, (req,res) => {
    res.status(200).json(req.actions)
})


//WORKING
router.post('/', mw.validateAction, (req,res) => {
    Actions.insert(req.body)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({message: "error posting actions"})
    })
})


//WORKING
router.put('/:id', mw.getActionById, mw.validateAction,  (req,res) => {
    Actions.update(req.params.id, req.body)
  .then(actions=> {
    if(actions){
      res.status(200).json(actions);
    }else{
      res.status(404).json({message:"The actions can not be found"})
    }
  })
  .catch(error => {
    res.status(500).json({message: "error updating actions"})
  })
});

// WORKING
router.delete('/:id', mw.getActionById, async (req,res) => {
  try{
      const {id} = req.params
      const deletedAction = await Actions.remove(id)
      if(!deletedAction){
          res.status(404).json({message: "action with id does not exist"})
      }else{
          res.status(201).json(deletedAction)
      }
  }catch(err){
      res.status(500).json({message: "action could not be removed"})
  }
})



module.exports = router;