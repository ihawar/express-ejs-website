function hamburgerMenu(show) {
    let menu = document.getElementById("menu");


    if (!hamburgerMenuIcon || 
        !xMarkIcon ||
        !menu
    ) {
        console.error(
            "Header is not initialized properly."
        )
        location.reload();
        return;
    }

    if (show) {
        hamburgerMenuIcon.classList.add('hidden');
        xMarkIcon.classList.remove('hidden');
        menu.classList.add('opacity-100', 'top-20');
    } else {
        hamburgerMenuIcon.classList.remove('hidden');
        xMarkIcon.classList.add('hidden');
        menu.classList.remove('opacity-100', 'top-20');
    }
}


let hamburgerMenuIcon = document.getElementById("hamburger-icon");
let xMarkIcon = document.getElementById("x-mark");

hamburgerMenuIcon.onclick = (e) => {
    hamburgerMenu(true);
}

xMarkIcon.onclick = (e) => {
    hamburgerMenu(false);
}
