// line in header
let line = document.querySelector(".line");
window.addEventListener("scroll", () => {
    line.style.width = `${window.scrollY}px`;

});





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
        x.addEventListener("click", () => {
            categories.forEach(x => {
                x.classList.remove("active-background");
            })
            x.classList.add("active-background");
        })

    });
};

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




// scroll top
function scrolltop() {
    let scroll = document.querySelector(".scroll-top")
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scroll.style.display = "block";
        } else {
            scroll.style.display = "none";
        }
    })
    
}scrolltop() 













// // اضافه رقم الى ايقون سلة التسوق
// function shopping() {
    
//     let number = document.querySelector(".fa-bag-shopping .number");
//     let number2 = document.querySelector("header .icon .shope");
//     let number3 = document.querySelector("header .icon-mobile .shope .number");
    
//     number2.addEventListener("click", () => {
//         window.location.href = "./cart.html";
//     })
    
//     number3.addEventListener("click", () => {
//         window.location.href = "./cart.html";
//     })
    
//     let stored = JSON.parse(localStorage.getItem('products')) || [];
    
//         number.innerHTML = stored.length;
//         number3.innerHTML = stored.length;
// } 
// shopping();


// heart اضافه رقم الى ايقون  الويش ليست 
function heart() { 
    let numberWishlist = document.querySelector("header .icon .fa-heart .love");
    let numberWishlist2 = document.querySelector("header .icon-mobile .fa-heart .love");
    console.log(numberWishlist, numberWishlist2);
    let number = JSON.parse(localStorage.getItem('wishlist')) || [];

    numberWishlist.innerHTML = number.length;
    numberWishlist2.innerHTML = number.length;
}

heart();















// اظهار او اخفاء زر الرجوع الى الاعلى
function scrollTop() {
    let scroll = document.querySelector(".container-footer .scroll-top")
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scroll.style.display = "block";
        } else {
            scroll.style.display = "none";
        }
    })
}
scrollTop();



// زر الخروج من الموقع
let logOut = document.querySelector("header .log-out-in-mobile");
let logOut_mobile = document.querySelector("header .log-out");
logOut_mobile.addEventListener("click", () => {
    window.location.href = "./log-out.html";
})
logOut.addEventListener("click", () => {
    window.location.href = "./log-out.html";
})
