console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Warriyo - Mortals (feat. Laura Brehm)",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath : "songs/2.mp3" , coverPath :"covers/2.jpg"},
    {songName: "DEAF KEV - Invinvible [NCS Realease]", filePath : "songs/3.mp3" , coverPath :"covers/3.jpg"},
    {songName: "Different Heaven & EHIDE -My Heart [NCS Realease]", filePath : "songs/4.mp3" , coverPath :"covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Realease", filePath : "songs/5.mp3" , coverPath :"covers/5.jpg"},
    {songName: "Rabta", filePath : "songs/6.mp3" , coverPath :"covers/6.jpg"},
    {songName: "Sakhiyaan- Maninder Buttar", filePath : "songs/7.mp3" , coverPath :"covers/7.jpg"},
    {songName: "Afreen Afreen- Momina Mustehsan", filePath : "songs/8.mp3" , coverPath :"covers/8.jpg"},
    {songName: "Chahun main ya naa - Aditya Roy Kapur", filePath : "songs/9.mp3" , coverPath :"covers/9.jpg"},
    {songName: "Salamat- Sarbjit", filePath : "songs/10.mp3" , coverPath :"covers/10.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("duration").innerText = audioElement.duration;
})

// audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity =1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //seek bar update;
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime = ((myProgressBar.value*audioElement.duration)/100);
})
const makeAllPlays = ()=>{
    // e.target.classList.add('fa-pause-circle');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e) => {
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName; 
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
    })
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})