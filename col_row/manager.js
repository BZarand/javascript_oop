/**
 * @import {functions.js}
 * 
 * @callback addCallback
 * @param {ColspanType | RowspanType} addCallback
 * @returns {void}
 */

class Manager{
    /**
     * @type {ColspanType[] | RowspanType[]}
     */
    #dataArray;

    /**
     * @type {addCallback}
     */
    #addCallback;

    constructor(){
        this.#dataArray = [];
        
    }

    /**
     * @param {ColspanType | RowspanType} element
     * @returns {void}
     */
    addElement(element){
        this.#dataArray.push(element);
        if(this.#addCallback){
            this.#addCallback(element);
        }
    }

    /**
     * @param {addCallback} callback
     */
    set callbackSetter(callback){
        this.#addCallback = callback;
    }
}

export {Manager};