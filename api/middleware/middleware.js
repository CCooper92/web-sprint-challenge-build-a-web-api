const Actions = require("../actions/actions-model.js")
const Projects = require("../projects/projects-model.js")


const getActionById = async (req,res,next) =>{
    const {id} = req.params
    try{
        const actions = await Actions.get(id)
        if(!actions){
            res.status(401).json({message: "action not found"})
        }else{
            req.actions = actions
            next()
        }
    }catch(e){
        res.status(500).json(e.message)
    }
}

function validateAction(req, res, next) {
    if(!req.body.description || !req.body.notes || !req.body.project_id){
      res.status(400).json({message: "missing required fields"})
    }else{
      next()
    }
  }

  const getProjectById = async (req,res,next) =>{
    const {id} = req.params
    try{
        const projects = await Projects.get(id)
        if(!projects){
            res.status(401).json({message: "project not found"})
        }else{
            req.projects = projects
            next()
        }
    }catch(e){
        res.status(500).json(e.message)
    }
}

function validateProject(req, res, next) {
    if(!req.body.name || !req.body.description){
      res.status(400).json({message: "missing required fields"})
    }else{
      next()
    }
  }


module.exports ={
    getActionById,
    validateAction,
    getProjectById,
    validateProject,
}