var prediction="";


Webcam.set({
    width:350,
    height:280,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'"/>'
});
}
console.log('ml5.version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MOZXgpp2u/model.json",modelLoaded);

function modelLoaded(){ 
console.log("Model Loaded"); 
} 

function check(){ 
img = document.getElementById('captured_img'); 
classifier.classify(img, gotResults); 
}

function speak(){ 
var synth = window.speechSynthesis; 
speak_data= "The  prediction is"+ prediction; 
var utterThis = new SpeechSynthesisUtterance(speak_data); 
synth.speak(utterThis);
 }
  function gotResults(error,results){ 
if(error) { 
    console.log(error); 
} 
else{ 
console.log(results); 
prediction = results[0].label; 
document.getElementById("result_gesture_name").innerHTML = results[0].label; 
if(results[0].label == "all the best")
{ document.getElementById("update_emoji").innerHTML = "&#128077;"; } 
if(results[0].label == "Amazing"){ 
document.getElementById("update_emoji").innerHTML = "&#128076;"; } 
if(results[0].label == "Victory"){ 
document.getElementById("update_emoji").innerHTML = "&#9996;"; } 
} 
speak(); }
