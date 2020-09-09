import React from 'react';
import './index.css';
import { useState } from 'react';
import { fetchRoomById } from './api';

export const JoinRoom = (props) => {
    const [roomId, setRoomId] = useState('');

    return (
        <div className="JoinRoom">
            <input
                type="text"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                placeholder="Room ID" />
            <button onClick={e => {
                if (roomId && props.username) {
                    fetchRoomById(roomId)
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            if (res.success)
                                props.setRoom(res.data);
                        });
                }
            }}>Join Room</button>
        </div>
    );
};