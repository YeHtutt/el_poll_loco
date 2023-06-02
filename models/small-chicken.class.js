class SmallChicken extends Movableobject {
    x = 100;
    y = 370;
    height = 50;
    width = 50;

    isdead = false;

    IMAGES_SMALLCHICKEN_WALKING = ['img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_SMALLCHICKEN_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    offset = {
        top: 0,
        left: 2,
        right: 2,
        bottom: 0,

    }



    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.startPointSmallChicken();
        if (this.x == 0)
            this.startPointSmallChicken();
        this.loadImages(this.IMAGES_SMALLCHICKEN_WALKING);
        this.loadImages(this.IMAGE_SMALLCHICKEN_DEAD);
        this.animate();
    }

    /**This function animate the small chicken for the Gameplay*/
    animate() {
        setStopableInterval(() => this.moveSmallChicken(), 1000 / 60);
        setStopableInterval(() => this.playSmallChicken(), 200);
    }

    /**This function set the random x-coordinate in the Map for the small chicken annimation*/
    startPointSmallChicken() {
        this.x = 400 + Math.random() * 1000;
        this.speed = 0.25 + Math.random() * 1.5;
    }

    /**This function annimate the left movement of the small chicken as long as they are alive*/
    moveSmallChicken() {
        if (!this.isDead())
            this.moveLeft();
    }

    /**This function annimate the suitable images of the small chicken according to their movements */
    playSmallChicken() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_SMALLCHICKEN_DEAD);
        } else {
            this.playAnimation(this.IMAGES_SMALLCHICKEN_WALKING);
        }
    }
}