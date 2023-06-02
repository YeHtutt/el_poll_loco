class Character extends Movableobject {
    height = 270;
    y = 50;
    width = 130;
    speed = 10;
    bottles = 0;
    coins = 0;

    offset = {
        top: 110,
        left: 20,
        right: 20,
        bottom: 0,

    }


    IMAGES_WALKING = ['img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = ['img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEATH = ['img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    currentImage = 0;
    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    idleCountUp = 0;
    jumpTimeout = false;



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravity();
    }

    /**This function animate the character for the Gameplay*/
    animate() {
        setStopableInterval(() => this.moveCharacter(), 1000 / 60);
        setStopableInterval(() => this.playCharacter(), 120);
    }

    /**This function set all the variable of character for the movement annimation*/
    moveCharacter() {
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * This function check the validation of the movement right
     * @returns true or false
     */
    canMoveRight() {
        return (this.world.keyboard.RIGHT && (this.x < (this.world.getEndbossX() - 0)));
    }

    /**This funkiton let the character move right and play the suitable audio for moving*/
    moveRight() {
        super.moveRight();
        this.world.playSound(this.walking_sound);
        this.otherDirection = false;
    }

    /**
     * This function check the validation of the movement left
     * @returns true or false
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0
    }

    /**This funkiton let the character move left and play the suitable audio for moving*/
    moveLeft() {
        super.moveLeft();
        this.world.playSound(this.walking_sound);
        this.otherDirection = true;
    }

    /**
     * This function check the validation of the Jump movement
     * @returns true or false
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**This funkiton let the character Jump and play the suitable audio for moving*/
    jump() {
            this.world.playSound(this.jumping_sound);
            super.jump();
    }

    /**This function annimate the suitable images of character according to his movements*/
    playCharacter() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEATH);
            this.idleCountUp = 0;
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleCountUp = 0;
        } else if (this.isAboveGround() && this.speedY > -20) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.idleCountUp = 0;
        } else if (this.movingLeftOrRight()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleCountUp = 0;
        } else if (this.isIdle()) {
            this.characterIdle();
        }
    }

    /**
     * This function checks if the charcater is moving left or right
     * @returns true or false
     */
    movingLeftOrRight(){
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * This function checks if the character is moving or not - checks one of the key is pressed
     * @returns true or false
     */
    isIdle() {
        return (
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE &&
            !this.world.keyboard.D
        );
    }

    /**This function display the annimation of character idle and Sleep(long idle)*/
    characterIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.idleCountUp +=100;
        if(this.idleCountUp >= 10000){
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }


}