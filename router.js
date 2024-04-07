const userController = require('./controller/userController')
const middleware = require("./middleware/authmiddleware")
const taskController = require("./controller/taskController")

exports.init_routes = function (app) {
    app.post("/register", userController.UserRegister);
    app.post("/login", userController.UserLogin);

    //protect router
    app.use("/api", middleware.verifyToken);

    app.post('/api/tasks', taskController.createTask);
    app.get('/api/tasks', taskController.getTasks);
    app.get('/api/tasks/:id', taskController.getTaskById);
    app.put('/api/tasks/:id', taskController.updateTask);
    app.delete('/api/tasks/:id', taskController.deleteTask);

}  