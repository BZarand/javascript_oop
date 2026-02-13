/**
 * @import {functions.js}
 * 
 * @callback addCallback
 * @param {import('./functions')ColspanType | RowspanType} addCallback
 * @returns {void}
 */

class Manager{
    /**
     * @type {ColSpanType[] | RowSpanType[]}
     */
    #dataArray;

    /**
     * @type {addCallback}
     */
    #addCallback;

    /**
     * @param {addCallback} value
     */
    set addCallback(value){
        this.#addCallback = value;
    }
    
    constructor(){
        this.#dataArray=[]
    }

    /**
     * 
     * @param {ColspanType | RowspanType} colRowType 
     * @returns {void}
     */
    addElement(colRowType){
        this.#dataArray.push(colRowType)
        if(this.#addCallback){this.#addCallback(colRowType)}
    }
}

export {Manager};