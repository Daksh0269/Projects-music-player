console.log("starting with javascript")
document.querySelector(".hamburger").addEventListener ("click" , ()=>{
  console.log("working")
  document.querySelector(".left").style.left = "0px"
})
document.querySelector(".cross").addEventListener ("click" , ()=>{
  console.log("working")
  document.querySelector(".left").style.left = "-100%"
})

async function logsong() {
  const response = await fetch("https://daksh0269.github.io/Projects-spotify-clone-api-/");
  const songs = await response.text();
  // console.log(songs);



  let x = document.createElement("div")
  x.innerHTML = songs
  let as = x.getElementsByTagName("a")
  // console.log(as)
  let songlist = []

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songlist.push(element.href)
    }

  }

  return songlist;

}

async function logsong_library() {
  const response = await fetch("https://daksh0269.github.io/Projects-spotify-clone-api-/");
  const songs = await response.text();
  // console.log(songs);



  let x = document.createElement("div")
  x.innerHTML = songs
  let as = x.getElementsByTagName("a")
  // console.log(as)
  let songlist_mutable = []

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      // console.log(element.href)
      songlist_mutable.push(element.href.split("/SONGS/")[1])

    }

  }

  return songlist_mutable;

}
function secondsToTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

function randomnumber() {
  return (Math.ceil(-1 + Math.random() * 6))
}
let currentsong = new Audio("file:///C:/Users/lenovo/Desktop/web%20dev_js/PROJECTS/SPOTIFY%20CLONE/songs/Hola%20Amigo.mp3")
async function main() {
  let playmusic = (track) => {
    currentsong.src = (`file:///C:/Users/lenovo/Desktop/SONGS/${track}`)
    currentsong.play()
    // currentsong.loop()

  }
  var x = await logsong();
  let y = await logsong_library();
  console.log(y)

  // console.log(x)
  let music_library = document.querySelector(".listofsongs");
  for (let i of y) {
    console.log(i.split(".mp3"))
    let i1 = (i.split(".mp3")[0])
    music_library.innerHTML = music_library.innerHTML + `<li class = "music_library">${i1.replace("%20", " ")}</li>`
  }


  let audio = document.querySelector(".playbutton")
  let audio1 = new Audio(x[randomnumber()])


  //play pause functionality
  let song = audio.addEventListener("click", () => {

    if (audio1.paused) {
      audio1.play()
      document.querySelector(".playbutton").innerHTML = "playing"
    }

    else {
      audio1.pause()
      document.querySelector(".playbutton").innerHTML = "paused"

    }
  })

  audio1.addEventListener("timeupdate", () => {
    let duration = audio1.duration;
    let timestamp = audio1.currentTime;
    let audiosrc = audio1.src.split("/SONGS/")[1]
    let audioname = audiosrc.replace("%20", " ")
    let audionamefinal = audioname.split(".mp3")[0]
    console.log(duration, timestamp, audiosrc)
    document.querySelector(".songtime").innerHTML = `${secondsToTime(timestamp)}/${secondsToTime(duration)}`
    document.querySelector(".songname").innerHTML = audionamefinal
    document.querySelector(".circle").style.left = (timestamp / duration) * 100 + "%"
    document.querySelector(".complete").style.width = (timestamp / duration) * 100 + "%"
    // The duration variable now holds the duration (in seconds) of the audio clip
  });
  document.querySelector(".playbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    audio1.currentTime = ((audio1.duration) * percent) / 100
  })

  currentsong.addEventListener("timeupdate", () => {
    let duration = currentsong.duration;
    let timestamp = currentsong.currentTime;
    let audiosrc = currentsong.src
    let audiosrc2 = audiosrc.split("/SONGS/")[1]
    // let audiosrc3 = audiosrc2.split(".mp3")[0]
    let audiosrc3 = audiosrc2.replace("%20" , " ")
    let audiosrc4 = audiosrc3.split(".mp3")[0]
    console.log(secondsToTime(duration), secondsToTime(timestamp), audiosrc)
    document.querySelector(".songtime").innerHTML = `${secondsToTime(timestamp)}/${secondsToTime(duration)}`
    document.querySelector(".circle").style.left = (timestamp / duration) * 100 + "%"
    document.querySelector(".complete").style.width = (timestamp / duration) * 100 + "%"
    // The duration variable now holds the duration (in seconds) of the audio clip
    console.log(audiosrc2)
    document.querySelector(".songname").innerHTML = audiosrc4
    
  });
  // playbar functionality //
  document.querySelector(".playbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = ((currentsong.duration) * percent) / 100
  })




  //
  Array.from(document.querySelector(".listofsongs").getElementsByTagName("li")).forEach(e => {
    console.log(e)
    e.addEventListener("click", element => { 
      console.log(e.innerHTML.replace(" ", "%20") + ".mp3")
      playmusic(e.innerHTML.replace(" ", "%20") + ".mp3")
    })


  });
  // play pause funtion nationality to play button
  let play_gen = document.querySelector(".playgen")
  play_gen.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play()
      document.querySelector(".playgen").innerHTML = `<img src="pause.svg" alt="" style="
      width: 25px;
      height: 22px;
  ">`
    }
    else {
      currentsong.pause()
      document.querySelector(".playgen").innerHTML = `<img src="play.svg" alt="" style="
      width: 25px;
      height: 22px;
  ">`
    }

  })
  // forward track funtionality
  let prev = document.querySelector(".prev")
  prev.addEventListener("click", () => {
    
    console.log("prev")
    let index = currentsong.currentSrc
    let index2 = index.split("/SONGS/")[1]
    console.log(index2)
    let daksh = y.indexOf(index2)
    console.log(daksh)
    // console.log(y[daksh])
    if(daksh == -1){
      playmusic(y[2])
    }
    if(daksh > 0){
      playmusic(y[daksh - 1])
    }
    
    

    

  })
  let forw = document.querySelector(".forw")
  forw.addEventListener("click", () => {
    
    // console.log("forw")
    let index = currentsong.currentSrc
    let index2 = index.split("/SONGS/")[1]
    console.log(index2)
    let daksh = y.indexOf(index2)
    console.log(daksh)
    // console.log(y[daksh])
    if(daksh == -1){
      playmusic(y[4])
    }
    if(daksh >= 0){
      playmusic(y[daksh + 1])
    }
    if(daksh == 7){
      playmusic(y[0])
    }
  
    
    

    

  })

}
main()


//login-signup portal




