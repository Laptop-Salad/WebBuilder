export class Heading {
    constructor(elem, fontSize) {
        this.color = "black";
        this.fontSize = fontSize;
        this.align = "left";
        this.elem = elem;
        this.text = elem.innerHTML;
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
        }
    }

    get getStyle() {
        return "style='" + 
        "color: " + this.color + ";" + 
        "font-size: " + this.fontSize + ";" + 
        "align" + this.align + ";'";
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
}

export class Paragraph {
    constructor(elem, fontSize) {
        this.color = "black";
        this.fontSize = fontSize;
        this.align = "left";
        this.elem = elem;
        this.text = elem.innerHTML;
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
        }
    }

    get getStyle() {
        return "style='" + 
        "color: " + this.color + ";" + 
        "font-size: " + this.fontSize + ";" + 
        "align" + this.align + ";'";
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
}