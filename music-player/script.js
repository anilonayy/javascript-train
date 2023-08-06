    const songPlayer = document.getElementById("song-player");
    const image = document.getElementById("cover-image");
    const songName = document.getElementById("song-name");
    const singerName = document.getElementById("singer-name");
    const songSecond  = document.getElementById("song-second");
    const songTotalSecond = document.getElementById("song-total-second"); 
    const songList = document.getElementById("song-list");
    const musicSecondRange = document.getElementById("music-second-range");
    const musicVolumeRange = document.getElementById("music-volume-range");

    // Buttons
    const backwardButton = document.getElementById("backward-button");
    const playButton = document.getElementById("play-button");
    const forwardButton = document.getElementById("forward-button");

    let currentSongIndex = 0;
    let currentSong = {};
    let isPlaying = false;

    let musicInterval;

    class UI
    {
        static DisplaySong(index = 0)
        {
            currentSongIndex = index;
            currentSong = songs[index];

            songPlayer.src = currentSong.song;

            image.src = currentSong.image;
            songName.textContent = currentSong.name;
            singerName.textContent = currentSong.singer;
            songTotalSecond.textContent = UI.SetMinuteBySecond(currentSong.duration);
            songSecond.textContent = UI.SetMinuteBySecond(SongPlayer.GetSecond());

            this.DisplayMusicList();
        }
        static DisplayMusicList()
        {
            songList.innerHTML = "";
            songs.map(song => {
                let active  = "";

                if(song.id == currentSong.id)
                    active ="active";
                
                songList.innerHTML+=`
                <li class="list-group-item d-flex justify-content-between align-items-center ${active}">
                    ${song.name}
                    <span class="badge bg-black badge-pill">${UI.SetMinuteBySecond(song.duration)}</span>
                </li>
                `
            });
            
        }
        
        static SetMinuteBySecond(second)
        {
            let minutes = Math.floor(second/60);
            let seconds = (second%60).toFixed(0);

            if(minutes < 10)
            {
                minutes = "0" + minutes.toString();
            }
            if(seconds < 10)
            {
                seconds = "0" + seconds;
            }


            return `${minutes}:${seconds}`;
        }
    }

    class Song
    {
        constructor(name,singer,image,song,duration){
            this.id = Math.ceil(Math.random() * new Date());
            this.name = name;
            this.singer = singer;
            this.image = image;
            this.song = song;
            this.duration =duration;
        }
    }

    class SongPlayer
    {
        static Start()
        {
            songPlayer.play();
            playButton.innerHTML =`<svg style="width:28px;height:28px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
            </svg>`;
            isPlaying = true;
            musicInterval = setInterval(() => {
                
                if(currentSong.duration <= SongPlayer.GetSecond())
                {
                    currentSongIndex++;
                    this.NextSong();
                }
                
                musicSecondRange.value =  Math.ceil((SongPlayer.GetSecond() * 100) / currentSong.duration);
                songSecond.textContent = UI.SetMinuteBySecond(songPlayer.currentTime);
            }, 500);

        }

        static Stop()
        {
            songPlayer.pause();
            playButton.innerHTML =`<svg style="width:28px;height:28px" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>`;
            isPlaying = false;
            clearInterval(musicInterval);
        }

        static NextSong()
        {   
            currentSongIndex++;
            if (currentSongIndex >= songs.length) {
              currentSongIndex = 0;
            }

            UI.DisplaySong(currentSongIndex);
            if (isPlaying) {
              SongPlayer.Start();
            }
        }
        
        static PrevSong() {
            currentSongIndex--;
            if (currentSongIndex < 0) {
              currentSongIndex = songs.length - 1;
            }
            UI.DisplaySong(currentSongIndex);
            if (isPlaying) {
              SongPlayer.Start();
            }
          }
          

        static SetVolume(value)
        {
            songPlayer.volume = value/100;
        }

        static SetSecond(second)
        {
            songPlayer.currentTime =Math.ceil((currentSong.duration * second ) /100);
        }
        static GetSecond()
        {
            return songPlayer.currentTime;
        }
    }


    const songs = [
        new Song("Yok","Oğuzhan Koç","./resource/oguzhankoc.jpg","./resource/yok.mp3",272),
        new Song("Life Letters","Never Get Used To People","./resource/life-letters.jpg","./resource/life-letters.mp3",261),
        new Song("Gelme Aklıma","Dolu Kadehi Ters Tut","./resource/dktt.jpg","./resource/gelme-aklima.mp3",218)
    ];



    document.addEventListener("DOMContentLoaded",() => {
        SongPlayer.SetVolume(50);
        UI.DisplaySong();
    })

    playButton.addEventListener("click",function(){
        if(isPlaying)
        {
            SongPlayer.Stop();
        }
        else{
            SongPlayer.Start();
        }
    })

    musicSecondRange.addEventListener("input",function(e){
        SongPlayer.SetSecond(e.target.value);
    });

    musicVolumeRange.addEventListener("input",function(e){
        SongPlayer.SetVolume(e.target.value);
    })


    forwardButton.addEventListener("click",SongPlayer.NextSong)
    backwardButton.addEventListener("click",SongPlayer.PrevSong)



