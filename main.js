import { mapElemCreator } from "./elemCreator.js";
import { getCode } from "./getCode.js";

const nav = document.getElementById("nav");
const elemButtons = nav.querySelectorAll("button");
const display = document.getElementById("container");
const elemEditor = document.getElementById("elemEditor");
const codeBtn = document.getElementById("codeBtn");
const codeBox = document.getElementById("codeBox");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");

let IdCount = 0;

let currTarget = null;

let elemsTracker = {};

let originalDisplay = ""

let elemTaps = 0;

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
    if (currTarget && !event.target.closest(currTarget.nodeName) && event.target.id != currTarget.id && event.target.id == "container") {    
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
        }

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", key);

        input.addEventListener("keypress", function (event) {
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

function moveElement(event) {
    let x = event.clientX;
    let y = event.clientY;

    if (event.clientX >= nav.offsetWidth + container.offsetWidth - currTarget.offsetWidth) {
        return;
    }

    currTarget.style.top = y + "px";
    currTarget.style.left = x + "px";
}

function startMove(event) {    
    event.target.style.position = "absolute";

    let x = event.clientX;
    let y = event.clientY;
    currTarget.style.top = y + "px";
    currTarget.style.left = x + "px";
    
    document.getElementById("container").addEventListener("mousemove", moveElement);
    currTarget.removeEventListener("click", targetElem);
    currTarget.removeEventListener("mousedown", startMove);
    currTarget.addEventListener("mouseup", endMove);
}

function endMove() {
    let elemClass = elemsTracker[currTarget.id];
    elemClass.position = "absolute";
    elemClass.x = currTarget.style.left;
    elemClass.y = currTarget.style.top;
    clearTarget();
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

    elemTaps = 1;

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
        let newElem = mapElemCreator(currElem.dataset.name);
        addJSData(newElem)
        store(newElem);
        display.append(newElem.elem);
    })
}