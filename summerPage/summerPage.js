const divEl = document.getElementById('product-div');
let isMen = true;
const collection = 'summer'
let genderIsMen = true;
const genderEl = document.getElementById('gender')

function getData() {
fetch('../products.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
    divEl.innerHTML = ''; 
    isMen ? console.log(data.clothes.men) : console.log(data.clothes.women)
    isMen ? populateProducts(data.clothes.men) : populateProducts(data.clothes.women)

}).catch(err => {
    console.log('Error', err)
});
}

getData()

function changeGender() {
    genderIsMen = !genderIsMen;
    isMen = genderIsMen;
    genderEl.textContent = genderIsMen ? "Women" : "Man";
    getData()
}

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


genderEl.addEventListener('click', changeGender)

