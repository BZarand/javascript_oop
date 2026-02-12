/**
 * @callback Tablecallback
 * @param {HTMLTableSectionElement} tbody
 * @param {import("./functions").ColspanType | import("./functions").RowspanType} type
 * @returns {void}
 */

import { Manager } from "./manager.js";
import("functions.js").HeaderArrayType;

class Table{
    /**
     * @type {HTMLTableElement}
     */
    #tbody
    /**
     * @type {Manager}
     */
    #manager

    /**
     * 
     * @param {HeaderArrayType} headerArray 
     * @param {Manager} manager
     */
    constructor(headerArray, manager){
        this.#manager = manager;

        const table = document.createElement("table");
        document.body.appendChild(table);

        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        thead.appendChild(tr);

        for(const item of headerArray){
            const th = document.createElement("th")
            th.innerText = item;
            tr.appendChild(th);
            if(h.colspan){th.colSpan=2};
        }

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        this.#tbody=tbody;
    }
    /**
     * 
     * @param {TableCallback} callback 
     */
    setAppendRow(callback){
        this.#manager.callbackSetter = (elem) => {
            callback(this.#tbody, elem);
        }
    }
}

export {Table}