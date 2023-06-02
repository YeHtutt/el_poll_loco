class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    statusBarEndBoss = new StatusBarEndBoss();
    throwableObjects = [];
    endboss = this.level.endboss[this.level.endboss.length - 1];
    timeout = false;
    throwTimeout = false;
    collideTimeout = false;


    collect_bottle = new Audio('audio/grab_bottle.mp3');
    collect_coin = new Audio('audio/collect_gold_coin.mp3');
    heart_collect_healing = new Audio('audio/heart_collect_healing.mp3');
    game_win = new Audio('audio/win_game.mp3');
    game_lost = new Audio('audio/gameover_lost.mp3');

    IMAGE_GAMEOVER = ['img/9_intro_outro_screens/game_over/game over.png'];



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.initBottlesForLevel();
        this.initCoinsForLevel();
        this.checkCollisions();
        this.run();
    }

    /**this function sets the world for this game*/
    setWorld() {
        this.character.world = this;
    }

    /**new coins are generated for game */
    initCoinsForLevel() {
        this.level.coins.push(new Coin());
        this.level.coins.push(new Coin());
        this.level.coins.push(new Coin());
        this.level.coins.push(new Coin());
    }

    /**new bottles are generated for game */
    initBottlesForLevel() {
        this.level.bottles.push(new Bottle());
        this.level.bottles.push(new Bottle());
        this.level.bottles.push(new Bottle());
        this.level.bottles.push(new Bottle());
    }

    /**This function makes the game run and update the game status*/
    run() {
        this.heart_collect_healing.pause();
        setStopableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkGameStatus();
        }, 80)
    }

    /**This function checks all the collision between character and the game objects of the foreground*/
    checkCollisions() {
        this.collideWithEnemyChicken();
        this.collideHeartForHeal();
        this.collideWithBottle();
        this.collideWithCoin();
        this.collideWithEnemyEndboss();
    }

    /**This function checks when character and enemy collide who gets the damage*/
    collideWithEnemyChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.enemyCanHurtCharacter(enemy)) {
                if (this.characterCanJump() && this.collideTimeout == false){
                    this.characterHurtEnemy(enemy);
                    this.collideTimeout =true;
                }else
                    this.enemyHurtCharacter();
            } else
                this.enemyHitByBottle(enemy);
        });
        setTimeout(() => {this.collideTimeout = false}, 500);
    }

    /**This function return boolean value: if character is jumping "true" and is not jumping "false" */
    characterCanJump() {
        return this.character.isAboveGround();
    }

    /**This function call the jumpOnEnemyHead function to change the state of the enemy to dead*/
    characterHurtEnemy(enemy) {
        enemy.isdead = true;
        this.jumpOnEnemyHead(enemy);
    }

    /**This function checks the enemy chicken was dead by hit with character and let it removes from the map*/
    jumpOnEnemyHead(enemy) {
        enemy.hit();
        this.removeChicken(enemy);
    }

    /**This function return the true or false boolean value if the enemy can hurt character or not */
    enemyCanHurtCharacter(enemy) {
        return (this.character.isColliding(enemy) && !enemy.isdead && (this.character.speedY < 0));
    }

    /**the character was hit by the opponent - character loose energy*/
    enemyHurtCharacter() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**
     * enemy was hit by bottle - enemy loose energy
     * @param {Array (this.level.enemies[])} enemy - all small-chicken and chicken objects of the level
     */
    enemyHitByBottle(enemy) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy) && this.timeout == false) {
                enemy.hit();
                bottle.hitEnemy = true;
                if (this.enemyIsEndBoss(enemy)) {
                    this.statusBarEndBoss.setPercentage(enemy.energy);
                    this.timeout = true;
                } if (this.enemyIsChicken(enemy)) {
                    this.removeChicken(enemy);
                } this.timeout = true;
            }
        })
    };

    /**
     * This function checks if the object is instance of chicken- or small-chicken- objects or not
     * @param {Array (this.level.enemies[])} enemy - all small-chicken and chicken objects of the level
     * @returns true or false
     */
    enemyIsChicken(enemy) {
        return enemy instanceof Chicken || enemy instanceof SmallChicken;
    }

    /**
     * This function checks if the object is instance of Endboss object or not
     * @param {Array (this.level.endBoss[])} enemy - all Endboss object of this level
     * @returns true or false
     */
    enemyIsEndBoss(enemy) {
        return enemy instanceof Endboss;
    }

    /**this function delete the death enemy chicken after 1 sec.*/
    removeChicken(enemy) {
        setTimeout(() => {
            let i = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(i, 1);
        }, 1000)
    }

    /**when Character collide with Enemy Chicke Boss - he gets hurt */
    collideWithEnemyEndboss() {
        this.level.endboss.forEach((enemy) => {
            if (this.EndbossCanHurtCharacter(enemy))
                this.EndbossHurtCharacter();
            else
                this.enemyHitByBottle(enemy);
        })
    }

    /**
     * This function checks enemy Boss can hurt the character or not
     * @param {Array (this.level.endBoss[])} enemy - all Endboss object of th
     * @returns true or false
     */
    EndbossCanHurtCharacter(enemy) {
        return this.character.isColliding(enemy) && !enemy.isDead();
    }

    /**This function drains the energy of the character and update the percentage of character life statusbar*/
    EndbossHurtCharacter() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**This function checks if character collide with the heart object */
    collideHeartForHeal() {
        this.level.health.forEach((health) => {
            if (this.canHealCharacter(health))
                this.healCharacter();
        })
    }

    /**
     * This function checks if character's energy is less than 100% during colliding with the heart
     * @param {Array (this.level.health[])} health - all the health(heart-image) objects of this level
     * @returns true or false
     */
    canHealCharacter(health) {
        return this.character.isColliding(health) && this.statusBar.percentage < 100 && !this.character.isDead();
    }

    /**This function heal the character to different energy value*/
    healCharacter() {
        if (this.character.energy < 30)
            this.bigheal();
        else if (this.character.energy < 60)
            this.smallheal();
        else
            this.nullheal();
        if (this.allHeartCollected())
            this.initNewHeartForLevel();
        this.playSound(this.heart_collect_healing);
    }

    /**character get the 50% of energy*/
    bigheal() {
        this.character.energy += 50;
        this.statusBar.setPercentage(this.character.energy);
        this.level.health.pop(new Health().length);
    }

    /**character get the 30% of energy*/
    smallheal() {
        this.character.energy += 30;
        this.statusBar.setPercentage(this.character.energy);
        this.level.health.pop(new Health().length);
    }

    /**character get 0% of energy when his life is full*/
    nullheal() {
        this.character.energy = 100;
        this.statusBar.setPercentage(this.character.energy);
        this.level.health.pop(new Health().length);
    }

    /**
     * This function checks if the health array is empty 
     * @returns true or false
     */
    allHeartCollected() {
        return this.level.health.length == 0;
    }

    /**This function refill new health objects for the level*/
    initNewHeartForLevel() {
        this.level.health.push(new Health());
    }

    /**This function checks if the character collected bottles or not*/
    checkThrowObjects() {  //Flaschen Wurf
        if (this.canThrowBottle()) {
            if (this.canThrowRight()) {
                this.throwRight();
            } else if (this.canThrowLeft()) {
                this.throwLeft();
            }
        }
    }

    /**
     * This function checks if the character can throw bottles
     * @returns true or false
     */
    canThrowBottle() {
        return this.keyboard.D && this.character.bottles > 0 && !this.character.isDead() && this.throwTimeout == false;
    }

    /**
     * This function checks if character is watching to the right direction
     * @returns true or false
     */
    canThrowRight() {
        return this.character.otherDirection == false
    }

    /**
     * This function checks if character is watching to the left direction
     * @returns true or false
     */
    canThrowLeft() {
        return this.character.otherDirection == true;
    }

    /**
     * This function let the character throw bottles to right
     */
    throwRight() {
        let bottle = new ThrowableObject(this.character.x, this.character.y);
        this.throwableObjects.push(bottle);
        this.throwableObjects[this.throwableObjects.length - 1].throwing_sound.pause();
        this.throwableObjects[this.throwableObjects.length - 1].throw();
        this.throwTimeout = true;
        this.timeout = false;
        this.removeBottle();
        this.bottleStatusBar.setPercentage(this.character.bottles);
        setTimeout(() => {
            this.throwTimeout = false;
        }, 1000)
    }

    /**
    * This function let the character throw bottles to left
    */
    throwLeft() {
        let bottle = new ThrowableObject(this.character.x, this.character.y);
        this.throwableObjects.push(bottle);
        this.throwableObjects[this.throwableObjects.length - 1].throwing_sound.pause();
        this.throwableObjects[this.throwableObjects.length - 1].throwLeft();
        this.throwTimeout = true;
        this.timeout = false;
        this.removeBottle();
        this.bottleStatusBar.setPercentage(this.character.bottles);
        setTimeout(() => {
            this.throwTimeout = false;
        }, 1000)
    }

    /**This function checks when the character collide with bottles his collecting bottle-status-bar can increase or not*/
    collideWithBottle() { //Bottle sammeln
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.addBottle();
                if (this.character.bottles < 100) {
                    this.collectItem(bottle);
                }
                this.bottleStatusBar.setPercentage(this.character.bottles);
            }
        });
    }

    /**This function handed over the bottles to bottle-status-bar - 20% increase if he collect a bottle*/
    addBottle() {
        this.character.bottles += 20;
        if (this.character.bottles > 100) {
            this.character.bottles = 100;
        }
    }

    /**This function decrease 20% of the bottle-status-bar value, when it was called*/
    removeBottle() {
        this.character.bottles -= 20;
        if (this.character.bottles < 0) {
            this.character.bottles = 0;
        }
    }

    /**This function checks if the character collected coins or not*/
    collideWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.addCoin();
                if (this.character.coins < 100) {
                    this.collectItem(coin);
                }
                this.coinStatusBar.setPercentage(this.character.coins);
            }
        })
    }

    /**This function handed over the coins to coin-status-bar - 20% increase if he collect a coin*/
    addCoin() {
        this.character.coins += 20;
        if (this.character.coins >= 100) {
            this.character.coins = 100;
        }
    }

    /**
     * This function update the bottle and coin objects for game annimation when the character collide with the objects in map
     * @param {level objects} item - is Bottle object or is Coin object of this level
     */
    collectItem(item) {
        this.collect_bottle.pause();
        this.collect_coin.pause();
        if (item instanceof Bottle) {
            this.updateBottlesImages(item);
            if (this.allBottlesCollected())
                this.initBottlesForLevel();
        }
        if (item instanceof Coin) {
            this.updateCoinsImages(item);
        }
    }

    /**delete one bottle instance from the map and play the sound for collect bottle */
    updateBottlesImages(item) {
        let i = this.level.bottles.indexOf(item);
        this.level.bottles.splice(i, 1);
        this.playSound(this.collect_bottle);
    }

    /**delete one coin instance from the map and play the sound for collect coin*/
    updateCoinsImages(item) {
        let i = this.level.coins.indexOf(item);
        this.level.coins.splice(i, 1);
        this.playSound(this.collect_coin);
    }

    /**
     * This function checks if the bottle array is empty 
     * @returns true or false
     */
    allBottlesCollected() {
        return this.level.bottles.length == 0;
    }

    /**draw every images for 2d annimation - images of all models instances needed for this game*/
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addAllLevelObjects();
        this.addGameCharacter();

        /** ------ Spaced for fixed objects ------------- */
        this.ctx.translate(-this.camera_x, 0);
        this.addAllStatusBar();
        this.ctx.translate(this.camera_x, 0);
        /** ------ Spaced for fixed objects ------------- */

        this.ctx.translate(-this.camera_x, 0);
        this.repeatDrawForAnnimation();
    }

    /**add backgroundImages, Clouds, bottles, enemy chicken, coins, health etc.. to 2d game*/
    addAllLevelObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.health);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**add the game player to 2d game*/
    addGameCharacter() {
        this.addToMap(this.character);
    }

    /**add all the life and items status bar to 2d game */
    addAllStatusBar() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.statusBarEndBoss);
    }

    /** call the draw function again and again for 2d game annimation*/
    repeatDrawForAnnimation() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function add images of objects (Array) to canvas for draw 2d game annimation
     * @param {Array of images path} objects - all the level objects
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }

    /**
     * This function add images of moveableObjects (Array) to canvas for draw 2d game annimation
     * @param {Array of images path} movableObject - the moveable objects e.g. character
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection)
            this.flipImage(movableObject);
        movableObject.draw(this.ctx);
        //movableObject.drawFrame(this.ctx);
        if (movableObject.otherDirection)
            this.flipImageBack(movableObject);
    }

    /**
     * This function flip character images to the other direction when he changes his direction
     * @param {Array of images path} movableObject - the moveable objects e.g. character
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * This function flipback character images to the other direction when he changes his direction
     * @param {Array of images path} movableObject - the moveable objects e.g. character
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    /**get the position X of the enemy Endboss on the map */
    getEndbossX() {
        return this.endboss.x;
    }

    /**
     * This function checks if enemy Endboss overrun and kill the character
     * @returns true or false
     */
    checkEndbossOverRunCharacter() {
        return (this.getEndbossX() - this.character.x < -10);
    }

    /**
     * This function set by overrun of endboss character energy to zero
     */
    updateCharacterEnergy() {
        this.character.energy = 0;
        this.statusBar.setPercentage(this.character.energy);
    }

    /**This function is checking if character or enemy Endboss was killed in this game 
     * If one option is valid the function stop the Game and show the end screen and play the suitable sound
    */
    checkGameStatus() {
        if (this.character.isDead() || this.checkEndbossOverRunCharacter()) {
            this.updateCharacterEnergy();
            this.character.walking_sound.pause();
            setTimeout(() => this.playSound(this.game_lost), 100)
            this.endGame();
            setTimeout(() => showEndScreenLoose(), 3000)

        }
        else if (this.endboss.isDead()) {
            this.character.walking_sound.pause();
            setTimeout(() => this.playSound(this.game_win), 100)
            this.endGame();
            setTimeout(() => showEndScreenGameOver(), 3000)
        }
    }

    /**This function stops all the annimation interval of this game*/
    endGame() {
        this.character.walking_sound.pause();
        setTimeout(() => {
            stopGame();
        }, 1000);
    }

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