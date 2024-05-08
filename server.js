// import express into this file
const express = require('express');


// initialize an instance of express
const app = express();


// define the port that the web server should run on
const port = 3000;

app.set('view engine', 'ejs');

// configure server to receive data from <forms>
app.use(express.urlencoded({ extended: true }));

const TASKS = []

app.get('/', (req, res) => {
   console.log("Request received at the / endpoint")
   return res.render("home.ejs", { tasks: TASKS });
});

app.get('/completed-tasks', (req, res) => {
   const completedTasks = TASKS.filter(task => task.isComplete);
   return res.render("home.ejs",{ tasks:completedTasks })
 });

 app.post('/add-task', (req, res) => {
   const newTask = {
      id: TASKS.length + 1,
      name: req.body.name,
      isCompleted: false
    };
    TASKS.push (newTask);
    return res.redirect("/");
 });

 app.post('/update-task/:id', (req, res) => {
   const id = parseInt(req.params.id, 10);
   const isComplete = req.body.isComplete === 'on';
   const taskIndex = TASKS.findIndex(task => task.id === id);
   if (taskIndex > -1) {
     TASKS[taskIndex].isComplete = isComplete;
   }
   
   return res.redirect("/");
 });
 

// Start the server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
});
