const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;
let pollOptions1 = ["Cioroiu", "Jorj", "Muia", "da"];
let pollOptions2 = ["Anabela", "Casiana", "Barbela"];
let pollDeadline = Date.now() + 300 * 1000;
// let pollDeadline = Date.now() + 24 * 60 * 60 * 1000;


let pollResults1 = new Array(pollOptions1.length).fill(0);
let pollResults2 = new Array(pollOptions2.length).fill(0);

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON body for API requests
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

// Get poll options and deadline
app.get('/api/poll-data', (req, res) => {
    res.json({
        options1: pollOptions1,
        options2: pollOptions2,
    });
});
app.get('/api/deadline', (req, res) => {
    res.json({
        deadline: pollDeadline,
    });
});

// Submit a vote
app.post('/api/vote:id', (req, res) => {
    if (Date.now() > pollDeadline) {
        return res.status(403).json({ error: "Poll has already ended"});
    }
    const { option } = req.body;
    optionIndex = parseInt(option);
    if (typeof optionIndex !== 'number' || optionIndex < 0) {
        return res.status(400).json({ error: 'Invalid option index' });
    }
    if(req.params['id']==1){
        pollResults1[optionIndex] += 1;
    }
    if(req.params['id']==2){
        pollResults2[optionIndex] += 1;
    }
    res.json({ message: 'Vote submitted successfully' });
});

// Get poll results
app.get('/api/results:id', (req, res) => {
    if (Date.now() < pollDeadline) {
        msLeft = pollDeadline-Date.now();
        const days = Math.floor(msLeft / (24*60*60*1000));
        const daysms = msLeft % (24*60*60*1000);
        const hours = Math.floor(daysms / (60*60*1000));
        const hoursms = msLeft % (60*60*1000);
        const minutes = Math.floor(hoursms / (60*1000));
        // const minutesms = msLeft % (60*1000);
        // const sec = Math.floor(minutesms / 1000);
        let readableDate = days+"d "+hours+"h "+minutes+"m ";
        return res.status(403).json({ error: `Poll results only available in ${readableDate}` });
    }
    // res.json({
    //     options: pollOptions,
    //     votes: pollResults,
    // });
    if(req.params['id']==1){
        res.json(Object.assign(...pollOptions1.map((k, i) =>({ 
            [k]: pollResults1[i] }))))
    }
    if(req.params['id']==2){
        res.json(Object.assign(...pollOptions2.map((k, i) =>({ 
            [k]: pollResults2[i] }))))
    }
    
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Live poll server running at http://localhost:${port}`);
});
