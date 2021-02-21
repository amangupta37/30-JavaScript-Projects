const btn = document.getElementById("clk");
const input = document.getElementById("inpt-box");
//const output = document.getElementById("box");
const wmsg= document.getElementById("wait-msg")
const reload=document.getElementById("load-size");

const url = "https://api.unsplash.com/search/photos?query=";


function recivedata(datain){
    return url + datain + "&client_id=1M2Bjw3fQ9ZcA8inqDboIgXzHhHL2CqsELWniCElfbQ&per_page=30";
}

 btn.addEventListener("click", function(){

    console.log("one click");
   console.log(input.value);

  
   const inputdata = input.value;
    // output.innerText=input.value;
    if(inputdata!="")
    {
    wmsg.innerText="Wait 🔄 Fetching your Result It will display here 👇  !!!";
    }
    else
    {
      alert("Enter a Valid Input");
     
    }
     fetch(recivedata(inputdata))
     .then(response => response.json())
     .then(json => {
      json.results.forEach(photo => {
       
     let newres = `<img src="${photo.urls.regular}">`;
     $("#box").append(newres);

   
   });
 });

 });

 reload.addEventListener("click", function(){
  location.reload();
 })