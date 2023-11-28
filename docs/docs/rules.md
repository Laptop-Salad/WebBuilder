# Rules
This document covers any rules that apply either to the entire codebase or multiple parts of the codebase. These rules mainly are naming conventions.

1. When referencing an element that you would use inside the canvas it should be named a certain way to immediately understand whether the variable is referencing the HTML object or the elements' object to keep track of details.

```
let elemDetails; // Element's object
let elem; // Element's HTML object
let elemId; // The Element's id

```