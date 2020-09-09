import React, { useEffect, useState } from 'react';
import './index.css';
import io from "socket.io-client";

const socket = io('http://localhost:8080');

export const Home = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.emit('newUser', JSON.stringify({
            username: props.username,
            roomId: props.room.id
        }));
        socket.on('allUser', data => {
            setUsers(JSON.parse(data));
        });
    }, [props.username, props.room]);

    return (
        <div>
            <h4>Room Id : {props.room.id}</h4>
            <iframe src={"https://www.youtube.com/embed/" + props.room.youtubeUrl}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
                className="video"
            />
            <ul>
                {users.map((user, idx) => {
                    return (<li key={idx}>{user}</li>);
                })}
            </ul>
        </div>
    );
};