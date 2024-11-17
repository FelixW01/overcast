const divEl = document.getElementById('product-div');
let isMen = true;
const collection = localStorage.getItem('userCollection')
let genderIsMen = true;
const genderEl = document.getElementById('gender');
const h1El = document.getElementById('collection-title');
let filteredProducts = [];
const collectionTags = {
    summer: ['T-shirt', 'Shorts'],
    fall: ['Jackets & Sweaters', 'Pants'],
    winter: ['Coats', 'Jackets & Sweaters']
};
const dropdownEl = document.getElementById('dropdown1');

// Fetch data from JSON file
function getData(selectedValue) {
fetch('../products.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
    divEl.innerHTML = ''; 
    h1El.innerHTML = `${collection.charAt(0).toUpperCase() + collection.slice(1)} Collection`
    
    // Get the collection data to be able to filter the products dynamically instead of hard coding the collections
    const collectionData = data.collections[collection];
    // If isMen is true then serve men data, if it's false then serve women data
    const products = isMen ? collectionData.men : collectionData.women;
    // Reset filteredProducts to an empty state on every instance
    filteredProducts = []

     if (selectedValue) {
        products.forEach(product => {
            // if product.tag includes the user selectedValue from the dropdown and the product does not
            // exist in the filtered products, then push it.
            if (product.tag.includes(selectedValue)) {
                if (!filteredProducts.some(filteredProduct => filteredProduct.name === product.name)) {
                    filteredProducts.push(product);
                }
            }
        });
        console.log(filteredProducts)
        populateProducts(filteredProducts);
    } else if (collection === 'summer') {
        isMen ? populateProducts(data.collections.summer.men) : populateProducts(data.collections.summer.women)
    } else if (collection === 'fall') {
        isMen ? populateProducts(data.collections.fall.men) : populateProducts(data.collections.fall.women)
    } else {
        isMen ? populateProducts(data.collections.winter.men) : populateProducts(data.collections.winter.women)
    }
    populateTags();
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

// Dynamically populate tags based on the available products
function populateTags() {
    dropdownEl.innerHTML = '';

    const tags = collectionTags[collection];
    tags.forEach(tag => {
        console.log(tag)
        dropdownEl.innerHTML += `<li><a data-value="${tag}">${tag}</a></li>`;
    });
}

// Populate dynamic data
function populateProducts(data) {
    divEl.innerHTML = ''
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


const toggleBtn = document.getElementById('modal-toggle-btn');

// Dropdown logic from materialize
document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {
          coverTrigger: false,
          alignment: 'left'
        });
        let isOpen = false
        // Added logic to close dropdown on reclick
        toggleBtn.addEventListener('click', (e) => {
        const instance = M.Dropdown.getInstance(elems[0]);
        if (!isOpen) {
            instance.open();
            isOpen = true
          } else {
            instance.close();
            isOpen = false
          }
        })
      });




  // Listen for when a dropdown item is selected
  dropdownEl.addEventListener('click', function(e) {
    if (e.target) {
      const selectedValue = e.target.textContent.trim();
      getData(selectedValue)
      console.log('Selected value: ', selectedValue);
    }
  });