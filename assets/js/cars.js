
// document.querySelectorAll("header ul.head li").forEach(li => {
//     li.addEventListener("click", function(e) {
//         e.preventDefault(); // يمنع الانتقال بالرابط
//         // احصل على اسم التاب من النص أو من data attribute
//         let tabName = li.textContent.trim();
//         // يمكنك تخصيص المحتوى حسب اسم التاب
//         let tabContent = `<div class="tab-content"> ${tabName}</div>`;
//         document.querySelector(".tabs-container").innerHTML = tabContent;
//         // يمكنك إضافة كلاس active على li لو أردت
//         document.querySelectorAll("header ul.head li").forEach(x => x.classList.remove("active"));
//         li.classList.add("active");
//     });
// });




// function calculateSubtotal() {
//     let price_t = document.querySelectorAll(".price")
//     let quantity = document.querySelectorAll(".number")
//     let subtotal = document.querySelectorAll(".subtotal")
//     price_t.forEach(e => {
//         let priceNumber = parseFloat(e.textContent);
//     })
//     quantity.forEach(x => {
//         let quantityNumber = parseFloat(x.value);
//     })
//     subtotal.forEach(s => {
        
//         s.textContent = priceNumber * quantityNumber;
//     })
// }


// function calculateSubtotal() {
//     let price_t = document.querySelectorAll(".price");
//     let quantity = document.querySelectorAll(".number");
//     let subtotal = document.querySelectorAll(".subtotal");

//     // نفترض أن كل صف له نفس الترتيب في العناصر الثلاثة
//     for (let i = 0; i < price_t.length; i++) {
//         let priceNumber = parseFloat(price_t[i].textContent);
//         let quantityNumber = parseFloat(quantity[i].value);
//         let total = priceNumber * quantityNumber;
//         subtotal[i].textContent = isNaN(total) ? 0 : `${total}$`;
//         let Subtotal = document.querySelector(".cart-total .info .subtotal")
//         let Shipping = document.querySelector(".cart-total .info .Shipping")
//         let Total = document.querySelector(".cart-total .info .Total")

//     }
// }
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

function toggleCart() {
    let products_list = document.querySelectorAll(".products-list li");
    products_list.forEach(z => {
        z.addEventListener("mouseenter", () => {
            let products_list_icons = z.querySelector(".products-list li .icons-Products")
            let products_list_img = z.querySelector(".products-list li img")
            products_list_img.style.transform = "scale(1.1)"
            products_list_img.style.transition = "transform 0.3s ease-in-out"
            if (products_list_icons) {
                products_list_icons.style.right = "50px"
            }
        })

        z.addEventListener("mouseleave", () => {
            let products_list_icons = z.querySelector(".products-list li .icons-Products")
            let products_list_img = z.querySelector(".products-list li img")
            products_list_img.style.transform = "scale(1)"
            products_list_img.style.transition = "transform 0.3s ease-in-out"
            if (products_list_icons) {
                products_list_icons.style.right = "-50px"
            }
        })
    });
}

function toggleSearchIcon() {
    let special_list = document.querySelectorAll(".special-list li");
    special_list.forEach(y => {
        console.log(y);
        y.addEventListener("mouseenter", () => {
            let products_list_icons = y.querySelector(".special-list li .icons-special")
            let products_list_img = y.querySelector(".special-list li img")
            products_list_img.style.transform = "scale(1.08)"
            products_list_img.style.transition = "transform 0.3s ease-in-out"
            if (products_list_icons) {
                products_list_icons.style.right= "50px"
            }
        })
    
        y.addEventListener("mouseleave", () => {
            let products_list_icons = y.querySelector(".special-list li .icons-special")
            let products_list_img = y.querySelector(".special-list li img")
            products_list_img.style.transform = "scale(1)"
            products_list_img.style.transition = "transform 0.3s ease-in-out"
            if (products_list_icons) {
                products_list_icons.style.right= "-50px"
            }
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
toggleSearch();
toggleCart();
toggleSearchIcon();
ShowMenu();



function calculateSubtotal() {
    let price_t = document.querySelectorAll(".price");
    let quantity = document.querySelectorAll(".number");
    let subtotal = document.querySelectorAll(".subtotal");

    let allSubtotal = 0;
    for (let i = 0; i < price_t.length; i++) {
        let priceNumber = parseFloat(price_t[i].textContent);      
        let quantityNumber = parseFloat(quantity[i].value);
        let total = priceNumber * quantityNumber;
        subtotal[i].textContent = isNaN(total) ? "0$" : `${total}$`;
        allSubtotal += isNaN(total) ? 0 : total;
    }

    let Subtotal = document.querySelector(".cart-total .info .subtotal");
    let Shipping = document.querySelector(".cart-total .info .Shipping");
    let Total = document.querySelector(".cart-total .info .Total");

    if (Subtotal) Subtotal.innerHTML = `${allSubtotal}$`;
    if (Shipping) Shipping.innerHTML = "100$";
    if (Total) Total.innerHTML = `${allSubtotal + 100}$`;
}
let updata = document.querySelector(".updata");
updata.addEventListener("click", () => {
    calculateSubtotal()
})




calculateSubtotal()