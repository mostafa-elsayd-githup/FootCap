// line in header
let line = document.querySelector(".line");
window.addEventListener("scroll", () => {
    line.style.width = `${window.scrollY}px`;

});
// toggle menu, search, and icons
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
toggleSearchIcon();
ShowMenu();

// add number to shopping icon
function shopping() {
    let number1_shopping = document.querySelector("header .icon  .fa-bag-shopping .number");
    let number2 = document.querySelector("header .icon  .fa-bag-shopping ");

    // mobile
    let number1_shopping_mobile = document.querySelector("header .icon-mobile .login .fa-bag-shopping .number");
    // mobile 
    let number5 = document.querySelector("header .icon-mobile .login  .hearting");
    let number6 = document.querySelector("header .icon-mobile .login .shopping");

    number5.addEventListener("click", () => {
        window.location.href = "./wishlist.html";
});
number6.addEventListener("click", () => {
        window.location.href = "./cart.html";
    });

    let stored = JSON.parse(localStorage.getItem('products')) || [];
    stored.forEach((e) => {
        number1_shopping.innerHTML = stored.length;
        // mobile
        number1_shopping_mobile.innerHTML = stored.length;
        // number5.innerHTML = stored.length;
    });


} 
shopping();

// heart اضافه رقم الى ايقون  الويش ليست 
function heart() { 
    let numberWishlist = document.querySelector("header .icon .heart span");
    let numberWishlist2 = document.querySelector("header .icon-mobile .fa-heart .love");
    let numberWishlist3 = document.querySelector(".info-flash h2 .number");
    console.log(numberWishlist3, numberWishlist2, numberWishlist);
    let number = JSON.parse(localStorage.getItem('wishlist')) || [];

    numberWishlist.innerHTML = number.length;
    numberWishlist2.innerHTML = number.length;
    numberWishlist3.innerHTML = number.length;
}

heart();







// استخراج المنتجات من الويش ليست
let card = document.querySelector(".card");
function addProductToWishlist() { 
    let item = JSON.parse(localStorage.getItem('wishlist')) || [];

    for (let i = 0; i < item.length; i++) {
        if (item[i].span =="") {
            card.innerHTML += `
                   <li class="item rad-10 p-relative ">
                        <div class="image text-c p-relative rad-10">
                            <img src="${item[i].src}" alt="">
                            <div class="icon p-absolute">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>
                        <div class="info-card ">
                            <span class="type">${item[i].spanType}</span>
                            <h3 class="name m-0 mb-10">${item[i].name}</h3>
                            <span class="price">${item[i].price}</span>
                        </div>
        
                    </li>
            `
        } else {
            card.innerHTML += `
            <div class="item rad-10 p-relative ">
            <span class="discount p-absolute">${item[i].span}</span>
                <div class="image text-c p-relative rad-10">
                    <img src="${item[i].src}" alt="">
                    <div class="icon p-absolute">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
                <div class="info-card ">
                    <span class="type">${item[i].spanType}</span>
                    <h3 class="name m-0 mb-10">${item[i].name}</h3>
                    <span class="price">${item[i].price}</span>
                </div>

            </div>
    `
        }
    }
}addProductToWishlist();

//ازاله المنتجات من الويش ليست و من localStorage
function DeleteItemFromWishlist() { 
    let wishlistCard = document.querySelectorAll(".card  i");
    wishlistCard.forEach((e) => {
        e.addEventListener("click", () => {
            e.parentElement.closest(".item").remove();
            let storedData = JSON.parse(localStorage.getItem('wishlist'));
            storedData.forEach((x) => {
                if (x.src === e.parentElement.closest(".item").querySelector("img").src) {
                    let index = storedData.indexOf(x);
                    if (index !== -1) {
                        storedData.splice(index, 1);
                        localStorage.setItem('wishlist', JSON.stringify(storedData));
                        wishlist();
                        heart();
                    }
                }
            })
        });
    })
}
DeleteItemFromWishlist();



// اضافه رقم الويش ليست في الهيدر
function wishlist() { 
    let numberWishlist = document.querySelector(".info-flash h2 .number");
    let numberWishlist2 = document.querySelector("header .icon-mobile .fa-heart .love");
    let numberWishlist3 = document.querySelector("header .icon .heart span");
    let number = JSON.parse(localStorage.getItem('wishlist')) || [];
    numberWishlist.innerHTML = number.length;
    numberWishlist2.innerHTML = number.length;
    numberWishlist3.innerHTML = number.length;
}
wishlist()







// اظهار او اخفاء زر الرجوع الى الاعلى
function scrolltop() {
    let scroll = document.querySelector(".container-footer .scroll-top")
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scroll.style.display = "block";
        } else {
            scroll.style.display = "none";
        }
    })
    
}scrolltop() 



// زر الخروج من الموقع
let logOut = document.querySelector("header .log-out-in-mobile");
let logOut_mobile = document.querySelector("header .log-out");
logOut_mobile.addEventListener("click", () => {
    window.location.href = "./log-out.html";
})
logOut.addEventListener("click", () => {
    window.location.href = "./log-out.html";
})
