/**
 * @import {functions.js}
 */

import { Manager } from "./manager.js";
import data from "./data.json" with {type:"json"};

const manager = new Manager();

manager.callbackSetter = function(param){
    console.log(param)
}

for(const item of data.colspanDataArr){
    manager.addElement(item);
}

/**
 * 
 * @param {string} celltxt 
 * @param {HTMLTableRowElement} parentRow 
 * @returns {HTMLTableCellElement}
 */
function createTableTd(celltext, parentRow){
    const td = document.createElement("td");
    td.innerText=celltext;
    parentRow.appendChild(td);
    return td;
}