//console.log("hello world !!")
const btn = document.getElementById("active-btn");
const input = document.getElementById("txt-style");
const output = document.getElementById("output-box");

const url = "https://api.funtranslations.com/translate/minion.json";
const encrypt_url = encodeURI(url);

function getdata(datain) {
    return encrypt_url + "?" + "text=" + datain;
}
function handelerror(error) {
    console.log("error occured", error);
    alert("Server is down now try after sometime");
}

btn.addEventListener("click", function () {
    console.log(input.value);
    const inputdata = input.value;

    fetch(getdata(inputdata))
        .then((response) => response.json())
        .then((json) => {
            const convertedtext = json.contents.translated;
            output.innerText = convertedtext;
        })

        .catch(handelerror);
});
