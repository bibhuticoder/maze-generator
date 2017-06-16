var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ut = new Util();
var N = 15;
var cellSize = 25;
var cells = [];
var paths = [];
var mazeArr = [];
var startX, startY; //start pos of maze

class Cell{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.state = "free";
		this.size = cellSize;
	}

	draw(startX, startY, ctx){
		ctx.beginPath();
		ctx.strokeRect(startX + this.x * this.size, startY + this.y * this.size, this.size, this.size);
		ctx.stroke();
	}

	color(startX, startY, ctx){
		ctx.beginPath();
		ctx.fillStyle = "salmon";
		ctx.fillRect(startX + this.x * this.size, startY + this.y * this.size, this.size, this.size);
		ctx.fill();

		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.strokeRect(startX + this.x * this.size, startY + this.y * this.size, this.size, this.size);
		ctx.stroke();

	}

	decolor(startX, startY, ctx){
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(startX + this.x * this.size + 1, startY + this.y * this.size, this.size, this.size + 1);
		ctx.fill();

		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.strokeRect(startX + this.x * this.size, startY + this.y * this.size, this.size, this.size);
		ctx.stroke();
	}

	drawPathTo(startX, startY, other, ctx, validity){
		ctx.beginPath();
		ctx.strokeStyle = "green";
		ctx.moveTo(startX + this.x * this.size + this.size/2, startY + this.y * this.size + this.size/2);
		ctx.lineTo(startX + other.x * this.size + this.size/2, startY + other.y * this.size + this.size/2);
		ctx.stroke();

		paths.push({
			"x1": startX + this.x * this.size + this.size/2,
			"y1": startY + this.y * this.size + this.size/2,
			"x2": startX + other.x * this.size + this.size/2,
			"y2": startY + other.y * this.size + this.size/2			
		});
	}
}

function init(){

	//canvas setting
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	startX = canvas.width/2 - (N*cellSize)/2;
	startY = canvas.height/2 - (N*cellSize)/2;

	//generate squares
	for(var i=0; i<N; i++){
		var arr = [];
		for(var j=0; j<N; j++){
			arr.push(new Cell(i, j));
		}
		cells.push(arr);	
	}	

	// clear canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
	for(var i=0; i<N; i++){
		for(var j=0; j<N; j++){
			cells[i][j].draw(startX, startY, ctx);
		} 	
	} 
}

function givePossibilities(i, j){
	var possiblities = [];
	if(i !== 0) possiblities.push(cells[i-1][j]);
	if(j !== 0) possiblities.push(cells[i][j-1]);
	if(i !== N-1) possiblities.push(cells[i+1][j]);
	if(j !== N-1) possiblities.push(cells[i][j+1]);
	possiblities = possiblities.filter(function(f){
		return(f.state === "free")
	});
	return possiblities;
}

function walk(i, j){	
	var possiblities = givePossibilities(i, j);
	if(possiblities.length > 0){
		var choosen = possiblities[ut.random(0, possiblities.length-1)];		
		choosen.state = "path";
		choosen.color(startX, startY, ctx);						
		mazeArr.push(choosen);
		cells[i][j].drawPathTo(startX, startY, choosen, ctx);		
		setTimeout(function(){			
			walk(choosen.x, choosen.y);
		}, 10);		
	}else{
		
		if(mazeArr.length > 0){
			var popped = mazeArr.pop();
			popped.state = "wall";
			popped.decolor(startX, startY, ctx);
			setTimeout(function(){
				walk(popped.x, popped.y);
			}, 10);
		}else{
			drawPaths();
			console.log("finished");
			return;
		}	
		
	}	
}

function drawPaths() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for(var i=0; i<paths.length; i++){		
		var p = paths[i];
		ctx.lineWidth = 5;
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(p.x1, p.y1);
		ctx.lineTo(p.x2, p.y2);
		ctx.stroke();
	}
}

init();
draw();
walk(ut.random(0, N-1), ut.random(0, N-1));




