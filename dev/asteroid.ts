class Asteroid{

    game : Game
    private asteroidImage: HTMLImageElement;
    private hitbox: HTMLElement
    private asteroid : HTMLElement
    private asteroidSize: number
    private speed:number
    private availableWidth : number
    private y: number
    private x: number

    constructor(g:Game){
        this.game = g
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.asteroidImage = new Image(this.asteroidSize, this.asteroidSize);       
        this.asteroidImage.src = 'images/asteroid.png';
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.y = 0 - this.asteroidSize

        this.hitbox = document.createElement("hitbox")
        this.hitbox.style.height = this.asteroidSize + "px"
        this.hitbox.style.width = this.asteroidSize + "px"

        if(this.asteroidSize > 40){
            this.hitbox.style.left = "-20px"
            this.hitbox.style.top = "-15px"
        }

        if(this.asteroidSize > 100){
            this.hitbox.style.left = "-15px"
            this.hitbox.style.top = "-15px"
        }

        if(this.asteroidSize > 160){
            this.hitbox.style.left = "-15px"
            this.hitbox.style.top = "-15px"
        }

        this.asteroid = document.createElement("asteroid")

        document.body.appendChild(this.asteroid);
        this.asteroid.appendChild(this.asteroidImage)
        this.asteroid.appendChild(this.hitbox)

        console.log('Created asteroid')
    }

    public update(){
        this.y += this.speed
        this.asteroid.style.transform = `translate(${this.x}px,${this.y}px)`

        if(this.y > 720 + this.asteroidSize) {
            this.reset()
        }
    }

    public reset(){
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.asteroidImage.src = 'images/asteroid.png';
        this.y = 0 - this.asteroidSize
    }    

    public getRectangle() {
        return this.hitbox.getBoundingClientRect()
    }
}
