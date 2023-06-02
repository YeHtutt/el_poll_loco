class ThrowableObject extends Movableobject {

    IMAGES_THROW = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_SPLASH = ['img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    hitEnemy = false;

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5,

    }

    throwing_sound = new Audio('audio/throw.mp3');




    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 80;
        this.animate();
    }


    /**this function do the physical calculation of the throw right movement and annimate the throw annimation*/
    throw() {
        this.speedY = 24;
        this.applyGravity();
        this.playSound(this.throwing_sound);
        setStopableInterval(() => this.x += 14, 40);

    }

    /**this function do the physical calculation of the throw left movement and annimate the throw annimation*/
    throwLeft() {
        this.speedY = 24;
        this.applyGravity();
        this.playSound(this.throwing_sound);
        setStopableInterval(() => this.x -= 14, 40);
    }


    /**This function animate the bottle throw and the bottle hit annimation for the Gameplay*/
    animate() {
        setStopableInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.bottleHit()) {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 100);
    }

    /**
     * This function checks if enemy was hit
     * @returns - true or false
     */
    bottleHit() {
        return this.hitEnemy;
    }

    /**
     * This function play the audio of the parameter which was given
     * @param {audio file} sound - an audio object 
     */
    playSound(sound) {
        if (soundActivated) {
            var playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                })
                    .catch(error => {
                    });
            }
        }
    }

}