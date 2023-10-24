export function getCode(elemsTracker) {
    /**
     * Generate code
     */
    let str = `
    &lt;!DOCTYPE html&gt;
    &lt;html lang&#x3D;&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset&#x3D;&quot;UTF-8&quot;&gt;
        &lt;meta name&#x3D;&quot;viewport&quot; content&#x3D;&quot;width&#x3D;device-width, initial-scale&#x3D;1.0&quot;&gt;
    
        &lt;style&gt;
        body {
          overflow: hidden;
        }
        &lt;&#x2F;style&gt;
        &lt;title&gt;Document&lt;&#x2F;title&gt;
    &lt;&#x2F;head&gt;
    &lt;body&gt;\n`;

    for (let key in elemsTracker) {
        let details = elemsTracker[key];
        let cssInline = details.getStyle;
        let outer = details.elem.outerHTML;

        let indexFirstClose = outer.indexOf(">");
        let elemStr = outer.slice(0, indexFirstClose) + " " + 
        cssInline + " " + outer.slice(indexFirstClose) + " ";

        str += "       " + elemStr.replace(/</g, '&lt;').replace(/>/g, '&gt;') + "\n";
    }

    str += `    &lt;&#x2F;body&gt;
    &lt;&#x2F;html&gt;`;

    return str;
}
