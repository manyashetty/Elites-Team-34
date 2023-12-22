const Project = require("../models/projectModel");
const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const multerConfig = require("../middleware/multer");
const { generatePublicPresignedUrl } = require("../middleware/multer");

// Access the 's3' object
const s3 = multerConfig.s3;

// authenticateMiddleware.js

const authenticateMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res
        .status(401)
        .send({ msg: "Authorization header missing", status: false });
    }

    const tokens = authorizationHeader.split(" ");
    const tokenType = tokens[0];
    const accessToken = tokens[1];

    if (tokenType === "Bearer") {
      // Verify the access token
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          // If access token is invalid or expired, try using the refresh token
          if (err.name === "TokenExpiredError") {
            return tryRefreshToken(req.cookies.refreshToken, res, next);
          }
          return res
            .status(401)
            .json({ msg: "Invalid access token", status: false });
        }

        // Attach the user data to the request object
        req.user = decoded;
        next();
      });
    } else {
      return res.status(401).send({ msg: "Invalid token type", status: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "Internal server error", status: false });
  }
};

const tryRefreshToken = (refreshToken, res, next) => {
  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ msg: "Invalid refresh token", status: false });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      {
        user_id: decoded.user_id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" }
    );

    // Attach the new access token to the request object
    req.user = { ...decoded, newAccessToken };
    next();
  });
};

// CREATE A PROJECT CONTROLLER

// const createProject = async (req, res) => {
//   try {
//     let projectData = req.body;

//     const userId = req.user.user_id;

//     if (Object.keys(projectData).length === 0) {
//       return res.status(400).send({ status: false, msg: "no data provided" });
//     }


//     let saveProject = await projectModel.create({
//       ...projectData,
//       user: userId,
      
//     });
//     return res.status(201).send({
//       status: true,
//       msg: "project creation success",
//       data: saveProject,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ msg: "Internal server error", staus: false });
//   }
// };
const createProject = async (req, res) => {
  try {
    const { food_type, location, servings, timings, date } = req.body;
    const { user_id } = req.user; // Assuming your JWT payload contains user_id

    // Now you have the user_id and can use it to create the project
    const newProject = await Project.create({
      food_type,
      location,
      servings,
      timings,
      date,
      user: user_id, // Assign the user_id to the project's user field
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });
  }
};

//DISPLAY ALL THE PROJECTS OF LOGGED IN USER

// const getProjects = async (req, res) => {
//   try {
    
//     const userId = req.user.user_id;

//     const projectId = req.query.projectId;
//     if (projectId) {
//       const project = await projectModel.findOne({ _id: projectId });
//       return res.status(200).send({
//         status: true,
//         msg: "Project retrieved successfully",
//         data: project,
//       });
//     }

//     if (!userId) {
//       try {
//         const projects = await projectModel.find();

//         return res.status(200).send({
//           status: true,
//           msg: "All projects retrieved successfully",
//           data: projects,
//         });
//       } catch (error) {
//         console.error(error);
//         return res
//           .status(500)
//           .send({ msg: "Internal server error", status: false });
//       }
//     }

//     const userProjects = await projectModel.find({ user: userId });

//     return res.status(200).json({
//       status: true,
//       msg: "User projects retrieved successfully",
//       data: userProjects,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ msg: "Internal server error", status: false });
//   }
// };

const getProjects = async (req, res) => {
  try {
    // Use Project model to perform find operations
    const userId = req.user.user_id;
    // Rest of the code remains the same
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", status: false });
  }
};
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('user', 'username'); // Populate user field with 'username' from 'user' model, adjust as per your user model fields
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//DELETE A PROJECT

const deleteProject = async (req, res) => {
  try {
    // const projectId = req.params.project_id;
    const projectId = req.query.id;

    // Check if the project exists and is associated with the user
    const projectToDelete = await projectModel.findOne({
      _id: projectId,
    });

    if (!projectToDelete) {
      return res
        .status(404)
        .json({ status: false, msg: "Project not found for the user" });
    }

    // Get the image key associated with the project
    

    // Deleting the project
    await projectModel.findByIdAndDelete(projectId);

    // Delete the image from the S3 bucket
    

    return res.status(200).json({
      status: true,
      msg: "Project deleted successfully",
      deleted_project: projectToDelete,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// UPDATE A PROJECT
const updateProject = async (req, res) => {
  try {
    const project_id = req.query.id;
    const projectDataToUpdate = req.body;
   

    if (!project_id) {
      return res.status(400).json({
        status: false,
        msg: "No projectId provided",
      });
    }

    // Check if a new image file has been provided


    // Construct an update object with only provided fields
    const updateObject = {};
    for (const key in projectDataToUpdate) {
      if (projectDataToUpdate[key] !== undefined) {
        updateObject[key] = projectDataToUpdate[key];
      }
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      project_id,
      updateObject,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ status: false, msg: "Project not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

const getProjectById = async (req, res) => {
  const projectId = req.params.id; // Assuming the ID is passed as a route parameter

  try {
    const project = await Project.findById(projectId).populate('user', 'name email'); // Assuming 'user' field is populated from the 'User' model

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createProject,
  authenticateMiddleware,
  getProjects,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
};
