const elbtn = document.querySelector(".header__btn");
const dark = localStorage.getItem("mode");
localStorage.setItem("mode", "dark")
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
let regionArr = [];
const list = document.querySelector(".flaggs__list");
const form = document.querySelector(".form")
const select = document.querySelector(".form__select");
const fragment = new DocumentFragment();
const fragmentselect = new DocumentFragment();
const template = document.querySelector(".template_country").content;
const modalbody = document.querySelector(".modal-body");

form.addEventListener("submit", evt => {
    list.innerHTML = ""
    evt.preventDefault();
    const selectValue = select.value;
    console.log(selectValue);
    const search = document.querySelector(".form__input");
    const searchValue = search.value;
    MyGetFunction(`https://restcountries.com/v3.1/region/${selectValue}`)
    MyGetFunction(`https://restcountries.com/v3.1/name/${searchValue}`)
})
/* === */
function myrenderFunction(array) {
    list.innerHTML = ""
    array.forEach(element => {
        if (element.altSpellings[1] != undefined) {

            const cloneTemplate = template.cloneNode(true);
            cloneTemplate.querySelector(".flaggs__img").src = `${element.flags
                .png}`;
            cloneTemplate.querySelector(".flaggs__title").textContent = `${element.altSpellings[1]}`
            cloneTemplate.querySelector(".size").textContent = `Populyation: ${element.population}`
            cloneTemplate.querySelector(".region").textContent = `Region: ${element.region}`
            cloneTemplate.querySelector(".capital").textContent = `Capital: ${element.capital}`
            // cloneTemplate.querySelector(".flaggs__img").dataset.id = element.name;
            cloneTemplate.querySelector(".btn").dataset.id = element.name.common;

            fragment.append(cloneTemplate);


        }
        list.append(fragment)
        const findRegion = regionArr.find(item => {
            return element.region == item
        })
        if (!findRegion) {
            regionArr.push(element.region)
        }
    });
}
let myArr = [];
async function MyGetFunction(url) {
    try {
        const respons = await fetch(url);
        const data = await respons.json();
        const result = data;
        result.forEach(item => {
            myArr.push(item)
        })
        myrenderFunction(data.splice(0, 51))
    } catch (error) {
        console.log(error)
    }
}
console.log(myArr)
MyGetFunction("https://restcountries.com/v3.1/all");
list.addEventListener("click", evt => {
    if (evt.target.matches(".btn")) {
        console.log("salom")
        const BtnId = evt.target.dataset.id;
        const FindBtn = myArr.find(item => {
            modalbody.textContent = item.name.common;
            const modalimage = document.querySelector(".modal-image");
            modalimage.src = item.flags.png;
            const official = document.querySelector(".official");
            official.textContent = item.name.official
            const currentsytmbol = document.querySelector(".current");
            currentsytmbol.textContent = item.idd.root;

            const address = document.querySelector(".adress");
            const countryLocation = `${item.latlng[0]}, ${item.latlng[1]}`;
            address.href = `https://www.google.com/maps/place/${countryLocation}`
            address.textContent = `lat:${item.latlng[0]}, geo:${item.latlng[1]}`;
            return BtnId == item.name.common
        })
        console.log(FindBtn)
    }
})






