

const form = document.querySelector('form[action="/add"]')
const inputLatitude = document.querySelector('form[action="/add"] input[name="latitude"]')
const inputLongitude = document.querySelector('form[action="/add"] input[name="longitude"]')

/* https://www.w3schools.com/html/html5_geolocation.asp */
function addPosition(position) {
  inputLatitude.value = position.coords.latitude
  inputLongitude.value = position.coords.longitude
}


form.addEventListener("input", () => {
    try {
        if (navigator.geolocation) {  
            navigator.geolocation.getCurrentPosition(addPosition)
        } 
    }
    catch(err) {
        console.log(err)
    }
})


/*
function postPosition(position) {

    /* code based on https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest * /
    const http = new XMLHttpRequest()
    http.open("POST", "/issue-coords", true) // initialize a request
    http.setRequestHeader("Content-Type", "application/json")
    const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    const jsonCoords = JSON.stringify(coords)
    console.log(jsonCoords)
    http.send(jsonCoords)

}
const addButton = document.querySelector('form[action="/add"] input[type="submit"]')
console.log(addButton)
try {
    addButton.addEventListener("click", () => {
        console.log("clicked")
        if (navigator.geolocation) {  
            navigator.geolocation.getCurrentPosition(postPosition)
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
}*/
