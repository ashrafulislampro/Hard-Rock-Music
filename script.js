const searchSongs = async()=>{
          const searchText = document.getElementById("search_field").value;
          const url = `https://api.lyrics.ovh/suggest/${searchText}`;
          toggleSpinner(true);
          // load songs
          fetch(url)
          .then(res => res.json())
          .then(data =>  displaySongs(data.data))
          .catch(error => displayErrorMessage("sorry not found , please try again later")); 
          document.getElementById("search_field").value = "";         
}
// trigger enter button
const searchField = document.getElementById("search_field");
searchField.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("search_btn").click();
    }
});

const displaySongs = songs =>{
          const songInfo = document.getElementById("songs_info");
          songInfo.innerHTML = '';
          songs.forEach(song =>{
                    const songInfoDiv = document.createElement("div");
                    songInfoDiv.className ='single-result row align-items-center my-3 p-3';
                    songInfoDiv.innerHTML = `
                              <div class="col-md-9">
                                 <h3 class="lyrics-name">${song.title}</h3>
                                  <p class="author lead">Album by <span>${song.artist.name}</span></p>
                                  <audio controls>
                                    <source src="${song.preview}" type="audio/mpeg">
                                  </audio>
                              </div>
                              <div class="col-md-3 text-md-right text-center">
                                  <button onclick="getSongLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                              </div>
                    `
                    songInfo.appendChild(songInfoDiv);
                    toggleSpinner(false);
          });
}

// load lyrics
const getSongLyric = async(artist, title) =>{
  toggleSpinner();
  const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
  try{
    const res = await fetch(url)
    const data = await res.json()
    displaySongsLyrics(data.lyrics);
  }
  catch{
    displayErrorMessage("sorry fail to load lyrics, please try again later");
  }
};

// load lyrics
// const getSongLyric = (artist, title) =>{
//           const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
//           fetch(url)
//           .then(res => res.json())
//           .then(data => displaySongsLyrics(data.lyrics))
//           .catch(error=> displaySongsLyrics(error));
// };

// display error message
const displayErrorMessage = error =>{
      const errorMessage = document.getElementById("error_message");
      errorMessage.innerText = error;
}

// display song lyrics 
const displaySongsLyrics = lyrics =>{
          const getSongLyric = document.getElementById("song_lyrics");
          getSongLyric.innerText = '';
          const getSongLyricDiv = document.createElement("div");
                   getSongLyricDiv.innerText = lyrics;
                   getSongLyric.appendChild(getSongLyricDiv);
                   toggleSpinner();
}

// spinner buffering 
const toggleSpinner = (show) =>{
  const spinner = document.getElementById("spinner_buffer");
  const songsLoad = document.getElementById("songs_info");
  const lyricsLoad = document.getElementById("song_lyrics");
  spinner.classList.toggle("d-none");
  songsLoad.classList.toggle("d-none");
  lyricsLoad.classList.toggle("d-none");
  // if(show){
  //   spinner.classList.remove("d-none");
  // }
  // else{
  //   spinner.classList.add("d-none");
  // }
}