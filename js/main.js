const elbtn = document.querySelector(".header__btn");
const dark = localStorage.getItem("mode");
localStorage.setItem("mode","dark")
if (localStorage.getItem("mode") == "dark") {
    darkMode();
} else {
    noDark();
}
elbtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        darkMode();
    } else {
        noDark();
    }
});
function darkMode() {
    document.body.classList.add("dark");
    localStorage.setItem("mode", "dark");
}
function noDark() {
    document.body.classList.remove("dark");
    localStorage.setItem("mode", "light");

}
