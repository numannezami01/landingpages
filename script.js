const form = document.getElementById('loanForm');
const successModal = document.querySelector('.successPopupModal');
const successPopup = document.getElementById('successPopup');

function validateForm() {
    // Perform form validation, including mobile number validation
    const contactInput = document.getElementById('contact');
    const contactValue = contactInput.value.replace(/\D/g, ''); // Remove non-numeric characters
    const errorMessage = document.querySelector('.error-message');
    
    if (contactValue.length < 10) {
        errorMessage.textContent = "Mobile number should be at least 10 digits";
        return false; // Return false if validation fails
    } else if (contactValue.length > 10) {
        errorMessage.textContent = "Mobile number cannot exceed 10 digits";
        return false; // Return false if validation fails
    } else {
        errorMessage.textContent = ""; // Reset error message
        return true; // Return true if validation passes
    }
}

function showSuccessPopup() {
    successModal.style.display = 'block';
    successPopup.style.display = 'block';
    // You can add animation here, for example:
    successPopup.classList.add('animate__animated', 'animate__bounceIn');
    // After a certain duration, you can hide the popup
    setTimeout(() => {
        successModal.style.display = 'none';
        successPopup.style.display = 'none';
        successPopup.classList.remove('animate__animated', 'animate__bounceIn');
    }, 10000); // 6000 milliseconds (10 seconds) in this example
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        fetch('https://test-node-server-6pp3.onrender.com/api/visitors/addVisitorData', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Data submitted successfully');
                showSuccessPopup();
                form.reset();
            } else {
                console.error('Error submitting data');
            }
        })
        .catch(error => {
            console.error('Error submitting data:', error);
        });
    }
});
