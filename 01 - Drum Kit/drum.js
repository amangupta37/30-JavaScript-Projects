const Keys = document.querySelectorAll(".key");

const playsound = (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
        key.classList.add("playing");
    }
};

Keys.forEach((key) =>
    key.addEventListener("transitionend", (e) => {
        e.propertyName === "transform" ? key.classList.remove("playing") : null;
    })
);

window.addEventListener("keydown", playsound);
