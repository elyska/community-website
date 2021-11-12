/**************************** DISPLAY DISTANCE ***************************************/

/* code from https://www.geodatasource.com/developers/javascript */
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
/* end of code from https://www.geodatasource.com/developers/javascript */

function getPosition(position) {
    const currLat = position.coords.latitude
    const currLon = position.coords.longitude

    const cards = document.querySelector('article:nth-of-type(2)')
    console.log(cards.children)

    let li4, li5, section
    let caption = document.createElement("figcaption")
    let lat, lon
    let dist
    for (let i = 0; i < cards.children.length; i++) {
        // get latitude of the issue
        li4 = document.querySelector(`article:nth-of-type(2) a:nth-of-type(${i + 1}) li:nth-child(4)`)
        li4.style.display = "none"
        lat = li4.innerText
        // get longitude of the issue
        li5 = document.querySelector(`article:nth-of-type(2) a:nth-of-type(${i + 1}) li:nth-child(5)`)
        li5.style.display = "none"
        lon = li5.innerText
        //calculate distance
        if (lat && lon && currLat && currLon) {
            dist = distance(lat, lon, currLat, currLon, "K") // in km 
            dist *= 1000
            section = document.querySelector(`article:nth-of-type(2) a:nth-of-type(${i + 1}) figure`)
            caption = document.createElement("figcaption")
            caption.innerText = `${Math.round(dist)} m`
            section.append(caption)
        }
    } 
}
    
try {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition)
    } 
}
catch(err) {
    console.log(err)
}
    


/*************************************************************************************************/
