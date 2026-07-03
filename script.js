/* ==========================================
   DOM ELEMENTS
========================================== */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const rememberCheck = document.getElementById("remember");

const loginBtn = document.getElementById("loginBtn");
const btnText = document.querySelector(".btn-text");
const spinner = document.querySelector(".spinner");

const successBox = document.querySelector(".success-box");

const togglePassword = document.getElementById("togglePassword");

/* ==========================================
   ERROR ELEMENTS
========================================== */

const emailError =
    emailInput.parentElement.querySelector(".error");

const passwordError =
    passwordInput.parentElement.querySelector(".error");

/* ==========================================
   EMAIL VALIDATION
========================================== */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/* ==========================================
   SHOW ERROR
========================================== */

function showError(input, element, message) {

    element.textContent = message;

    input.style.borderColor = "#ff4d6d";

    input.style.boxShadow =
        "0 0 12px rgba(255,77,109,.35)";

}

/* ==========================================
   CLEAR ERROR
========================================== */

function clearError(input, element) {

    element.textContent = "";

    input.style.borderColor = "";

    input.style.boxShadow = "";

}

/* ==========================================
   VALIDATE FORM
========================================== */

function validateForm() {

    let valid = true;

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value.trim();

    /* ---------- Email ---------- */

    if (email === "") {

        showError(
            emailInput,
            emailError,
            "Email is required."
        );

        valid = false;

    }

    else if (!validateEmail(email)) {

        showError(
            emailInput,
            emailError,
            "Enter a valid email."
        );

        valid = false;

    }

    else {

        clearError(
            emailInput,
            emailError
        );

    }

    /* ---------- Password ---------- */

    if (password === "") {

        showError(
            passwordInput,
            passwordError,
            "Password is required."
        );

        valid = false;

    }

    else if (password.length < 8) {

        showError(
            passwordInput,
            passwordError,
            "Minimum 8 characters."
        );

        valid = false;

    }

    else {

        clearError(
            passwordInput,
            passwordError
        );

    }

    return valid;

}

/* ==========================================
   LIVE VALIDATION
========================================== */

emailInput.addEventListener("input", () => {

    if (validateEmail(emailInput.value.trim())) {

        clearError(
            emailInput,
            emailError
        );

    }

});

passwordInput.addEventListener("input", () => {

    if (passwordInput.value.trim().length >= 8) {

        clearError(
            passwordInput,
            passwordError
        );

    }

});

/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

togglePassword.addEventListener("click", () => {

    const type =
        passwordInput.getAttribute("type");

    if (type === "password") {

        passwordInput.setAttribute(
            "type",
            "text"
        );

        togglePassword.textContent = "🙈";

        togglePassword.setAttribute(
            "aria-label",
            "Hide Password"
        );

    } else {

        passwordInput.setAttribute(
            "type",
            "password"
        );

        togglePassword.textContent = "👁";

        togglePassword.setAttribute(
            "aria-label",
            "Show Password"
        );

    }

});
/* ==========================================
   REMEMBER ME (LOCAL STORAGE)
========================================== */

window.addEventListener("DOMContentLoaded", () => {

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {

        emailInput.value = savedEmail;
        rememberCheck.checked = true;

        // Move floating label
        emailInput.dispatchEvent(new Event("input"));

    }

});

/* ==========================================
   SAVE / REMOVE REMEMBERED EMAIL
========================================== */

function handleRememberMe() {

    if (rememberCheck.checked) {

        localStorage.setItem(
            "rememberEmail",
            emailInput.value.trim()
        );

    } else {

        localStorage.removeItem(
            "rememberEmail"
        );

    }

}

/* ==========================================
   BUTTON LOADING STATE
========================================== */

function startLoading() {

    loginBtn.disabled = true;

    btnText.style.display = "none";

    spinner.style.display = "block";

}

function stopLoading() {

    loginBtn.disabled = false;

    spinner.style.display = "none";

    btnText.style.display = "inline";

}

/* ==========================================
   SHOW SUCCESS
========================================== */

function showSuccess() {

    successBox.style.display = "block";

    successBox.scrollIntoView({

        behavior: "smooth",
        block: "center"

    });

}

/* ==========================================
   LOGIN SUBMIT
========================================== */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    handleRememberMe();

    startLoading();

    /* Fake Authentication */

    setTimeout(() => {

        stopLoading();

        showSuccess();

        /* Redirect */

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1500);

    }, 2000);

});
/* ==========================================
   CAPS LOCK DETECTION
========================================== */

const capsWarning = document.createElement("small");

capsWarning.style.color = "#f59e0b";
capsWarning.style.display = "none";
capsWarning.style.marginTop = "8px";
capsWarning.textContent = "⚠ Caps Lock is ON";

passwordInput.parentElement.appendChild(capsWarning);

passwordInput.addEventListener("keyup", (event) => {

    if (event.getModifierState("CapsLock")) {

        capsWarning.style.display = "block";

    } else {

        capsWarning.style.display = "none";

    }

});

/* ==========================================
   ENTER KEY SUPPORT
========================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const active = document.activeElement;

        if (
            active === emailInput ||
            active === passwordInput
        ) {

            loginForm.requestSubmit();

        }

    }

});

/* ==========================================
   GOOGLE LOGIN BUTTON (UI ONLY)
========================================== */

const googleBtn =
    document.querySelector(".google-btn");

googleBtn.addEventListener("click", () => {

    googleBtn.style.pointerEvents = "none";

    const originalText = googleBtn.innerHTML;

    googleBtn.innerHTML = "Connecting...";

    setTimeout(() => {

        googleBtn.innerHTML = originalText;

        googleBtn.style.pointerEvents = "auto";

        alert(
            "Google Login is a UI demo only.\nBackend authentication is not implemented."
        );

    }, 1200);

});

/* ==========================================
   AUTO CLEAR ERRORS ON FOCUS
========================================== */

[emailInput, passwordInput].forEach((input) => {

    input.addEventListener("focus", () => {

        if (input === emailInput) {

            clearError(emailInput, emailError);

        }

        if (input === passwordInput) {

            clearError(passwordInput, passwordError);

        }

    });

});

/* ==========================================
   ACCESSIBILITY
========================================== */

emailInput.setAttribute("aria-required", "true");

passwordInput.setAttribute("aria-required", "true");

emailInput.setAttribute("aria-label", "Email Address");

passwordInput.setAttribute("aria-label", "Password");

/* ==========================================
   INITIALIZATION
========================================== */

(function init() {

    emailInput.focus();

})();