//code for request for product
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.product-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the default form submission (page reload)

        // Simple validation example
        const productName = document.getElementById('productName').value.trim();
        if (productName === "") {
            alert("Please enter a Product Name.");
            return;
        }

       
        console.log("Form submitted successfully!");
        alert("Request Submitted! Check the console for details.");
        
        // form.reset(); // Optionally clear the form after submission
    });
    
    // JS for file upload (optional: to show the selected file name)
    const fileInput = document.getElementById('fileInput');
    const fileLabel = document.querySelector('.file-upload label');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileLabel.innerHTML = `<span class="upload-icon">✓</span> ${fileInput.files[0].name}`;
        } else {
            fileLabel.innerHTML = `<span class="upload-icon">↑</span>`;
        }
    });
});
//code for Request password
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.reset-form');
    const newPass = document.getElementById('newPassword');
    const reEnterPass = document.getElementById('reEnterPassword');
    const errorMsg = document.getElementById('passwordError');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload

        const pass1 = newPass.value;
        const pass2 = reEnterPass.value;
        
        // Basic validation check
        if (pass1 === "" || pass2 === "") {
            errorMsg.textContent = "Please fill out both password fields.";
            return;
        }

        if (pass1 !== pass2) {
            errorMsg.textContent = "Passwords do not match!";
            // Highlight the fields visually
            newPass.style.border = '1px solid red';
            reEnterPass.style.border = '1px solid red';
            return;
        }

        // If validation passes
        errorMsg.textContent = "";
        newPass.style.border = '1px solid var(--border-color)';
        reEnterPass.style.border = '1px solid var(--border-color)';
        
        // Successful submission (in a real app, this would be an API call)
        alert("Password Reset Successful! Redirecting to login...");
        console.log("Password reset attempt complete.");
    });
});


    document.addEventListener('DOMContentLoaded', () => {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                
                // Toggle the 'open' class on the answer
                answer.classList.toggle('open');
                
                // For a true accordion where only one is open at a time, uncomment the block below:
                /*
                faqQuestions.forEach(otherQuestion => {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherQuestion !== question && otherAnswer.classList.contains('open')) {
                        otherAnswer.classList.remove('open');
                    }
                });
                */
            });
        });
    });

    // Optional: Basic form submission alert
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted! (Frontend only simulation)');
        // In a real application, you would send this data to a server here.
        this.reset();
    });
