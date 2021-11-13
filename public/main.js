
/* main.js */

// deno-lint-ignore-file

import { file2DataURI } from './util.js'

/* code base on https://www.w3schools.com/html/html5_geolocation.asp */
function addPosition(position) {
    document.cookie = `latitude=${position.coords.latitude}`
    document.cookie = `longitude=${position.coords.longitude}`
}
/* end of code base on https://www.w3schools.com/html/html5_geolocation.asp */

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
    
    /*********** Get Current Position ***************/
    
    /* code base on https://www.w3schools.com/html/html5_geolocation.asp */
    try {
        if (navigator.geolocation) {  
            navigator.geolocation.getCurrentPosition(addPosition)
        } 
    }
    catch(err) {
        console.log(err)
    }
    /* end of code base on https://www.w3schools.com/html/html5_geolocation.asp */
    console.log(document.cookie)
    
})

/**************** Navigation Bar for Small Screens **********************/
const menuIcon = document.querySelector('nav li:nth-child(2)')
const closeIcon = document.querySelector('nav li:nth-child(3)')
const navItems = document.querySelector('nav ul')

menuIcon.addEventListener("click", () => {
    menuIcon.style.display = "none"
    closeIcon.style.display = "block"
    for (let i = 3; i < navItems.children.length; i++){ 
        navItems.children[i].style.display = "block"
    }
})

closeIcon.addEventListener("click", () => {
    menuIcon.style.display = "block"
    closeIcon.style.display = "none"
    for (let i = 3; i < navItems.children.length; i++){
        navItems.children[i].style.display = "none"
    }
})