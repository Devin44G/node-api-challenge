const express = require('express');
const Project = require('../data/helpers/projectModel.js');
const Action = require('../data/helpers/actionModel.js');

const router = express.Router();


router.post('/', validateProject, (req, res) => {
  Project.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: "Error publishing project" });
    });
});

// router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
//   req.body.user_id = req.params.id;
//   Post.insert(req.body)
//    .then(post => {
//      res.status(201).json(post);
//    })
//    .catch(err => {
//      res.status(500).json({error: "Error creating post"});
//    });
// });

router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving project data" });
    });
});

// router.get('/:id', validateUserId, (req, res) => {
//   User.getById(req.params.id)
//     .then(user => {
//       if(user) {
//         res.status(200).json(user);
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "Error retrieving user data" });
//     });
// });
//
// router.get('/:id/posts', validateUserId, (req, res) => {
//   User.getUserPosts(req.params.id)
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(err => {
//       res.status(500).json({ error: "Error retrieving posts data" });
//     });
// });
//
// router.delete('/:id', validateUserId, (req, res) => {
//   User.remove(req.params.id)
//     .then(user => {
//       res.status(200).json({ message: "User successfully deleted" });
//     })
//     .catch(err => {
//       res.status(500).jason({ error: "Error deleting user" });
//     })
// });
//
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
  User.getById(req.params.id)
    .then(user => {
      if(user) {
        req.user = user;
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
//
// // VALIDATE POST MIDDLEWARE
// function validatePost(req, res, next) {
//   if(!req.body) {
//     res.status(400).json({ message: "Missing post data." });
//   }
//   else if(!req.body.text) {
//     res.status(400).json({ message: "Missing required text field." });
//   }
//   next();
// }
//
module.exports = router;
