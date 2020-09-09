export const fetchCreateRoom = async (youtubeUrl) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ "youtubeUrl": youtubeUrl });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return await fetch("http://localhost:8080/api/room/new", requestOptions);
};


export const fetchRoomById = async (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch("http://localhost:8080/api/room/" + id, requestOptions);
};