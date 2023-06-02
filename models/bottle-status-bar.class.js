class BottleStatusBar extends DrawableObject {

    IMAGES_BOTTLE = ['img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    percentage = 0;


    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }

    /**
     * This function set the bottle status bar percentag via the given parameter 
     * @param {bottles-value of instance Character} percentage - % value of the bottles
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * calculate after the percentage value and update the right image for 2d game annimation
     * @returns - index of Array , image[index]
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        }
        else if (this.percentage == 60) {
            return 3;
        }
        else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}