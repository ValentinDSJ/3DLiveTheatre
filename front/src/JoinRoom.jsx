import React from 'react';
import './index.css';
import { useState } from 'react';
// import { fetchJoinRoom } from './api';

export const JoinRoom = (props) => {
    const [roomId, setRoomId] = useState('');
    

    return (
        <div className="JoinRoom">
            <input
            type="text"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            placeholder="Room ID"/>
            <button onClick={e => {
                if (roomId && props.username) {
                    console.log(roomId);
                    console.log(props.username);
                    // fetchJoinRoom(props.username, roomId)
                    //     .then((result) => {
                    //         // TODO: rediect main page
                    //     }).catch((err) => {
                    //         // TODO: display error
                    //     });
                }
            }}>Join Room</button>
        </div>
    );
};