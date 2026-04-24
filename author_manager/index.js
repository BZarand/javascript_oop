
/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js";
import { ImportView } from "./importexport.js";
import { AuthorManager } from "./manager.js";
import { NavigationBar } from "./navigationBar.js"
import { TableView } from "./table.js";

const formFields = [{ //létrehozunk egy formField listát, ami alapján példányosítja a FormView a FormInput osztályt
    id: 'author',
    label: 'Név',
    name: 'author'
},
{
    id: 'work',
    label: 'Mű',
    name: 'work'
},
{
    id: 'concept',
    label: 'Fogalom',
    name: 'concept'
}]

const headerArray = ['Szerző', 'Mű', 'Fogalom'] //létrehozunk egy header listát

const manager = new AuthorManager(); // példányosítjuk a AuthorManager osztályt

const navbar = new NavigationBar(); //példányosítjuk a NavigationBar osztályt
navbar.appendTo(document.body); //a navbar-t hozzáfűzzük a body-hoz

const tableView = new TableView("table", headerArray, manager); //példányosítjuk a table-t
tableView.appendTo(document.body); //a tableView-t hozzáfűzzük a body-hoz
navbar.addViewElement("Táblázat", tableView); //hozzáadjuk a tablet a navbar-hoz

const formView = new FormView("tableForm", formFields, manager); //példányosítjuk a formView-t
formView.appendTo(document.body); //a formView-t hozzáfűzzük a body-hoz
navbar.addViewElement("Form", formView); //hozzáadjuk a formView-t a navbar-hoz

const importExport = new ImportView("importExport", manager); //példányosítjuk az importExportot
importExport.appendTo(document.body); //az importExportot hozzáfűzzük a body-hoz
navbar.addViewElement("ImportExport", importExport); //hozzáadjuk az importExportot a navbar-hoz
navbar.activate("table"); //meghívjuk a navbar activate metódusát a table azonosítójával