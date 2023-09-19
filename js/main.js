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


/*   
 create part
*/
let regionArr = [];
const list = document.querySelector(".flaggs__list");
const form = document.querySelector(".form")
const select = document.querySelector(".form__select");
const fragment = new DocumentFragment();
const fragmentselect = new DocumentFragment();



function myrenderFunction(array) {
    // list.innerHTML = ""
    array.forEach(element => {
        if (element.altSpellings[1] != undefined) {
            const template = document.querySelector(".template_country").content;
            const cloneTemplate = template.cloneNode(true);
            cloneTemplate.querySelector(".flaggs__img").src = `${element.flags
                .png}`;
            cloneTemplate.querySelector(".flaggs__title").textContent = `${element.altSpellings[1]}`
            cloneTemplate.querySelector(".size").textContent = `Populyation: ${element.population}`
            cloneTemplate.querySelector(".region").textContent = `Region: ${element.region}`
            cloneTemplate.querySelector(".capital").textContent = `Capital: ${element.capital}`
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
    regionArr.forEach(item => {
        // select.innerHTML=""
        const template_select = document.querySelector(".template__select").content;
        const secondClone = template_select.cloneNode(true);
        secondClone.querySelector(".option").textContent = item;
        secondClone.querySelector(".option").value = item;
        fragmentselect.append(secondClone);
        select.append(fragmentselect)
    })



}
// const selectValue = select.value;

async function MyGetFunction(url, render, region) {
    try {
        const respons = await fetch(url);
        const data = await respons.json();
        const result = data;
        if (render) {
            myrenderFunction(data.splice(0, 51), regionArr)
        }
        if (region) {
            myrenderFunction(data, regionArr)
        }
    } catch (error) {
        console.log(error)
    }
}
MyGetFunction("https://restcountries.com/v3.1/all", true, false)
// list.innerHTML=""

select.addEventListener("change", evt => {
    // list.innerHTML=""
    evt.preventDefault();
    const selectValue = select.value;
    console.log(selectValue)
    MyGetFunction(`https://restcountries.com/v3.1/region/${selectValue}`, true, false);

})



