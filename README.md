# Graduate Showcase landing page animated graphic

## Include:

HTML: 

```
<div id="vid-container">
  <video id="video" src="https://ual-media-res.cloudinary.com/video/upload/v1623320810/csm/LandingPageAnimation.mp4"
    type='video/mp4' muted loop playsinline></video>
  <div id="controls">
    <span id="play">play_arrow</span>
  </div>
</div>
<script>
  window.onload = () => {
    const video = document.getElementById("video");
    const playButton = document.getElementById("play");

    video.play(); //start video playback
    playButton.innerHTML = "pause"; // change button to pause icon once video starts playing

    setTimeout(() => {
      video.pause(); // pause video after 5 seconds of playback (to comply with accessibility guidelines)
      playButton.innerHTML = "play_arrow"; // change button to play icon
    }, 5000);

    playButton.addEventListener("click", () => {
      userClick = true; // user has interacted with the controls
      if (video.paused) {
        video.play(); // click plays video if current state is paused
        playButton.innerHTML = "pause"; // change button to pause icon
      } else {
        video.pause(); // click pauses video if current state is playing
        playButton.innerHTML = "play_arrow"; // change button to play icon
      }
    });
  }
</script>
```

CSS: style.css