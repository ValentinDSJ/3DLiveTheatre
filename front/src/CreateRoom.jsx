import React from 'react';
import './index.css';
import { useState } from 'react';
// import { fetchJoinRoom } from './api';

export const CreateRoom = (props) => {
    const [youtubeUrl, setYoutubeUrl] = useState('');

    return (
        <div className="CreateRoom">
            <input
                type="text"
                value={youtubeUrl}
                onChange={e => setYoutubeUrl(e.target.value)}
                placeholder="Youtube url" />
            <button onClick={e => {
                if (youtubeUrl && props.username) {
                    console.log(youtubeUrl);
                    console.log(props.username);
                    // fetchJoinRoom(props.username, roomId)
                    //     .then((result) => {
                    //         // TODO: rediect main page
                    //     }).catch((err) => {
                    //         // TODO: display error
                    //     });
                }
            }}>Create Room</button>
        </div>
    );
};