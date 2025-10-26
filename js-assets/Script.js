/* Global site script:
   - Provides search modal, tabs, and navigation across pages.
   - Powers Fee Calculator (cost calc + gated 3-step flow).
   - Handles Sign Up save/return.
   - Plays success confetti on the success page.
*/

/* ---------- Utilities ---------- */
// Small helper to safely select elements
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/* ---------- Search Modal (runs only if elements exist) ---------- */
// One-liner: provides modal open/close and live results filtering from shared searchData.
(function initSearch() {
    const modal = $('#searchModal');
    const input = $('#searchInput');
    const results = $('#searchResults');

    // Shared search metadata used by all pages
    const searchData = [
        { title: 'Home Page', url: 'HomePage.html', keywords: ['home','homepage','main','start','landing','empowering','nation','skills','learn'], description: 'Main landing page with course overview' },
        { title: 'Courses & Fee', url: 'FeeCalculator.html', keywords: ['courses','fees','calculator','pricing','cost','payment','enroll','register','fee','price'], description: 'View all courses and calculate fees' },
        { title: 'About Us', url: 'AboutUs.html', keywords: ['about','mission','team','who','vision','story','company','organization'], description: 'Learn more about our mission and team' },
        { title: 'Contact Us', url: 'ContactUs.html', keywords: ['contact','email','phone','address','location','reach','get in touch','message'], description: 'Get in touch with us' },
        { title: 'First Aid Course', url: 'FirstAid.html', keywords: ['first aid','medical','emergency','cpr','life support','health','safety'], description: '6-month course - First aid awareness and basic life support' },
        { title: 'Sewing Course', url: 'Sewing.html', keywords: ['sewing','tailoring','alterations','garments','clothes','fashion','textiles'], description: '6-month course - Alterations and new garment tailoring' },
        { title: 'Life Skills Course', url: 'LifeSkills.html', keywords: ['life skills','personal development','essential skills','basic necessities'], description: '6-month course - Skills for basic life necessities' },
        { title: 'Landscaping Course', url: 'LandScaping.html', keywords: ['landscaping','garden design','outdoor','gardens','plants','landscape'], description: '6-month course - Landscaping services for gardens' },
        { title: 'Child Minding Course', url: 'ChildMinding.html', keywords: ['child minding','childcare','baby care','children','kids','nanny','babysitting'], description: '6-week course - Basic child and baby care' },
        { title: 'Cooking Course', url: 'Cooking.html', keywords: ['cooking','food','meals','nutrition','chef','culinary','kitchen'], description: '6-week course - Prepare and cook nutritious family meals' },
        { title: 'Garden Maintenance Course', url: 'GardenMaintainance.html', keywords: ['garden maintenance','gardening','plants','lawn','outdoor maintenance'], description: '6-week course - Basic gardening knowledge' }
    ];

    // Expose open/close globally so header buttons can call them
    window.openSearch = function() {
        if (!modal) return;
        modal.classList.add('active');
        setTimeout(() => input && input.focus(), 10);
    };
    window.closeSearch = function() {
        if (!modal) return;
        modal.classList.remove('active');
        if (input) input.value = '';
        if (results) results.innerHTML = '<div class="no-results">Start typing to search...</div>';
    };
    window.navigateTo = function(url) { window.location.href = url; };

    if (!modal || !input || !results) return; // Skip if page has no modal

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => { if (e.target === modal) window.closeSearch(); });
    // Close modal with Escape
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.closeSearch(); });

    // Live search rendering
    input.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) { results.innerHTML = '<div class="no-results">Start typing to search...</div>'; return; }

        const matches = searchData.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.keywords.some(k => k.includes(q))
        );

        if (!matches.length) {
            results.innerHTML = '<div class="no-results">No results found. Try different keywords.</div>';
            return;
        }
        results.innerHTML = matches.map(item => `
            <div class="search-result-item" onclick="navigateTo('${item.url}')">
                <div class="result-title">${item.title}</div>
                <div class="result-description">${item.description}</div>
            </div>
        `).join('');
    });
})();

/* ---------- Course Tabs (runs only if tab buttons exist) ---------- */
// One-liner: shows selected tab pane and sets active style on the clicked tab.
window.openTab = function(tabName, button) {
    const panes = $$('.tab-pane'); panes.forEach(p => p.style.display = 'none');
    const buttons = $$('.tab-button'); buttons.forEach(b => b.className = b.className.replace(' active', ''));
    const pane = document.getElementById(tabName); if (pane) pane.style.display = 'block';
    if (button) button.className += ' active';
};
// One-liner: navigates from the course dropdown to the chosen course page.
window.navigateToCourse = function(url) { if (url) window.location.href = url; };

/* ---------- Sign Up save + return (only on signup page) ---------- */
// One-liner: saves account to localStorage and returns to FeeCalculator step 2.
document.addEventListener('DOMContentLoaded', function () {
    const form = $('.signup-form');
    if (!form) return;

    const get = (id) => document.getElementById(id);
    const val = (id) => (get(id)?.value || '').trim();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const first = val('firstName');
        const last = val('lastName');
        const fullName = val('fullName') || [first, last].filter(Boolean).join(' ').trim();
        const email = val('email');
        const phone = val('phone');
        const password = val('password');
        const confirm = val('confirm') || val('confirmPassword');

        if (!fullName || !email || !password || !confirm) { showMsg('Please complete all required fields.', true); return; }
        if (!isEmail(email)) { showMsg('Please enter a valid email.', true); return; }
        if ((phone && phone.replace(/\D/g,'').length > 0) && phone.replace(/\D/g,'').length < 10) { showMsg('Please enter a valid phone number.', true); return; }
        if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) { showMsg('Password must be at least 8 characters with letters and numbers.', true); return; }
        if (password !== confirm) { showMsg('Passwords do not match.', true); return; }

        localStorage.setItem('userData', JSON.stringify({ fullName, email, phone, password }));
        localStorage.setItem('signup_complete', '1');

        showMsg('Account created successfully!');
        const from = new URLSearchParams(window.location.search).get('from') || 'fee';
        setTimeout(() => {
            if (from === 'fee') window.location.href = 'FeeCalculator.html#step2';
            else window.location.href = 'HomePage.html';
        }, 800);
    });

    function showMsg(message, isError = false) {
        const className = isError ? 'error-message' : 'success-message';
        const prev = form.querySelector('.error-message, .success-message'); if (prev) prev.remove();
        const div = document.createElement('div'); div.className = className; div.textContent = message;
        form.prepend(div); if (isError) setTimeout(() => div.remove(), 3000);
    }
});

/* ---------- Fee Calculator (cost + gated 3-step flow) ---------- */
// One-liner: updates cost, validates steps, and enables Enroll only after steps 1–3 are done.
document.addEventListener('DOMContentLoaded', function () {
    const isFeePage = !!document.getElementById('contactStep');
    if (!isFeePage) return;

    // Cost summary
    const courseInputs = $$('input[name="course"]');
    const subtotalEl = $('.cost-summary-new .subtotal');
    const discountEl = $('.cost-summary-new .discount');
    const vatEl = $('.cost-summary-new .vat');
    const totalEl = $('.cost-summary-new .total-amount');

    function updateCost() {
        const selected = courseInputs.filter(cb => cb.checked).map(cb => parseFloat(cb.value));
        const subTotal = selected.reduce((a,b) => a+b, 0);
        const bundleDiscount = selected.length >= 2 ? subTotal * 0.1 : 0;
        const vatAmount = (subTotal - bundleDiscount) * 0.15;
        const finalTotal = subTotal - bundleDiscount + vatAmount;

        if (subtotalEl) subtotalEl.textContent = `R${subTotal.toFixed(2)}`;
        if (discountEl) discountEl.textContent = `-R${bundleDiscount.toFixed(2)}`;
        if (vatEl) vatEl.textContent = `R${vatAmount.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `R${finalTotal.toFixed(2)}`;
    }
    courseInputs.forEach(cb => cb.addEventListener('change', updateCost));

    // Step flow
    const contactStep = $('#contactStep');
    const coursesStep = $('#coursesStep');
    const toCoursesBtn = $('#toCoursesBtn');
    const toAccountBtn = $('#toAccountBtn');
    const backToContactBtn = $('#backToContactBtn');
    const enrollBtn = $('#enrollNowBtn');
    const enrollHint = $('#enrollHint');

    function setActiveProgress(step) {
        $$('.progress-step').forEach((s, idx) => s.classList.toggle('active', idx <= step-1));
    }
    function goTo(step) {
        if (contactStep) contactStep.classList.toggle('hidden', step !== 1);
        if (coursesStep) coursesStep.classList.toggle('hidden', step !== 2);
        setActiveProgress(step);
    }

    function validateStep1() {
        const firstName = $('#firstName')?.value.trim();
        const lastName = $('#lastName')?.value.trim();
        const email = $('#contactEmail')?.value.trim();
        const phone = $('#contactPhone')?.value.trim();
        if (!firstName || !lastName || !email || !phone) { alert('Please complete all required contact fields.'); return false; }
        if (!isEmail(email)) { alert('Please enter a valid email.'); return false; }
        if (phone.replace(/\D/g,'').length < 10) { alert('Please enter a valid phone number.'); return false; }
        localStorage.setItem('enroll_contact', JSON.stringify({
            firstName, lastName, email, phone, notes: ($('#specialReq')?.value || '').trim()
        }));
        return true;
    }

    function validateStep2() {
        const selected = courseInputs.filter(cb => cb.checked);
        if (!selected.length) { alert('Please select at least one course to continue.'); return false; }
        const courses = selected.map(cb => {
            const card = cb.closest('.course-card-new');
            return {
                name: card.querySelector('.course-name-new')?.textContent.trim(),
                duration: card.querySelector('.course-duration-new')?.textContent.trim(),
                price: parseFloat(cb.value)
            };
        });
        const sub = Number((subtotalEl?.textContent || '0').replace(/[^\d.]/g,'') || 0);
        const disc = Number((discountEl?.textContent || '0').replace(/[^\d.]/g,'') || 0);
        const vat = Number((vatEl?.textContent || '0').replace(/[^\d.]/g,'') || 0);
        const total = Number((totalEl?.textContent || '0').replace(/[^\d.]/g,'') || 0);
        localStorage.setItem('enroll_courses', JSON.stringify({ courses, subtotal: sub, discount: disc, vat, total }));
        return true;
    }

    function updateEnrollState() {
        const contactOK = !!localStorage.getItem('enroll_contact');
        const courseData = localStorage.getItem('enroll_courses');
        const coursesOK = !!courseData && (JSON.parse(courseData).courses?.length > 0);
        const userOK = !!localStorage.getItem('userData'); // set on signUp
        const allOK = contactOK && coursesOK && userOK;
        if (enrollBtn) {
            enrollBtn.disabled = !allOK;
            // FIXED: Prevent clicking if disabled
            enrollBtn.style.pointerEvents = allOK ? 'auto' : 'none';
            enrollBtn.style.cursor = allOK ? 'pointer' : 'not-allowed';
        }
        if (enrollHint) enrollHint.textContent = allOK ? 'All set! Click Enroll to finish.' : 'Complete steps 1–3 to enable';
    }

    toCoursesBtn?.addEventListener('click', () => { if (validateStep1()) { goTo(2); updateEnrollState(); } });
    toAccountBtn?.addEventListener('click', () => { if (validateStep2()) window.location.href = 'signUp.html?from=fee'; });
    backToContactBtn?.addEventListener('click', () => goTo(1));
    
    // FIXED: Double-check validation before allowing navigation
    enrollBtn?.addEventListener('click', () => {
        const contactOK = !!localStorage.getItem('enroll_contact');
        const courseData = localStorage.getItem('enroll_courses');
        const coursesOK = !!courseData && (JSON.parse(courseData).courses?.length > 0);
        const userOK = !!localStorage.getItem('userData');
        
        if (contactOK && coursesOK && userOK) {
            window.location.href = 'enrollment-success.html';
        } else {
            alert('Please complete all 3 steps before enrolling.');
        }
    });

    // Always start at step 1 when first loading the page
    const urlHash = window.location.hash;
    if (urlHash === '#step2') {
        goTo(2);
    } else {
        goTo(1);
    }
    
    updateCost();
    updateEnrollState();
    window.addEventListener('storage', updateEnrollState);
});

/* ---------- Success Page Confetti (auto-run) ---------- */
// One-liner: drops confetti if the page body uses .success-page.
document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('success-page')) return;
    const colors = ['#ffffff', '#ffd166', '#ff6b6b', '#fcca46', '#118ab2', '#ef476f'];
    for (let i = 0; i < 120; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random()*100 + 'vw';
        c.style.background = colors[(Math.random()*colors.length)|0];
        c.style.animationDuration = (2.5 + Math.random()*2) + 's';
        c.style.animationDelay = (Math.random()*2) + 's';
        c.style.transform = `rotate(${Math.random()*360}deg)`;
        document.body.appendChild(c);
    }
});