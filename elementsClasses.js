const nav = document.getElementById("nav");
const container = document.getElementById("container");

export class Heading {
    constructor(elem, fontSize) {
        this.color = "black";
        this.fontSize = fontSize;
        this.align = "left";
        this.elem = elem;
        this.text = elem.innerHTML;
        this.x = 0;
        this.y = 0;
        this.position = "static";
    }

    updateMapper(key, value) {
        switch (key) {
            case "align":
                this.setAlign = value;
                break;
            case "fontSize":
                this.setFontSize = value;
                break;
            case "color":
                this.setColor = value;
                break;
            case "text":
                this.setText = value;
                break;
            case "x":
                this.setX = value;
                break;
            case "y":
                this.setY = value;
                break;
            case "position":
                this.setPosition = value;
                break;
        }
    }

    get getStyle() {
        return "style='" + 
        "color: " + this.color + ";" + 
        "font-size: " + this.fontSize + ";" + 
        "text-align: " + this.align + ";" + 
        "position: " + this.position + ";" +
        "top: " + this.y + ";" + 
        "left: " + this.x + ";'";
    }

    get getItems() {
        return {
            "align": this.align,
            "fontSize": this.fontSize,
            "color": this.color,
            "text": this.text
        }
    }

    set setAlign(align) {
        if (["left", "center", "right"].indexOf(align) >= 0) {
            this.align = align;
            this.elem.style.textAlign = this.align;
        }
    }

    set setColor(color) {
        let strCheck = this.elem.style.color = color;
        
        if (strCheck == "") {
            this.elem.style.color = this.color;
        } else {
            this.color = color;
        }
    }

    set setFontSize(fontSize) {
        let strCheck = this.elem.style.fontSize = fontSize + "px";

        if (strCheck == "") {
            this.elem.style.fontSize = this.fontSize + "px";
        } else {
            this.fontSize = fontSize;
        }
    }

    set setText(text) {
        this.text = text;
        this.elem.innerHTML = this.text;
    }

    set setX(value) {
        value = parseInt(value);
        this.x = value + nav.offsetWidth;

        if (this.x >= nav.offsetWidth + container.offsetWidth) {
            this.x = nav.offsetWidth + container.offsetWidth - this.elem.offsetWidth;
        }

        this.setPosition = "absolute";
        this.elem.style.left = this.x + "px";
    }

    set setY(value) {
        this.y = value;
        this.setPosition = "absolute";
        this.elem.style.top = this.y + "px";
    }

    set setPosition(value) {
        value = value.toLowerCase();

        let validArgs = ["static", "relative", "fixed", "absolute", "sticky"];
        
        for (let i = 0; i < validArgs.length; i++) {
            if (value == validArgs[i]) {
                this.position = value;
                this.elem.style.position = value;        
            }
        }
    }
} 