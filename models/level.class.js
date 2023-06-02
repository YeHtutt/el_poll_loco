class Level{
    enemies;
    endboss;
    clouds;
    bottles;
    coins;
    health;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, endboss ,clouds, backgroundObjects, bottles, coins, health){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins= coins;
        this.health = health;
    }
}