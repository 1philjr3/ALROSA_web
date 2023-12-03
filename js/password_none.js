const passwordToggle = document.getElementById("toggle-password-visibility-checkbox");
const passwordField = document.getElementById("passwordField");

passwordToggle.addEventListener("click", passwordToggleClicked)
function passwordToggleClicked() {
    if (this.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}