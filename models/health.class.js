class Health extends Movableobject{

    
    y= 50;

    constructor(){
        super();
        this.loadImage('img/7_statusbars/3_icons/icon_health.png');

        this.height = 60;
        this.width = 80;

        this.x = 1000 + Math.random()*1200;
    }
}