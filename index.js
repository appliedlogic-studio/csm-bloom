window.onload = () => {
    landingPageAnimation(); // all js to control animation
}

function landingPageAnimation() {

    // get all document elements
    const video = document.getElementById("video");
    const vidContainer = document.getElementById("vid-container");
    const controls = document.getElementById("controls");
    const playButton = document.getElementById("play");
    const fullscreen = document.getElementById('fullscreen');

    let userClick = false; // variable to test whether the user has interacted with the pause/play button
    let hover = false; // is the user hovering over the controls?
    let fadeOut; // variable to store timeOut function to fade controls out after

    fullscreenHandler(fullscreen, vidContainer); // full screen button functionality

    video.play(); //start video playback
    setTimeout(() => {
        video.pause(); // pause video after 5 seconds of playback (to comply with accessibility guidelines)
        controls.style.opacity = "1"; // show controls
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
    })

    controls.onmouseenter = () => {
        hover = true;
        controls.style.opacity = "1"; // keep controls visible if user is hovering over them
        clearTimeout(fadeOut);
    }

    controls.onmouseleave = () => {
        hover = false;
    }

    vidContainer.onmousemove = () => {
        if (userClick == true) { // only if user has initiated interaction with controls
            controls.style.opacity = "1"; // display controls if mouse movement over element detected
            controls.style.pointerEvents = "auto"; // allow pointer events (clicks, etc.)
            fadeOut = setTimeout(() => {
                if (hover == false) {
                    controls.style.opacity = "0"; // fade controls out after more than 2s inactivity
                    controls.style.pointerEvents = "none"; // don't allow pointer events
                }
            }, 2000);
        }
    }
};

function fullscreenHandler(btn, elem) {
    btn.addEventListener("click", handleFullscreen);

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    function exitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            btn.innerHTML = "fullscreen"; // change button icon to 'enter fullscreen' on exit
        }
    }

    function handleFullscreen() {
        !window.screenTop && !window.screenY ? closeFullscreen() : openFullscreen(); // on click, if not already full screen, enter full screen, otherwise exit
    }

    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(); // safari
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(); // ie11
        }
        btn.innerHTML = "fullscreen_exit";
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen(); // safari
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen(); // ie11
        }
        btn.innerHTML = "fullscreen";
    }
}