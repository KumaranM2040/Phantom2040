'use strict';

const userUl = document.getElementById('users');
const albumUl = document.getElementById('albums');
const userUrl = 'http://localhost:4041/users';
let usersWithFlame = [];

// var originalLog = console.log
// console.log=function(obj){
//     originalLog(JSON.parse(JSON.stringify(obj)))
// }
    async function getUsers() {
    // USERS
    let userResult = await fetch(userUrl)
    let userData = await userResult.json();
    return Promise.all( userData.map(async function(user) {
        let userdata = {
            id : user.id,
            name : user.name,
            albums : []
        };
        usersWithFlame.push(userdata);

        // ALBUMS
        return(await GetAlbums(user));
    }));
 
    async function GetAlbums(user) {
        let albumResult = await fetch(`http://localhost:4041/albums?userId=${user.id}`);
        let albumData = await albumResult.json();
        return Promise.all(albumData.map(async function (album) {
            let albumdata = {
                id: album.id,
                title: album.title,
                photos: []
            };
            let currentuser = usersWithFlame.find((x) => x.id === user.id);
            console.log(albumdata);
            currentuser.albums.push(albumdata);
            // PHOTOS
            return (await GetPhotos(album, currentuser));
        }));

        async function GetPhotos(album, currentuser) {
            let photoResult = await fetch(`http://localhost:4041/photos?albumId=${album.id}`);
            let photoData = await photoResult.json();
            return await Promise.all(photoData.map(async function (photo) {
                let photodata = {
                    id: photo.id,
                    thumbnailUrl: photo.thumbnailUrl
                };
                let currentalbum = currentuser.albums.find((x) => x.id === album.id);
                currentalbum.photos.push(photodata);
            }));
        }
    }
};

function displayFlames(text) {
    let li = createNode('li'), span = createNode('span');
    span.innerHTML = `${text} 🔥`;
    append(li, span);
    append(userUl, li);
}

function createNode(element) {
    return document.createElement(element);
};

function append(parent, el) {
    return parent.appendChild(el);
};

async function displayInfo(users) {
   await displayUsers(usersWithFlame);
};


async function displayUsers(users) {
    await users.forEach(async user => {
        let li = createNode('li'), span = createNode('span');
        span.innerHTML = `Name : ${user.name} 🔥`;
        append(li, span);
        append(userUl, li);
        await displayAlbums(user.albums);
    });
};

async function displayAlbums(albums) {
    let temp = albums;
    await albums.forEach(async album => {
        let li = createNode('li'), span = createNode('span');
        span.innerHTML = `Album : ${album.title} 😵`;
        append(li, span);
        append(userUl, li);
        await displayPhotos(album);
    });
};

async function displayPhotos(album) {
    await album.photos.forEach(async photo => {
        let li = createNode('li'), span = createNode('span'), img = createNode('img');
        span.innerHTML = `Thumbnail Url: ${photo.thumbnailUrl} 😍`;
        //img.src = photo.thumbnailUrl;
        append(li, img);
        append(li, span);
        append(userUl, li);
    });
};


(async function (){
    getUsers().then(x=>displayInfo(usersWithFlame));
})();


