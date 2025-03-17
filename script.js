document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector(".nav-tabs-container");
    let tabs = document.querySelectorAll(".nav-links");
    let sections = document.querySelectorAll(".tabs-slide");
    let stickyPoint = navbar.offsetTop;

    let scrollButton = document.getElementById("scrollToTop");
    let toggleSwitch = document.getElementById("toggleSwitch");
    let toggleBall = document.getElementById("toggleBall");
    let body = document.body;
    let sunIcon = document.getElementById("sunIcon");

    let menuToggle = document.getElementById("menuToggle");
    let closeMenu = document.getElementById("closeMenu");
    let navLinks = document.getElementById("navLinks");
    let navbar460 = document.querySelector(".nav-tabs-container");


    
    // Form Elements
    const form = document.getElementById("registrationForm");
    const usernameInput = document.getElementById("username");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("passwordError");
    const passwordStrength = document.getElementById("passwordStrength");
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");
    const submitBtn = document.querySelector("#registrationForm button");


    if (navbar) {
        let stickyPoint = navbar.offsetTop;

        window.addEventListener("scroll", function () {
            if (window.scrollY >= stickyPoint) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        });
    }

    // Scroll + Remove Active at Top
    window.addEventListener("scroll", function () {
        if (window.scrollY >= stickyPoint) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
            removeActiveTab();
        }
        highlightCurrentSection();
    });

    function removeActiveTab() {
        if (window.scrollY === 0) {
            tabs.forEach(t => t.classList.remove("active"));
        }
    }

    function highlightCurrentSection() {
        let scrollPosition = window.scrollY + navbar.offsetHeight+ 10;

        sections.forEach(section => {
            let sectionTop = section.offsetTop;
            let sectionHeight = section.offsetHeight;
            let sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                tabs.forEach(tab => {
                    tab.classList.remove("active");
                    if (tab.getAttribute("href") === `#${sectionId}`) {
                        tab.classList.add("active");
                    }
                });
            }
        });
    }

    //  Scroll and active tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();

            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navbar.offsetHeight,
                    behavior: "smooth"
                });

                setActiveTab(this);
            }
        });
    });

    function setActiveTab(tab) {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
    }

    
    // Scroll-to-top button
    window.addEventListener("scroll", function () {
        if (window.scrollY > 350) {
            scrollButton.classList.add("show");
            scrollButton.classList.remove("hide");
        } else {
            scrollButton.classList.add("hide");
            scrollButton.classList.remove("show");
        }
    });

    scrollButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Dark mode toggle
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        toggleBall.style.left = "45px";
        sunIcon.style.display = "inline";
    } else {
        toggleBall.style.left = "5px";
        sunIcon.style.display = "none";
    }

    toggleSwitch.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            toggleBall.style.left = "45px";
            sunIcon.style.display = "inline";
            localStorage.setItem("theme", "dark");
        } else {
            toggleBall.style.left = "5px";
            sunIcon.style.display = "none";
            localStorage.setItem("theme", "light");
        }
    });
    
    // Form

    // Password strength checker
    password.addEventListener("input", function () {
        const value = password.value;
        let strength = "Weak";

        if (value.length > 8 && /[A-Z]/.test(value) && /\d/.test(value) && /[\W]/.test(value)) {
            strength = "Strong";
        } else if (value.length > 6 && /[A-Z]/.test(value) && /\d/.test(value)) {
            strength = "Medium";
        }

        passwordStrength.textContent = `Password Strength: ${strength}`;
        passwordStrength.style.color = strength === "Strong" ? "green" : strength === "Medium" ? "orange" : "red";
    });

    // Check password match
    function checkPasswordMatch() {
        if (password.value !== confirmPassword.value) {
            passwordError.textContent = "❌ Passwords do not match!";
            passwordError.style.display = "block";
            submitBtn.disabled = true;
        } else {
            passwordError.style.display = "none";
            submitBtn.disabled = false;
        }
    }

    password.addEventListener("input", checkPasswordMatch);
    confirmPassword.addEventListener("input", checkPasswordMatch);

    // Toggle password visibility
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const target = document.getElementById(targetId);
            if (!target) return;

            if (target.type === "password") {
                target.type = "text";
                this.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                target.type = "password";
                this.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    });

    // Form submission 
    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        if (password.value !== confirmPassword.value) {
            passwordError.textContent = "❌ Passwords must match!";
            passwordError.style.display = "block";
            return;
        }

        localStorage.setItem("username", usernameInput.value);

        // Success message
        submitBtn.disabled = true;
        submitBtn.textContent = "Processing...";

        setTimeout(() => {
            alert("Registration successful!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }, 2000);
    });

     // Mobile menu toggle 
    function updateNavPosition() {
        if (window.innerWidth <= 460) {
            let scrollY = window.scrollY;

            if (navbar460.classList.contains("menu-open")) {
                
                navbar460.classList.add("scrolled");
                navbar460.classList.remove("back-to-bottom");
                return;
            }

            if (scrollY > 40) { 
                navbar460.classList.add("scrolled");
                navbar460.classList.add("moving-up");
                navbar460.classList.remove("back-to-bottom");

            } else { 
                navbar460.classList.remove("scrolled");
                navbar460.classList.remove("moving-up");
                navbar460.classList.add("back-to-bottom");
            }
        }
    }
    updateNavPosition();
    window.addEventListener("scroll", updateNavPosition);
    window.addEventListener("resize", updateNavPosition);

    if (menuToggle && closeMenu && navLinks) {

        menuToggle.addEventListener("click", function () {
            if (window.scrollY === 0) { 
                navbar460.classList.add("scrolled", "menu-open");
                navbar460.classList.remove("back-to-bottom");

                setTimeout(() => {
                    navLinks.classList.add("show");
                    closeMenu.style.display = "block";
                }, 50);
            } else {
                navbar460.classList.add("menu-open");
                navLinks.classList.add("show");
                closeMenu.style.display = "block";
            }
        });

        closeMenu.addEventListener("click", function () {
            navLinks.classList.remove("show");
            closeMenu.style.display = "none";
            navbar460.classList.remove("menu-open");

            if (window.scrollY === 0) {
                setTimeout(() => {
                    navbar460.classList.remove("scrolled");
                    navbar460.classList.add("back-to-bottom");
                }, 50);
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show");
                closeMenu.style.display = "none";
                navbar460.classList.remove("menu-open");
                
                if (window.scrollY === 0) {
                    setTimeout(() => {
                        navbar460.classList.remove("scrolled");
                        navbar460.classList.add("back-to-bottom");
                    }, 50);
                }
            });
        });
    } 
});