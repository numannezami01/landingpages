const form = document.getElementById("loanForm");
const successModal = document.querySelector(".successPopupModal");
const successPopup = document.getElementById("successPopup");

function validateForm() {
  // Perform form validation, including mobile number validation
  const contactInput = document.getElementById("contact");
  const contactValue = contactInput.value.replace(/\D/g, ""); // Remove non-numeric characters
  const errorMessage = document.querySelector(".error-message");

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
  successModal.style.display = "block";
  successPopup.style.display = "block";
  // You can add animation here, for example:
  successPopup.classList.add("animate__animated", "animate__bounceIn");
  // After a certain duration, you can hide the popup
  setTimeout(() => {
    successModal.style.display = "none";
    successPopup.style.display = "none";
    successPopup.classList.remove("animate__animated", "animate__bounceIn");
  }, 10000); // 6000 milliseconds (10 seconds) in this example
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validateForm()) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    fetch("http://fcdlive.com:8080/api/visitors/addVisitorData", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data submitted successfully");
          showSuccessPopup();
          form.reset();
        } else {
          console.error("Error submitting data");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  }
});

let answers = document.querySelectorAll(".accordion");
answers.forEach((event) => {
  event.addEventListener("click", () => {
    if (event.classList.contains("active")) {
      event.classList.remove("active");
    } else {
      event.classList.add("active");
    }
  });
});


document.addEventListener("DOMContentLoaded", function() {
    // Get all accordion questions
    const accordions = document.querySelectorAll('.accordion__question');

    accordions.forEach((accordion) => {
        accordion.addEventListener('click', function() {
            // Optionally, toggle the current one without affecting others
            const currentAnswer = this.nextElementSibling;
            if (currentAnswer.style.display === "none" || !currentAnswer.style.display) {
                // Close all answers
                document.querySelectorAll('.accordion__answer').forEach((answer) => {
                    answer.style.display = 'none';
                });

                // Show the clicked one
                currentAnswer.style.display = 'block';
            } else {
                currentAnswer.style.display = 'none'; // This line is if you want to allow toggling close by re-clicking the same question
            }
        });
    });
});

var swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});