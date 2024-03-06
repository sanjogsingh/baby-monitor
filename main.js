objects=[];
Status=""
function preload()
{
sound=loadSound("MV27TES-alarm.mp3")
}
function start()
{
    cocossd=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("statis").innerHTML="status: detecting object"
}


function setup()
{
canvas=createCanvas(400,400)
canvas.center()
camera=createCapture(VIDEO)
camera.hide()

}

function draw()
{
    
image(camera,0,0,400,400)

noFill()
if (Status!=""){
    cocossd.detect(camera,gotResults)
    document.getElementById("objectNumber").innerHTML=" Total number of objects are >>>>>"+objects.length
    for(i=0;i<objects.length;i++){
        stroke(random(255),random(255),random(255))
    rectx=objects[i].x
recty=objects[i].y
rectWidth=objects[i].width
rectHeight=objects[i].height
rectname=objects[i].label
rect(rectx,recty,rectWidth,rectHeight)
text(rectname+" "+Math.floor(objects[i].confidence*100)+"%",rectx+15,recty+25)
textSize(30)
if(rectname=="person")
{
sound.stop()
document.getElementById("statis").innerHTML="status: Baby found"
}
else
{
    sound.play()
    document.getElementById("statis").innerHTML="status: Baby not found"
}
}
if(objects.length==0)
{
    sound.play()
    document.getElementById("statis").innerHTML="status: Baby not found"
}
}
}

function modelLoaded()
{
console.log("success")
Status=true

}

function gotResults(error,results)
{
if(error)
{
    console.log("error")
    document.getElementById("statis").innerHTML="status: error"
}
else
{
    objects=results
    console.log(results)

}
}
