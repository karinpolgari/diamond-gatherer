var tema = ["Love","I","JavaScript"];
document.getElementById("k").innerHTML= tema;

function schimbare() {
    tema.splice(0,2, "I", "Love");
    document.getElementById("k").innerHTML = tema;
  }

  var ex2 = ["Paul", 1, false, { 
      name: "Jon Snow"}, [1, 2, 3], null, undefined, function() {
           console.log('Test')} ]
var len = ex2.length ;
for (let i = 0; i < len; i ++)
{
    console.log("pozitie: " + i + " Valoare:" + ex2[i] + " Tip:" + typeof ex2[i] )
}


