const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const Notice=require('./models/model');
const cors=require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.post('/createNotice',(req,res)=>{
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    const notice=new Notice({
        title: req.body.title || "Untitled Notice", 
        content: req.body.content
    })

    notice.save().then((data)=>{
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Some error occurred while creating the Notice."
        })
    });

})

app.delete('/deleteNotice/:noteId',(req,res)=>{
    Notice.findByIdAndRemove(req.params.noteId).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
})

app.get("/allNotices",(req,res)=>{
    Notice.find().then(notices=>{
        res.send(notices);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        })
    })
})

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


app.listen(3002, () => {
    console.log("Server is listening on port 3002");
});