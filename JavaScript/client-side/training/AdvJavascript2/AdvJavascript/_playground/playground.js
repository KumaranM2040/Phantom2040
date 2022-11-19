'use strict';

const userUl = document.getElementById('users');
const albumUl = document.getElementById('albums');
const userUrl = 'http://localhost:4041/users';
let usersWithFlame = [];

async function getUsers() {
    // USERS
    let userResult = await fetch(userUrl)
    let userData = await userResult.json();
    await userData.map(async function(user) {
        let userdata = {
            id : user.id,
            name : user.name,
            albums : []
        };
        usersWithFlame.push(userdata);

        // ALBUMS
        let albumResult = await fetch(`http://localhost:4041/albums?userId=${user.id}`);
        let albumData = await albumResult.json();
        
        albumData.map(async function(album) {
            let albumdata = {
                id : album.id,
                title : album.title,
                photos : []
            };
            let currentuser = usersWithFlame.find((x) => x.id === user.id);
            currentuser.albums.push(albumdata);

            // PHOTOS
            let photoResult = await fetch(`http://localhost:4041/photos?albumId=${album.id}`);
            let photoData = await photoResult.json();
            
            photoData.map(async function(photo) {
                let photodata = {
                    id : photo.id,
                    thumbnailUrl : photo.thumbnailUrl
                };
                let currentalbum = currentuser.albums.find((x) => x.id === album.id);
                currentalbum.photos.push(photodata);
            });
        });
    })
    // console.log(usersWithFlame);
    
    console.log(usersWithFlame);
    usersWithFlame.forEach(async user => {
        displayFlames(user.name);
        console.log(user.albums);
        user.albums.forEach(async album => {
            console.log(album);
            displayFlames(album.title);
        });
    });
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

async function displayUsers(users) {
    users.forEach(async user => {
        let li = createNode('li'), span = createNode('span');
        span.innerHTML = `${user.name} 🔥`;
        append(li, span);
        append(userUl, li);
        await displayAlbums(user.albums);
    });
};

async function displayAlbums(albums) {
    // console.log(albums);
    await albums.forEach(album => {
        console.log(album);
        // let li = createNode('li'), span = createNode('span');
        // span.innerHTML = `${album.title} 🔥`;
        // append(li, span);
        // append(albumUl, li);
        // displayAlbums(user.albums);
    });
};

getUsers();

// const ul = document.getElementById('users');
// const userUrl = 'http://localhost:4041/users';

// let userPromise = fetch(userUrl).then((result) => {
//     return result.json();
// }).then((data) => {
//     data.map(function(user) {
//         let li = createNode('li'), span = createNode('span');
//         span.innerHTML = `${user.name} 🔥`;
//         append(li, span);
//         append(ul, li);
        
//         let albumPromise = fetch(`http://localhost:4041/albums?userId=${user.id}`).then((result) => {
//             return result.json();
//         }).then((data) => {
//             data.map(function(album) {
//                 let li = createNode('li'), span = createNode('span');
//                 span.innerHTML = `${album.title} 🔥`;
//                 append(li, span);
//                 append(ul, li);
//             });
//         });
//     });
// });
