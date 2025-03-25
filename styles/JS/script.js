let button = document.querySelector(".btn")
let slider = document.querySelector(".slider")
function SliderDownUp() {
    let i = 0
    let s = setInterval(() => {
        if(i >= 100){
            clearInterval(s)
        }
        else {
            i = i + 20
            slider.style.height = i + "px"
        }},100)
}