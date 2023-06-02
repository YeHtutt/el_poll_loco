class Endboss extends Movableobject {
    height = 400;
    width = 250;
    y = 55;
    currentImage = 0;
    //isdead = false;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = ['img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = ['img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hadFirstContact = false;
    offset = {
        top: 65,
        bottom: 10,
        right: 20,
        left: 20,
    };

    endbossAttackSound = new Audio ('audio/chicken_attack.mp3');
    endbossDeadSound = new Audio('audio/chicke_endboss_dead.mp3');

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2500; //X-Posistion vom Enemy Boss
        this.animate();
    }

    /**This function animate the chicken endboss for the Gameplay*/
    animate() {
        setStopableInterval(() => this.moveEndBoss(), 250);
        setStopableInterval(() => this.playEndBoss(), 150);
    }

    /**This function set all the variable of the chicken endboss for the movement annimation*/
    moveEndBoss() {
        this.checkFirstContact();
        if (this.canMove()) {
            this.endBossMove();
        } 
    }

    /**
     * This function checks the distance between the character and chicken endboss to chase the character
     * @returns true or false
     */
    canMove() {
        return world.character && this.distanceCharacterToEndboss() < 400 && this.hadFirstContact;
    }

    /**This funkiton annimates the walking animation of enemy chicken endboss*/
    endBossMove() {
        
        setStopableInterval(() => {
            if (this.canMoveLeft())
                this.moveLeft();
        }, 1000 / 60);
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * This function checks the validation of the movement left
     * @returns true or false
     */
    canMoveLeft() {
        return ((this.distanceCharacterToEndboss() < 400 &&
            !this.isDead()) || (this.energy < 100 && !this.isDead()));
    }

    /**This funkiton let the enemy chicken endboss move left*/
    moveLeft() {
        super.moveLeft();
    }

    /**This function checks the first contact and changes the variable to true*/
    checkFirstContact() {
        if (world.character.x > 2000 && !this.hadFirstContact)
            this.hadFirstContact = true;
    }

    /**This function checks the distance from character to Endboss
     * @returns true or false
    */
    distanceCharacterToEndboss() {
        return this.x - world.character.x;
    }

    /**This function annimate the suitable images of the enemy endboss according to it's movements*/
    playEndBoss() {
        this.endbossDeadSound.pause();
        this.endbossAttackSound.pause();
        if (this.canAlert())
            this.playAlert();
        if (this.canAttack())
            this.playAttack();
        if (this.canHurt())
            this.playHurt();
        if (this.canDead()) {
            this.playDead();
        }
    }

    /**
     * This function checks the alert annimation of chicken 
     * @returns true or false
     */
    canAlert() {
        return world.character &&
            this.distanceCharacterToEndboss() >= 400 &&
            !this.isHurt()
    }

    /**This function annimate the alert annimation of enemy chicken endboss */
    playAlert() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * This function checks the attack annimation of chicken 
     * @returns true or false
     */
    canAttack() {
        return world.character &&
            this.distanceCharacterToEndboss() < 250 && this.distanceCharacterToEndboss() > 50 &&
            !this.isHurt()
    }

    /**This function annimate the attack annimation of enemy chicken endboss */
    playAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.playSound(this.endbossAttackSound);
    }

    /**
     * This function checks if enemy chicken endboss can hurt
     * @returns true or false
     */
    canHurt() {
        return this.isHurt();
    }

    /**This function annimate the hurt annimation of enemy chicken endboss */
    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * This function checks if enemy chicken endboss can dead
     * @returns true or false
     */
    canDead() {
        return this.isDead();
    }

    /**This function annimate the dead annimation of enemy chicken endboss */
    playDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.playSound(this.endbossDeadSound);
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