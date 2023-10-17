import { mapElemCreator } from "./elemCreator.js";

const nav = document.getElementById("nav");
const elemButtons = nav.querySelectorAll("button");
const display = document.getElementById("container");
const elemEditor = document.getElementById("elemEditor");
const codeBtn = document.getElementById("codeBtn");
const codeBox = document.getElementById("codeBox");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");

let IdCount = 0

let currTarget = null;

let elemsTracker = {};

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
    codeBox.innerHTML = getCode();
})

function getCode() {
    /**
     * Generate code
     */
    let str = "";

    for (let key in elemsTracker) {
        let details = elemsTracker[key];
        let cssInline = details.getStyle;
        let outer = details.elem.outerHTML;

        let indexFirstClose = outer.indexOf(">");
        let elemStr = outer.slice(0, indexFirstClose) + " " + 
        cssInline + " " + outer.slice(indexFirstClose) + " ";

        str += elemStr.replace(/</g, '&lt;').replace(/>/g, '&gt;') + "\n";
    }

    return str;
}

function checkClickOutside(event) {
    /**
     * If an element is being targeted, and another element or the container is clicked, remove target
     */
    if (currTarget && !event.target.closest(currTarget.nodeName) && event.target.id == "container") {
        clearTarget();
    }
}

function clearTarget() {
    /**
     * Remove the target from an element
     */
    if (currTarget) {
        currTarget.style.border = "none"; 
        currTarget = null;   
        document.removeEventListener("click", checkClickOutside);
        elemEditor.innerHTML = "";
    }
}

function setTarget(elem) {
    currTarget = elem;
    elem.style.border = "2px solid red";
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
        elemEditor.append(label);
        elemEditor.append(input);
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

function moveElem(event) {
    /**
     * Target and element when clicked and populate element editor
     */
    clearTarget();

    setTarget(event.target)

    loadEditor(currTarget.id);

    document.addEventListener("click", function (event) {
        checkClickOutside(event);
    })
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
        
        elem.elem.addEventListener("click", function (event) {
            elemEditor.innerHTML = "";
            moveElem(event);
        });
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