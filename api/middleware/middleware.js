const Actions = require("../actions/actions-model.js")

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
    // DO YOUR MAGIC
    if(!req.body.action){
      res.status(400).json({message: "missing required action field"})
    }else{
      next()
    }
  }

module.exports ={
    getActionById,
    validateAction,
}