import React from 'react';
import './index.css';

export const Home = (props) => {
    return (
        <div>
            <iframe src={"https://www.youtube.com/embed/" + props.room.youtubeUrl}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
                className="video"
            />
        </div>
    );
};