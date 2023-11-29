import { Heading } from "./elementsClasses.js";

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
const headingsConfig = {
    "h1": {
        "text": "Heading One",
        "fontSize": "32px",
    },
    "h2": {
        "text": "Heading Two",
        "fontSize": "24px",
    },
    "h3": {
        "text": "Heading Three",
        "fontSize": "18.72px",
    },
    "h4": {
        "text": "Heading Four",
        "fontSize": "16px",
    },
    "h5": {
        "text": "Heading Five",
        "fontSize": "13.28px",
    },
    "h6": {
        "text": "Heading Six",
        "fontSize": "10.72px",
    },
}

function createHeading (elemName, pageTarget) {
    /**
     * Initialises a heading element and creates its element class
     * @param {String} elemName The name of the type of element to create
     * @param {String} pageTarget Which page the element will be placed
     * @return {Heading}
     */
    let elem;
    elem = document.createElement(elemName);
    elem.innerHTML = headingsConfig[elemName]["text"];
    elem.style.position = "absolute";
    elem.style.color = "black";
    elem.style.left = 0;
    elem.style.top = 0;
    elem.style.fontSize = headingsConfig[elemName]["fontSize"];
    return new Heading(elem, pageTarget);
}

export function mapElemCreator (elemName, pageTarget) {
    /**
     * Finds the matching element initialiser
     * @param {String} elemName The name of the type of element to create
     * @param {String} pageTarget Which page the element will be placed 
     * @return {Heading}
     */
    if (headings.includes(elemName)) {
        return createHeading(elemName, pageTarget);
    }
}