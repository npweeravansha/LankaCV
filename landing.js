/* ============================
   OPEN CV BUILDER
============================ */

function openBuilder(){

    /*
        V4 builder file එක index.html
        කියලා තියෙන නිසා ඒකට යනවා.
    */

    window.location.href = "builder.html";

}


/* ============================
   MOBILE MENU
============================ */

function toggleMenu(){

    const menu =
        document.getElementById("mobileMenu");

    menu.classList.toggle("open");

}


function closeMenu(){

    const menu =
        document.getElementById("mobileMenu");

    menu.classList.remove("open");

}


/* ============================
   HOW IT WORKS
============================ */

function scrollToHow(){

    const section =
        document.getElementById("how");

    if(section){

        section.scrollIntoView({
            behavior:"smooth"
        });

    }

}


/* ============================
   PDF HELP
============================ */

function openPdfHelp(){

    const modal =
        document.getElementById("pdfModal");

    modal.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


function closePdfHelp(){

    const modal =
        document.getElementById("pdfModal");

    modal.classList.remove("open");

    document.body.style.overflow =
        "";

}


/* ============================
   CLOSE MODAL WHEN CLICKING
   OUTSIDE
============================ */

document
.getElementById("pdfModal")
.addEventListener(
    "click",
    function(event){

        if(
            event.target === this
        ){

            closePdfHelp();

        }

    }
);


/* ============================
   ESC KEY
============================ */

document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Escape"){

            closePdfHelp();
            closeMenu();

        }

    }
);