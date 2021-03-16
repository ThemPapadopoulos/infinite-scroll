const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");
const mykey = config.MY_KEY;
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photosArray = [];

// Unsplash API
let count = 5;

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${mykey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${mykey}&count=${count}`;
  }
}

// create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    //Event listener,check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//  GET PHOTOS FROM UNSPLASH API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// On load
getPhotos();
