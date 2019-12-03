// Public API Request Project //

const searchContainer = document.querySelector('.search-container');
const galleryDiv = document.getElementById('gallery');

// Public API Req. - Requests 12 users, makes empty array, sets array to data.results, calls createGalleryCard function on array 'users'

const url = 'https://randomuser.me/api/?results=12';                    
let users = []
fetch(url)
    .then(response => response.json())  
    .then(function(data) {
        users = data.results;
        createGalleryCard(users);
    })
    .catch(err => console.log(err));


 // Set attributes helper function per stack overflow

const setAttributes = (ele, attrs) => {                                           
    for(let key in attrs) {
        ele.setAttribute(key, attrs[key]);
    };
};

// Search section - dynamically add search input to DOM

const createSearch = () => {                                                       // Creates form and sets attributres
    const createForm = document.createElement('form');
    const form = document.getElementsByTagName('FORM');                         // grabs form 
    const inputSearch = document.createElement('INPUT');                        // Input ele for Search
    const inputSubmit = document.createElement('INPUT');                        // Input ele for Submit
    searchContainer.appendChild(createForm);                                    // Append form to search-container div
    form[0].setAttribute("method", "get");                                      // Uses form[0] to grab first form and set attr
    form[0].setAttribute("action", "#");
    form[0].appendChild(inputSearch).setAttribute("id", "search-input")
    setAttributes(document.getElementById('search-input'), {                    // Using setAttributes helper function to set multiple attrs
        "class": "search-input",
        "placeholder": "Search...",
        "type": "search"
    });
    form[0].appendChild(inputSubmit).setAttribute("id", "search-submit");
    setAttributes(document.getElementById('search-submit'), {
        "type": "submit",
        //"value": "&#x1F50D;",
        "class": "search-submit"
    });
};
createSearch();

// Search Functionality

const search = (text, list) => {
    let storedUsers = [];
    for (let i = 0; i < list.length; i++) {
        //list[i].style.display = "none";
        if (list[i].name.first.includes(text.toLowerCase())) {
          storedUsers.push(list[i]);
          console.log(storedUsers)
        };
      };
    createGalleryCard(storedUsers);
};

// Event listener for search button
document.getElementById('search-submit').addEventListener('click', (event) => {
    event.preventDefault();
    text = document.getElementById('search-input').value;
    search(text, users);
});


// Gallery section - creating div's and appending to gallery div dynamically

const createGalleryCard = (users) => {                                                  // Accepts 'users' array as argument
    if(users.length > 0) {                                                              // Iterate over each index of array if users is greater than 0
        users.forEach(element => {
    
            const cardDiv = document.createElement('div');                              // Create new card div and append to gallery div
            galleryDiv.appendChild(cardDiv);
            cardDiv.setAttribute("class", "card");                                      // Set class to card

            const cardImgContainer = document.createElement('div');
            cardDiv.appendChild(cardImgContainer);
            cardImgContainer.setAttribute("class", "card-img-container");

            const createImg = document.createElement('img');                            // Create image element and append to card-img-container  div
            cardImgContainer.appendChild(createImg);
            setAttributes(createImg, {                                                  // Set attributes via setAttributes helper function
                "class": "card-img",
                "src": `${element.picture.large}`,                                      // Uses template literal to set picture
                "alt": "profile picture"
            });
        
            const cardInfoDiv = document.createElement('div');                          // Create 'card-info-container' div and append to 'card' div
            const createH3 = document.createElement('h3');                              // Create an H3 ele, and 2 Paragraph ele's, append to card-info-container div
            const createPara = document.createElement('p');
            const createPara2 = document.createElement('p');
            cardDiv.appendChild(cardInfoDiv);
            cardInfoDiv.setAttribute("class", "card-info-container");    
            cardInfoDiv.appendChild(createH3);
            setAttributes(createH3, {
                "id": "name",
                "class": "card-name cap"
            });
            createH3.innerText = `${element.name.first} ${element.name.last}`;          // Set inner text of h3 to name using template literal
            cardInfoDiv.appendChild(createPara);                                        // Append paragraph and set inner text and attrs
            createPara.setAttribute("class", "card-text");
            createPara.innerText = `${element.email}`;
            cardInfoDiv.appendChild(createPara2);                                       // Append paragraph2 and set inner text and attrs
            createPara2.setAttribute("class", "card-text cap");
            createPara2.innerText =`${element.location.state}`;                         // Uses template literal to set location text
        });
    };
};
//createGalleryCard();


// Event listener to listen on every 'card' div and popup modal when clicked

galleryDiv.addEventListener('click', (event) => {
    const cards = Array.from(document.querySelectorAll('.card'));                       // Creates an array of all the divs with class of card
    if (event.target.className === 'card'){
        let user = cards.indexOf(event.target);                                        // Uses indexOf to target index number of event.click
        console.log('clicked');
        createModalDivs(user);
    }
    
});


// Modal section - creating modal div's and appending to Body dynamically, adding modal elements to modal div's

const createModalDivs = (user) => {
    const bodyModalDiv = document.createElement('div');
    const body = document.body;
    body.appendChild(bodyModalDiv);                                                     // Create a 'modal-container' div inside body
    bodyModalDiv.setAttribute("class", "modal-container");
    const innerModalDiv = document.createElement('div');                                // Create a inner 'modal' div inside 'modal-conainter'
    const btn = document.createElement('BUTTON');
    bodyModalDiv.appendChild(innerModalDiv);
    innerModalDiv.setAttribute("class", "modal");
    innerModalDiv.appendChild(btn);                                                     // Append button to 'modal' div and set attrs
    setAttributes(btn, {
        "type": "button",
        "id": "modal-close-btn",
        "class": "modal-close-btn"
    });
    btn.innerHTML = "<strong>X</strong>"

    const modalInfoContainer = document.createElement('div');                           // Create 'modal-info-container' div and append to 'modal' div
    const createH3 = document.createElement('h3');
    const createPara = document.createElement('p');
    const createPara2 = document.createElement('p');
    const createPara3 = document.createElement('p');
    const createPara4 = document.createElement('p');
    const createPara5 = document.createElement('p');
    const createHr = document.createElement('hr');
    const img = document.createElement('img');
    innerModalDiv.appendChild(modalInfoContainer);
    modalInfoContainer.setAttribute("class", "modal-info-container");                  // Create and append img, h3, 5 paragraphs, and <hr> to 'modal-info-container'
    modalInfoContainer.appendChild(img);
    setAttributes(img, {
        "class": "modal-img",
        "src": `${user.picture.large}`,
        "alt": "profile picture"
    });

    modalInfoContainer.appendChild(createH3);
    setAttributes(createH3, {
        "id": "name",
        "class": "modal-name cap"
    });
    createH3.innerText = `${user.name.first} ${user.name.last}`;

    modalInfoContainer.appendChild(createPara);
    createPara.setAttribute("class", "modal-text");
    createPara.innerText = `${user.email}`;
    
    modalInfoContainer.appendChild(createPara2);
    createPara2.setAttribute("class", "modal-text cap");
    createPara2.innerText = `${user.location.city}`;

    modalInfoContainer.appendChild(createHr)

    modalInfoContainer.appendChild(createPara3);
    createPara3.setAttribute("class", "modal-text");
    createPara3.innerText = `${user.phone}`;

    modalInfoContainer.appendChild(createPara4);
    createPara4.setAttribute("class", "modal-text");
    createPara4.innerText = `${user.location.street.number} ${user.location.street.name}, 
    ${user.location.city}, ${user.location.state}, ${user.location.postcode}`;

    modalInfoContainer.appendChild(createPara5);
    createPara5.setAttribute("class", "modal-text");
    createPara5.innerText = "10/21/2015";


};
//createModalDivs();







// Helper functions to create elements and append

function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
};
    
function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
};