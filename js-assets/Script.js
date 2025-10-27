/* ========================================
   EMPOWERING THE NATION - MAIN SCRIPT
   ========================================
   This script handles:
   1. Search functionality across all pages
   2. Course detail page tabs
   3. Sign up form validation and storage
   4. Fee calculator with 3-step enrollment flow
   5. Success page confetti animation
*/

/* ========================================
   HELPER FUNCTIONS
   ======================================== */

/* Code Attribution
   Title: JavaScript querySelector
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/met_document_queryselector.asp
*/
// Quick element selector - returns single element
function $(selector) {
    return document.querySelector(selector);
}

/* Code Attribution
   Title: JavaScript querySelectorAll
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/met_document_queryselectorall.asp
*/
/* Code Attribution
   Title: JavaScript Array.from
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_from.asp
*/
// Quick element selector - returns array of elements
function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
}

/* Code Attribution
   Title: JavaScript Regular Expressions
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_regexp.asp
*/
/* Code Attribution
   Title: JavaScript test() Method
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_regexp_test.asp
*/
// Validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ========================================
   1. SEARCH MODAL FUNCTIONALITY
   ======================================== */

/* Code Attribution
   Title: JavaScript const
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_const.asp
*/
/* Code Attribution
   Title: JavaScript Arrays
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_arrays.asp
*/
/* Code Attribution
   Title: JavaScript Objects
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_objects.asp
*/
// Search data for all pages and courses
const searchData = [
    { title: 'Home Page', url: 'HomePage.html', keywords: ['home', 'homepage', 'main', 'start'], description: 'Main landing page with course overview' },
    { title: 'Courses & Fee', url: 'FeeCalculator.html', keywords: ['courses', 'fees', 'calculator', 'pricing'], description: 'View all courses and calculate fees' },
    { title: 'About Us', url: 'AboutUs.html', keywords: ['about', 'mission', 'team', 'story'], description: 'Learn more about our mission and team' },
    { title: 'Contact Us', url: 'ContactUs.html', keywords: ['contact', 'email', 'phone', 'address'], description: 'Get in touch with us' },
    { title: 'First Aid Course', url: 'FirstAid.html', keywords: ['first aid', 'medical', 'emergency', 'cpr'], description: '6-month course - First aid awareness' },
    { title: 'Sewing Course', url: 'Sewing.html', keywords: ['sewing', 'tailoring', 'alterations', 'garments'], description: '6-month course - Garment tailoring' },
    { title: 'Life Skills Course', url: 'LifeSkills.html', keywords: ['life skills', 'personal development', 'essential skills'], description: '6-month course - Essential life skills' },
    { title: 'Landscaping Course', url: 'LandScaping.html', keywords: ['landscaping', 'garden design', 'outdoor'], description: '6-month course - Landscaping services' },
    { title: 'Child Minding Course', url: 'ChildMinding.html', keywords: ['child minding', 'childcare', 'baby care'], description: '6-week course - Child and baby care' },
    { title: 'Cooking Course', url: 'Cooking.html', keywords: ['cooking', 'food', 'meals', 'nutrition'], description: '6-week course - Nutritious family meals' },
    { title: 'Garden Maintenance', url: 'GardenMaintainance.html', keywords: ['garden maintenance', 'gardening', 'plants'], description: '6-week course - Basic gardening' }
];

/* Code Attribution
   Title: JavaScript Functions
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_functions.asp
*/
/* Code Attribution
   Title: JavaScript if...else Statement
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_if_else.asp
*/
/* Code Attribution
   Title: JavaScript return Statement
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_return.asp
*/
// Open search modal
function openSearch() {
    const modal = $('#searchModal');
    const input = $('#searchInput');
    if (!modal) return;
    
    /* Code Attribution
       Title: JavaScript classList
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/prop_element_classlist.asp
    */
    modal.classList.add('active');
    
    /* Code Attribution
       Title: JavaScript setTimeout
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_win_settimeout.asp
    */
    /* Code Attribution
       Title: JavaScript focus() Method
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_html_focus.asp
    */
    // Focus on input after a short delay
    setTimeout(() => input && input.focus(), 100);
}

// Close search modal
function closeSearch() {
    const modal = $('#searchModal');
    const input = $('#searchInput');
    const results = $('#searchResults');
    if (!modal) return;
    
    modal.classList.remove('active');
    if (input) input.value = '';
    
    /* Code Attribution
       Title: JavaScript innerHTML
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/prop_html_innerhtml.asp
    */
    if (results) results.innerHTML = '<div class="no-results">Start typing to search...</div>';
}

/* Code Attribution
   Title: JavaScript Window Location
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_window_location.asp
*/
// Navigate to a URL
function navigateTo(url) {
    window.location.href = url;
}

/* Code Attribution
   Title: JavaScript addEventListener
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/met_document_addeventlistener.asp
*/
// Initialize search functionality
function initSearchModal() {
    const modal = $('#searchModal');
    const input = $('#searchInput');
    const results = $('#searchResults');
    
    // Exit if elements don't exist on this page
    if (!modal || !input || !results) return;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeSearch();
    });
    
    /* Code Attribution
       Title: JavaScript Keyboard Events
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/obj_keyboardevent.asp
    */
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeSearch();
    });
    
    /* Code Attribution
       Title: JavaScript String toLowerCase
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/jsref_tolowercase.asp
    */
    /* Code Attribution
       Title: JavaScript String trim
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/jsref_trim_string.asp
    */
    // Live search as user types
    input.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase().trim();
        
        // Show default message if input is empty
        if (!query) {
            results.innerHTML = '<div class="no-results">Start typing to search...</div>';
            return;
        }
        
        /* Code Attribution
           Title: JavaScript Array filter
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/jsref/jsref_filter.asp
        */
        /* Code Attribution
           Title: JavaScript String includes
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/jsref/jsref_includes.asp
        */
        /* Code Attribution
           Title: JavaScript Array some
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/jsref/jsref_some.asp
        */
        // Filter search data based on query
        const matches = searchData.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.description.toLowerCase().includes(query) ||
                   item.keywords.some(keyword => keyword.includes(query));
        });
        
        // Show no results message
        if (matches.length === 0) {
            results.innerHTML = '<div class="no-results">No results found. Try different keywords.</div>';
            return;
        }
        
        /* Code Attribution
           Title: JavaScript Array map
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/jsref/jsref_map.asp
        */
        /* Code Attribution
           Title: JavaScript Template Literals
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/js/js_string_templates.asp
        */
        /* Code Attribution
           Title: JavaScript Array join
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/jsref/jsref_join.asp
        */
        // Display matching results
        results.innerHTML = matches.map(item => `
            <div class="search-result-item" onclick="navigateTo('${item.url}')">
                <div class="result-title">${item.title}</div>
                <div class="result-description">${item.description}</div>
            </div>
        `).join('');
    });
}

/* ========================================
   2. COURSE TABS FUNCTIONALITY
   ======================================== */

/* Code Attribution
   Title: JavaScript forEach
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_foreach.asp
*/
/* Code Attribution
   Title: JavaScript Style Object
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/dom_obj_style.asp
*/
// Switch between tabs on course detail pages
function openTab(tabName, buttonElement) {
    // Hide all tab content
    const allPanes = $$('.tab-pane');
    allPanes.forEach(pane => pane.style.display = 'none');
    
    // Remove active class from all buttons
    const allButtons = $$('.tab-button');
    allButtons.forEach(button => button.classList.remove('active'));
    
    /* Code Attribution
       Title: JavaScript getElementById
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_document_getelementbyid.asp
    */
    // Show selected tab
    const selectedPane = document.getElementById(tabName);
    if (selectedPane) selectedPane.style.display = 'block';
    
    // Add active class to clicked button
    if (buttonElement) buttonElement.classList.add('active');
}

// Navigate to different course from dropdown
function navigateToCourse(url) {
    if (url) window.location.href = url;
}

/* ========================================
   3. SIGN UP FORM FUNCTIONALITY
   ======================================== */

/* Code Attribution
   Title: JavaScript preventDefault
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/event_preventdefault.asp
*/
// Initialize sign up form
function initSignUpForm() {
    const form = $('.signup-form');
    if (!form) return; // Exit if not on sign up page
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form values
        const firstName = $('#firstName')?.value.trim() || '';
        const lastName = $('#lastName')?.value.trim() || '';
        const fullName = $('#fullName')?.value.trim() || `${firstName} ${lastName}`.trim();
        const email = $('#email')?.value.trim() || '';
        const phone = $('#phone')?.value.trim() || '';
        const password = $('#password')?.value || '';
        const confirmPassword = $('#confirm')?.value || $('#confirmPassword')?.value || '';
        
        // Validation checks
        if (!fullName || !email || !password || !confirmPassword) {
            showMessage('Please complete all required fields.', true);
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email.', true);
            return;
        }
        
        /* Code Attribution
           Title: JavaScript String replace
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/jsref/jsref_replace.asp
        */
        if (phone && phone.replace(/\D/g, '').length < 10) {
            showMessage('Please enter a valid phone number.', true);
            return;
        }
        
        if (password.length < 8) {
            showMessage('Password must be at least 8 characters.', true);
            return;
        }
        
        if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
            showMessage('Password must contain letters and numbers.', true);
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', true);
            return;
        }
        
        /* Code Attribution
           Title: JavaScript JSON stringify
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/js/js_json_stringify.asp
        */
        /* Code Attribution
           Title: JavaScript localStorage
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/jsref/prop_win_localstorage.asp
        */
        // Save user data to localStorage
        const userData = { fullName, email, phone, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('signup_complete', '1');
        
        showMessage('Account created successfully!', false);
        
        /* Code Attribution
           Title: JavaScript URLSearchParams
           Author: W3Schools
           Date: 27 October 2025
           Version: Not specified
           Availability: https://www.w3schools.com/js/js_api_url.asp
        */
        // Redirect after success
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get('from') || 'home';
        
        setTimeout(() => {
            if (returnTo === 'fee') {
                window.location.href = 'FeeCalculator.html#step2';
            } else {
                window.location.href = 'HomePage.html';
            }
        }, 800);
    });
    
    /* Code Attribution
       Title: JavaScript createElement
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_document_createelement.asp
    */
    /* Code Attribution
       Title: JavaScript textContent
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/prop_node_textcontent.asp
    */
    /* Code Attribution
       Title: JavaScript prepend
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_node_prepend.asp
    */
    /* Code Attribution
       Title: JavaScript remove
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_element_remove.asp
    */
    // Show success or error message
    function showMessage(text, isError) {
        const messageClass = isError ? 'error-message' : 'success-message';
        
        // Remove any existing messages
        const existingMessage = form.querySelector('.error-message, .success-message');
        if (existingMessage) existingMessage.remove();
        
        // Create and show new message
        const messageDiv = document.createElement('div');
        messageDiv.className = messageClass;
        messageDiv.textContent = text;
        form.prepend(messageDiv);
        
        // Auto-remove error messages after 3 seconds
        if (isError) {
            setTimeout(() => messageDiv.remove(), 3000);
        }
    }
}

/* ========================================
   4. FEE CALCULATOR FUNCTIONALITY
   ======================================== */

/* Code Attribution
   Title: JavaScript parseFloat
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_parsefloat.asp
*/
/* Code Attribution
   Title: JavaScript Array reduce
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_reduce.asp
*/
/* Code Attribution
   Title: JavaScript toFixed
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_tofixed.asp
*/
// Initialize fee calculator and enrollment flow
function initFeeCalculator() {
    const contactStep = $('#contactStep');
    if (!contactStep) return; // Exit if not on fee calculator page
    
    // Get all elements
    const courseCheckboxes = $$('input[name="course"]');
    const subtotalElement = $('.cost-summary-new .subtotal');
    const discountElement = $('.cost-summary-new .discount');
    const vatElement = $('.cost-summary-new .vat');
    const totalElement = $('.cost-summary-new .total-amount');
    const coursesStep = $('#coursesStep');
    const enrollButton = $('#enrollNowBtn');
    const enrollHint = $('#enrollHint');
    
    // Update cost summary when courses are selected/deselected
    function updateCostSummary() {
        // Get prices of selected courses
        const selectedPrices = courseCheckboxes
            .filter(checkbox => checkbox.checked)
            .map(checkbox => parseFloat(checkbox.value));
        
        // Calculate totals
        const subtotal = selectedPrices.reduce((sum, price) => sum + price, 0);
        const discount = selectedPrices.length >= 2 ? subtotal * 0.1 : 0; // 10% discount for 2+ courses
        const vat = (subtotal - discount) * 0.15; // 15% VAT
        const total = subtotal - discount + vat;
        
        // Update display
        if (subtotalElement) subtotalElement.textContent = `R${subtotal.toFixed(2)}`;
        if (discountElement) discountElement.textContent = `-R${discount.toFixed(2)}`;
        if (vatElement) vatElement.textContent = `R${vat.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `R${total.toFixed(2)}`;
    }
    
    // Listen for course selection changes
    courseCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCostSummary);
    });
    
    // Update progress bar
    function updateProgressBar(currentStep) {
        $$('.progress-step').forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    /* Code Attribution
       Title: JavaScript classList toggle
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/howto/howto_js_toggle_class.asp
    */
    // Show specific step
    function showStep(stepNumber) {
        if (contactStep) {
            contactStep.classList.toggle('hidden', stepNumber !== 1);
        }
        if (coursesStep) {
            coursesStep.classList.toggle('hidden', stepNumber !== 2);
        }
        updateProgressBar(stepNumber);
    }
    
    /* Code Attribution
       Title: JavaScript alert
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_win_alert.asp
    */
    // Validate Step 1: Contact Details
    function validateContactDetails() {
        const firstName = $('#firstName')?.value.trim() || '';
        const lastName = $('#lastName')?.value.trim() || '';
        const email = $('#contactEmail')?.value.trim() || '';
        const phone = $('#contactPhone')?.value.trim() || '';
        
        if (!firstName || !lastName || !email || !phone) {
            alert('Please complete all required contact fields.');
            return false;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email.');
            return false;
        }
        
        if (phone.replace(/\D/g, '').length < 10) {
            alert('Please enter a valid phone number.');
            return false;
        }
        
        // Save contact details
        const contactData = {
            firstName,
            lastName,
            email,
            phone,
            notes: $('#specialReq')?.value.trim() || ''
        };
        localStorage.setItem('enroll_contact', JSON.stringify(contactData));
        
        return true;
    }
    
    /* Code Attribution
       Title: JavaScript closest
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/jsref/met_element_closest.asp
    */
    // Validate Step 2: Course Selection
    function validateCourseSelection() {
        const selectedCourses = courseCheckboxes.filter(cb => cb.checked);
        
        if (selectedCourses.length === 0) {
            alert('Please select at least one course to continue.');
            return false;
        }
        
        // Collect course data
        const courses = selectedCourses.map(checkbox => {
            const card = checkbox.closest('.course-card-new');
            return {
                name: card.querySelector('.course-name-new')?.textContent.trim(),
                duration: card.querySelector('.course-duration-new')?.textContent.trim(),
                price: parseFloat(checkbox.value)
            };
        });
        
        // Get cost summary values
        const subtotal = parseFloat(subtotalElement?.textContent.replace(/[^\d.]/g, '') || 0);
        const discount = parseFloat(discountElement?.textContent.replace(/[^\d.]/g, '') || 0);
        const vat = parseFloat(vatElement?.textContent.replace(/[^\d.]/g, '') || 0);
        const total = parseFloat(totalElement?.textContent.replace(/[^\d.]/g, '') || 0);
        
        // Save course data
        const courseData = { courses, subtotal, discount, vat, total };
        localStorage.setItem('enroll_courses', JSON.stringify(courseData));
        
        return true;
    }
    
    // Check if all 3 steps are complete and update enroll button
    function updateEnrollButton() {
        const hasContactData = !!localStorage.getItem('enroll_contact');
        const hasCourseData = !!localStorage.getItem('enroll_courses');
        const hasUserAccount = !!localStorage.getItem('userData');
        
        const allStepsComplete = hasContactData && hasCourseData && hasUserAccount;
        
        if (enrollButton) {
            enrollButton.disabled = !allStepsComplete;
            enrollButton.style.pointerEvents = allStepsComplete ? 'auto' : 'none';
            enrollButton.style.cursor = allStepsComplete ? 'pointer' : 'not-allowed';
        }
        
        if (enrollHint) {
            enrollHint.textContent = allStepsComplete 
                ? 'All set! Click Enroll to finish.' 
                : 'Complete steps 1–3 to enable';
        }
    }
    
    /* Code Attribution
       Title: JavaScript Arrow Functions
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/js/js_arrow_function.asp
    */
    // Step 1 → Step 2: Contact Details to Course Selection
    const nextToCourses = $('#toCoursesBtn');
    if (nextToCourses) {
        nextToCourses.addEventListener('click', () => {
            if (validateContactDetails()) {
                showStep(2);
                updateEnrollButton();
            }
        });
    }
    
    // Step 2 → Step 3: Course Selection to Sign Up
    const nextToAccount = $('#toAccountBtn');
    if (nextToAccount) {
        nextToAccount.addEventListener('click', () => {
            if (validateCourseSelection()) {
                window.location.href = 'signUp.html?from=fee';
            }
        });
    }
    
    // Back button: Step 2 → Step 1
    const backButton = $('#backToContactBtn');
    if (backButton) {
        backButton.addEventListener('click', () => showStep(1));
    }
    
    // Final Enroll button
    if (enrollButton) {
        enrollButton.addEventListener('click', () => {
            const hasContactData = !!localStorage.getItem('enroll_contact');
            const hasCourseData = !!localStorage.getItem('enroll_courses');
            const hasUserAccount = !!localStorage.getItem('userData');
            
            if (hasContactData && hasCourseData && hasUserAccount) {
                window.location.href = 'enrollment-success.html';
            } else {
                alert('Please complete all 3 steps before enrolling.');
            }
        });
    }
    
    /* Code Attribution
       Title: JavaScript Window Location Hash
       Author: W3Schools
       Date: 27 October 2025
       Version: Not specified
       Availability: https://www.w3schools.com/js/js_window_location.asp
    */
    // Check URL hash to determine starting step
    const urlHash = window.location.hash;
    if (urlHash === '#step2') {
        showStep(2);
    } else {
        showStep(1);
    }
    
    // Initialize
    updateCostSummary();
    updateEnrollButton();
    
    // Listen for localStorage changes (from other tabs)
    window.addEventListener('storage', updateEnrollButton);
}

/* ========================================
   5. SUCCESS PAGE CONFETTI
   ======================================== */

/* Code Attribution
   Title: JavaScript for Loop
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_loop_for.asp
*/
/* Code Attribution
   Title: JavaScript Math.random
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_random.asp
*/
/* Code Attribution
   Title: JavaScript Math.floor
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/jsref_floor.asp
*/
/* Code Attribution
   Title: JavaScript appendChild
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/met_node_appendchild.asp
*/
// Create confetti animation on success page
function initSuccessConfetti() {
    // Only run on success page
    if (!document.body.classList.contains('success-page')) return;
    
    const colors = ['#ffffff', '#ffd166', '#ff6b6b', '#fcca46', '#118ab2', '#ef476f'];
    
    // Create 120 confetti pieces
    for (let i = 0; i < 120; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random positioning and styling
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (2.5 + Math.random() * 2) + 's';
        confetti.style.animationDelay = (Math.random() * 2) + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
    }
}

/* ========================================
   INITIALIZE ALL FUNCTIONALITY
   ======================================== */

/* Code Attribution
   Title: JavaScript DOMContentLoaded
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/jsref/event_domcontentloaded.asp
*/
// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
    initSearchModal();
    initSignUpForm();
    initFeeCalculator();
    initSuccessConfetti();
});

/* Code Attribution
   Title: JavaScript Window Object
   Author: W3Schools
   Date: 27 October 2025
   Version: Not specified
   Availability: https://www.w3schools.com/js/js_window.asp
*/
// Make functions available globally for onclick handlers
window.openSearch = openSearch;
window.closeSearch = closeSearch;
window.navigateTo = navigateTo;
window.openTab = openTab;
window.navigateToCourse = navigateToCourse;