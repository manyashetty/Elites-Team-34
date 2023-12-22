const express=require('express')
const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const {authenticateMiddleware} = require("../controllers/projectController")
const contactController = require("../controllers/conactController")

const servicesController = require("../controllers/servicesController")

const {upload} = require("../middleware/multer");
const {getAllMessages , postNewMessage} = require('../controllers/messageController');
const router=express.Router()

// REGISTRATION, LOGIN, LOGOUT ROUTE
router.post("/register",userController.createUser)
router.put("/users",userController.updateUser)
router.post("/login",userController.loginUser)
router.post("/logout",userController.logoutController)
router.get("/user",authenticateMiddleware,userController.getUser)
router.get("/users",userController.getAllusers)


// PROJECT CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post("/projects", authenticateMiddleware,projectController.createProject);
router.get("/projects",authenticateMiddleware,projectController.getAllProjects)
router.get("/projects/:id",projectController. getProjectById)
router.delete("/projects",projectController.deleteProject)
router.put("/projects",projectController.updateProject)

// CONTACT FORM 
router.post("/contacts",authenticateMiddleware,contactController.submitContactForm)
router.get("/contacts",authenticateMiddleware,contactController.displayForm) 


// SERVICES CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post('/services', authenticateMiddleware,upload.single('service_image'), servicesController.createService);
router.get('/services',authenticateMiddleware, servicesController.getServices);
router.delete('/services', servicesController.deleteService);
router.put('/services',upload.single('service_image'), servicesController.updateService)




// MESSAGES
// Get all messages
router.get('/chat', getAllMessages);

// Post a new message
router.post('/chat', postNewMessage);

module.exports=router


