import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement{ //leszármazunk a viewElementből és definiáljuk a FormView osztályt

    /**
     * @type {FormField[]}
     */
    #formInputList; //létrehozzuk a privát formInputList tulajdonságot

    /**
     * @type {AuthorManager}
     */
    #manager; //létrehozzuk a privát manager tulajdonságot

    /**
     * 
     * @param {string} id 
     * @param {import("./index.js").FormFieldType[]} formFieldList
     * @param {AuthorManager} manager
     */
    constructor(id, formFieldList, manager){ //definiáljuk a konstruktort
        super(id); //meghívjuk a szülőosztály konstruktorát
        this.#manager = manager; //értéket adunk a privát manager tulajdonságnak
        this.#formInputList = []; //inicializáljuk a formInputList tulajdonságot
        const form = document.createElement("form"); //létrehozunk egy formot
        for(const field of formFieldList){ //végigiterálunk a bemeneti formFieldList paraméteren
            const formField = new FormField(field.id, field.label, field.name, form); //példányosítjuk a formInputokat
            this.#formInputList.push(formField); //hozzáadjuk a formInputList listához
        }
        const button = document.createElement("button"); // létrehozunk egy gombot
        button.innerText = "Küldés"; //a gomb szövege legyen Küldés
        form.appendChild(button); //a gombot hozzáfűzzük az űraphoz
        const resultDiv = document.createElement("div"); //létrehozunk egy resultDivet a viewElement divhez
        this.div.appendChild(resultDiv); //hozzácsatoljuk a resultDivet a viewElement divhez
        this.div.appendChild(form); //hozzácsatoljuk a formot a divhez

        form.addEventListener("submit", (e) => { //feliratkozunk a form submit eseményére
            e.preventDefault(); //megakadályozzuk az űrlap alapértelmezett működését
            const elem = this.createElement(); //meghívjuk a createElement metódust
            this.#manager.addElement(elem); //meghívjuk a manager addElement függvényét (lásd: AuthorManager.addElement)
        });

        this.#manager.addElementResultCallback = (result) => { //definiáljuk az addElementResultCallbacket
            resultDiv.innerText = result; //beállítjuk a resultDiv értékének a kapott stringet
            setTimeout(() => { //meghívjuk a setTimeoutot
                resultDiv.innerText = ""; //töröljük a resultDiv tartalmát
            }, 1500); //másfél másodperc múlva
        }
    }

    /**
     * @returns {import("./index.js").AuthorType}
     */
    createElement(){ //createElement metódus definiálása
        /**
         * @type {import("./index.js").AuthorType}
         */
        let result = []; //létrehozunk egy AuthorType típusú objektumot
        for(const field of this.#formInputList){ //végigiterálunk a formInputListen
            if(field.validate()){ //meghívjuk minden formInputra a validate függvényt
                result[field.name] = field.value; //a result objektum formInputField name tulajdonságának értékét a formInputField value tulajdonságának értékére állítjuk
            }
        }
        return result;
    }
}

class FormField{ //definiáljuk a FormField osztályt
    /**
     * @type {HTMLInputElement}
     */
    #inputElement; //definiálunk egy privát inputElement tulajdonságot

    /**
     * @type {HTMLDivElement}
     */
    #errorDiv; //definiálunk egy privát errorDiv tulajdonságot

    /**
     * @type {string}
     */
    #name; //definiálunk egy privát name tulajdonságot

    get name(){ //definiálunk egy gettert a name tulajdonságnak
        return this.#name; //visszatérünk a name tulajdonsággal
    }

    get value(){ //definiálunk egy gettert a valuenak
        return this.#inputElement.value ? this.#inputElement.value : undefined; //amennyiben az inputelementnek van beírt értéke, akkor vissztér a beírt értékkel, egyébként undefineddal tér vissza
    }

    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent){ //definiáljuk a konstruktort
        const {input, errorDiv} = createInputAndErrorDiv({id, label, name, parent}); //létrehozunk egy divet ami tartalmat egy labelt, egy inputot és egy errordivet
        this.#name = name; //beállítjuk a name tulajdonság értékét
        this.#inputElement = input; //a visszatérési érték input tulajdonságának értékét állítjuk be
        this.#errorDiv = errorDiv; //a visszatérési érték errorDiv tulajdonságának értékét állítjuk be
    }

    /**
     * @returns {boolean}
     */
    validate(){ //definiálunk egy validate függvényt
        let result = true; //létrehozunk egy result változót igaz értékkel
        if(!this.value){ //ha a vlue getter visszatérési értéke undefined
            this.#errorDiv.innerText = "Mező kitöltése kötelező"; //beállítjuk az errorDiv értékét hibaüzenetre
            result = false; //a result értékét hamisra állítjuk
        }
        else{ //egyébként
            this.#errorDiv.innerText = ""; //töröljük az errorDiv tartalmát
        }
        return result; //visszatérünk a result változóval
    }
}

export {FormView} //exportáljuk a FormViewt