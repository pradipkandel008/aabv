const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "topic" + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype === "application/vnd.ms-powerpoint"
  ) {
    //accept
    cb(null, true);
  } else {
    //reject a file
    cb(new Error("File format not supported"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});

const Module = require("../models/modules");

//route for adding module only ie module code and name
router.post("/moduleOnly", auth, (req, res) => {
  const module = new Module({
    module_code: req.body.module_code,
    module_name: req.body.module_name,
    topic1: "",
    topic2: "",
    topic3: "",
    topic4: "",
    topic5: "",
    topic6: "",
    topic7: "",
    topic8: "",
    topic9: "",
    topic10: "",
    topic11: "",
    topic12: "",
    topic13: "",
    topic14: "",
    topic15: "",
    topic16: "",
    topic17: "",
    topic18: "",
    topic19: "",
    topic20: ""
  });
  module
    .save()
    .then(result => {
      res.status(201).json({
        message: "Module Added Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route fot getting all modules
router.get("/", function(req, res) {
  Module.find()
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(module) {
      res.send(module);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting  module by id
router.get("/:id", function(req, res) {
  Module.findById(req.params.id)
    .then(function(module) {
      res.send(module);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for updating module to put each topic file
router.put("/moduleFile/", auth, upload.single("topic_file"), function(
  req,
  res
) {
  if (req.body.module_topic == "Topic 1") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic1: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 1 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 2") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic2: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 2 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 3") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic3: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 3 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 4") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic4: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 4 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 5") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic5: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 5 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 6") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic6: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 6 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 7") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic7: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 7 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 8") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic8: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 8 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 9") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic9: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 9 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 10") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic10: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 10 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 11") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic11: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 11 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 12") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic12: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 12 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 13") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic13: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 13 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 14") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic14: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 14 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 15") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic15: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 15 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 16") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic16: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 16 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 17") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic2: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 17 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 18") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic18: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 18 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 19") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic19: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 19 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  } else if (req.body.module_topic == "Topic 20") {
    Module.find({ module_code: req.body.module_code })
      .then(
        Module.update(
          { module_code: req.body.module_code },
          {
            $set: {
              topic20: req.file.path
            }
          }
        )
          .then(
            res.status(201).json({
              message: "Topic 20 Content Added Successfully"
            })
          )
          .catch(function(e) {
            res.status(422).json({
              message: e
            });
          })
      )
      .catch(function(e) {
        console.log(e);
      });
  }
});

//route for deleting module only
router.delete("/deleteModuleOnly/:id", auth, (req, res) => {
  Module.findById(req.params.id)
    .then(module => {
      module
        .delete()
        .then(function(result) {
          res.status(201).json({
            message: "Module Deleted Successfully"
          });
        })
        .catch(function(e) {
          console.log(e);
        });
    })

    .catch(function(e) {
      console.log(e);
    });
});

//route for updating module only
router.put("/updateModuleOnly/:id", auth, function(req, res) {
  id = req.params.id.toString();
  Module.update(
    { _id: id },
    {
      $set: {
        module_code: req.body.module_code,
        module_name: req.body.module_name
      }
    }
  )
    .then(function(module) {
      res.status(201).json({
        message: "Module Updated Successfully"
      });
    })
    .catch(function(e) {
      res.send(e);
      console.log(e);
    });
});

module.exports = router;
