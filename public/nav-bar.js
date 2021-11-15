
/**************** Navigation Bar for Small Screens **********************/
const menuIcon = document.querySelector('nav figure:nth-child(2)')
const closeIcon = document.querySelector('nav figure:nth-child(3)')
const navItems = document.querySelector('nav ul')

menuIcon.addEventListener("click", () => {
    menuIcon.style.display = "none"
    closeIcon.style.display = "block"
    navItems.style.display = "block"
})

closeIcon.addEventListener("click", () => {
    menuIcon.style.display = "block"
    closeIcon.style.display = "none"
    navItems.style.display = "none"  
})