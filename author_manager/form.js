import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement{
    /**
     * 
     * @param {string} id 
     */
    constructor(id){
        super(id);
        this.div.innerText = "Form";
    }
}

export {FormView}