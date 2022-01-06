const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Сетка
let box = 100;

//Игровые переменые
let player = {
	x: 0,
	y: 0,
};
let score = 0;

let backgroung = new Image();
backgroung.src = "backgroundForest.png";

let backgroung2 = new Image();
backgroung2.src = "backgroundForest.png";

let playerImg = new Image();
playerImg.src = "Cute_Spaceship_bevouliin_dot_com/spaceship01.png";

let moveA = new Audio();
moveA.src = "odinochnyiy-zvuk-taymera.mp3"

let loseA = new Audio();
loseA.src = "zvuk-oshibki-vyibora.mp3"

let scoreA = new Audio();
scoreA.src = "upali-dengi-na-igrovoy-schet.mp3"

//Управление
let up = true;

let down = true;

let buttonW = document.getElementById('btnW');
let buttonS = document.getElementById('btnS');

buttonW.addEventListener('click', event => {
	w();
	moveA.play();
})
buttonS.addEventListener('click', event => {
	s();
	moveA.play();
})


onkeydown = function(e){
	console.log(e.code);
	if (e.code == "KeyW") {
		up = true;
		w();
		moveA.play();
	}
	if (e.code == "ArrowUp") {
		up = true;
		w();
		moveA.play();

	}
	if (e.code == "KeyS" || e.code == "ArrowDowm") {
		down = true;
		s();
		moveA.play();
	}
	if (e.code == "ArrowDown") {
		down = true;
		s();
		moveA.play();

	}
}

onkeyup = function(e){
	if (e.code == "KeyW" || e.code == "ArrowUp") {
		
	}
	if (e.code == "ArrowUp") {
			}
	if (e.code == "KeyS" || e.code == "ArrowDown") {
		
	}
	if (e.code == "ArrowDowm") {
			}
}

function w(){
	if (up === true && player.y > 0) {
		player.y -= 100;
	}
}
function s(){
	if (down === true && player.y < box*2) {
		player.y += box;
	}
}





class Game{
	constructor(ctx, width, height){
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.enemiem=[];
		this.enemyTimer = 0;
		this.enemyInterval = 50;
		this.#addNewEnemy(this.enemiem);
		console.log(this.enemiem)
	}
	update(deltaTime){
		if (this.enemyTimer > this.enemyInterval) {
			this.#addNewEnemy();
			this.enemyTimer = 0;
		}
		else{
			this.enemyTimer++;
			// this.enemyTimer += deltaTime;
		}
		this.enemiem.forEach(object => object.update());
	}
	draw(){
		this.enemiem.forEach(object => object.draw());
	}
	#addNewEnemy(){
		this.enemiem.push(new Worm(this));
	}
}

class enemy{
	constructor(game){
		this.game = game;
		this.frameX = 0;
		this.maxFrame = 10;
		this.frameTimer = 0;
		this.frameInterval = 70;
	}
	update(deltaTime){
		this.x -= 5;
		if (this.frameTimer > this.frameInterval) {
			if (this.frameX < this.maxFrame) {this.frameX++;}
			else{
				this.frameX = 0;
			}
			this.frameTimer = 0;
		}else{
			this.frameTimer += 60;
		}
		if (player.x == this.x - 90 && player.y == this.y) {
			loseA.play();
		}
		if (player.x == this.x -60 && player.y == this.y) {
			console.log("lose")
			window.location.reload();
		}
		if (player.x == this.x - 90 && player.y != this.y) {
			score += 1;
			scoreA.play();
		}
	}
	draw(){
		ctx.drawImage(this.playerIMG, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteWidth, this.x, this.y, this.width, this.height)
	}
}

class Worm extends enemy{
	constructor(game){
		super(game);
		this.spriteWidth = 474;
		this.spriteHeight = 468;
		this.x = 1000;
		this.y = Math.floor((Math.random() * 3)) * box;
		this.width = 100;
		this.height = 100;
		this.playerIMG = worm;
	}
}

const game = new Game(ctx, canvas.width, canvas.height);



let BGx = 0;
let BG2x = -2400;


//отрисовка
let lastTime = 1;
function draw(timeStamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(backgroung, BGx, -320, 2400, 900)
	ctx.drawImage(backgroung2, BG2x, -320, 2400, 900)
	if (BGx < -2400) {BGx = 2400 - 6}
	else BGx-=3;
	if (BG2x < -2400) {BG2x = 2400 - 6}
	else BG2x-=3;

	ctx.drawImage(playerImg, player.x, player.y, box, box)
	// ctx.fillStyle = "black";
	// ctx.fillRect(player.x, player.y, box, box)

	const deltaTime = timeStamp - lastTime;
	lastTime = timeStamp;

	game.update();
	game.draw();

	ctx.fillStyle = "black";
	ctx.font = "43px impact";
	ctx.fillText(score, 10, 40)

	ctx.fillStyle = "white";
	ctx.font = "40px impact";
	ctx.fillText(score, 13, 40)


	requestAnimationFrame(draw);
}
draw()
