const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const options = { /* ... */ };
const io = require('socket.io')(server, options);

const PORT = Number(process.env.PORT) | 8080;

const generateRoomId = () => Math.random().toString(36).substring(3);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let ROOMS = [];
let USERS = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/room/new', (req, res) => {
    const newRoom = {
        id: generateRoomId(),
        youtubeUrl: req.body.youtubeUrl.split('=')[1],
        users: []
    };
    // TODO : test youtube video existe
    ROOMS.push(newRoom);
    res.json({
        success: true,
        data: newRoom
    });
});

app.get('/api/room/:id', (req, res) => {
    const room = ROOMS.find(r => r.id === req.params.id);
    if (!room) {
        res.json({
            success: false,
            data: null
        });
        return;
    }
    res.json({
        success: true,
        data: room
    });
});

// io.on('connection', socker => {

// });


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});