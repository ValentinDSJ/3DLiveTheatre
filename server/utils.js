const fetch = require('node-fetch');

const generateRoomId = () => Math.random().toString(36).substring(3);

const checkIfYoutubeVideoExite = async (videoId) => {
    const res = await fetch(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
    return res.status === 200 ? true : false;
};

const checkIfAllUserIsReady = (users) => {
    for (let i in users) {
        if (!users[i].ready)
            return false;
    }
    return true;
};

module.exports = {
    generateRoomId: generateRoomId,
    checkIfYoutubeVideoExite: checkIfYoutubeVideoExite,
    checkIfAllUserIsReady: checkIfAllUserIsReady
};