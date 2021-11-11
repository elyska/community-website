
/* main.js */

// deno-lint-ignore-file

import { file2DataURI } from './util.js'

window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
    
    /* code based on https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest */
    const http = new XMLHttpRequest()
    http.open("POST", "/mainjs", true) // initialize a request
    //http.setRequestHeader("Content-Type", "application/json")
    
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition((position) =>{
            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            const jsonCoords = JSON.stringify(coords)
            console.log(jsonCoords)
            http.send(jsonCoords)
        })
        //console.log(pos)
    } 
    
    
    /*var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const cards = document.querySelector('article:nth-of-type(2)')
        console.log(cards.children)
    }
    };
    xhttp.open("GET", "/mainjs", true);
    xhttp.send();*/
    
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

/**
const liLatitude = document.querySelector('article:nth-of-type(2) ul li:nth-of-type(4)')
const liLongitude = document.querySelector('article:nth-of-type(2) ul li:nth-of-type(5)')
liLatitude.style.display = "none"
liLongitude.style.display = "none"
console.log(liLatitude)
console.log(liLongitude)*/


const form = document.querySelector('form[action="/add"]')
const inputLatitude = document.querySelector('form[action="/add"] input[name="latitude"]')
const inputLongitude = document.querySelector('form[action="/add"] input[name="longitude"]')

/* https://www.w3schools.com/html/html5_geolocation.asp */
function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude)
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


/***********************************************************************************************
function getPosition(text, position) {
    console.log(text)
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude)
    return position.coords
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

const cards = document.querySelector('article:nth-of-type(2)')
console.log(cards.children)

let li4, li5;
let lat, lon
for (let i = 1; i < cards.children.length + 1; i++) {
    console.log(cards.children[i])
    li4 = document.querySelector(`article:nth-of-type(2) a:nth-of-type(${i}) li:nth-of-type(4)`)
    if (li4) li4.style.display = "none"
    lat = li4.innerText
    li5 = document.querySelector(`article:nth-of-type(2) a:nth-of-type(${i}) li:nth-of-type(5)`)
    if (li5) li5.style.display = "none"
    lon = li5.innerText
    
    try {
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition(getPosition("hi"))
    } 
    
}
catch(err) {
        console.log(err)
    
}
    
    
    distance(lat, lon, )
    //li4.innerText = "hi"
}

*************************************************************************************************/





