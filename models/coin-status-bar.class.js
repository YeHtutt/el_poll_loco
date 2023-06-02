class CoinStatusBar extends DrawableObject {
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]

    percentage = 0;


    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 20;
        this.y = 80;
        this.width = 200;
        this.height = 60;
    }

    /**
     * This function set the coin status bar percentag via the given parameter 
     * @param {coins-value of instance Character} percentage - % value of the coins
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
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