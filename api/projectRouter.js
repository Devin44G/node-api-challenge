const express = require('express');
const Project = require('../data/helpers/projectModel.js');
const Action = require('../data/helpers/actionModel.js');

const router = express.Router();

/******** PROJECT ENDPOINTS ********/
router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project data" });
    });
});

router.get('/:id', validateProjectId, (req, res) => {
  Project.get(req.params.id)
    .then(project => {
      if(project) {
        res.status(200).json(project);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project data" });
    });
});

router.post('/', validateProject, (req, res) => {
  Project.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error publishing project" });
    });
});

router.delete('/:id', validateProjectId, (req, res) => {
  Project.remove(req.params.id)
    .then(project => {
      res.status(200).json({ message: "User successfully deleted" });
    })
    .catch(err => {
      res.status(500).jason({ error: "Error deleting user" });
    })
});

router.put('/:id', validateProjectId, (req, res) => {
  Project.update(req.params.id, req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error updating user" })
    });
});

/******** ACTIONS ENDPOINTS ********/
router.get('/:id/actions', validateProjectId, (req, res) => {
  Project.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving posts data" });
    });
});

router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {
  req.body.project_id = req.params.id;
  Action.insert(req.body)
   .then(action => {
     res.status(201).json(action);
   })
   .catch(err => {
     res.status(500).json({error: "Error creating post"});
   });
});

// router.delete('/:id', validateUserId, (req, res) => {
//   User.remove(req.params.id)
//     .then(user => {
//       res.status(200).json({ message: "User successfully deleted" });
//     })
//     .catch(err => {
//       res.status(500).jason({ error: "Error deleting user" });
//     })
// });

// router.put('/:id', validateUserId, (req, res) => {
//   User.update(req.params.id, req.body)
//     .then(user => {
//       res.status(201).json(user);
//     })
//     .catch(err => {
//       res.status(500).json({ error: "Error updating user" })
//     });
// });
//

// VALIDATE PROJECT ID MIDDLEWARE
function validateProjectId(req, res, next) {
  Project.get(req.params.id)
    .then(project => {
      if(project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid project ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving project data" });
    });
}

// VALIDATE PROJECT MIDDLEWARE
function validateProject(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "Missing project data." });
  }
  else if(!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required name and description fields." });
  }
  next();
}

// VALIDATE ACTION MIDDLEWARE
function validateAction(req, res, next) {
  if(!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Missing required text field." });
  }
  next();
}

// function isActionThere(req, res, next) {
//   if(req.body.length === 0) {
//     res.status(400).json({ message: "Missing action data." });
//   }
//   next();
// }

module.exports = router;
