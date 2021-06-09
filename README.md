# Graduate Showcase landing page animated graphic

## Notes:

* Video source (currently https://ual-media-res.cloudinary.com/video/upload/v1621002438/csm/LandingPage.mp4) to change (index.html, line 17)
* index.html, line 3: `video.onloadeddata = () => main();` does not work on [Glitch](https://glitch.com/), probably due to caching? But is preferable to pause the video at the correct timestamp.
  
  Alternative: do not use `onloadeddata` event and just call `main()`. To clean up, move line 1 `const video = document.getElementById("video");` inside `main()`

## Include:

HTML: 

```
<div id="vid-container">
  <video id="video" class="vid"
    src="https://ual-media-res.cloudinary.com/video/upload/v1621002438/csm/LandingPage.mp4" muted loop></video>
    <div id="controls">
    <span id="play">play_arrow</span>
    <span id="fullscreen">fullscreen</span>
  </div>
</div>
<script src="index.js"></script>
```

CSS: main.css

JS: index.js