
    
    /*********** Get Current Position ***************/
    
    /* code base on a lecture presentation
     * https://docs.google.com/presentation/d/1huIJ73CQXN8W_16utLMk77a0TSuU5C7FSZnPY2H_xzI/edit#slide=id.g1013a6bd736_0_13 */
    
    if (navigator.geolocation) {  
       const id = navigator.geolocation.watchPosition(onSuccess, onError)
    }
    function onSuccess(position) {
        document.cookie = `latitude=${position.coords.latitude}`
        document.cookie = `longitude=${position.coords.longitude}`
    }
    function onError(err) {
        console.log(err)
    }
    
    /* end of code base on a lecture presentation
     * https://docs.google.com/presentation/d/1huIJ73CQXN8W_16utLMk77a0TSuU5C7FSZnPY2H_xzI/edit#slide=id.g1013a6bd736_0_13 */
    
    console.log(document.cookie)