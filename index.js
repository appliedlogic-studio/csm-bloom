function main() {
    const vid = document.getElementById("video");
    const vidContainer = document.getElementById("vid-container");
    const controls = document.getElementById("controls");
    const playButton = document.getElementById("play");
    const fullscreen = document.getElementById('fullscreen');

    let userClick = false;
    let playing = true;

    fullscreenHandler(fullscreen, vidContainer);

    vid.play();

    setTimeout(() => {
        vid.pause();
        controls.style.opacity = "1";
    }, 5000);

    let counter = 0;
    playButton.addEventListener("click", () => {
        userClick = true;
        if (counter == 0) {
            controls.style.opacity = "0"
        };
        counter++;
        if (vid.paused) {
            vid.play();
            playButton.innerHTML = "pause";
            playing = true;
        } else {
            vid.pause();
            controls.style.opacity = "1";
            playButton.innerHTML = "play_arrow";
            playing = false;
        }
    })


    vidContainer.onmousemove = () => {
        if (userClick && playing) {
            controls.style.opacity = "1";
            controls.style.pointerEvents = "auto";
            setTimeout(() => {
                controls.style.opacity = "0";
                controls.style.pointerEvents = "none";
            }, 2000);
        } else if (userClick) {
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
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        btn.innerHTML = "fullscreen";
    }
}

main();