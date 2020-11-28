const express = require('express')
//This allows for the API function calls: Get, Post, Update, Delete
const app = express('app')
const cors = require('cors')

const dbService = require('./dbService')
const dotenv = require('dotenv');


dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Create
app.post("/insert", (request, response) => {
    const { name } = request.body;

    //Data Flow <-- IN !!
    db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);

    //Data Flow <-- OUT !!
    result
    .then(data => response.json(data)+console.log(data))
    .catch(err => console.log(err));

})

//Read // REDO THIS FOR UNDERSTANDING!!
app.get("/getAll", (request, response) => {
    response.json({
        Name: 'Apollos Severe', 
        Degree: 'PhD', 
        age: 21, 
        Email: "severeapollos@gmail.com"
    })   
})

app.get('/getData', (request, response) => {
    db = dbService.getDbServiceInstance()

    const result = db.getAllData()
    result
    .then(data => response.json(data))
})

//Update


//Delete


// Start the Server !!!
app.listen(process.env.PORT, () => console.log("Server is running!"))