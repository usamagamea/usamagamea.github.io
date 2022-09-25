/*------------------------page loader--------------------*/

window.addEventListener("load", () => {
    document.querySelector(".page-loader").classList.add("slide-out-right");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 1000);
});

/*------------------------bg Animation Effect --------------------*/
function bgAnimationEffect() {
    const rows = 7,
        cols = 10;
    for (let i = 0; i < rows; i++) {
        for (let x = 0; x < cols; x++) {

            const div = document.createElement("div");
            div.className = `col-${x+1}`;
            document.querySelector(".bg-animation-effect").appendChild(div);

        }

    }

}
bgAnimationEffect();
/*------------------------------- toggle navbar -----------------------------------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
    navToggler.classList.toggle("active");
    document.querySelector(".nav").classList.toggle("open")
    toggleOverLayEffect();
    toggleBodyScrolling();
}
/*------------------------------- hide and show sections -----------------------------------*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        const hash = e.target.hash;
        if (e.target.classList.contains("nav-item")) {
            activeSection(hash);
            toggleNavbar();
            document.querySelector(".nav-toggler").classList.add("toggle-hide");
        } else {
            toggleOverLayEffect();
            toggleBodyScrolling();
            setTimeout(() => {
                activeSection(hash);
                toggleOverLayEffect();
                toggleBodyScrolling();
                document.querySelector(".nav-toggler").classList.remove("toggle-hide");
            }, 950);
        }

    }
});

function activeSection(sectionId) {
    document.querySelector("section.active").classList.remove("active");
    document.querySelector(sectionId).classList.add("active");
    // window.scrollTo(0.0);

}

/*------------------------------- toggle overlay effect -----------------------------------*/
function toggleOverLayEffect() {
    document.querySelector(".overlay-effect").classList.toggle("active");
}

/*------------------------------- toggle body scrolling -----------------------------------*/
function toggleBodyScrolling() {

    document.body.classList.toggle("hide-scrolling");
}

/*------------------------------- filter portfolio items -----------------------------------*/

const filterBtnContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")) {
        filterBtnContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        toggleBodyScrolling();
        document.querySelector(".filter-status").classList.add("active");
        document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
        setTimeout(() => {
            filterItem(e.target);
        }, 400);
        setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            toggleBodyScrolling();
        }, 600);

    }
});

function filterItem(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-category").split(",");
        if (category.indexOf(selectedCategory) !== -1 || selectedCategory == "all") {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }

    });

    portfolioItems = document.querySelectorAll(".portfolio-item.show");


}
// filter active category portfolio items
filterItem(document.querySelector(".portfolio-filter-btn.active"));

/*------------------------------- portfolio item details popup -----------------------------------*/
let portfolioItemIndex;
document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
        const currentItem = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem)
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();
    }
});

function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    toggleBodyScrolling();
}

document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
    document.querySelector(".pp-thumbnail img").src =
        portfolioItems[portfolioItemIndex].querySelector("img").src;

    document.querySelector(".pp-header h3").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML =
        portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;

    document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex+1} of ${portfolioItems.length} ( <span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span> )`;
}

function updateNextPrevItem() {
    if (portfolioItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        // document.querySelector(".pp-footer-left").removeAttribute("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML =
            portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-left img").src =
            portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
    } else {

        document.querySelector(".pp-footer-left").classList.add("hidden");
        // document.querySelector(".pp-footer-left").addAttribute("hidden");
    }
    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        // document.querySelector(".pp-footer-right").removeAttribute("hidden")
        document.querySelector(".pp-footer-right h3").innerHTML =
            portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;

        document.querySelector(".pp-footer-right img").src =
            portfolioItems[portfolioItemIndex + 1].querySelector("img").src;

    } else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
        // document.querySelector(".pp-footer-right").addAttribute("hidden");
    }

}

document.querySelector(".pp-prev-btn").addEventListener("click", () => {

    changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
});

function changePortfolioItem(direction) {
    if (direction == "prev") {
        portfolioItemIndex--;
    } else {
        portfolioItemIndex++;
    }
    document.querySelector(".pp-overlay").classList.add(direction);
    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000);

}


/*------------------------------- toggle contact form -----------------------------------*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-contact-form-btn")) {
        document.querySelector(".contact-form").classList.toggle("open");
        toggleBodyScrolling();
    }
});

/*------------------------------- sending contact form -----------------------------------*/
function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "osamagamea44@gmail.com",
        Password: "38EE6F9E6B70C058EFF438AB644AEF32186E",
        To: 'osamagamea44@gmail.com',
        Name: document.getElementById("name").value,
        From: document.getElementById("email").value,
        Subject: document.getElementById("subject").value,
        Body: document.getElementById("message").value,
    }).then(
        message => alert(message),

    );

    function resetForm() {
        document.getElementById("form").reset();
    }
    // resetForm();
}