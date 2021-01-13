var musicList = [
    {artist:"Adele",
    title: "sound 1",
    image: "https://i.pinimg.com/736x/a9/95/9c/a9959c17c8260650136fdc4a7d8bb218.jpg",
    file:"music/sound1.mp3",
    type: "audio/mp3" },
    {artist:"Name2",
    title: "sound 2",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Desk-music-headphones-earphones_%2824243083451%29.jpg",
     file: "music/sound2.mp3",
     type: "audio/mp3"},
    {artist:"Name3",
    title:"sound 3",
    image: "https://www.stayonbeat.com/wp-content/uploads/2013/10/Piano-pic-678x381.jpg",
     file: "music/sound3.wav",
    type: "audio/wav"},
    {artist:"Name4",
    title: "sound 4",
    image: "https://png.pngtree.com/thumb_back/fh260/back_our/20190622/ourmid/pngtree-hip-hop-music-background-illustration-education-training-music-carnival-image_208997.jpg",
    file: "music/sound4.wav",
    type: "audio/wav"}]
var button = document.querySelectorAll("button")
var play = button[1]
var pause = button[2]
var audio = document.querySelector("audio")
var source= document.querySelector("source")
var li = document.querySelector(".music-list")
var timeUpdate = document.querySelector(".time")
var title = document.querySelector("h2")
var songIndex = 0
var control = document.querySelector(".control")
var artist = document.querySelector(".artist")
pause.hidden = true



for(n in musicList){
    li.innerHTML += `<div class="song">
        <div class="thumbnail">
            <img src=`+ musicList[n]["image"] +`>
        </div>
        <div class="ms_title">
            <h5>`+ musicList[n]["title"]+ `</h5>
            <h5>`+ musicList[n]["artist"]+`</h5>
        </div>  
        <div class="stage">
            <div class='bar-1'></div>
            <div class='bar-2'></div>
            <div class='bar-3'></div>
            <div class='bar-1'></div>
            <div class='bar-2'></div>
        </div>
    </div>`
}



var song = document.querySelectorAll(".song")
var stage = document.querySelectorAll(".stage")
var stages = Array.from(stage)
var selected = document.querySelectorAll(".ms_title")





for(n=0;n<song.length;n++){
    song[n].addEventListener("click",Button)
}
for(n=0;n<button.length;n++){
    button[n].addEventListener("click",Button);
}

function Button(){
    if(this.className == "play"){ 
        this.hidden = true;
        pause.hidden = false;
        audio.play();
    }
    else if(this.className=="pause"){
        this.hidden = true;
        play.hidden = false;
        stages[songIndex].setAttribute("style","display: none;")
        audio.pause();        
    }
    else if(this.className=="next"){
        selected[songIndex].setAttribute("style", "font-style: none;")
        stages[songIndex].setAttribute("style","display: none;")
        pause.hidden = false;
        play.hidden = true;
        audio.pause();
        next();
    }
    else if(this.className=="stop"){
        pause.hidden = true;
        play.hidden = false;
        stages[songIndex].setAttribute("style","display: none;")
        stop();
    }
    else if(this.className=="previous"){
        stages[songIndex].setAttribute("style","display: none;")
        pause.hidden = false;
        play.hidden = true;
        previous();           
    }
    else{        
        play.hidden = true;
        pause.hidden = false;
        stages[songIndex].setAttribute("style","display: none;")
        var Index = Array.from(song).indexOf(this)
        songIndex=Index
        audio.setAttribute("src",musicList[songIndex]["file"]);
        source.setAttribute("type",musicList[songIndex]["type"]);
        title.innerText = musicList[songIndex]["title"];
        artist.innerText = musicList[songIndex]["artist"]
        audio.play();
    }
}
audio.addEventListener("play",function(){
    control.setAttribute("style","background:linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(" + musicList[songIndex]["image"]+ "); background-size: 100% 100%")
    selected[songIndex].setAttribute("style", "font-style: italic;")
    if(screen.width > 250){
        stages[songIndex].setAttribute("style","display: inline;");        
    }
    else{
        stages[songIndex].setAttribute("style","display: none;")
    }
})
audio.addEventListener("ended",function(){
    selected[songIndex].setAttribute("style", "font-style: none;")
    stages[songIndex].setAttribute("style","display: none;")
    next();
})

function stop(){
    audio.load();
}

function next(){
    songIndex ++;
    if(songIndex==musicList.length){
        songIndex = 0;
    }
    title.innerText = musicList[songIndex]["title"];
    artist.innerText = musicList[songIndex]["artist"]
    audio.setAttribute("src",musicList[songIndex]["file"]);
    source.setAttribute("type",musicList[songIndex]["type"]);
    audio.play();
}

function previous(){
    songIndex --;
    if(songIndex<0){
        songIndex = musicList.length-1;
    }
    title.innerText = musicList[songIndex]["title"];
    artist.innerText = musicList[songIndex]["artist"]
    audio.setAttribute("src",musicList[songIndex]["file"]);
    source.setAttribute("type",musicList[songIndex]["type"]);
    audio.play();
}

audio.addEventListener('timeupdate', (event) => {
    var curTime = (audio.currentTime);
    var time = Math.floor((curTime)/60);
    var sec = Math.floor((curTime)%60);
    var stTime = time.toString();
    var stSec = sec.toString();
    if(sec<10){
        stSec = "0" + stSec
    }
    timeUpdate.innerText = stTime + ":" + stSec; 
})



