class StatusBarEndBoss extends DrawableObject {
    IMAGES_HEALTH_END_BOSS = ['img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];


    x = 500;
    y = 60;

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_END_BOSS);
        this.setPercentage(this.percentage);
        this.width = 200;
        this.height = 60;
        
    }

    /**
     * This function set the enemy chicken-boss status bar percentag via the given parameter 
     * @param {energy-value of instance movable-object} percentage - % value of the energy
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES_HEALTH_END_BOSS[this.resolveImageIndex()];
        this.otherDirection = true; 
        this.img = this.imageCache[path]; 
    }


    /**
     * calculate after the percentage value and update the right image for 2d game annimation
     * @returns - index of Array , image[index]
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        }
        else if (this.percentage >= 60) {
            return 3;
        }
        else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        }
        else {
            return 0;
        }
    }

}

