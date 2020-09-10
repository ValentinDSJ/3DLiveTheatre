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

let ROOMS = {};
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
    ROOMS[newRoom.id] = newRoom;
    res.json({
        success: true,
        data: newRoom
    });
});

app.get('/api/room/:id', (req, res) => {
    const room = ROOMS[req.params.id];
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

io.on('connection', socket => {

    socket.on("newUser", data => {
        const { username, roomId } = JSON.parse(data);

        ROOMS[roomId].users.push({
            username: username,
            id: socket.id,
            roomId: roomId
        });

        USERS.push({
            username: username,
            id: socket.id,
            roomId: roomId
        });

        socket.join(roomId);
        io.to(roomId).emit("allUser", JSON.stringify(ROOMS[roomId].users.map(u => u.username)));
    });

    socket.on("disconnect", () => {
        const userToRemove = USERS.find(user => user.id === socket.id);

        USERS = USERS.filter(user => {
            if (user.id !== userToRemove.id) {
                return user;
            }
        });

        ROOMS[userToRemove.roomId].users = ROOMS[userToRemove.roomId].users
            .filter(user => {
                if (user.id !== userToRemove.id) {
                    return user;
                }
            });

        io.to(userToRemove.roomId).emit("allUser", JSON.stringify(ROOMS[userToRemove.roomId].users.map(u => u.username)));
    });

});


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

// https://www.youtube.com/watch?v=mP_fnttJ5g0