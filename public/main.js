
/* main.js */

// deno-lint-ignore-file

import { file2DataURI } from './util.js'

//import { DistanceCalculator } from "https://deno.land/x/distancecalculator/distance-calculator.ts"

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
    
    /* code based on https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest */
    const http = new XMLHttpRequest()
    http.open("POST", "/mainjs", true) // initialize a request
    http.setRequestHeader("Content-Type", "application/json")
    
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition((position) =>{
            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            const jsonCoords = JSON.stringify(coords)
            http.send(jsonCoords)
        })
        //console.log(pos)
    } 
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

/*
const addButton = document.querySelector('form[action="/add"] input[type="submit"]')
console.log(addButton)
*/


//const liLatitude = document.querySelector('article:nth-of-type(2) ul li:nth-of-type(4)')
//const liLongitude = document.querySelector('article:nth-of-type(2) ul li:nth-of-type(5)')
//liLatitude.style.display = "none"
//liLongitude.style.display = "none"
//console.log(liLatitude)
//console.log(liLongitude)



const form = document.querySelector('form[action="/add"]')
const inputLatitude = document.querySelector('form[action="/add"] input[name="latitude"]')
const inputLongitude = document.querySelector('form[action="/add"] input[name="longitude"]')

/* https://www.w3schools.com/html/html5_geolocation.asp */
function showPosition(position) {
  /*console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude)*/
  inputLatitude.value = position.coords.latitude
  inputLongitude.value = position.coords.longitude
        //form.append(`<input type="hidden" name="longitude" value="${position.coords.longitude}">`)
        //form.append(`<input type="hidden" name="latitude" value="${position.coords.latitude}">`)
}

try {
    form.addEventListener("input", () => {
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition(showPosition)
    } 
    })
}
catch(err) {
    if (TypeError) {
        console.log("Not add issue page")
    }
    else {
        console.log(err)
    }
}





