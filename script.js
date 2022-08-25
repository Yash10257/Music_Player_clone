console.log("Welcome to MusicWorld");
// Initialize the variavles
let songIndex=0;
let audioElement = new Audio('audio/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Living Life, In The Night", filePath: "audio/1.mp3", coverPath: "images/c1.jpeg"},
    {songName: "Nasha-Amar Jalal", filePath: "audio/2.mp3", coverPath: "images/c2.jpeg"},
    {songName: "Everything Black", filePath: "audio/3.mp3", coverPath: "images/c3.jpg"},
    {songName: "Billo Rani", filePath: "audio/4.mp3", coverPath: "images/c4.jpg"},
    {songName: "Naag The Third", filePath: "audio/5.mp3", coverPath: "images/c5.jpg"},
    {songName: "Billo- J Star", filePath: "audio/6.mp3", coverPath: "images/c6.jpeg"},
    {songName: "The Tech Theives | Fake It", filePath: "audio/7.mp3", coverPath: "images/c7.jpg"},
    {songName: "Dil Dooba", filePath: "audio/8.mp3", coverPath: "images/c8.jpeg"},
]


songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`audio/${songIndex+1}.mp3`;
        masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})