const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let isValid = true;

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
});

// Dropdown logic
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

  const firstName = document.getElementById('first_name');
  const lastName = document.getElementById('last_name');
  const email = document.getElementById('email');
  const subject = document.querySelector('select');
  const message = document.getElementById('textarea1');


function submitForm() {
  errorReset()

  // Conditionals, if the respected fields are empty, show a red text saying ___ is required.
  if (!firstName.value.trim()) {
    errorMessage(firstName, 'First name is required');
    isValid = false;
  }

  if (!lastName.value.trim()) {
    errorMessage(lastName, 'Last name is required');
    isValid = false;
  }
    
  if (!email.value.trim() || !regex.test(email.value)) {
    errorMessage(email, 'Please enter a valid email address');
    isValid = false;
  }

  if (subject.selectedIndex === 0) {
    errorMessage(subject, 'Please select a reason for contact');
    isValid = false;
  }

  if (!message.value.trim()) {
    errorMessage(message, 'Message is required');
    isValid = false;
  }

  if (isValid) {
    // Notification Toast from Toaastify.js library
    Toastify({
        text: "Thank you for contacting us!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left", 
        stopOnFocus: true, 
        style: {
    background: "#333333",
},
  onClick: function(){}
}).showToast();
    resetFormFields()
    console.log('Form has been submitted successfully!');
  }
}

function errorMessage(input, message) {
  // This gets the closest input fields parsed through the if statements
  const parentDiv = input.closest('.input-field');
  
  // Create and append the errors to the parentDiv, additionally, add error-text class which makes it red
  const errorSpan = document.createElement('span');
  errorSpan.classList.add('error-text'); 
  
  errorSpan.textContent = message; 
  parentDiv.appendChild(errorSpan);
  
  console.log('Error: ' + message);
}

function errorReset() {
    const errorMsg = document.querySelectorAll('.error-text');
    errorMsg.forEach(error => error.remove())
    isValid = true
}

function resetFormFields() {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  subject.selectedIndex = 0;
  // force reinitialize to get reset dropdown
  M.FormSelect.init(subject);
  message.value = '';
}