document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    // Password visibility toggle
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });

    // Form submission and validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        // Validation
        if (!validateFullName(fullName)) {
            showError('Please enter a valid full name');
            return;
        }

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!validatePhone(phone)) {
            showError('Please enter a valid phone number');
            return;
        }

        if (!validatePassword(passwordValue)) {
            showError('Password must be at least 8 characters long and contain letters and numbers');
            return;
        }

        if (passwordValue !== confirmPasswordValue) {
            showError('Passwords do not match');
            return;
        }

        // If validation passes, create user object
        const userData = {
            fullName,
            email,
            phone,
            password: passwordValue
        };

        // Store user data (you might want to send this to a server instead)
        localStorage.setItem('userData', JSON.stringify(userData));

        // Show success message
        showSuccess('Account created successfully!');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });

    // Validation functions
    function validateFullName(name) {
        return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[0-9]{10}$/.test(phone);
    }

    function validatePassword(password) {
        return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    }

    // Error/Success message functions
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        form.insertBefore(successDiv, form.firstChild);
    }
});