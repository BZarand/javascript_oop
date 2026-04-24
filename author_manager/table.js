import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class TableView extends ViewElement{ //táblázatot tartalmazó viewElement definiálása ViewElementből leszármazva

    /**
     * @type {AuthorManager}
     */
    #manager; //privát tulajdonság a managernek

    /**
     * @type {HTMLTableElement}
     */
    #tbody; //privát tulajdonság a managernek

    /**
     * 
     * @param {string} id 
     * @param {string[]} headerArray
     * @param {AuthorManager} manager
     */
    constructor(id, headerArray, manager){
        super(id); //szülőosztály konstruktorának meghívása
        this.#manager = manager; //a manager értéke a bemeneti manager példány
        const table = document.createElement("table"); //létrehozunk egy táblázatot
        this.div.appendChild(table); //hozzácsatoljuk a táblázatot a divhez
        const thead = createTableHeader(headerArray); //létrehozzul a táblázat fejlécét a string tömb alapján
        table.appendChild(thead); //hozzácsatoljuk a táblázathoz a theadet
        this.#tbody = document.createElement("tbody"); //létrehozzuk a tbodyt
        table.appendChild(this.#tbody); //hozzácsatoljuk a tbodyt a táblehöz
        this.#manager.TableCallback = (authorList) => { //definiáljuk a manager tableCallbackjét
            if(authorList.length == 0){ //ha a lista üres
                const tr = document.createElement("tr"); //létrehzunk egy sor elementet
                this.#tbody.appendChild(tr); //hozzácsatoljuk a tbodyhoz
                const td = createTableCell(tr, "Nincs megjelenítendő sor"); //létrehozunk egy cellát tartalommal és hozzácsatoljuk a sorhoz
                td.colSpan = 3; //kiterjesztjük a cellát 3 oszlopos szélességűre
            } //bele lehetne tenni else ágba
            for(const author of authorList){ //végigiterálunk az authorlistán
                const tr = document.createElement("tr"); //létrehozunk egy sort
                this.#tbody.appendChild(tr); //hozzácsatoljuk a tbodyhoz

                createTableCell(tr, author.name); //létrehozunk egy cellát a sorhoz az author nevével
                createTableCell(tr, author.work); //létrehozunk egy cellát a sorhoz az author workjével
                createTableCell(tr, author.concept); //létrehozunk egy cellát a sorhoz az author conceptjével
            }
        }
        this.activateCallback = () => { //definiáljuk az activateCallbacket
            this.#tbody.innerHTML = ""; //töröljük a tbody tartalmát
            this.#manager.getAllElement(); //meghívjuk a manager getAllElementkét (ami meghjvja a tableCallbacket lásd: authorManager.tableCallback)
        }
    }
}

export {TableView} //exportáljuk a TableViewt