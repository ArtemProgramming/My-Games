const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let buttonClear = document.getElementById('clear');

let buttonSave = document.getElementById('save');

let buttonReplay = document.getElementById('replay');

let buttonImg = document.getElementById('IMG');

// let buttonSave_Img = document.getElementById('Img');

let Colors = document.getElementById('color').value;

let IsLinewidth = document.getElementById('linewidth').value;

let coords = [];

canvas.width = innerWidth - 150;
canvas.height = innerHeight;

window.onresize = function(event) {
    canvas.width = innerWidth - 150;
	canvas.height = innerHeight;
};



// переменые

var mouseDOWN = false;

// code
canvas.addEventListener('mousedown', function(e){
	mouseDOWN = true;
	console.log(mouseDOWN)
})

canvas.addEventListener('mouseup', function(e){
	mouseDOWN = false;
	ctx.beginPath();
	coords.push('mouseup');
})
// ctx.lineWidth = (IsLinewidth / 2) * 2
canvas.addEventListener('mousemove', function(e){
	if (mouseDOWN == true) {
		ctx.strokeStyle = Colors
		coords.push([e.clientX, event.clientY, ctx.lineWidth])
		ctx.lineTo(e.clientX - 150, event.clientY);
		ctx.stroke();


		ctx.beginPath();
		ctx.fillStyle = Colors
		ctx.arc(e.clientX - 150, e.clientY, IsLinewidth/2, 0, Math.PI*2);
		ctx.fill()

		ctx.beginPath()
		ctx.moveTo(e.clientX - 150, e.clientY)
	}
})

function replay(){
	var timer = setInterval(function(){
		if ( !coords.length) {
			clearInterval(timer)
			ctx.beginPath();
			return;
		}

		var 
			crds = coords.shift(),
			e = {
				clientX: crds["0"],
				clientY: crds["1"]
			};
		ctx.fillStyle = "black";
		ctx.font = "40px sans-serif";
		ctx.fillText("Replay BETA работает только с Чёрным светом и одной толщиной кисти ", 14, 38)

		ctx.strokeStyle = "black";
		ctx.lineTo(e.clientX - 150, e.clientY);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(e.clientX - 150, e.clientY, IsLinewidth/2, 0, Math.PI*2);
		ctx.fill();

		ctx.beginPath()
		ctx.moveTo(e.clientX - 150, e.clientY)
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
let img = document.getElementById('img')

buttonImg.addEventListener('click', function(e){
	const dataURI = canvas.toDataURL('image/png');
	img.src = dataURI;
	img.crossOrigin = "anonymous"

	;
	// var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	// window.location.href=image;



	var dataURL = canvas.toDataURL("image/jpeg");
  	var link = document.createElement("a");
	  document.body.appendChild(link); // Firefox requires the link to be in the body :(
	  link.href = dataURL;
	  link.download = "Paint-Holst_BETA.jpg";
	  link.click();

	  document.body.removeChild(link);



	// var dataURL = canvas.toDataURL("image/jpeg");
	// var link = document.createElement("a");
	// link.href = dataURL;
	// link.download = "my-image-name.jpeg";
	// link.click();

})

// buttonSave_Img.addEventListener('click', function(e){
	// 	console.log('dfsf')
// 	if (window.location.msSaveBlob) {
// 		window.location.msSaveBlob(canvas.msSaveBlob(), "paint_image")
// 	}else{
// 		// document.body.appendChild(a)

// 		const a = document.createElement("a");
// 		a.href = canvas.toDataURL();
// 		a.dowload = "Paint-Image.png";
// 		// a.click();

// 		// document.body.removeChild(a)
// 	}
// })


// отрисовка панели

function drawPanel(){
	IsLinewidth = document.getElementById('linewidth').value;
	document.getElementById('linewidthLable').innerHTML = 'Ширина ' + IsLinewidth;

	ctx.lineWidth = (IsLinewidth/2) * 2;


	Colors = document.getElementById('color').value;
	console.log(Colors)

	requestAnimationFrame(drawPanel);
}
drawPanel();