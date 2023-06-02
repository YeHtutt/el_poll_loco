class Bottle extends Movableobject {
    x = 500;
    offset = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 10,

    }

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        
        this.y = 360;
        this.height = 80;
        this.width = 60;

        this.x = 200 + Math.random() * 2000; 
    }
}  