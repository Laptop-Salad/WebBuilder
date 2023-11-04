import { mapElemCreator } from "./elemCreator.js";
import { getCode } from "./getCode.js";

const nav = document.getElementById("nav");
const advanced = document.getElementById("advanced")
const elemButtons = nav.querySelectorAll("button");
const canvasContainer = document.getElementById("container");
const elemEditor = document.getElementById("elemEditor");
const codeBtn = document.getElementById("codeBtn");
const codeBox = document.getElementById("codeBox");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const body = document.getElementById("body");
const top = document.getElementById("top");
const board = document.getElementById("board");

// Each element needs a unique id, this is incremented by 1 for each new element
let IdCount = 0;

// The current targeted element (border red)
let currTarget = null;

// Keep track of all elements on canvas
let elemsTracker = {};

// Keep track of a targeted elements style.display value, as when targeting this value is set to inline
let originalDisplay = ""

// Check if side panels are open
let editorsOpen = true;

// The page that elements are being added to
let pageTarget = document.getElementById("page1");

// To handle ctrl + \ - for hiding side panels
body.addEventListener("keydown", function (event) {
    if (event.code === "IntlBackslash" && event.ctrlKey) {
        if (editorsOpen) {
            nav.style.display = "none";
            advanced.style.display = "none";
            canvasContainer.style.gridColumn = "1 / 4";
            canvasContainer.style.width = "100%";
            editorsOpen = false;
        } else {
            nav.style.display = "block";
            advanced.style.display = "block";
            canvasContainer.style.width = "100%";
            canvasContainer.style.gridColumn = "2";
            editorsOpen = true;
        }
    }
})

modalClose.addEventListener("click", function () {
    /**
     * If close modal button is clicked, close modal
     */
    modal.style.display = "none";
})

codeBtn.addEventListener("click", function () {
    /**
     * If get code button is clicked, open modal and get code
     */
    modal.style.display = "block";
    codeBox.innerHTML = getCode(elemsTracker);
})

function checkClickOutside(event) {
    /**
     * If an element is being targeted, and another element or the container is clicked, remove target
     */
    if (currTarget && !event.target.closest(currTarget.nodeName) && event.target.id != currTarget.id && event.target.id == pageTarget.id || event.target.id == "board") {    
        clearTarget();
    }
}

function clearTarget() {
    /**
     * Remove the target from an element
     */
    if (currTarget) {
        currTarget.style.border = "none"; 
        currTarget.style.display = originalDisplay;
        document.getElementById("container").removeEventListener("mousemove", moveElement);
        currTarget.removeEventListener("mousedown", startMove);
        currTarget.removeEventListener("mouseup", endMove);
        currTarget.addEventListener("click", targetElem);
        currTarget = null;  
        document.removeEventListener("click", checkClickOutside);
        elemEditor.innerHTML = "";
    }
}

function setTarget(elem) {
    /**
     * Sets elem as a target element and sets styles to show it is being targeted
     */
    currTarget = elem;
    elem.style.border = "2px solid red";
    originalDisplay = elem.style.display;
    elem.style.display = "inline";
}

function loadEditor(elem) {
    /**
     * Load an elements Element Editor
     */
    let details = elemsTracker[elem];
    for (let key in details) {
        if (key == "elem") {
            continue;
        } else if (key == "page") {
            continue;
        }

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", key);

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                details.updateMapper(key, event.target.value)
            }
        })

        let label = document.createElement("label");
        label.innerHTML = key;
        label.setAttribute("for", key);
        input.value = details[key];

        let container = document.createElement("div");
        container.append(label);
        container.append(input);
        
        elemEditor.append(container);
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", function () {
        removeElem(elem);
    });

    elemEditor.append(deleteBtn);
}

function removeElem(elem) {
    /**
     * Clears target then removes an element from the dom and from elemsTracker
     */
    
    clearTarget();
    let currElem = elemsTracker[elem].elem;
    currElem.remove();
    delete elemsTracker[elem];
}

function increasePage() {
    if (currTarget.offsetLeft + currTarget.offsetWidth + 10 > board.offsetWidth) {
        board.style.width = board.offsetWidth + currTarget.offsetWidth + 10 + "px";
    }

    if (currTarget.offsetTop + currTarget.offsetHeight + 10 > board.offsetHeight) {
        board.style.height = board.offsetHeight + currTarget.offsetHeight + 10 + "px";
    }
}

function moveElement(event) {
    let idPageTarget = "#" + pageTarget.id;

    let offset = $(idPageTarget).offset();
    let x = (event.pageX - offset.left);
    let y = parseInt(event.pageY - offset.top);

    let details = elemsTracker[currTarget.id];

    details.updateMapper("x", x);
    details.updateMapper("y", y);

    increasePage();

    elemEditor.innerHTML = "";

    loadEditor(currTarget.id);
}

function startMove() {  
    
    document.getElementById("container").addEventListener("mousemove", moveElement);
    currTarget.removeEventListener("click", targetElem);
    currTarget.removeEventListener("mousedown", startMove);
    currTarget.addEventListener("mouseup", endMove);
}

function endMove(event) {
    let idPageTarget = "#" + pageTarget.id;

    let offset = $(idPageTarget).offset();
    let x = (event.pageX - offset.left);
    let y = parseInt(event.pageY - offset.top);

    let details = elemsTracker[currTarget.id];
    details.updateMapper("x", x);
    details.updateMapper("y", y);
    setElemPage(currTarget);
    clearTarget();
}

function setElemPage(elem) {
    let elemDetails = elemsTracker[currTarget.id];

    // Past page width
    if (elem.offsetLeft > pageTarget.offsetWidth) {
        elemDetails.page = null;
        return;
    } 

    // Before page (width)
    if (elem.offsetLeft < pageTarget.offsetLeft) {
        elemDetails.page = null;
        return;
    }

    // Above page (height)
    if (elem.offsetTop < pageTarget.offsetTop) {
        elemDetails.page = null;
        return;
    }

    // Below page (height)
    if (elem.offsetTop > pageTarget.offsetHeight) {
        elemDetails.page = null;
        return;
    }

    elemDetails.page = pageTarget.id;
}

function targetElem(event) {
    /**
     * Target and element when clicked and populate element editor
     */
    elemEditor.innerHTML = "";

    clearTarget();

    setTarget(event.target);

    loadEditor(currTarget.id);
    currTarget.removeEventListener("click", targetElem);


    document.addEventListener("click", checkClickOutside);

    currTarget.addEventListener("mousedown", startMove);
}

function store(elem) {
    /**
     * Create and store a new element created by the user
     */


    elemsTracker[elem.elem.id] = elem; 

    return elem;
}

function addJSData(elem) {
    if (elem) {
        elem.elem.id = IdCount;
        IdCount += 1
        
        elem.elem.addEventListener("click", targetElem);
    }
}

// Go through every button in nav and add event listeners
for (let elem = 0; elem < elemButtons.length; elem++) {
    let currElem = elemButtons[elem];

    currElem.addEventListener("click", function () {
        let newElem = mapElemCreator(currElem.dataset.name, pageTarget.id);
        addJSData(newElem)
        store(newElem);
        pageTarget.append(newElem.elem);
    })
}