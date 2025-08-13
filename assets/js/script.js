
// anmation
let Collections = document.querySelector(".Collections");
let product = document.querySelector(".container .Products");
let product_box = document.querySelector(".container .Products .boxs");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        Collections.style.opacity = "1";
        Collections.style.marginTop = "100px";
    } 
    if (window.scrollY > 800) {
        product.style.opacity = "1";
        product.style.marginTop = "0";
    }

});


// scroll top
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



let products = [];
let images = document.querySelectorAll(".Products .boxs .image");


images.forEach((e) => {
    // console.log(e);
    e.addEventListener("click", () => {
        let img = e.querySelector("img");
        let type = e.querySelector("h4");
        let price = e.querySelector(".price");

        let product = {
            src: img ? img.src : "",
            alt: img ? img.alt : "",
            type: type ? type.innerHTML : "",
            price: price ? price.innerHTML : ""
        };
        products.push(product);

        // تخزين المنتجات في localStorage
        localStorage.setItem("products", JSON.stringify(products));
    });
});




// buttons
let products_ul = document.querySelector(".products-list");
let all = document.querySelector(".categories .all");
let nike = document.querySelector(".categories .nike");
let adidas = document.querySelector(".categories .Adidas");
let puma = document.querySelector(".categories .Puma");
let bate = document.querySelector(".categories .Bate");
let apex = document.querySelector(".categories .apex");

// products
let products_list = document.querySelectorAll(".products-list li");
let nikeLi = document.querySelectorAll(".products-list .nike");
let adidasLi = document.querySelectorAll(".products-list .addidas");
let pumaLi = document.querySelectorAll(".products-list .pume");
let bateLi = document.querySelectorAll(".products-list .pate");
let apexLi = document.querySelectorAll(".products-list .apex");

let isClicked = false;


let products_array = [];
let nike_array = [];
let adidas_array = [];
let Puma_array = [];
let bate_array = [];
let apex_array = [];



// create products array
products_list.forEach((e) => {
    let classList = e.classList;
    let NEW = e.querySelector(".new");
    let img = e.querySelector("img");
    let i = e.querySelectorAll(".icons-Products .fa-solid");
    let type = e.querySelector(".type");
    let h4 = e.querySelector("h4");
    let span = e.querySelector(".price");
    let img1 = e.querySelector("span img")
    let iArray = [];
    i.forEach((e) => {
        iArray.push(e.className);
    })
    let product = {
        classList: classList,
        NEW: NEW ? NEW.innerHTML : "",
        src: img ? img.src : "",
        i: iArray,
        type: type ? type.innerHTML : "",
        h4: h4 ? h4.innerHTML : "",
        span: span ? span.innerHTML : "",
        src1: img1 ? img1.src :"" 
            
    };
    products_array.push(product);
});

nikeLi.forEach((e) => {
    
    let classList = e.classList;
    let NEW = e.querySelector(".new");
    let img = e.querySelector("img");
    let i = e.querySelectorAll(".icons-Products .fa-solid");
    let type = e.querySelector(".type");
    let h4 = e.querySelector("h4");
    let span = e.querySelector(".price");
    let iArray = [];
    i.forEach((e) => {
        iArray.push(e.className);
    })
    // console.log(iArray);
    let nike = {
        classList: classList,
        NEW: NEW ? NEW.innerHTML : "",
        src: img ? img.src : "",
        i: iArray,
        type: type ? type.innerHTML : "",
        h4: h4 ? h4.innerHTML : "",
        span: span ? span.innerHTML : ""
    };
    products_array.push(nike);
    nike_array.push(nike);
    // console.log(nike_array);
});

adidasLi.forEach((e) => {
    let classList = e.classList;
    let NEW = e.querySelector(".new");
    let img = e.querySelector("img");
    // let img1 = e.querySelector(" .imgs");
    let i = e.querySelectorAll(".icons-Products .fa-solid");
    let type = e.querySelector(".type");
    let h4 = e.querySelector("h4");
    let span = e.querySelector(".price");
    // console.log(img, img1);
    let iArray = [];
    i.forEach((e) => {
        iArray.push(e.className); 
    })
    let adidas = {
        classList: classList,
        NEW: NEW ? NEW.innerHTML : "",
        src: img ? img.src : "",
        i: iArray,
        type: type ? type.innerHTML : "",
        h4: h4 ? h4.innerHTML : "",
        span: span ? span.innerHTML : "",
        // src1: img1 ? img1.src :""
    };
    products_array.push(adidas);
    adidas_array.push(adidas);

});

pumaLi.forEach((e) => {

    let classList = e.classList;
    let NEW = e.querySelector(".new");
    let img = e.querySelector("img");
    let i = e.querySelectorAll(".icons-Products .fa-solid");
    let type = e.querySelector(".type");
    let h4 = e.querySelector("h4");
    let span = e.querySelector(".price");
    let iArray = [];
    i.forEach((e) => {
        iArray.push(e.className);
    })
    let puma = {
        classList: classList,
        NEW: NEW ? NEW.innerHTML : "",
        src: img ? img.src : "",
        i: iArray,
        type: type ? type.innerHTML : "",
        h4: h4 ? h4.innerHTML : "",
        span: span ? span.innerHTML : ""
    };
    products_array.push(puma);
    Puma_array.push(puma);
});

bateLi.forEach((e) => {
    let classList = e.classList;
let NEW = e.querySelector(".new");
let img = e.querySelector("img");
let i = e.querySelectorAll(" .icons-Products .fa-solid");
let type = e.querySelector(".type");
let h4 = e.querySelector("h4");
    let span = e.querySelector(".price");
    let iArray = [];
    i.forEach((e) => {
        iArray.push(e.className);
    })
let pate = {
classList: classList,
NEW: NEW ? NEW.innerHTML : "",
src: img ? img.src : "",
i: iArray,
type: type ? type.innerHTML : "",
h4: h4 ? h4.innerHTML : "",
span: span ? span.innerHTML : ""
};
products_array.push(pate);
bate_array.push(pate);
})

apexLi.forEach((e) => {
        
    let classList = e.classList;
    let NEW = e.querySelector(".new");
    let img = e.querySelector("img");
    let i = e.querySelectorAll(".icons-Products .fa-solid");
    let type = e.querySelector(".type");
    let h4 = e.querySelector("h4");
    let span = e.querySelector(".price");
    let iArray = [];
    i.forEach((e) => {
        iArray.push(e.className);   
    })
    let apex = {
        classList: classList,
        NEW: NEW ? NEW.innerHTML : "",
        src: img ? img.src : "",
        i: iArray,
        type: type ? type.innerHTML : "",
        h4: h4 ? h4.innerHTML : "",
        span: span ? span.innerHTML : ""
    };
    products_array.push(apex);
    apex_array.push(apex);
})

// show all products
function allProduct() {
    products_ul.innerHTML = ""

    products_array.forEach((e) => {
        if (e.NEW && e.NEW.trim() !== "") {
            products_ul.innerHTML += `
            <li class="${e.classList}">
                <span class="new">${e.NEW}</span>
                <div class= "image">
                <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
                <img src="${e.src}" alt="" />
                <span class="type">${e.type}</span>
                <h4>${e.h4}</h4>
                <span class="price">${e.span}</span>
                </div>
            </li>
            `
         
        } else {
            products_ul.innerHTML += `
            <li class="${e.classList}">
            <div class= "image">
                <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
                <img src="${e.src}" alt="" />
                <span class="type">${e.type}</span>
                <h4>${e.h4}</h4>
                <span class="price">${e.span}</span>
            </div>
            </li>
            `
        }
    })
    let all = document.querySelectorAll(".products-list li");
    all.forEach((e) => {
        e.addEventListener("click", () => {
            let img = e.querySelector("img");
            let type = e.querySelector("h4");
            let price = e.querySelector(".price");
        
            let product = {
                src: img ? img.src : "",
                alt: img ? img.alt : "",
                type: type ? type.innerHTML : "",
                price: price ? price.innerHTML : ""
            };
            products.push(product);
        
            // تخزين المنتجات في localStorage
            localStorage.setItem("products", JSON.stringify(products));
            shopping()
        });
    });
    wishlist();

}

// show nike products
function nikeProduct() {

    products_ul.innerHTML = "";
    nike_array.forEach((e) => {

        if (e.NEW && e.NEW.trim() !== "") {
            products_ul.innerHTML += `
        <li class="${e.classList}">
            <span class="new">${e.NEW}</span>
            <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <div class="image">
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `
            
        } else {
            products_ul.innerHTML += `
            <li class="${e.classList}">
                <div class="image">
                <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
                <img src="${e.src}" alt="" />
                <div class="type">${e.type}</div>
                <h4>${e.h4}</h4>
                <span class="price">${e.span}</span>
                </div>
            </li>
            `

        }
        let nikeLi = document.querySelectorAll(".products-list .nike");
        nikeLi.forEach((e) => {
                e.addEventListener("click", () => {
                    let img = e.querySelector("img");
                    let type = e.querySelector("h4");
                    let price = e.querySelector(".price");
            
                    let product = {
                        src: img ? img.src : "",
                        alt: img ? img.alt : "",
                        type: type ? type.innerHTML : "",
                        price: price ? price.innerHTML : ""
                    };
                    products.push(product);
            
                    // تخزين المنتجات في localStorage
                    localStorage.setItem("products", JSON.stringify(products));
                    shopping()
                    wishlist();
                });
        })
    });
}

// show adidas products
function adidasProduct() {
    
    products_ul.innerHTML = "";

    adidas_array.forEach((e) => {
        if (e.NEW && e.NEW.trim() !== "") {
        products_ul.innerHTML += `
        <li class="${e.classList}">
            <span class="new">${e.NEW}</span>
            <div class="image">
              <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `  
        } else {
            products_ul.innerHTML += `
        <li class="${e.classList}">
        <div class="image">
              <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `

        }
    })
    let adidasLi = document.querySelectorAll(".products-list .addidas");
    adidasLi.forEach((e) => {
        // console.log(e);
        e.addEventListener("click", () => {
            let img = e.querySelector("img");
            let type = e.querySelector("h4");
            let price = e.querySelector(".price");
        
            let product = {
                src: img ? img.src : "",
                alt: img ? img.alt : "",
                type: type ? type.innerHTML : "",
                price: price ? price.innerHTML : ""
            };
            products.push(product);
        
            // تخزين المنتجات في localStorage
            localStorage.setItem("products", JSON.stringify(products));
            shopping()
        });
    });
    wishlist();
}
// show puma products
function PumaProduct() {

    products_ul.innerHTML = "";
    
    Puma_array.forEach((e) => {
        if (e.NEW && e.NEW.trim() !== "") {
        products_ul.innerHTML += `
        <li class="${e.classList}">
            <span class="new">${e.NEW}</span>
            <div class ="image">
            <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `  
        } else {
            products_ul.innerHTML += `
        <li class="${e.classList}">
        <div class="image">
            <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `

        }
    })
    let pumaLi = document.querySelectorAll(".products-list .pume");
    pumaLi.forEach((e) => {
            console.log(e);
            e.addEventListener("click", () => {
                let img = e.querySelector("img");
                let type = e.querySelector("h4");
                let price = e.querySelector(".price");
        
                let product = {
                    src: img ? img.src : "",
                    alt: img ? img.alt : "",
                    type: type ? type.innerHTML : "",
                    price: price ? price.innerHTML : ""
                };
                products.push(product);
        
                // تخزين المنتجات في localStorage
                localStorage.setItem("products", JSON.stringify(products));
                shopping()
            });
    })
    wishlist();
}

// show bate products
function bateProduct() {

    products_ul.innerHTML = ""; 

    bate_array.forEach((e) => {
        if (e.NEW && e.NEW.trim() !== "") {
        products_ul.innerHTML += `
        <li class="${e.classList}">
            <span class="new">${e.NEW}</span>
            <div class="image">
            <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `  
        } else {
            products_ul.innerHTML += `
        <li class="${e.classList}">
        <div class="image">
            <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `

        }
    })
    let pateLi = document.querySelectorAll(".products-list .pate");
    pateLi.forEach((e) => {
        console.log(e);
        e.addEventListener("click", () => {
            let img = e.querySelector("img");
            let type = e.querySelector("h4");
            let price = e.querySelector(".price");
        
            let product = {
                src: img ? img.src : "",
                alt: img ? img.alt : "",
                type: type ? type.innerHTML : "",
                price: price ? price.innerHTML : ""
            };
            products.push(product);
        
            // تخزين المنتجات في localStorage
            localStorage.setItem("products", JSON.stringify(products));
            shopping()
        });
    });
    wishlist();
}

// show apex products
function apexProduct() {

    products_ul.innerHTML = "";

    apex_array.forEach((e) => {
        if (e.NEW && e.NEW.trim() !== "") {
            products_ul.innerHTML += `
        <li class="${e.classList}">
            <span class="new">${e.NEW}</span>
            <div class = "image">
            <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `
        } else {
            products_ul.innerHTML += `
        <li class="${e.classList}">
        <div class="image">
            <span class="icons-Products">${e.i.map((e) => `<i class="${e}"></i>`).join("")}</span>
            <img src="${e.src}" alt="" />
            <div class="type">${e.type}</div>
            <h4>${e.h4}</h4>
            <span class="price">${e.span}</span>
            </div>
        </li>
            `

        }
    });
    let apexLi = document.querySelectorAll(".products-list .apex");
    apexLi.forEach((e) => {
            e.addEventListener("click", () => {
                let img = e.querySelector("img");
                let type = e.querySelector("h4");
                let price = e.querySelector(".price");
        
                let product = {
                    src: img ? img.src : "",
                    alt: img ? img.alt : "",
                    type: type ? type.innerHTML : "",
                    price: price ? price.innerHTML : ""
                };
                products.push(product);
        
                // تخزين المنتجات في localStorage
                localStorage.setItem("products", JSON.stringify(products));
                shopping()
            });
    })
    wishlist();
}


// added products to cart navigation
// let shoppingIcon = document.querySelector(" header .fa-bag-shopping"); ;


all.addEventListener("click", () => { allProduct(), toggleCart() , shopping(), heart() });
nike.addEventListener("click", () => { nikeProduct(),  toggleCart() , shopping(), heart() });
adidas.addEventListener("click", () => { adidasProduct() , toggleCart(), shopping(), heart() });
puma.addEventListener("click", () => { PumaProduct(),  toggleCart() , shopping(), heart() });
bate.addEventListener("click", () => { bateProduct(),  toggleCart() , shopping(), heart() });
apex.addEventListener("click", () => { apexProduct(),  toggleCart() , shopping(), heart() });


// اضافه المنتجات الى localStorage
function wishlist() {
    let hearts = document.querySelectorAll(".products-list li .fa-heart");
    hearts.forEach((heart) => {
        heart.addEventListener("click", (e) => {
            e.stopPropagation();
            let parent = heart.closest("li");
            let span = parent.querySelector(".new");
            let img = parent.querySelector("img");
            let spanType = parent.querySelector(".type");
            let name = parent.querySelector("h4");
            let price = parent.querySelector(".price");
            
            // اقرأ الـ wishlist الحالي من localStorage أو أنشئ مصفوفة جديدة
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            let item = {
                span: span ? span.innerHTML : "",
                src: img ? img.src : "",
                alt: img ? img.alt : "",
                spanType: spanType ? spanType.innerHTML : "",
                name: name ? name.innerHTML : "",
                price: price ? price.innerHTML : "",
            };
            
                wishlist.push(item);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            shopping();
        });
    });
}
wishlist();



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


function heart() {
    let love = document.querySelector("header .icon .love");
    let love2 = document.querySelector("header .icon-mobile .love");
let hearts = document.querySelectorAll(".products-list li .fa-heart");

    hearts.forEach((heart) => {
            let stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        
            if (love) love.innerHTML = stored.length;
            if (love2) love2.innerHTML = stored.length;
        
            // اجعل أيقونات القلب تفتح صفحة الـ wishlist فقط
            let heart2 = document.querySelector("header .icon .fa-heart");
            let heart1 = document.querySelector("header .icon-mobile .fa-heart");
            if (heart2) heart2.addEventListener("click", () => {
                window.location.href = "./wishlist.html";
            });
            if (heart1) heart1.addEventListener("click", () => {
                window.location.href = "./wishlist.html";
            });
    })
    hearts.forEach((heart) => {
        heart.addEventListener("click", () => {
            let stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        
            if (love) love.innerHTML = stored.length;
            if (love2) love2.innerHTML = stored.length;
        });
    });
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


// new way teach it
// all.addEventListener("click", () => {
//     if (isClicked) return; // لو اتنفذ قبل كده، اخرج
//     isClicked = false;
//     // الكود اللي عايز تنفذه مرة واحدة فقط
//     allProduct() 
// });