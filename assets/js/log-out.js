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
    
} getUser() 

