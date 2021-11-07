
/* main.js */

// deno-lint-ignore-file

import { file2DataURI } from './util.js'

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
})

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


