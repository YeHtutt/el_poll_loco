let canvas;
let world;
let keyboard = new Keyboard();
let infostatus = false;
let soundActivated = true;
let mobileMode = false;

/**this function initialise the game*/
function init() {
    canvas = document.getElementById('canvas'); 
    ctx = canvas.getContext("2d");

    startButtonPress();
    stopButtonPress();
    checkOrientationAtStart();
}

/**This function set the Keyboard Key true during the Key was pressed*/
window.addEventListener("keydown", (e) => {
    //console.log(e);
    if (e.keyCode = 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**This function set the Keyboard Key false when the Key was released*/
window.addEventListener("keyup", (e) => {
    
    if (e.keyCode = 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**This function set the touchpad Key true during the touch panel was pressed*/
function startButtonPress() {
    document.getElementById("buttonLeft").addEventListener("touchstart", (ev) => {
        keyboard.LEFT = true;
        ev.preventDefault();
    })

    document.getElementById("buttonRight").addEventListener("touchstart", (ev) => {
        keyboard.RIGHT = true;
        ev.preventDefault();
    })

    document.getElementById("buttonJump").addEventListener("touchstart", (ev) => {
        keyboard.SPACE = true;
        ev.preventDefault();
    })

    document.getElementById("buttonThrow").addEventListener("touchstart", (ev) => {
        keyboard.D = true;
        ev.preventDefault();
    })
}

/**This function set the touchpad Key false when the touch panel was released*/
function stopButtonPress() {
    document.getElementById("buttonLeft").addEventListener("touchend", (ev) => {
        keyboard.LEFT = false;
        ev.preventDefault();
    })

    document.getElementById("buttonRight").addEventListener("touchend", (ev) => {
        keyboard.RIGHT = false;
        ev.preventDefault();
    })

    document.getElementById("buttonJump").addEventListener("touchend", (ev) => {
        keyboard.SPACE = false;
        ev.preventDefault();
    })

    document.getElementById("buttonThrow").addEventListener("touchend", (ev) => {
        keyboard.D = false;
        ev.preventDefault();
    })
}

/**This function is used for start and restart the game */
function playOrPause() {
    closeStartOverlay();
    closeEndOverlay();
    initLevel(); 
    world = new World(canvas, keyboard); 
    //world.game_win.pause();
    //world.game_lost.pause();
}

/**This function closed the start screen when the start button was activated*/
function closeStartOverlay() {
    let startScreen = document.getElementById("startScreen");
    startScreen.style.display = 'none';
    let startButton = document.getElementById("startBtn");
    startButton.style.display = 'none';
}

/** This function shows Game-Over-Screen when the character killed the enemy endboss*/
function showEndScreenGameOver() {
    let endScreen = document.getElementById("endScreenWin");
    endScreen.style.display = 'block';
    let restartButton = document.getElementById("reStartBtn");
    restartButton.style.display = 'block';
}

/**This function shows Game-Lost-Screen when the character is killed by the enemies*/
function showEndScreenLoose() {
    let endScreen = document.getElementById("endScreenLoose");
    endScreen.style.display = 'block';
    let restartButton = document.getElementById("reStartBtn");
    restartButton.style.display = 'block';
}

/** */
function closeEndOverlay() {
    let endScreenWin = document.getElementById("endScreenWin");
    endScreenWin.style.display = 'none';
    let endScreenLoose = document.getElementById("endScreenLoose");
    endScreenLoose.style.display = 'none';
    let restartButton = document.getElementById("reStartBtn");
    restartButton.style.display = 'none';
}


/**This function toggel in the Fullscreen mode by clicking the fullscreen icon */
function toggleFullScreen() {
    let gameFrame = document.getElementById('gameFrame');
    let canvas = document.getElementById('canvas');
    let startScreen = document.getElementById("startScreen");
    let endScreenWin = document.getElementById("endScreenWin");
    let endScreenLoose = document.getElementById("endScreenLoose");
    let infoScreen = document.getElementById('infoContainer');

    if (!document.fullscreenElement) {
        openFullscreen(gameFrame, canvas, startScreen, endScreenWin, endScreenLoose, infoScreen);
    } else {
        closeFullscreen(gameFrame, canvas, startScreen, endScreenWin, endScreenLoose, infoScreen);
    }
} 

/**
 * This function change to fullscreen of all the HTML Elements for Chrome, Safari and InternetExplorer Browser
 * @param {HTML Element <div>} gameFrame - frame for this game can be change between fullscreen and width="720" height="480" normal mode
 * @param {HTML Element <canvas>} canvas - container of the 2d game
 * @param {HTML Element <img>} startScreen - this image is shown at the beginning
 * @param {HTML Element <img>} endScreenWin - this image is shown when character defeated the enemy
 * @param {HTML Element <img>} endScreenLoose - this image is shown when enemy defeated the character
 * @param {HTML Element <img>} infoScreen - this image is shown when game play instruction Information was klicked
 */
function openFullscreen(gameFrame, canvas, startScreen, endScreenWin, endScreenLoose, infoScreen) {
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
        canvas.classList.add("fullScreen");
        startScreen.classList.add("fullScreen");
        endScreenWin.classList.add("fullScreen");
        endScreenLoose.classList.add("fullScreen");
        infoScreen.classList.add("fullScreen");
        document.getElementById("full-screen").src = "img/fullscreen_close.png";
    } else if (gameFrame.webkitRequestFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, infoScreen) { /* Safari */
        gameFrame.webkitRequestFullscreen();
        canvas.classList.add("fullScreen");
        startScreen.classList.add("fullScreen");
        endScreenWin.classList.add("fullScreen");
        endScreenLoose.classList.add("fullScreen");
        infoScreen.classList.add("fullScreen");
    } else if (gameFrame.msRequestFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, infoScreen) { /* IE11 */
        gameFrame.msRequestFullscreen();
        canvas.classList.add("fullScreen");
        startScreen.classList.add("fullScreen");
        endScreenWin.classList.add("fullScreen");
        endScreenLoose.classList.add("fullScreen");
        infoScreen.classList.add("fullScreen");
    }
}

/**
 * This function closed the fullscreen of all the HTML Elements for Chrome, Safari and InternetExplorer Browser
 * and it changes to normal screen (width=720px height=480px) 
 * @param {HTML Element <div>} gameFrame - frame for this game can be change between fullscreen and width="720" height="480" normal mode
 * @param {HTML Element <canvas>} canvas - container of the 2d game
 * @param {HTML Element <img>} startScreen - this image is shown at the beginning
 * @param {HTML Element <img>} endScreenWin - this image is shown when character defeated the enemy
 * @param {HTML Element <img>} endScreenLoose - this image is shown when enemy defeated the character
 * @param {HTML Element <img>} infoScreen - this image is shown when game play instruction Information was klicked
 */
function closeFullscreen(canvas, startScreen, endScreenWin, endScreenLoose, infoScreen) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        canvas.classList.remove("fullScreen");
        startScreen.classList.remove("fullScreen");
        endScreenWin.classList.remove("fullScreen");
        endScreenLoose.classList.remove("fullScreen");
        infoScreen.classList.remove("fullScreen");
        document.getElementById("full-screen").src = "img/fullscreen_open.png";
    } else if (document.webkitExitFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, infoScreen) { /* Safari */
        document.webkitExitFullscreen();
        canvas.classList.remove("fullScreen");
        startScreen.classList.remove("fullScreen");
        endScreenWin.classList.remove("fullScreen");
        endScreenLoose.classList.remove("fullScreen");
        infoScreen.classList.remove("fullScreen");
    } else if (document.msExitFullscreen, canvas, startScreen, endScreenWin, endScreenLoose, infoScreen) { /* IE11 */
        document.msExitFullscreen();
        canvas.classList.remove("fullScreen");
        startScreen.classList.remove("fullScreen");
        endScreenWin.classList.remove("fullScreen");
        endScreenLoose.classList.remove("fullScreen");
        infoScreen.classList.remove("fullScreen");
    }
}

/**
 * This function check the mobile device orientation at the beginning
 */
function checkOrientationAtStart() {
    const portrait = window.matchMedia("(orientation: portrait").matches; 

    if (portrait) {
        document.getElementById("mobileAlert").classList.remove("d-none"); 
    } else {
        document.getElementById("mobileAlert").classList.add("d-none"); 
        document.getElementById("mobileAlert").style.zIndex = "-1";
        
        document.getElementById('title').classList.add('d-none');
    }
}

/**
 * This function check mobile device orientation on change between "portrait" or "landscape" -mode
 */
window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;
    if (portrait) {
        document.getElementById("mobileAlert").classList.remove("d-none"); 
        document.getElementById("mobileAlert").style.zIndex = "988";
        hideElementsByOrientationAlertScreen();
    } else {
        document.getElementById("mobileAlert").classList.add("d-none"); 
        document.getElementById("mobileAlert").style.zIndex = "-1";
        showElementsAfterOrientationAlertScreen();
    }
});

/**This function hides every button elements during showing the rotate Alert at mobile device portrait-mode */
function hideElementsByOrientationAlertScreen(){
    document.getElementById("startBtn").classList.add("d-none");
    document.getElementById("startBtn").style.zIndex = "-2";

    document.getElementById("options").classList.add("d-none");
    document.getElementById("options").style.zIndex = "-2";

    document.getElementById("playButtonsMobileContainer").classList.add("d-none");
    document.getElementById("playButtonsMobileContainer").style.zIndex = "-2";

    document.getElementById("reStartBtn").classList.add("d-none");
    document.getElementById("reStartBtn").style.zIndex = "-2";
}

/**This function shows every button elements after showing the rotate Alert at mobile device portrait-mode */
function showElementsAfterOrientationAlertScreen(){
    //document.getElementById('title').classList.add("d-none");
    document.getElementById("startBtn").classList.remove("d-none");
    document.getElementById("startBtn").style.zIndex = "987";

    document.getElementById("options").classList.remove("d-none");
    document.getElementById("options").style.zIndex = "999";

    document.getElementById("playButtonsMobileContainer").classList.remove("d-none");
    document.getElementById("playButtonsMobileContainer").style.zIndex = "970";

    document.getElementById("reStartBtn").classList.remove("d-none");
    document.getElementById("reStartBtn").style.zIndex = "997";
}

/**This function toggle the Gameplay information by clicking the info icon*/
function toggleInfo() {
    let infocontainer = document.getElementById("infoContainer");
    if (infostatus == "false") {
        showInfo(infocontainer);
    } else {
        hideInfo(infocontainer);
    }
}

/**This function shows the game instruction screen and put the screen to the higher layer*/
function showInfo(infocontainer) {
    infocontainer.classList.remove("d-none");
    infocontainer.style.zIndex = "999";
    infostatus = "true";
}

/**This function hides the game instruction screen and put the screen to the lower layer*/
function hideInfo(infocontainer) {
    infocontainer.classList.add("d-none");
    infocontainer.style.zIndex = "-1";
    infostatus = "false";
}


/**this function mute or unmute sound and change the speaker icon after the state of sound*/
function muteOrUnmute() {
    let icon = document.getElementById("tone");
    if (soundActivated) {
        soundActivated = false;
        icon.src = "img/mute.png";
    } else {
        soundActivated = true;
        icon.src = "img/speaker.png";
    }
}


