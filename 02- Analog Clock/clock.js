
//second needle rotation
const secondhand = document.querySelector('.second-hand');

//min needle rotation
const minhand = document.querySelector('.min-hand');

//hr needle rotation
const hrhand = document.querySelector('.hour-hand');

function setdata()
{
    const now = new Date();
    const sec = now.getSeconds();
    const secdegree = ((sec/60)*360+90);
    secondhand.style.transform = `rotate(${secdegree}deg)`;

    const min = now.getMinutes();
    const mindegree = ((min/60)*360)+((sec/60)*6)+90; //((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minhand.style.transform = `rotate(${mindegree}deg)`;

    const hr = now.getHours();
    const hrdegree = ((hr/12)*360)+((min/60)*30)+90;  
    hrhand.style.transform = `rotate(${hrdegree}deg)`;
    
    

}
setInterval(setdata, 1000);

//min needle rotation

