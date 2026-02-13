import {Manager} from "./manager.js";

class FormController{
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {FormFieldType[]}
     */
    #formFieldList;

    /**
     * 
     * @param {FormFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList, manager){
        this.#manager = manager;
        const form = document.createElement("form");
        document.body.appendChild(form);

        this.#formFieldList = [];

        for(const formField of formFieldList){
            const formFieldElem = new FormField(formField.id, formField.name, formField.label, formField.required, form)
            this.#formFieldList.push(formFieldElem);
        }

        const button = document.createElement("button");
        button.innerText = "Küldés";
        form.appendChild(button);

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const elem = this.#createElement();
            if(elem){
                this.#manager.addElement(elem);
                e.target.reset();
            }
        })
    }

    /**
     * @returns {ColspanType | RowspanType | null}
     */
    #createElement(){
        let result = [];
        let valid = true;

        for(const inputField of this.#formFieldList){
            if(inputField.validate()){
                result[inputField.name] = inputField.value;
            }
            else{
                valid = false;
            }
        }
        
        if(valid){
            return result;
        }
        else{
            return null;
        }
    }
}

class FormField{
    /**
     * @type {HTMLInputElement}
     */
    #input;

    /**
     * @type {string}
     */
    #name;

    /**
     * @type {boolean}
     */
    #required

    /**
     * @type {HTMLDivElement}
     */
    #errorDiv

    get value(){
        return this.#input.value ? this.#input.value : undefined;
    }

    get name(){
        return this.#name;
    }

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, name, labelContent, required, parent){
        const div = document.createElement("div");
        parent.appendChild(div);
        div.appendChild(document.createElement("br"));

        const label = document.createElement("label");
        label.innerText = labelContent;
        label.htmlFor = id;
        div.appendChild(label);

        div.appendChild(document.createElement("br"));

        const input = document.createElement("input");
        input.id = id;
        input.name = name;
        div.appendChild(input);
        this.#name = name;
        this.#input = input;

        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error");
        div.appendChild(errorDiv);

        this.#required = required;
        this.#errorDiv = errorDiv;
    }  
    
    /**
     * @returns {boolean}
     */
    validate(){
        let result = true;
        if(this.#required && !this.value){
            result = false;
            this.#errorDiv.innerText = "Kötelező";
        }
        else{
            this.#errorDiv.innerText = "";
        }
        return result;
    }
}

export {FormController}

