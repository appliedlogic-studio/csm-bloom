landingPageAnimation();

function landingPageAnimation() {
    const video = document.getElementById("video");
    const vidContainer = document.getElementById("vid-container");
    const controls = document.getElementById("controls");
    const playButton = document.getElementById("play");
    const fullscreen = document.getElementById('fullscreen');

    let userClick = false;
    let playing = true;
    let hover = false;
    let fadeOut;

    fullscreenHandler(fullscreen, vidContainer);

    setTimeout(() => {
        video.play();
        setTimeout(() => {
            video.pause();
            controls.style.opacity = "1";
        }, 5000);
    }, 100)

    let counter = 0;
    playButton.addEventListener("click", () => {
        userClick = true;
        counter++;
        if (video.paused) {
            video.play();
            playButton.innerHTML = "pause";
            playing = true;
        } else {
            video.pause();
            controls.style.opacity = "1";
            playButton.innerHTML = "play_arrow";
            playing = false;
        }
    })

    controls.onmouseenter = () => {
        hover = true;
        controls.style.opacity = "1";
        clearTimeout(fadeOut);
    }

    controls.onmouseleave = () => {
        hover = false;
    }

    vidContainer.onmousemove = () => {

        if (userClick == true && playing == true) {
            controls.style.opacity = "1";
            controls.style.pointerEvents = "auto";
            fadeOut = setTimeout(() => {
                if (hover == false) {
                    controls.style.opacity = "0";
                    controls.style.pointerEvents = "none";
                }
            }, 1000);
        } else if (userClick == true) {
            controls.style.opacity = "1";
            controls.style.pointerEvents = "auto";
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
            btn.style.display = "block";
            btn.innerHTML = "fullscreen";
        }
    }

    function handleFullscreen() {
        !window.screenTop && !window.screenY ? closeFullscreen() : openFullscreen();
    }

    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        btn.innerHTML = "fullscreen_exit";
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        btn.innerHTML = "fullscreen";
    }
}