export function getCode(elemsTracker) {
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
