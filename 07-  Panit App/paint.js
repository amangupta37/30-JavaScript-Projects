const grabcanvas = document.getElementById('canv');
const ctx  = grabcanvas.getContext('2d');

grabcanvas.width = window.innerWidth;
grabcanvas.height = window.innerHeight;


ctx.strokeStyle = "#BADASS";
ctx.lineJoin = 'round';
ctx.lineCap='round';
ctx.lineWidth = 40;

let isdraw = false;
let lastX=0;
let lastY=0;
let hue=0;

function draw(e)
{
    if(!isdraw)
    {
        return;

    }
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    console.log(e);

    ctx.beginPath();

    ctx.moveTo(lastX,lastY);//start from

    ctx.lineTo(e.offsetX,e.offsetY);// go to

    ctx.stroke();// responsible for colour 

    [lastX,lastY] = [e.offsetX, e.offsetY];
    hue++;
    if(hue>=360)
    {
        hue=0;
    }
}


grabcanvas.addEventListener('pointerdown',(e)=>{
     isdraw=true;
    [lastX, lastY] = [e.offsetX,e.offsetY];

});

grabcanvas.addEventListener('pointermove',draw);

grabcanvas.addEventListener('pointerup',()=>isdraw=false);
grabcanvas.addEventListener('pointerout',()=>isdraw=false);
