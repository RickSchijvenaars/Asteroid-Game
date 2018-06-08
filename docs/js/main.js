"use strict";
var Asteroid = (function () {
    function Asteroid(g) {
        this.game = g;
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.asteroidImage = new Image(this.asteroidSize, this.asteroidSize);
        this.asteroidImage.src = 'images/asteroid.png';
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.y = 0 - this.asteroidSize;
        this.hitbox = document.createElement("hitbox");
        this.hitbox.style.height = this.asteroidSize + "px";
        this.hitbox.style.width = this.asteroidSize + "px";
        if (this.asteroidSize > 40) {
            this.hitbox.style.left = "-20px";
            this.hitbox.style.top = "-15px";
        }
        if (this.asteroidSize > 100) {
            this.hitbox.style.left = "-15px";
            this.hitbox.style.top = "-15px";
        }
        if (this.asteroidSize > 160) {
            this.hitbox.style.left = "-15px";
            this.hitbox.style.top = "-15px";
        }
        this.asteroid = document.createElement("asteroid");
        document.body.appendChild(this.asteroid);
        this.asteroid.appendChild(this.asteroidImage);
        this.asteroid.appendChild(this.hitbox);
        console.log('Created asteroid');
    }
    Asteroid.prototype.update = function () {
        this.y += this.speed;
        this.asteroid.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.y > 720 + this.asteroidSize) {
            this.reset();
        }
    };
    Asteroid.prototype.reset = function () {
        this.speed = Math.floor((Math.random() * 5) + 3);
        this.asteroidSize = Math.floor((Math.random() * 250) + 50);
        this.availableWidth = 1280 - this.asteroidSize;
        this.x = Math.floor((Math.random() * this.availableWidth) + 1);
        this.asteroidImage.src = 'images/asteroid.png';
        this.y = 0 - this.asteroidSize;
    };
    Asteroid.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    return Asteroid;
}());
var Background = (function () {
    function Background() {
        this.width = 1280;
        this.height = 720;
        this.yPos = 0;
        this.background = new Image(this.width, this.height);
        this.background.setAttribute("id", "background");
        document.body.appendChild(this.background);
        console.log('Created background');
    }
    Background.prototype.loop = function () {
        this.yPos = this.yPos + 2;
        this.background.style.backgroundPosition = '0px ' + this.yPos + 'px';
    };
    return Background;
}());
var Game = (function () {
    function Game() {
        this.levens = 3;
        this.time = 0;
        this.background = new Background();
        this.spaceship = new Spaceship(this);
        var foreground = document.getElementsByTagName("foreground")[0];
        this.textfield = document.createElement("textfield");
        foreground.appendChild(this.textfield);
        this.asteroids = [];
        this.lasers = [];
        for (var i = 0; i < 6; i++) {
            var asteroid = new Asteroid(this);
            this.asteroids.push(asteroid);
            asteroid.update();
        }
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.spaceship.update();
        this.textfield.innerHTML = "LEVENS: " + this.levens;
        for (var _i = 0, _a = this.lasers; _i < _a.length; _i++) {
            var l = _a[_i];
            l.update();
        }
        for (var _b = 0, _c = this.asteroids; _b < _c.length; _b++) {
            var asteroid = _c[_b];
            asteroid.update();
            if (this.checkCollision(this.spaceship.getRectangle(), asteroid.getRectangle())) {
                asteroid.reset();
                this.levens--;
                this.time = 0;
                console.log("ship hits asteroid");
            }
            for (var _d = 0, _e = this.lasers; _d < _e.length; _d++) {
                var las = _e[_d];
                if (this.checkCollision(las.getRectangle(), asteroid.getRectangle())) {
                    console.log("asteroid hits one of the lasers");
                    asteroid.reset();
                    las.remove();
                }
            }
        }
        if (this.levens == 0) {
            this.textfield.innerHTML = "GAME OVER";
            this.textfield.setAttribute("style", "font-size:4em");
            this.spaceship.explode();
            return;
        }
        if (this.time == 2000) {
            this.textfield.innerHTML = "GEHAALD";
            this.textfield.setAttribute("style", "font-size:4em");
            return;
        }
        this.time++;
        this.background.loop();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.addLaser = function (l) {
        this.lasers.push(l);
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Game;
}());
window.onload = function () {
    new Game();
};
var Laser = (function () {
    function Laser(x) {
        this.laserWidth = 15;
        this.laserHeight = 32;
        this.y = 520;
        this.x = x - 0.5 * this.laserWidth;
        this.laser = new Image(this.laserWidth, this.laserHeight);
        this.laser.setAttribute('style', 'left:' + this.x + 'px;top:0px;');
        this.laser.src = 'images/laser.png';
        document.body.appendChild(this.laser);
        this.update();
        console.log('Created laser');
    }
    Laser.prototype.update = function () {
        this.y = this.y - 5;
        this.laser.style.transform = "translate(0px," + this.y + "px)";
        if (this.y < 0 - this.laserHeight) {
            this.laser.remove();
        }
    };
    Laser.prototype.remove = function () {
        this.laser.remove();
    };
    Laser.prototype.getRectangle = function () {
        return this.laser.getBoundingClientRect();
    };
    return Laser;
}());
var Spaceship = (function () {
    function Spaceship(g) {
        var _this = this;
        this.width = 100;
        this.height = 150;
        this.x = 0.5 * 1280 - 0.5 * this.width;
        this.y = 720 - this.height - 50;
        this.speed = 0;
        this.game = g;
        this.spaceshipImage = new Image(this.width, this.height);
        this.spaceshipImage.src = 'images/ship.png';
        this.spaceshipImage.setAttribute("id", "spaceship");
        this.hitbox = document.createElement("hitbox");
        this.spaceship = document.createElement("spaceship");
        document.body.appendChild(this.spaceship);
        this.spaceship.appendChild(this.spaceshipImage);
        this.spaceship.appendChild(this.hitbox);
        this.hitbox.style.height = '130px';
        this.hitbox.style.width = '60px';
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log('Created spaceship');
    }
    Spaceship.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = -10;
                break;
            case 39:
            case 68:
                this.speed = 10;
                break;
            case 32:
                var laser = new Laser(this.x + 0.5 * this.width);
                this.game.addLaser(laser);
                break;
        }
    };
    Spaceship.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
            case 65:
                this.speed = 0;
                break;
            case 39:
            case 68:
                this.speed = 0;
                break;
            case 32:
                break;
        }
    };
    Spaceship.prototype.update = function () {
        this.x += this.speed;
        if (this.x <= 0) {
            this.x = 0;
        }
        else if (this.x >= 1280 - this.width) {
            this.x = 1280 - this.width;
        }
        this.spaceship.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Spaceship.prototype.explode = function () {
        this.spaceshipImage.src = 'images/explosion.gif';
        setTimeout(this.retry, 1000);
    };
    Spaceship.prototype.retry = function () {
        this.spaceshipImage.src = 'images/ship.png';
    };
    Spaceship.prototype.getRectangle = function () {
        return this.hitbox.getBoundingClientRect();
    };
    return Spaceship;
}());
//# sourceMappingURL=main.js.map