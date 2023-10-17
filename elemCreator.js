import { Heading, Paragraph } from "./elementsClasses.js";

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
const headingsConfig = {
    "h1": {
        "text": "Heading One",
        "fontSize": "32"
    },
    "h2": {
        "text": "Heading Two",
        "fontSize": "24"
    },
    "h3": {
        "text": "Heading Three",
        "fontSize": "18.72"
    },
    "h4": {
        "text": "Heading Four",
        "fontSize": "16"
    },
    "h5": {
        "text": "Heading Five",
        "fontSize": "13.28"
    },
    "h6": {
        "text": "Heading Six",
        "fontSize": "10.72"
    },
}

function createHeading (elemName) {
    let elem;
    elem = document.createElement(elemName);
    elem.innerHTML = headingsConfig[elemName]["text"];
    return new Heading(elem, headingsConfig[elemName]["text"]);
}

export function mapElemCreator (elemName) {
    if (headings.includes(elemName)) {
        return createHeading(elemName);
    }
}