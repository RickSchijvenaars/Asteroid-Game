class Game {
    
    public asteroids: Asteroid[] //array for asteroids
    private spaceship: Spaceship
    private background: Background
    private lasers : Laser[]
    private textfield : HTMLElement
    private levens:number = 3   
    private time:number = 0
    

    constructor(){
        this.background = new Background() //create background
        this.spaceship = new Spaceship(this) //create spaceship
        let foreground = document.getElementsByTagName("foreground")[0]
        this.textfield = document.createElement("textfield")
        foreground.appendChild(this.textfield);
        this.asteroids = []
        this.lasers = []

        for(let i = 0; i < 6; i++){ //create asteroids
            let asteroid = new Asteroid(this)            
            this.asteroids.push(asteroid)
            asteroid.update()
        }

        this.gameLoop() //start gameloop
    }  

    gameLoop(){
        this.spaceship.update()
        this.textfield.innerHTML = "LEVENS: " + this.levens

        for(let l of this.lasers) { // loop door alle asteroids in de array - roep update aan
            l.update()
        }

        for(let asteroid of this.asteroids) { // loop door alle asteroids in de array - roep update aan
            asteroid.update()

           
            if (this.checkCollision(this.spaceship.getRectangle(), asteroid.getRectangle())) {
                asteroid.reset()
                this.levens--
                this.time = 0
                console.log("ship hits asteroid")
            }

            for(let las of this.lasers) { // loop door alle asteroids in de array - roep update aan
                if (this.checkCollision(las.getRectangle(), asteroid.getRectangle())) {
                    console.log("asteroid hits one of the lasers")
                    asteroid.reset()
                    las.remove()
                }
            }
        }

        if (this.levens == 0){
            this.textfield.innerHTML = "GAME OVER"
            this.textfield.setAttribute("style", "font-size:4em")
            this.spaceship.explode()
            return;
        }

        if (this.time == 2000){
            this.textfield.innerHTML = "GEHAALD"
            this.textfield.setAttribute("style", "font-size:4em")
            return;
        }

        this.time++
        this.background.loop()
        requestAnimationFrame( ()=> this.gameLoop() )        
    }

    public addLaser(l:Laser){
        this.lasers.push(l)
    }


    public checkCollision(a: ClientRect, b: ClientRect): boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }    
}


window.onload = () => {
   new Game();
};
      