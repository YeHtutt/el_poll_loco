class DrawableObject {
    x = 100;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * This function draw all the moveable objects
     * @param {contex} ctx - canvas contex
     */
    draw(ctx) { 
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch(e)
        {
            console.warn('Error loading image', e);
            console.log('Could not load image, ', this.img.src)
        }
    }

    /**
    * this function load the images of the Array one after one  
    * @param {Array} array - ['img/image1.png', 'img/img2.png',...]
    */
    loadImages(array) { 
        array.forEach((path) => {
            let img = new Image(); 
            img.src = path;        
            this.imageCache[path] = img; 
        });
    }

    /**this function is for draw the Frame of moveable objects to check the collision */
    drawFrame(ctx) { 
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) { 
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height); //vierecke zeichnen
            ctx.stroke();
        }
    }

}