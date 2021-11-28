const musicSection=document.getElementById('music-div')
const notification=document.querySelector('.notification')
const count=document.getElementById(`count`)
const cartItems=document.querySelector(`.cartItems`)
const totalPriceTag=document.getElementById(`totalPrice`)
const albums=document.querySelector(`#albums`)
const merch=document.querySelector(`#merch`)
const merchSection =document.getElementById(`merch-section`)
console.log(albums);
let countItem=0
let totalPrice=0
let id;

window.addEventListener(`DOMContentLoaded`,() => {
    axios.get(`http://localhost:3000/products`).then(response => {
        
        let products=response.data.products
        console.log(products);
        for (const product of products) {
            if (product.category==`album`) {
         
        
            let div=document.createElement(`div`)
                div.innerHTML= `<div class="album" id="${product.id-1}">
                <h1>${product.title}</h1>
                <div class="imgContainer">
                    <img src="${product.imageUrl}" alt="" srcset="">
                </div>
                
                <div class="details">
                    <div class="priceDetails" ><span>$</span><p>${product.price}</p></div>
                    <button onClick="addToCart(${product.id-1})" id="${product.id-1}" class="priceBtn">ADD TO CART</button>
                </div>
                </div>`
        albums.appendChild(div)

            }else if(product.category==`merch`){
                let div=document.createElement(`div`)
                div.innerHTML= `<div class="album" id="${product.id-1}">
                <h1>${product.title}</h1>
                <div class="imgContainer">
                    <img src="${product.imageUrl}" alt="" srcset="">
                </div>
                
                <div class="details">
                    <div class="priceDetails" ><span>$</span><p>${product.price}</p></div>
                    <button id="${product.id-1}" class="priceBtn">ADD TO CART</button>
                </div>
                </div>`
                merch.appendChild(div)
            }
    
        }
        musicSection.addEventListener('click',(e) => {
    
            if (e.target.innerHTML===`ADD TO CART`) {
                id=e.target.id
                console.log(id);
                console.log(document.querySelector(`#cart${id}`));
                if (document.querySelector(`#cart${id}`)) {
                    alert(`item is already in the cart!!!`)
                    return
                }
                notification.classList.add(`active`)
                setTimeout(() => {
                    notification.classList.remove(`active`)
                }, 2000);
                notification.innerHTML=`<h3>Your product: ${products[id].title} is added to cart</h3>`
                countItem++
                count.innerHTML=`${countItem}`
                let div = document.createElement('div')
                div.innerHTML=` 
                <div id="cart${products[id].id-1}" class="item">
                <span  class="itemTopic"><img src=${products[id].imageUrl} alt=""><span>${products[id].title}</span></span>
                <span  class="priceTopic">${products[id].price}</span>
                <span  class="quantityTopic"><input value="1" type="text" name="" id=""><button class="removeBtn">REMOVE</button></span>
                </div>`
                cartItems.appendChild(div)
                
                totalPriceTag.innerHTML=parseFloat(totalPriceTag.innerHTML)+parseFloat(products[id].price)
            }
        
        })
        merchSection.addEventListener(`click`,(e)=>{

            if (e.target.innerHTML===`ADD TO CART`) {
                id=e.target.id
                console.log(id);
                console.log(document.querySelector(`#cart${id}`));
                if (document.querySelector(`#cart${id}`)) {
                    alert(`item is already in the cart!!!`)
                    return
                }
                notification.classList.add(`active`)
                setTimeout(() => {
                    notification.classList.remove(`active`)
                }, 2000);
                notification.innerHTML=`<h3>Your product: ${products[id].title} is added to cart</h3>`
                countItem++
                count.innerHTML=`${countItem}`
                let div = document.createElement('div')
                div.innerHTML=` 
                <div id="cart${products[id].id-1}" class="item">
                <span  class="itemTopic"><img src=${products[id].imageUrl} alt=""><span>${products[id].title}</span></span>
                <span  class="priceTopic">${products[id].price}</span>
                <span  class="quantityTopic"><input value="1" type="text" name="" id=""><button class="removeBtn">REMOVE</button></span>
                </div>`
                cartItems.appendChild(div)
                
                totalPriceTag.innerHTML=parseFloat(totalPriceTag.innerHTML)+parseFloat(products[id].price)
            }
       })


    }).catch(error => {
        console.log(err);
    })
    

})
function addToCart(productId) {
    console.log(productId);
    axios.post(`http://localhost:3000/cart`,{productId:productId})
    .then(response => {
        console.log(response);
    }).catch(error => {console.log(error);})
}






console.log(count);


// merchSection.addEventListener(`click`,(e)=>{

//      if (e.target.innerHTML===`ADD TO CART`) {
//         id=e.target.id
//         notification.classList.add(`active`)
//         setTimeout(() => {
//             notification.classList.remove(`active`)
//         }, 2000);
//         notification.innerHTML=`<h3>Your product: ${id} is added to cart</h3>`
//         countItem++
//         count.innerHTML=`${countItem}`
//         let div = document.createElement('div')
//         let _id=e.target.parentNode.parentNode.id
//         let imgSrc=document.querySelector(`#${_id} img`).src
//         let title=document.querySelector(`#${_id} h1`).innerText
//         let price=document.querySelector(`#${_id} p`).innerText
//         console.log(price);

//                 div.innerHTML=` 
//                 <div id="${_id}" class="item">
//                 <span  class="itemTopic"><img src=${imgSrc} alt=""><span>${title}</span></span>
//                 <span  class="priceTopic">${price}</span>
//                 <span  class="quantityTopic"><input value="1" type="text" name="" id=""><button class="removeBtn">REMOVE</button></span>
//                 </div>`
//                 cartItems.appendChild(div)
//                 totalPriceTag.innerHTML=parseFloat(totalPriceTag.innerHTML)+parseFloat(price)
// }
// })









const cartbtn=document.getElementById(`cartBtn`)
const cartContainer=document.getElementById(`cartContainer`)


cartbtn.addEventListener(`click`,()=>{
    cartContainer.classList.add(`active`)
    getCartDetails()
})
const seeTheCartBtn=document.getElementById(`seeTheCartBtn`)
seeTheCartBtn.addEventListener(`click`,()=>{
    cartContainer.classList.add(`active`)
})
const cartCloseBtn=document.getElementById(`cartCloseBtn`)
cartCloseBtn.addEventListener(`click`,()=>{
    cartContainer.classList.remove(`active`)
})

document.addEventListener(`click`,(e)=>{
    if (e.target.innerText==`REMOVE`) {
        totalPriceTag.innerText=parseFloat(totalPriceTag.innerText)-parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .priceTopic` ).innerText)
        
        count.innerText=count.innerText-1
        countItem--
        e.target.parentNode.parentNode.remove()
    }
    if (e.target.innerText==`PURCHASE`) {
        console.log(count.innerText);
        if (count.innerText==0) {
            alert(`pls add some products to purchase!!!`)
            return
        }else{
            cartItems.innerHTML=""
            count.innerText=0
            totalPriceTag.innerText=0
            alert(`thanks for the purchase!!!`)
        }
    }
})


function getCartDetails() {
    axios.get(`http://localhost:3000/cart`)
    .then((response)=>{
        console.log(response);
    }).catch((error)=>{console.log(error);})
}



