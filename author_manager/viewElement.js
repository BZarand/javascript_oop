/**
 * @callback ActivateCallback
 * @returns {void}
 */

import { show, hide } from "./gomszab.min.js";
class ViewElement{ //Ősosztály a megjelenítendő view osztályoknak
    /**
     * @type {HTMLDivElement}
     */
    #div; //példányosításkor létrehozunk egy divet az elemnek, azt tároljuk el benne

    /**
     * @type {string}
     */
    #id; //privát tulajdonság az osztály példányosításának

    /**
     * @type {ActivateCallback}
     */ 
    #activateCallback; //akkor fut le, amikor megjelenik az elem a képernyőn (opcionális lásd: activate függvény)

    get div(){ //getter definiálása a divnek
        return this.#div; //visszatér a privát div tulajdonsággal
    }

    get id(){ //getter az azonosítónak (navigációkor használatos)
        return this.#id;
    }

    /**
     * @param {ActivateCallback} value
     */
    set activateCallback(value){ //setter az activateCallbacknek
        this.#activateCallback = value; //beállítja az activateCallbacknek a bemeneti paramétert
    }

    /**
     * 
     * @param {string} id 
     */
    constructor(id){ //konstruktor, bemeneti azonosítóval
        this.#id = id; //azonosító beállítása
        this.#div = document.createElement("div"); //div létrehozása és a div privát tulajdonság beállítása
        this.#div.id = id; //div azonosítójának beállítása
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    appendTo(parent){ //definiálunk egy függvényt a példánynak, a bemeneti paraméter egy html elem
        parent.appendChild(this.#div); //a html elemhez hozzácsatoljuk a div tulajdonságot (éásd: konstruktor)
    }

    /**
     * 
     * @param {string} id 
     */
    activate(id){ //függvényt definiálunk a példányoknak
        if(this.#id === id){ //összehasonlítjuk a bemeneti id paramétert az id tulajdonsággal
            show(this.#div); // a divtől elveszi a hiddem css osztályt
            if(this.#activateCallback){ //ha van activateCallback
                this.#activateCallback(); //akkor meghívjuk az activateCallbacket
            }
        }
        else{ //egyébként
            hide(this.#div); //hozzáfűzzük az elemhez a hidden css osztályt
        }
    }
}

export {ViewElement}; //exportáljuk a viewElementet