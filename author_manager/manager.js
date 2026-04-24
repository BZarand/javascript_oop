/**
 * @callback TableCallback
 * @param {Author[]} authorList
 * @returns {void}
 * 
 * @callback AddElementResultCallback
 * @param {string} message
 * @returns {void}
 * 
 * @callback ImportResultCallback
 * @param {string} message
 * @returns {void}
 */

class AuthorManager{ //definiáljuk az AuthorManager osztályt
    /**
     * @type {Author[]}
     */
    #authorList; //definiálunk egy privát authorList tulajdonságot
    
    /**
     * @type {TableCallback}
     */
    #tableCallback; //definiálunk egy privát tableCallback tulajdonságot

    /**
     * @type {AddElementResultCallback}
     */
    #addElementResultCallback; //definiálunk egy privát addElementResultCallback tulajdonságot

    /**
     * @type {ImportResultCallback}
     */
    #importResultCallback; //definiálunk egy privát importResultCallback tulajdonságot

    /**
     * @param {TableCallback} value
     */
    set TableCallback(value){ //definiálunk egy settert a tableCallbacknek (hívjuk a Table-be)
        this.#tableCallback = value; //értéket adunk a privát tulajdonságnak
    }

    /**
     * @param {AddElementResultCallback} value
     */
    set addElementResultCallback(value){ //definiálunk egy settert az addElementResultCallbacknek (hívjuk a Form-ba)
        this.#addElementResultCallback = value; //értéket adunk a callbacknek
    }

    /**
     * @param {ImportResultCallback} value
     */
    set importResultCallback(value){ //definiálunk egy settert az importResultCallbacknek (hívjuk az ImportExportba)
        this.#importResultCallback = value; //irtéket adunk a callbacknek
    }

    constructor(){ //definiáljuk a konstruktort
        this.#authorList = []; //inicializáljuk az authorListet egy üres tömbbel
    }

    /**
     * 
     * @param {import(".").AuthorType} element 
     */
    addElement(element){ //definiálunk az addElement függvényt
        const author = new Author(); //példányosítunk egy authort
        author.id = this.#authorList.length; //beállítjuk az id tulajdonság értékét a következő elérhető indexre
        author.name = element.author; //beállítjuk a name tulajdonságot
        author.work = element.work; //beállítjuk a work tulajdonságot
        author.concept = element.concept; //beállítjuk a concept tulajdonságot
        if(author.validate()){ //meghívjuk a validate függvényt az athor példánynak (lásd: Author.validate), és ha igazat ad vissza
            this.#authorList.push(author); //hozzáadjuk a listához az elemet
            this.#addElementResultCallback("Sikeres elemfelvétel"); //meghívjuk az addElementResultCallbacket
        }
        else{ //egyébként
            this.#addElementResultCallback("Nem volt sikeres az elemfelvétel"); //meghívjuk az addElementResultCallbacket
        }
    }

    /**
     * 
     * @param {import(".").AuthorType[]} elementList 
     */
    addElementList(elementList){ //definiálunk egy addElementList függvényt
        for(const elem of elementList){ //végigiterálunk az elementlistán
            const author = new Author(); //példányosítunk egy authort
            author.id = this.#authorList.length; //beállíjuk az idt
            author.name = elem.author; //beállítjuk a namt
            author.work = elem.work; //beállítjuk a workt
            author.concept = elem.concept; //beállítjuk a conceptet
            if(author.validate()){ //meghívjuk a validate, ha valid
                this.#authorList.push(author); //hozzáadjuk a listához
                this.#importResultCallback("Sikeres volt"); //meghívjuk az importResultCallbacket
            }
            else{
                this.#importResultCallback("Sikertelen művelet"); //meghívjuk az importResultCallbacket
                break; //megállítjuk a ciklus futását, új elemet nem fogunk vizsgálni hogy megfelel-e
            }
        }
    }

    /**
     * @returns {void}
     */
    getAllElement(){ //definiálunk egy getAllElement függvényt
        this.#tableCallback(this.#authorList); //meghívjuk a tableCallback callbacket (implementáció: lásd: TableView.constructor)
    }

    /**
     * @returns {string}
     */
    getExportString(){ //definiálunk egy getExportString függvényt
        const result = []; //definiálunk egy üres tömböt
        for(const author of this.#authorList){ //végigiterálunk az authorList tulajdonság értékein
            result.push(`${author.name};${author.work};${author.concept}`); //hozzáadjuk a tömbhöz a string reprezentációját az entitásnak
        }
        return result.join("\n"); //joinoljuk egy sortörés karakterrel a tömb string elemeit
    }
}

class Author{ //definiáljuk egy Author entitás osztályt

    /**
     * @type {string}
     */
    #id; //definiálunk egy privát id tulajdonságot

    /**
     * @type {string}
     */
    #name; //definiálunk egy privát name tulajdonságot

    /**
     * @type {string}
     */
    #work; //definiálunk egy privát work tulajdonságot

    /**
     * @type {string}
     */
    #concept; //definiálunk egy privát concept tulajdonságot

    get id(){ //definiálunk gettert az azonosítónak 
        return this.#id; //visszatérünk a privát id tulajdonsággal
    }

    get name(){ //definiálunk gettert a namenek 
        return this.#name; //visszatérünk a privát name tulajdonsággal
    }

    get work(){ //definiálunk gettert a worknek 
        return this.#work; //visszatérünk a privát work tulajdonsággal
    }

    get concept(){ //definiálunk gettert a conceptnek
        return this.#concept; //visszatérünk a privát concept tulajdonsággal
    }


    set id(value){ //definiálunk settert az azonosítónak
        this.#id = value; //beállítjuk az idt
    }

    set name(value){ //definiálunk settert a namenek
        this.#name = value; //beállítjuk a namet
    }

    set work(value){ //definiálunk settert a worknek
        this.#work = value; //beállítjuk a worköt
    }

    set concept(value){ //definiálunk settert a conceptnek
        this.#concept = value; //beállítjuk a conceptet
    }

    /**
     * @returns {boolean}
     */
    validate(){ //definiálunk egy validate függvényt a példánynak
        return this.#name && this.#concept && this.#work; //ha mindennek helyes értéke van, akkor igazzal tér vissza, egyébként hamissal
    }
}

export {AuthorManager} //exportáljuk az AuthorManagert