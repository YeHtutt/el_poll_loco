class Movableobject extends DrawableObject {
    speed = 0.15; //0.15 pixels
    otherDirection = false;
    speedY = 0; //Geschwindigkeit auf Y-Achse
    acceleration = 2;
    energy = 100;
    bottlePercentage = 100;
    lastHit = 0;
    speedEnemy = 0.55;
    speedEndBoss = 0.25;
    speedCloud = 0.03; 

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }

    hit_enemy_chicken = new Audio('audio/hit_on_head.mp3');
    hit_enemy_Endboss = new Audio('audio/hit_Endboss.mp3');
    character_hurt = new Audio('audio/hurt_low_grunt.mp3');


    /**This function sets the variable and makes calculation that the objects fall to the ground */
    applyGravity() {  
        setStopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * This function checks if an object is above the ground (e.g. Jumping)
     * @returns true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }


    /**This function is mathematic calculation of one object collides with the other object */
    isColliding(movableObject) {
        return this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&         //R->L
            this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&           //T->B  
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&   //L->R
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom;    //B->T
    }

    /**This function checks the colliding of enemy and character and set the energy values according to their instances*/
    hit() {
        this.hit_enemy_chicken.pause();
        this.hit_enemy_Endboss.pause();
        this.character_hurt.pause();
            if (this instanceof Character) {
                this.characterLooseEnergy();
                this.timepassedLastHitCharacter();
            } else if (this instanceof Endboss) {
                this.enemyBossLooseEnergy();
                this.timepassedLastHitEnemyBoss();
            } else if (this instanceof Chicken || this instanceof SmallChicken) {
                this.enemyChickenkilled();
            }
    }

    /**This function decrease the percentage of the energy of the character*/
    characterLooseEnergy() {
        this.energy -= 5;
        this.playSound(this.character_hurt);
    }

    /**This function calculate how many times passed after character hit with enemy*/
    timepassedLastHitCharacter() {
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**This function decrease the percentage of the energy of the enemy chicken endboss*/
    enemyBossLooseEnergy() {
        this.energy -= 30;
        this.playSound(this.hit_enemy_Endboss);
    }

    /**This function calculate how many times passed after enemy endboss hit by bottle*/
    timepassedLastHitEnemyBoss() {
        if (this.energy <= 10) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**This function decrease the percentage of the energy of the enemy chicken to zero, which mean it has been killed*/
    enemyChickenkilled() {
        this.energy -= 100;
        this.playSound(this.hit_enemy_chicken);
    }

    /**
     * this function check if one object is dead
     * @returns true or false
     */
    isDead() {
        return this.energy == 0; 
    }

    /**
     * This function count down 1sec if object is hurted
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1; 
    }

    /**
     * The function annimate all the moveable objects annimation for the 2d game
     * @param {Array of images Paths} images - array object of the images paths from the different objects
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; //  i = 1%6 rest->1 ; i = 2%6 rest->2;...   ;i = 7%6 rest-> 1
        //i = 0,1,2,3,4,5, 0,1,2,3,4,5, 0,1,2,3,4,5
        let path = images[i];
        this.img = this.imageCache[path]; 
        this.currentImage++;
    }

    /**This function do the mathematic calculation of the right movement*/
    moveRight() {  
        this.x += this.speed; 
    }

    /**This function do the mathematic calculation of the left movement accroding to the different instances*/
    moveLeft() {
        if (this instanceof Character) {
            this.x -= this.speed; 
        }
        if (this instanceof Endboss) {
            this.x -= this.speedEndBoss; 
        }
        if (this instanceof Chicken || this instanceof SmallChicken) {
            this.x -= this.speedEnemy;  
        }
        if (this instanceof Cloud) {
            this.x -= this.speedCloud; 
        }
    }

    /**This function do the mathematic calculation of the jump movement*/
    jump() {
            this.speedY = 30; 
    };

    /**
     * This function play the audio of the parameter which was given
     * @param {audio file} sound - an audio object 
     */
    playSound(sound) {
        if (soundActivated) {
            var playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                })
                    .catch(error => {
                    });
            }
        }
    }
}