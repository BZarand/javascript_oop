/**
 * @callback TableCallback
 * @param {HTMLTableSectionElement} tbody
 * @param {ColspanType | RowspanType} table
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
        }

        this.#tbody = createElement("tbody");
        table.appendChild(this.#tbody);
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

