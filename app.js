const express = require('express');
const path = require('path');
const fs   = require('fs');
// const { json } = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
let notes = [];
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "public/views/notes.html"));
    
});

app.get('/api/notes', (req,res)=>{
    fs.readFile(__dirname + '/db/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        notes = data;   
        console.log(notes);
        res.json(data);
      });
    
});

app.post('/api/notes', (req,res)=>{
    const id = notes.length+ 1;
    const newNote = req.body;
    newNote.id = id; 
    notes.push(newNote);
    
    fs.writeFile('./db/db.json', JSON.stringify(notes) , err=>{
        err ? 
        console.error(err) :console.log('saved to database')
    });
});

app.delete('/api/notes/:id', (req,res)=>{
    res.end("hello from delete");
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "public/views/index.html"));
});


app.listen(PORT,()=>{
    console.log(`listening to Port ${PORT}`)
});