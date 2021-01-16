const express = require("express");
const path = require("path");
const { v4: uuidv4} = require("uuid");
uuidv4();

// Sets up the express app
// ========================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

const notes = [];

// route to home page
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

// route to notes page
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "notes.html"))
})

// route to notes json page
app.get("/api/notes", (req, res)=>{
    res.json(notes);
})

// receives new note to save on the request body, returns note to client
app.post("/api/notes", (req, res)=>{
    const newNote = req.body;
    notes.push(newNote)
    console.log(newNote)
    console.log("Notes array", notes);
    res.json(newNote);
})



// receive query parameter w/id of note to delete
app.delete("api/notes/:id", (req, res)=>{
    const userIndex = getUserIndex(req.params.id)
    if(userIndex === -1) return res.status(404).json({})

    notes.splice(userIndex, 1)
    res.json(notes)
})


app.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT}`)
})