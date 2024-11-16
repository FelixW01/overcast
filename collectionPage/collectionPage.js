const divEl = document.getElementById('product-div');
let isMen = true;
const collection = localStorage.getItem('userCollection')
let genderIsMen = true;
const genderEl = document.getElementById('gender');
const h1El = document.getElementById('collection-title');

// Fetch data from JSON file
function getData() {
fetch('../products.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
    divEl.innerHTML = ''; 
    h1El.innerHTML = `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`
    
    if (collection === 'summer') {
        isMen ? populateProducts(data.collections.summer.men) : populateProducts(data.collections.summer.women)
    } else if (collection === 'fall') {
        isMen ? populateProducts(data.collections.fall.men) : populateProducts(data.collections.fall.women)
    } else {
        isMen ? populateProducts(data.collections.winter.men) : populateProducts(data.collections.winter.women)
    }

}).catch(err => {
    console.log('Error', err)
});
}

getData()

// Checks if the user is trying to go towards the men/women product page and populate accordingly
function changeGender() {
    genderIsMen = !genderIsMen;
    isMen = genderIsMen;
    genderEl.textContent = genderIsMen ? "Women" : "Man";
    getData()
}

// Populate dynamic data
function populateProducts(data) {
    
    data.forEach(clothe => {
        divEl.innerHTML += `
            <a href=${clothe.link}>
                <div class="card-div">
                <image src=${clothe.src} alt=${clothe.alt}></image>
                <div class="content-card-div">
                <h3>${clothe.name}</h3>
                <p>$${clothe.price}</p>
                <p>${clothe.description}</p>
                </div>
              </div>
              </a>
              `
    })
}

// Click event listener for genderEl
genderEl.addEventListener('click', changeGender)
