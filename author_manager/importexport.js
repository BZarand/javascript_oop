import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class ImportView extends ViewElement{ //definiáljuk az ImportView osztályt, ami leszármazik a ViewElementből

    /**
     * @type {AuthorManager}
     */
    #manager; //privát manager tulajdonság definiálása

    /**
     * 
     * @param {string} id 
     * @param {AuthorManager} manager 
     */
    constructor(id, manager){ //konstruktor definiálása
        super(id); //szülőosztály konstruktorának meghívása
        this.#manager = manager; //manager tulajdonságnak az érték megadása
        const fileInput = document.createElement("input"); //input elem létrehozása
        fileInput.type = "file"; //input elem típusának file-ra állítása
        this.div.appendChild(fileInput); //input elem hozzáfűzése a divhez
        const resultDiv = document.createElement("div"); //div létrehozása
        this.div.appendChild(resultDiv); //resultDiv hozzácsatolása a divhez
        this.#manager.importResultCallback = (message) => { //importResultCallback függvény definiálása
            resultDiv.innerText = message; //ressultDiv tartalmának bellítása
            setTimeout(() => { //setTimeout meghívása
                resultDiv.innerText = ""; //resultDiv tartalmának törlése
            }, 1500); //másfél másodperc múlva
        }
        fileInput.addEventListener("change", (e) => { //input change eseményére való feliratkozás
            const file = e.target.files[0]; //elkérjük az esemény targetjének a files tolajdonságából az első elemet
            const reader = new FileReader(); //példányosíjuk a FileReader osztályt

            reader.onload = () =>{ //feliratkozunk a reader load eseményére a callbackel (akkor fut le, ha a fájl beolvasása a memóriába sikeres volt)
                /**
                 * @type {import("./index.js").AuthorType[]}
                 */
                const result = []; //létrehozunk egy result tömböt üres tömbként
                const fileContent = reader.result; //elkérjük a fileReader példány result tulajdonságát
                const fileContentLines = fileContent.split("\n"); //szétválasztjuk a fájl tartalmát soronként
                for(const line of fileContentLines){ //végigiterálunk a sorokon
                    const data = line.split(";"); //szétválasztjuk a sorokat ; ként
                    /**
                     * @type {import("./index.js").AuthorType}
                     */
                    const authorType = { //deklarálunk egy author típusú objektumot
                        author: data[0], //ahol az author a sor első pontosvesszőjéig tartó string
                        work: data[1], //ahol a work a sor második pontosvesszőjéig tartó string
                        work: data[1], 
                        concept: data[2] //a második pontosvessző utáni rész legyen a concept
                    };
                    result.push(authorType); //hozzáadjuk az objektumot a result tömbhöz
                }
                this.#manager.addElementList(result); //meghívjuk a tömbbel az AuthorManager.addElementList metódusát
            }
            reader.readAsText(file, "UTF-8"); //elkezdjük beolvasni a fájlt a memódiába (ha sikeres akkor fut le az onloadban megadott callback)
        })

        const exportButton = document.createElement("button"); //létrehozunk egy gombot
        exportButton.innerText = "Export"; //gomb szövege
        this.div.appendChild(exportButton); //hozzáfűzzük a divhez a gombot
        exportButton.addEventListener("click", () => { //feliratkozunk a gomb klikk eseményére
            const a = document.createElement("a"); //létrehozunk egy linket
            const fileContent = this.#manager.getExportString(); //elkérjük az authorok string reprezentációjat az AuthorManagertől
            const file = new Blob([fileContent]); //példányosítunk egy Blobot, amelynek megadunk egy tömböt, ami tartalmazza az authorok string reprezentációját
            const fileUrl = URL.createObjectURL(file); //létrehozunk egy URL-t a Blob alapján
            a.href = fileUrl; //megadjuk a link href tulajdonságának a Blob URL-jét
            a.download = "export.csv"; //megadjuk a letöltendő fájl nevét
            a.click(); //clickelünk a linken
            URL.revokeObjectURL(a.href); //visszavonjuk a blob linkjének az URL-jét
        })
    }
}

export {ImportView} //exportáljuk az ImportView osztályt