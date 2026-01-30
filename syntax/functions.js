// function Muvelet(a, b, callback){
//     return callback(a, b);
// }

const Muvelet = (a, b, callback) => {
    const result = callback(a, b);
    return {
        result : result
    };
};

function MuveletLetrehoz(jel){
    if(jel == "+"){
        return (a, b) => {return a + b;}
    }
}

export {Muvelet, MuveletLetrehoz};