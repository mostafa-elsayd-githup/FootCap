
function toggleMenu() {
    let navbar = document.querySelectorAll(".head li a");

    navbar.forEach(e => {
        e.addEventListener("mouseenter", () => {
            e.classList.add("active-color");
        });
        e.addEventListener("mouseleave", () => {
            e.classList.remove("active-color");
        }); 
    });
}

function toggleSearch() {
    let categories = document.querySelectorAll(".categories li");
    categories.forEach(x => {
        x.addEventListener("mouseenter", () => {
            x.classList.add("active-background");
        })
        x.addEventListener("mouseleave", () => {
            x.classList.remove("active-background");
        })
    });
}

// Add event listeners for the mobile menu
function ShowMenu() {
    let heder_icon = document.querySelector(" header .icon");
    let close_icon = document.querySelector(" header .fa-xmark");

    close_icon.onclick = () => {
        let heder_menu = document.querySelector(" header  .icon-mobile");
        if (heder_menu.style.left === "0px") {
            heder_menu.style.left = "-300px";
            heder_menu.style.transition = "left 0.3s ease-in-out";

        } else {
            heder_menu.style.left = "0px";
            heder_menu.style.transition = "left 0.3s ease-in-out";
        }
    }
    heder_icon.onclick = () => {
        let heder_menu = document.querySelector(" header  .icon-mobile");
        if (heder_menu.style.left === "0px") {
            heder_menu.style.left = "-300px";
            heder_menu.style.transition = "left 0.3s ease-in-out";

        } else {
            heder_menu.style.left = "0px";
            heder_menu.style.transition = "left 0.3s ease-in-out";
        }
    }
}
toggleMenu();
ShowMenu();


function madeTable() {
    
    let tbody = document.querySelector("tbody")
    let storedData = JSON.parse(localStorage.getItem('products'));
    for (let index = 0; index < storedData.length; index++) {
    
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        td.classList.add("center-flex")
        let img = document.createElement("img")
        let div =document.createElement("div")
        div.classList.add("text-c")
        let span = document.createElement("span")
        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid")
        deleteIcon.classList.add("fa-trash")
    
        img.src = storedData[index].src
        span.innerHTML = storedData[index].type
    
        tbody.appendChild(tr)
        td.appendChild(deleteIcon)
        td.appendChild(img)
        td.appendChild(div)
        div.appendChild(span)
        tr.appendChild(td)
    
        let td2 = document.createElement("td")
        td2.classList.add("price")
        td2.innerHTML = storedData[index].price;
        tr.appendChild(td2)
        let td3 = document.createElement("td");
        let input = document.createElement("input");
        input.type = "number";
        input.classList.add("number-table");
        input.classList.add("rad-10");
        td3.appendChild(input);
        tr.appendChild(td3)
        let td4 = document.createElement("td")
        td4.innerHTML = "0$"
        td4.classList.add("subtotal")
        tr.appendChild(td4)
    }
}
madeTable()


function calculateSubtotal() {

    let price_t = document.querySelectorAll(".price");
    let quantity = document.querySelectorAll(".number-table");
    let subtotal = document.querySelectorAll(".subtotal");

    let allSubtotal = 0;


  for (let i = 0; i < price_t.length; i++) {
    // let priceNumber = parseFloat(price_t[i].innerText);
      let priceText = price_t[i].innerText.replace(/[^0-9.]/g, "");
      let priceNumber = parseFloat(priceText);


    let quantityNumber = parseFloat(quantity[i].value);

      let total = Math.round(priceNumber * quantityNumber);

    subtotal[i].textContent = isNaN(total) ? "0$" : `${total}$`;
    allSubtotal += isNaN(total) ? 0 : total;
    }
    let Subtotal = document.querySelector(".cart-total .info .subtotal-total");
    let Shipping = document.querySelector(".cart-total .info .Shipping");
    let Total = document.querySelector(".cart-total .info .Total");

     Subtotal.innerHTML =  Math.round(allSubtotal) + "$";
     Shipping.innerHTML = "100$";
     Total.innerHTML = Math.round(allSubtotal + 100) +"$";

}




let updata = document.querySelector(".updata");
updata.addEventListener("click", () => {
    calculateSubtotal()
})


// button
let updata_cart = document.querySelector(".updata-cart");
updata_cart.addEventListener("click", () => {
    window.location.reload();

})


// delete Item 
let remove = document.querySelectorAll(".fa-trash")
remove.forEach((x) => {
    x.addEventListener("click", () => {
        x.parentElement.parentElement.remove()
        let storedData = JSON.parse(localStorage.getItem('products'));
        storedData.forEach((e) => {
            if (e.src === x.parentElement.querySelector("img").src) {
                let index = storedData.indexOf(e);
                if (index !== -1) {
                    storedData.splice(index, 1);
                    localStorage.setItem('products', JSON.stringify(storedData));
                }
            }
        })
        shopping();
        calculateSubtotal() 
    })

})

// line in header
let line = document.querySelector(".line");
window.addEventListener("scroll", () => {
    line.style.width = `${window.scrollY }px`;
});



// add number to shopping icon
function shopping() {
    let number1_shopping = document.querySelector("header .icon  .fa-bag-shopping .number");
    let number2 = document.querySelector("header .icon  .fa-heart ");
    // mobile
    let number1_shopping_mobile = document.querySelector("header .icon-mobile .login .fa-bag-shopping .number");
    // mobile 
    let number5 = document.querySelector("header .icon-mobile .login  .hearting");
    let number6 = document.querySelector("header .icon-mobile .login .shopping");

    number2.addEventListener("click", () => {
        window.location.href = "./wishlist.html";
    });


    number5.addEventListener("click", () => {
        window.location.href = "./wishlist.html";
});
    number6.addEventListener("click", () => {
        window.location.href = "./cart.html";
    });

    let stored = JSON.parse(localStorage.getItem('products')) || [];
        number1_shopping.innerHTML = stored.length;
        number1_shopping_mobile.innerHTML = stored.length;


} 
shopping();






// heart اضافه رقم الى ايقون  الويش ليست 
function heart() { 
    let numberWishlist = document.querySelector("header .icon .fa-heart .love");
    let numberWishlist2 = document.querySelector("header .icon-mobile .fa-heart .love");
    
    let number = JSON.parse(localStorage.getItem('wishlist')) || [];

    numberWishlist.innerHTML = number.length;
    numberWishlist2.innerHTML = number.length;
}

heart();


































// log out
let logOut = document.querySelector("header .log-out-in-mobile");
let logOut_mobile = document.querySelector("header .log-out");
logOut_mobile.addEventListener("click", () => {
    window.location.href = "./log-out.html";
})
logOut.addEventListener("click", () => {
    window.location.href = "./log-out.html";
})
























   
