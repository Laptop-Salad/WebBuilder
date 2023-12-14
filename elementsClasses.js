import { setColor, setFontSize, setText, setX, setY, setPosition } from "./validators.js";

const Element = {
    elem: '',
    page: '', // null if on canvas, otherwise page id
}

export class Heading {
    /**
     * Handles elements h1-h6
     */
    constructor(elem, page) {        
        this.elem = elem;
        this.page = page;
    }

    updateMapper(key, value) {
        switch (key) {
            case "fontSize":
                setFontSize(this.elem, value);
                break;
            case "color":
                setColor(this.elem, value);
                break;
            case "text":
                setText(this.elem, value);
                break;
            case "x":
                setX(this.elem, value);
                break;
            case "y":
                setY(this.elem, value);
                break;
            case "position":
                setPosition(this.elem, value);
                break;
            case "page":
                this.page = value;
                break;
        }
    }

    getEditableProperties() {
        return [
            {
                "system_name" : "fontSize",
                "display_name": "Text Size (px)",
                "value": this.elem.style.fontSize
            }, 
            {
                "system_name": "color",
                "display_name": "Colour",
                "value": this.elem.style.color
            },
            {
                "system_name": "text",
                "display_name": "Text",
                "value": this.elem.innerHTML
            },
            {
                "system_name": "x",
                "display_name": "x",
                "value": this.elem.style.left
            },
            {
                "system_name": "y",
                "display_name": "y",
                "value": this.elem.style.top
            },
            {
                "system_name": "position",
                "display_name": "Position",
                "value": this.elem.style.position
            },
        ]
    }

    set setPage(value) {
        this.page = value;
    }
} 

export class Paragraph {
    /**
     * Handles paragraph
     */
    constructor(elem, page) {        
        this.elem = elem;
        this.page = page;
    }

    updateMapper(key, value) {
        switch (key) {
            case "fontSize":
                setFontSize(this.elem, value);
                break;
            case "color":
                setColor(this.elem, value);
                break;
            case "text":
                setText(this.elem, value);
                break;
            case "x":
                setX(this.elem, value);
                break;
            case "y":
                setY(this.elem, value);
                break;
            case "position":
                setPosition(this.elem, value);
                break;
            case "page":
                this.page = value;
                break;
        }
    }

    getEditableProperties() {
        return [
            {
                "system_name" : "fontSize",
                "display_name": "Text Size (px)",
                "value": this.elem.style.fontSize
            }, 
            {
                "system_name": "color",
                "display_name": "Colour",
                "value": this.elem.style.color
            },
            {
                "system_name": "text",
                "display_name": "Text",
                "value": this.elem.innerHTML
            },
            {
                "system_name": "x",
                "display_name": "x",
                "value": this.elem.style.left
            },
            {
                "system_name": "y",
                "display_name": "y",
                "value": this.elem.style.top
            },
            {
                "system_name": "position",
                "display_name": "Position",
                "value": this.elem.style.position
            },
        ]
    }

    set setPage(value) {
        this.page = value;
    }
} 