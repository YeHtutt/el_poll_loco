class Cloud extends Movableobject {
    y = 50;
    width = 500;
    height = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 100 + Math.random() * 2500; 
        this.animate();
    }

    /**This function animate the clouds to move left smoothly for the Gameplay*/
    animate() { 
        setStopableInterval(() =>{
            this.moveLeft();
        }, 100 / 60)
        
    }
    
}