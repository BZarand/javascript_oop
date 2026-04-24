import { createRadioButton } from "./gomszab.min.js";
import { ViewElement } from "./viewElement.js";

class NavigationBar extends ViewElement{ //navigationBar osztály definíciója
    /**
     * @type {ViewElement[]}
     */
    #viewElementList; //privát tulajdonság, ami tartalmazza a megjelenítendő viewElement leszármazottakat (táblázat, form, importExport)

    constructor(){ //konstruktor definíció
        super("navbar"); //meghívjuk a szülőosztály konstruktorát
        this.div.addEventListener("change", (e) => { //feliratkozunk a div change eseményére (mivel a div rádiógombokat fog tartalmazni, ezért tudjuk figyelni a divnél, hogy melyik radiógomb lesz kiválasztva)
            const radioButtonValue = e.target.value; //elkérjük a target value értékét
            this.activate(radioButtonValue); //meghívjuk az activate függvényt a kiválasztott rádiógomb értékével (a viewElement azonosítói lehetnek lásd: addViewElement)
        })
        this.#viewElementList = []; //inicializáljuk a viewElementListet egy üres tömbbel
    }
    /**
     * 
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addViewElement(label, viewElement){ //navigationBar példányának definiál egy függvényt
        this.#viewElementList.push(viewElement); //bemeneti viewElementet hozzáadjuk a viewElementListhez
        const div = createRadioButton({id: viewElement.id, name: this.id, label}); //csinálunk egy rádiógombot, amelynek az azonosítója
        //és a name, az a navigationBar azonosítója. Azért mert a rádiógomboknál ha azonos a name tulajdonság, csak egy
        this.div.appendChild(div); //hozzáfűzzük a divhez a rádiógomb krelás visszatérési értékét (this.div lásd: ViewElement osztály definíció)
    }

    /**
     * @override
     * @param {string} value 
     */
    activate(value){ //a szülő osztály definiál egy activate függvényt (lásd: ViewElement.activate), de a navigáció bár más
        this.div.querySelector(`#${value}`).checked = true; //a diven belül lekérjük a bemeneti paraméterrel megegyező id-jú elemet és kijelöltre állítjuk
        for(const viewElement of this.#viewElementList){ //végigiterálunk a viewElementListen (table, form, importExport)
            viewElement.activate(value); //megívjuk az activate függvényét minden viewElementnek (lásd: ViewElement.activate)
        }
    }
}

export {NavigationBar};