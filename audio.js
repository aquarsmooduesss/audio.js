document.addEventListener("DOMContentLoaded", (e)=> {
    //DOM-интерфейсы для взаимодействия
              var av = document.getElementById("av-tag");
              var playTime = document.getElementsByClassName("play-time")[0];
              var playBtn = document.getElementsByClassName("play-btn")[0];
              var curTime = document.getElementById("cur-time");
              var volume = document.getElementById("volume");
              var speaker = document.getElementById("speaker");
    
              var isPlaying = false;
              
              av.onloadedmetadata = function() {
                curTime.max=av.duration;
                };
                
     //Функция для управления перемещением части трека
              av.ontimeupdate = function() {
                
                  var sec_num = av.currentTime;
                  var hours   = Math.floor(sec_num / 3600);
                  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                  var seconds = sec_num - (hours * 3600) - (minutes * 60);
                  seconds=Math.round(seconds);
    
                  if (hours < 10) {
                    hours = "0"+hours;
                  }
                  if (minutes < 10) {
                    minutes = "0"+minutes;
                  }
                  if (seconds < 10) { seconds = "0"+seconds; } playTime.innerHTML = minutes+':'+seconds; 
                  if(isPlaying) curTime.value=av.currentTime; 
             }; 
             volume.onchange=function() { 
    
                  av.volume = volume.value/10;
             }; 
             
             curTime.onchange=function() { 
    
                  av.pause(); av.currentTime=curTime.value; av.play(); 
             }; 
    // Функция для выключения /включения звука через кнопку
             speaker.onclick=function() { 
              if(volume.value==0) { 
                 volume.value=10; av.volume=1;
              } else { 
                 volume.value=0; av.volume=0;
              } }; 

      //Функция проигрывания / паузы

             playBtn.addEventListener("click", (a)=> {
    
              if(isPlaying)
              {
                av.pause();
                isPlaying=false;
              }
              else
              {
                av.play();
                isPlaying=true;
              }
              
            });
        });
