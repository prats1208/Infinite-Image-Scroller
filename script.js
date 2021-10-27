let photos = [];
let imgCon = document.getElementById("img-con");
let loader = $('.loader');
let ready = false;
let totalImages = 0;
let imgloaded = 0;

// API and its details
let count = 5;
const apiKey = 'u6aBpk1eoKealnzRmsee5h4x4VL7CfXf6U1waFcweSE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// setattributes function
function setAttributes(ele,attrs){
    for(const key in attrs){
        ele.setAttribute(key,attrs[key]);
    }
}

//loading check function - check if all photos has been loaded or not
function imageLoaded(){
    imgloaded++;
    if(imgloaded === totalImages){
        ready = true;
        $('.loader').hide();
        count=30;
    }
}

// Show photos on screen
function displayPhotos(){
    imgloaded = 0;
    totalImages = photos.length;
    photos.forEach((photo) => {
        const anchor = document.createElement('a');
        // anchor.setAttribute('href', photo.links.html);
        // anchor.setAttribute('target', '_blank');
        setAttributes(anchor,{
            href: photo.links.html,
            target: '_blank'
        });

        const imgtag = document.createElement('img');
        // imgtag.setAttribute('src', photo.urls.regular);
        // imgtag.setAttribute('alt', photo.alt_description);
        setAttributes(imgtag,{
            src: photo.urls.regular,
            alt: photo.alt_description
        });

        // Event Listener, check when each is finished loading
        imgtag.addEventListener('load', imageLoaded);

        // add 'a' and 'img' to html
        anchor.appendChild(imgtag);
        imgCon.appendChild(anchor);
    });
}


// fetch data from API
async function getPhotots(){
    try{
        const response = await fetch(apiUrl);
        photos = await response.json();
        displayPhotos();
    }
    catch(error){
        console.log(error);
    }
}

// infinite scroll and load photos
window.addEventListener('scroll',() => {
    if( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotots(); 
    }
});

// run function on load
getPhotots();