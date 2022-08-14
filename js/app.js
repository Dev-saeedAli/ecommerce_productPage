// selectors
const hamburgerMenu = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close");
const previewClose = document.querySelector(".icon-close");
const navMenu = document.querySelector("#nav");
const navMenuList= navMenu.querySelector("ul");
const allNavMenuList= navMenu.querySelectorAll("ul");
const cartIcon = document.querySelector(".cartIcon");
const addToCart = document.querySelector(".add__to__cart")
const cartContainer = document.querySelector(".cart__container");
const cartBody = cartContainer.querySelector(".cart__body");
const cartBodyH2 = cartBody.querySelector("h2");

const previewProductContainer = document.querySelector(".preview");
const mainContainer = document.querySelector(".container");
const btnPlus = document.querySelector(".btn__plus");
const currentCount = document.querySelector(".current__count");
const btnMinus = document.querySelector(".btn__minus");
const smallImage = document.querySelectorAll(".small__display__image img")
let displayImage = document.querySelector(".display__image img")
const previewSmallImage = document.querySelectorAll(".preview .small__display__image img")
let previewDisplayImage = document.querySelector(".preview .display__image img")
let cartCount = document.querySelector(".count")

let count = 1;

// events 

cartIcon.addEventListener("click",(e)=>{
    if(e.target.classList.value === "cartIcon"){
        cartContainer.classList.toggle("none")
    }
})

hamburgerMenu.addEventListener("click", ()=>{
    navMenu.classList.add("active")
    navMenuList.classList.add("active")
    closeMenu.classList.add("active")
})
closeMenu.addEventListener("click", ()=>{
    navMenu.classList.remove("active")
    navMenuList.classList.remove("active")
    closeMenu.classList.remove("active")
})

btnPlus.addEventListener("click", ()=>{
    count+= 1;
    currentCount.textContent = count;
    
})

btnMinus.addEventListener("click", ()=>{
    count <= 1 ? count = 1  : count--
    currentCount.textContent = count;
})
allNavMenuList.forEach(element =>{
    element.addEventListener("click", ()=>{
        closeMenu.click()
    })
})


displayImage.addEventListener("click", ()=>{
    previewProductContainer.classList.remove("none")
})
// looping through all small images and adding eventlistener to change the main display image in the main section
smallImage.forEach(images=> {
    if(displayImage.parentElement.parentElement.classList.value !== "preview"){
        images.addEventListener("click", ()=>{
            smallImage.forEach(images =>images.classList.remove("active"))
            const newImage = images.src.replace("-thumbnail", "");
            displayImage.src =  newImage;
            images.classList.add("active")
        })
    }
})

// looping through all small images and adding eventlistener to change the main display image in the preview section
previewClose.addEventListener("click", ()=>{
    previewProductContainer.classList.add("none")
})
previewSmallImage.forEach(images=> {
    images.addEventListener("click", ()=>{
        if(previewDisplayImage.parentElement.parentElement.classList.value === "preview"){
            previewSmallImage.forEach(images =>images.classList.remove("active"))
            const newImage = images.src.replace("-thumbnail", "");
            previewDisplayImage.src =  newImage;
            images.classList.add("active")
        }
    })
})

// adding items to cart
addToCart.addEventListener("click", ()=>{
        cartCount.setAttribute("data-count", count);
    cartBody.innerHTML = `
            <div class="cart__products">
            <img src="./images/image-product-1-thumbnail.jpg" alt="image of product added to cart">
            <div class="cart__product__info">
            <h2>Autumn Limited Edition..</h2>
            <p>$125.00 x ${count} <strong>$${Math.round(125*count).toFixed(2)}</strong></p>
            </div>
            <img onClick="deleteItem(this)"  class="icons" src="./images/icon-delete.svg" alt="delete icon image">
            </div>
            </div>
            <div class="cart__footer">
            <button onClick="buyCart(this)" class="checkout btn">
                Checkout
            </button>
            </div>
         `    
         alert("Item added to cart")
         count = 1;
         currentCount.textContent = count
})
// delete items and reseting the cart count
const deleteItem = (el) => {
    const cartBody = el.parentElement.parentElement;
    const cartFooter = cartBody.parentElement.lastElementChild;
    cartBody.innerHTML = `<h2>Your cart is empty</h2>`
    cartFooter.classList.add("none")
    count = 1;
    currentCount.textContent = count
    cartCount.setAttribute("data-count", count - 1);
} 

// buying the product
const buyCart =  (button) => {
   setTimeout(()=>{
        button.textContent = "Checking out..."
        button.style.opacity = "0.8"
    },20)

    setTimeout(()=>{
        button.textContent = "Checkout"
        button.style.opacity = "1"
        deleteItem(button)
        cartIcon.click()
        count = 1;
        currentCount.textContent = count
        cartCount.setAttribute("data-count", count - 1);
    }, 1000)
}
