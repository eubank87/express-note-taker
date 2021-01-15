const express = require("express");
const path = require("path");

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

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "notes.html"))
})


app.get("/api/notes", (req, res)=>{
    res.json(notes);
})

app.post("/api/notes", (req, res)=>{
    const newNote = req.body;
    notes.push(newNote)
    console.log(newNote)
    console.log("Notes array", notes);
    re.json(newNote);
})


app.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT}`)
})