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

// Table.setAppendRow((tbody, elem)) => {
//     const tr = tbody.appendChild(document.createElement("tr"));
//     const nevtd = tr.appendChild(document.createElement("td"));
//     nevtd.innerText = elem.nev            
// }