
// set info user to log-in
function user(user, password) {

    let user1 = {
        userName: user,
        password: password,
    }
    localStorage.setItem("user1", JSON.stringify(user1))
}
user("mostafaelsayd2025@.com", "mostafa2003");


// get  info user from local to log-in
function getUser() {
    let inputUser = document.querySelector(".form .email");
    let inputPasswordUser = document.querySelector(".form .password");
    let button_log = document.querySelector(".form button");
    let user1 = JSON.parse(localStorage.getItem("user1"));
    button_log.addEventListener("click", () => {
        if (user1.userName === inputUser.value && user1.password === inputPasswordUser.value) {
            window.location.href = "index.html"  
        } else {
            if (user1.userName != inputUser.value && user1.password != inputPasswordUser.value) {
                inputUser.value = ""
                inputUser.style.borderBottom = "2px solid var(--bittersweet)"

                inputPasswordUser.value = ""
                inputPasswordUser.style.borderBottom = "2px solid var(--bittersweet)"

            } else if (user1.userName != inputUser.value) {
                inputUser.value = ""
                inputUser.style.borderBottom = "2px solid var(--bittersweet)"
            } else if (user1.password != inputPasswordUser.value) {
                inputPasswordUser.value = ""
                inputPasswordUser.style.borderBottom = "2px solid var(--bittersweet)"
            }
        }

    })

}getUser();












// // add number to shopping icon
// function shopping() {
// let number = document.querySelector(".fa-bag-shopping .number");

// let stored = JSON.parse(localStorage.getItem('products')) || [];

// stored.map((e) => {
//     number.innerHTML = stored.length;
// });
// }shopping()


// // scroll top
// function scrolltop() {
//     let scroll = document.querySelector(".scroll-top")
//     window.addEventListener("scroll", () => {
//         if (window.scrollY > 300) {
//             scroll.style.display = "block";
//         } else {
//             scroll.style.display = "none";
//         }
//     })
    
// }scrolltop() 
