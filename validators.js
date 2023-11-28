export function setColor(elem, color) {
    let strCheck = elem.style.color = color;
    
    if (strCheck == "") {
        elem.style.color = color;
    }
}

export function setFontSize(elem, fontSize) {
    let strCheck = elem.style.fontSize = fontSize + "px";

    if (strCheck == "") {
        elem.style.fontSize = fontSize + "px";
    }
}

export function setText(elem, text) {
    elem.innerHTML = text;
}

export function setX(elem, value) {
    value = parseInt(value);
    setPosition = "absolute";
    elem.style.left = value + "px";
}

export function setY(elem, value) {
    setPosition = "absolute";
    elem.style.top = value + "px";
}

export function setPosition(elem, value) {
    value = value.toLowerCase();

    let validArgs = ["static", "relative", "fixed", "absolute", "sticky"];
    
    for (let i = 0; i < validArgs.length; i++) {
        if (value == validArgs[i]) {
            elem.style.position = value;        
        }
    }
}
