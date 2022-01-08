const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let buttonClear = document.getElementById('clear');

let buttonSave = document.getElementById('save');

let buttonReplay = document.getElementById('replay');

let buttonImg = document.getElementById('IMG');

let buttonPaint = document.getElementById('check');

let buttonSearhs = document.getElementById('searh');

let Colors = document.getElementById('color').value;

let info_block = document.getElementById('color').value;

let IsLinewidth = document.getElementById('linewidth').value;

let coords = [];

let paint = true;

let replayFun = false;

canvas.width = innerWidth - 150;
canvas.height = innerHeight - 50;

window.onresize = function(event) {
    canvas.width = innerWidth - 150;
	canvas.height = innerHeight - 50;
};



// переменые

var mouseDOWN = false;

// code

window.addEventListener('mousedown', function(e){
	mouseDOWN = true;
	console.log(mouseDOWN)
})

window.addEventListener('mouseup', function(e){
	mouseDOWN = false;
	ctx.beginPath();
	coords.push('mouseup');
})


// ctx.lineWidth = (IsLinewidth / 2) * 2
window.addEventListener('mousemove', function(e){
	if (mouseDOWN == true && e.clientX > 149 && e.clientY > 35 &&replayFun == false) {
		if (paint) {
			ctx.strokeStyle = Colors
			coords.push([e.clientX, event.clientY, ctx.lineWidth])
			ctx.lineTo(e.clientX - 150, event.clientY - 50);
			ctx.stroke();


			ctx.beginPath();
			ctx.fillStyle = Colors
			ctx.arc(e.clientX - 150, e.clientY - 50, IsLinewidth/2, 0, Math.PI*2);
			ctx.fill()

			ctx.beginPath()
			ctx.moveTo(e.clientX - 150, e.clientY - 50)

		}
		
		if (!paint) {
			ctx.clearRect(e.clientX - 150, e.clientY - 50, IsLinewidth*4, IsLinewidth*4);
		}
	}
})





function replay(){
	var timer = setInterval(function(){
		if ( !coords.length) {
			clearInterval(timer)
			replayFun = false;
			ctx.beginPath();
			return;
		}
		replayFun = true;
		var 
			crds = coords.shift(),
			e = {
				clientX: crds["0"],
				clientY: crds["1"]
			};
		ctx.fillStyle = "black";
		ctx.font = "40px sans-serif";
		ctx.fillText("Replay BETA работает только с Чёрным", 14, 38)
		ctx.fillText("цветом и одной толщиной кисти ", 14,70)


		ctx.strokeStyle = "black";
		ctx.lineTo(e.clientX - 150, e.clientY - 50);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(e.clientX - 150, e.clientY - 50, IsLinewidth/2, 0, Math.PI*2);
		ctx.fill();

		ctx.beginPath()
		ctx.moveTo(e.clientX - 150, e.clientY - 50)
	},30)
}


buttonSave.addEventListener('click', function(e){
	save();
})
buttonReplay.addEventListener('click', function(e){
	save()
	// coords = JSON.parse(localStorage.getItem,[coords])
	coords = JSON.parse(localStorage.getItem('coords'))

	clear();
	replay();
})
buttonClear.addEventListener('click', function(e){
	clear();
})


// function

function save(){
	localStorage.setItem('coords', JSON.stringify(coords));
}

function clear(){
	ctx.fillStyle = "#cccccc";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.fillStyle = "black";
}


//сохронение фотографии
// let img = document.getElementById('img')

// buttonImg.addEventListener('click', function(e){
// 	const dataURI = canvas.toDataURL('image/png');
// 	img.src = dataURI;
// 	img.crossOrigin = "anonymous"

// 	var dataURL = canvas.toDataURL("image/jpeg");
//   	var link = document.createElement("a");
// 	  document.body.appendChild(link); // Firefox requires the link to be in the body :(
// 	  link.href = dataURL;
// 	  link.download = "Paint-Holst_BETA.jpg";
// 	  link.click();

// 	  document.body.removeChild(link);
// })

buttonPaint.addEventListener('click', function(e){
	if (!paint) {
		paint = true;
	}else{
		paint = false;
	}
})



// отрисовка панели

function drawPanel(){
	IsLinewidth = document.getElementById('linewidth').value;
	document.getElementById('linewidthLable').innerHTML = 'Ширина ' + IsLinewidth;

	ctx.lineWidth = (IsLinewidth/2) * 2;

	Colors = document.getElementById('color').value;


	requestAnimationFrame(drawPanel);
}
drawPanel();
