const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4} = require("uuid");
uuidv4();

// Sets up the express app
// ========================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));


// HTML routes
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "notes.html"))
});

// API routes
app.get("/api/notes", (req, res)=>{
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data)=>{
        if (err){
            throw err
        } else{
            const parseData = JSON.parse(data)
            res.send(parseData)
        }
    })
});

// receives new note to save on the request body, returns note to client
app.post("/api/notes", (req, res)=>{
    const newNote = req.body;
    newNote.id = uuidv4()
    fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data)=>{
        if(err){
            throw err
        } else{
            const noteData = JSON.parse(data)
            const allNotes = [...noteData, newNote]
            const userData = JSON.stringify(allNotes)
            res.send(userData)
            fs.writeFile(path.join(__dirname, "db/db.json"), userData, (err, res)=>{
                if(err){
                    throw err
                } else{
                    console.log("writing...")
                }
            }) 
        }
    })
});



// listening function
app.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT}`)
});