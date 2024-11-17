const downArrow = document.getElementById('down-arrow');
const lastSection = document.querySelector('.main-section:last-of-type');
const mainContainer = document.querySelector('.main-container');

// Since I am using sticky scrolling, scroll event listener wont trigger.
// Checks mainContainer for scroll, 
mainContainer.addEventListener('scroll', () => {
    // returns the number of pixels mainContainer has been scrolled vertically
    const scrollTop = mainContainer.scrollTop;
    // returns the total height of the content inside the container
    const scrollHeight = mainContainer.scrollHeight;
    // returns the height of visible portion of mainContainer
    const clientHeight = mainContainer.clientHeight;
    
    // scrollHeight should returns the height of the cotent inside the container, which gets subtracted by scrollTop and then, subtracted by clientHeight
    // If the scroll position is within 100px of the bottom, hide the arrow
    // The user won't need the arrow anymore to indicate scrolling since they are at the bottom of the page
    if(scrollHeight - scrollTop - clientHeight <= 100) {
        downArrow.classList.add('hidden');
    } else {
        downArrow.classList.remove('hidden');
    }
})

const summerLink = document.getElementById('summer');
const fallLink = document.getElementById('fall');
const winterLink = document.getElementById('winter');

// Set user's collection selection into local storage
function storeCollection(collection) {
    localStorage.setItem('userCollection', collection);
}

summerLink.addEventListener('click', (e) => {
    storeCollection('summer');
});

fallLink.addEventListener('click', (e) => {
    storeCollection('fall');
});

winterLink.addEventListener('click', (e) => {
    storeCollection('winter');
});