
function myFunction() 
{   
    

    // dec to bin 
   function convertDecimalToBinary(number){
    var bin = Number(number).toString(2);
    return bin;
    }

    // dec to hex 
    function decimalToHex(d) {

    var hex = Number(d).toString(16);
   
    return hex;
    }

    // dec to oct
    function toOctal(num) {
        var oct = Number(num).toString(8);
        return oct;
    }
    
    var dec = document.getElementById('decval').value;

    console.log(dec);

    // dec to bin
    var binv =  convertDecimalToBinary(dec);
    document.getElementById("binval").value = binv;
   
    // dec to hex
    var hev = decimalToHex(dec);
    document.getElementById("hexval").value = hev;

    // dec to oct
    var octv=  toOctal(dec);
    //const octv =parseInt(dec, 8);
    document.getElementById("octval").value = octv;

  }

  function myFunction3() {

    document.getElementById("title").innerHTML = "CONVERT BINARY VALUE TO";
    document.getElementById("decval").placeholder = "Enter Binary Value";
    document.getElementById("binval").placeholder = " Decimal Value";
    document.getElementById("ntitle").innerHTML = "Decimal Value:";
    document.getElementById("btn").onclick = function() {myFunction2()};;

    
  }
  
  function myFunction2()
  {
    var binary = document.getElementById('decval').value;
    
   
    if (binary === '') return alert('Please, enter a binary number');
    binary.split('').map((char) => {
        if (char !== '0' && char !== '1') return alert('Please, enter a binary number');
    });

    const decimal = parseInt(binary, 2);
    document.getElementById('binval').value = decimal;

    const hexa = parseInt(binary, 2).toString(16);
    document.getElementById('hexval').value = hexa;

    const octa = parseInt(binary, 2).toString(8);
    document.getElementById('octval').value = octa;

 }