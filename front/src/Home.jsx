import React, { useEffect, useState, useRef } from 'react';
import './index.css';
import io from "socket.io-client";

const socket = io('http://localhost:8080');

export const Home = (props) => {
    const [users, setUsers] = useState([]);
    const [ready, setReady] = useState(false);
    const refVideo = useRef();

    useEffect(() => {
        socket.emit('newUser', JSON.stringify({
            username: props.username,
            roomId: props.room.id
        }));
        socket.on('allUser', data => {
            setUsers(JSON.parse(data));
        });
        socket.on('startOrStopVider', data => {
            if (JSON.parse(data)) {
                refVideo.current.click();
            }
        });
    }, [props.username, props.room]);

    const sendReady = () => {
        setReady(!ready);
        socket.emit('ready', '');
    };

    return (
        <div>
            <h4>Room Id : {props.room.id}</h4>
            <iframe src={"https://www.youtube.com/embed/" + props.room.youtubeUrl}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
                className="video"
                ref={refVideo}
            />
            <button onClick={e => sendReady()}>{!ready ? "Ready" : "Not Ready"}</button>
            <ul>
                {users.map((user, idx) => {
                    return (<li key={idx}>{user}</li>);
                })}
            </ul>
        </div>
    );
};