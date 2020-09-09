import React from 'react';
import './index.css';
import { useState } from 'react';
import { fetchCreateRoom } from './api';

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
                    fetchCreateRoom(youtubeUrl)
                        .then(res => res.json())
                        .then(res => {
                            if (res.success)
                                props.setRoom(res.data);
                        })
                }
            }}>Create Room</button>
        </div>
    );
};