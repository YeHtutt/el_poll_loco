let intervalIds = [];

/**This function set all the annimation interval for this game*/
function setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**This function stops all the annimation interval of this game*/
function stopGame(){
    intervalIds.forEach(clearInterval);
}