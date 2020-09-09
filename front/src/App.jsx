import React, { useState, useEffect } from 'react';
import './index.css';
import { JoinRoom } from './JoinRoom';
import { CreateRoom } from './CreateRoom';
import { Home } from './Home';
import { fetchRoomById } from './api';

const App = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (window.location.pathname !== "/") {
            fetchRoomById(window.location.pathname.split('/')[1])
                .then(res => res.json())
                .then(res => {
                    if (!res.success) {
                        // window.location = '/';
                    } else {
                        setRoom(res.data);
                    }
                });
        }
    }, []);

    if (room && username) {
        return (
            <div>
                <Home room={room} username={username} />
            </div>
        );
    } else {
        return (
            <div className="App">
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter Your Username" />
                <JoinRoom username={username} setRoom={setRoom} />
                <CreateRoom username={username} setRoom={setRoom} />
            </div>
        );
    }
};

export default App;
