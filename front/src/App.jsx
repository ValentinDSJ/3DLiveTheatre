import React, { useState } from 'react';
import './index.css';
import { JoinRoom } from './JoinRoom';
import { CreateRoom } from './CreateRoom';

const App = () => {
    const [username, setUsername] = useState('');
    return (
        <div className="App">
            <h1>3DLiveTheatre</h1>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Your Username" />
            <JoinRoom username={username} />
            <CreateRoom username={username} />
        </div>
    );
};

export default App;
