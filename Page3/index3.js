document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("arrow").addEventListener("click", function () {
        window.history.back();
    });

    document.querySelector(".signup-btn").addEventListener("click", function (event) {
        event.preventDefault();
        alert("Sign-up successful!");
    });
});
