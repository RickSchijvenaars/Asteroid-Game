class Background {

    width: number = 1280;
    height: number = 720;
    background: HTMLImageElement;
    yPos : number = 0;

    constructor(){
        this.background = new Image(this.width, this.height);
        this.background.setAttribute("id","background")
        document.body.appendChild(this.background); 
        
        console.log('Created background')
    }

    loop(){
        this.yPos = this.yPos + 2;
        this.background.style.backgroundPosition = '0px ' + this.yPos + 'px';
    }
    
}
