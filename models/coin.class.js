class Coin extends Movableobject {
    x = 200;
    y = 100;

    IMAGES_COINS = ['img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.height = 100;
        this.width = 100; 

        this.x = 200 + Math.random() * 2000; 
        this.y = 280 - Math.random() * 200;  
        this.animate();
    }

    /**This function animate the coins to show smaller and bigger for the Gameplay*/
    animate() {
        setStopableInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 200);
    }
}