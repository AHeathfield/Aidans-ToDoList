import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var todayToDos = [];
var weekToDos = [];
var fullDate = new Date();
var date = days[fullDate.getDay()] + " " + months[fullDate.getMonth()] + " " + fullDate.getDate() + " " + fullDate.getFullYear();
var userLocation = "";

app.use(express.static("public"));

//Lets us use req.body
app.use(bodyParser.urlencoded({ extended: true }));

//Sends user on default index.ejs
app.get("/", (req, res) => {
    res.redirect('/today');
});

//For if they click today
app.get("/today", (req, res) => {
    userLocation = req.originalUrl; //This just get user URL

    res.render(__dirname + "/views/index.ejs", {
        today: date,
        toDoList: todayToDos,
        listType: "TODAY TODO'S"
    });
});

//For if they click week
app.get("/week", (req, res) => {
    userLocation = req.originalUrl; //GET user URL

    res.render(__dirname + "/views/index.ejs", {
        today: date,
        toDoList: weekToDos,
        listType: "WEEK TODO'S"
    });
});

//When they enter /submit I also check where it was entered
app.post("/submit", (req, res) => {
    if (userLocation == "/today") {
        if (req.body.toDo != '' && req.body.toDo != null) {
            todayToDos.push(req.body.toDo);
        }
    }
    else if (userLocation == "/week") {
        if (req.body.toDo != '' && req.body.toDo != null) {
            weekToDos.push(req.body.toDo);
        }
    }

    if (userLocation == "/today") {
        res.render(__dirname + "/views/index.ejs", {
            toDoList: todayToDos,
            today: date,
            listType: "TODAY TODO'S"
        });
    }
    else if (userLocation == "/week") {
        res.render(__dirname + "/views/index.ejs", {
            toDoList: weekToDos,
            today: date,
            listType: "WEEK TODO'S"
        });
    }
});


//Tells us if server is running
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});