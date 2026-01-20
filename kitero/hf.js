function Tanyer(szin, meret) {
    this.szin = szin;
    this.meret = meret;
}

function Pohar(szin) {
    this.szin = szin;
}

const tanyer1 = new Tanyer("piros", "kicsi");
const tanyer2 = new Tanyer("kék", "nagy");
const tanyer3 = new Tanyer("zöld", "kicsi");

const pohar1 = new Pohar("narancssárga");

console.log(tanyer1);
console.log(tanyer2);
console.log(tanyer3);
console.log(pohar1);


//-------------------------------------------------------------------------


class Tanyer2 {
    constructor(szin, meret) {
        this.szin = szin;
        this.meret = meret;
    }
}

class Pohar2 {
    constructor(szin) {
        this.szin = szin;
    }
}

const tanyer4 = new Tanyer2("sárga", "nagy");
const tanyer5 = new Tanyer2("lila", "nagy");
const tanyer6 = new Tanyer2("kék", "kicsi");

const pohar2 = new Pohar2("zöld");

console.log(tanyer4);
console.log(tanyer5);
console.log(tanyer6);
console.log(pohar2);