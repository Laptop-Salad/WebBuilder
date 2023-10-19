export function moveElement(event) {
    let currElem = event.target;

    let x = event.clientX;
    let y = event.clientY;

    if (event.clientX >= nav.offsetWidth + container.offsetWidth - currElem.offsetWidth) {
        return;
    }

    currElem.style.top = y + "px";
    currElem.style.left = x + "px";
}

export function startMove(event) {  
    let currElem = event.target;  
    currElem.style.position = "absolute";

    let x = event.clientX;
    let y = event.clientY;
    currElem.style.top = y + "px";
    currElem.style.left = x + "px";
    
    document.getElementById("container").addEventListener("mousemove", moveElement);
    currElem.removeEventListener("click", targetElem);
    currElem.removeEventListener("mousedown", startMove);
    currElem.addEventListener("mouseup", endMove);
}

export function endMove(event) {
    let currElem = event.target;  

    let elemClass = elemsTracker[currTarget.id];
    elemClass.position = "absolute";
    elemClass.x = currElem.style.left;
    elemClass.y = currElem.style.top;
    clearTarget();
}