import React from 'react';
import './index.css';
import { useState } from 'react';
import { fetchJoinRoom } from './api';

const JoinRoom = (props) => {
    const [roomId, setRoomId] = useState();

    return (
        <div className="JoinRoom">
            <input type="text" value={roomId} onChange={e => setRoomId(e.target.value)} />
            <button onClick={e => {
                if (roomId && props.username) {
                    fetchJoinRoom(props.username, roomId)
                        .then((result) => {
                            // TODO: rediect main page
                        }).catch((err) => {
                            // TODO: display error
                        });
                }
            }}>Join Room</button>
        </div>
    );
};

export default JoinRoom;

