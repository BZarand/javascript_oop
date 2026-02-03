// import { Muvelet, MuveletLetrehoz } from "./functions.js";

// const input1 = document.createElement("input");
// input1.id = "input1";
// document.body.appendChild(input1);
// const input2 = document.createElement("input");
// input2.id = "input2";
// document.body.appendChild(input2);

// const div = document.createElement("div");
// document.body.appendChild(div);

// const button = document.createElement("button");
// button.innerText = "Gomszab"
// document.body.appendChild(button);

// button.addEventListener("click", function(){
//     const sz1 = Number(input1.value);
//     const sz2 = Number(input2.value);
    
//     const {result} = Muvelet(sz1, sz2, MuveletLetrehoz("+"));
//     div.innerText = result;
// })

// const fv = MuveletLetrehoz("+");
// console.log(fv(1, 2));


import Gomb from "./gomb.js";

const input1 = document.createElement("input");
document.body.appendChild(input1);

const input2 = document.createElement("input");
document.body.appendChild(input2);

const eredmenyDiv = document.createElement("div");
document.body.appendChild(eredmenyDiv);

document.body.appendChild(document.createElement("br"));

// összeadás
new Gomb(input1, input2, "+", eredmenyDiv);

// kivonás
new Gomb(input1, input2, "-", eredmenyDiv);

// szorzás
new Gomb(input1, input2, "*", eredmenyDiv);