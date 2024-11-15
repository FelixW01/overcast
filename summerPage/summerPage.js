const divEl = document.getElementById('product-div');
let isMen = true;
const collection = 'summer'
let genderIsMen = true;
const genderEl = document.getElementById('gender')
// const summerEl = document.getElementById('summer')
// const fallEl = document.getElementById('fall')
// const winterEl = document.getElementById('winter')

// Fetch data from JSON file
function getData() {
fetch('../products.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
    divEl.innerHTML = ''; 
    console.log(data.clothes.men[0].name, '<<< data')
    isMen ? console.log(data.clothes.men) : console.log(data.clothes.women)
    isMen ? populateProducts(data.clothes.men) : populateProducts(data.clothes.women)

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

// summerEl.addEventListener('click', e => {
//     console.log(e, "<<<<< target val")
// })
// fallEl.addEventListener('click', e => {
//     console.log(e, "<<<<< target val")
// })
// winterEl.addEventListener('click', e => {
//     console.log(e, "<<<<< target val")
// })