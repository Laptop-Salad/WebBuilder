const modals = document.getElementsByClassName("modalBtn");
const yesEvent = new Event("yes");
const noEvent = new Event("no");

function findAllElems() {

}

function findElem() {

}

function yesModal(modal) {
    modal.close();
    modal.style.display = "none";
    modal.dispatchEvent(yesEvent);
}

function noModal(modal) {
    modal.close();
    modal.style.display = "none";
    modal.dispatchEvent(noEvent);
}

function closeModal(modal) {
    modal.close();
    modal.style.display = "none";
}

function rotateAccordion(arrow, content, accordion) {
    if (arrow.classList.contains("arrow-up")) {
        arrow.classList.add("arrow-down");
        arrow.classList.remove("arrow-up");
        accordion.setAttribute("aria-expanded", "false");
    } else {
        arrow.classList.add("arrow-up");
        arrow.classList.remove("arrow-down");
        accordion.setAttribute("aria-expanded", "true");
    }

    if (content.style.maxHeight) {
        content.style.maxHeight = null;

    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

for (let i = 0; i < modals.length; i++) {   
    let forModal = modals[i].getAttribute('data-for');
    let modal = document.getElementById(forModal);

    // Add event listener to modal open button
    modals[i].addEventListener("click", function() {
        // data-for would contain the id of the html modal to open
        modal.showModal();
        modal.style.display = "flex";
    });
        
    // Find all elements in modal
    let elems = modal.getElementsByTagName("*");

    // Add event listener to modal close button
    for (let elem = 0; elem < elems.length; elem++) {

        // Item with data-close would be the modal close button
        if(elems[elem].getAttribute('data-close')) {
            elems[elem].addEventListener("click", function () {
                closeModal(modal);
            });
        }

        // Item with data-yes would be the modal close button and fire yes event
        if(elems[elem].getAttribute('data-yes')) {
            elems[elem].addEventListener("click", function () {
                yesModal(modal);
            });
        }

        // Item with data-no would be the modal close button and fire yes event
        if(elems[elem].getAttribute('data-no')) {
            elems[elem].addEventListener("click", function () {
                noModal(modal);
            });
        }

    };
}

// ** Accordions **
const accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
    // Get current accordion
    const accordion = accordions[i];

    // Get header to add img to
    let header = accordion.getElementsByClassName("header")[0];
    
    // Add arrow img
    let arrowElem = document.createElement("div");
    arrowElem.classList.add("arrow");

    let arrowImg = document.createElement("img");
    arrowImg.classList.add("arrow-down");
    arrowImg.setAttribute("data-arrow", "true");
    arrowImg.setAttribute("src", "assets/arrow.png");
    arrowImg.setAttribute("alt", "arrow");

    arrowImg.style.display = "none";

    // Add arrow img to arrow div
    arrowElem.appendChild(arrowImg);

    // Find content
    let content = accordion.getElementsByClassName("content")[0];

    accordion.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            header.click();
        }
    })

    header.addEventListener("click", function () {
        rotateAccordion(arrowImg, content, accordion);
    });

    // Add arrow to header
    header.appendChild(arrowElem);
}