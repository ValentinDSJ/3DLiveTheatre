const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require("body-parser");

const PORT = Number(process.env.PORT) | 8080;

const generateRoomId = () => Math.random().toString(36).substring(3);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let ROOMS = [];
let USERS = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/room/new', (req, res) => {
    console.log(generateRoomId());
    console.log(req.body);
    const newRoom = {
        id: generateRoomId(),
        youtubeUrl: req.body.youtubeUrl,
        users: []
    };
    ROOMS.push(newRoom);
    res.json(newRoom);
});

app.get('/api/room/:id', (req, res) => {
    const room = ROOMS.find(r => r.id === req.params.id);
    if (!room) {
        res.json(null);
        return;
    }
    res.json({ room: room });
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});