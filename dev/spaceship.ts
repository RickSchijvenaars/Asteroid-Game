class Spaceship {
    
    spaceshipImage : HTMLImageElement;
    hitbox: HTMLElement
    spaceship : HTMLElement
    game : Game
    width : number = 100;
    height : number = 150;
    x : number = 0.5 * 1280 - 0.5 * this.width;
    y : number = 720 - this.height - 50;
    speed : number = 0;
    
    constructor(g:Game){
        this.game = g
        this.spaceshipImage = new Image(this.width, this.height);  
        this.spaceshipImage.src = 'images/ship.png';
        this.spaceshipImage.setAttribute("id","spaceship")
        this.hitbox = document.createElement("hitbox")
        this.spaceship = document.createElement("spaceship")
        document.body.appendChild(this.spaceship);
        this.spaceship.appendChild(this.spaceshipImage)
        this.spaceship.appendChild(this.hitbox)

        this.hitbox.style.height = '130px'
        this.hitbox.style.width = '60px'

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
        
        console.log('Created spaceship')
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37: // LEFT ARROW KEY
        case 65: // 'A' KEY
            this.speed = -10
            break
        case 39: // RIGHT ARROW KEY
        case 68: // 'D' KEY
            this.speed = 10
            break
        case 32: // SPACEBAR KEY
            let laser : Laser = new Laser(this.x + 0.5 * this.width)
            this.game.addLaser(laser)
            break
        }
    }
    
    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 37:// LEFT ARROW KEY
        case 65: // 'A' KEY
            this.speed = 0
            break
        case 39: // RIGHT ARROW KEY
        case 68: // 'D' KEY
            this.speed = 0
            break
        case 32: // SPACEBAR KEY
            //
            break
        }
    }

    update(){ 
        this.x += this.speed 
        if(this.x <= 0){
            this.x = 0
        }else if(this.x >= 1280 - this.width) {
            this.x = 1280 - this.width
        }    
        this.spaceship.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    explode() {
        this.spaceshipImage.src = 'images/explosion.gif';
        setTimeout(this.retry,1000)
    }

    retry() {
        this.spaceshipImage.src = 'images/ship.png';
    }

    public getRectangle() {
        return this.hitbox.getBoundingClientRect()
    }
}