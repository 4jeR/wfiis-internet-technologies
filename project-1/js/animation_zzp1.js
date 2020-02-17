var canvas = document.getElementById('anim');
canvas.width = 700;
canvas.height = 250;
var c = canvas.getContext('2d');





function Ball(x, y, dx, dy, r, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = color;
}

var audio = new Audio('sounds/zderzenie.wav');
var b1 = new Ball(50, 25, 5, 0, 20, 'black');
var b2 = new Ball(360, 25, 0, 0, 20, 'blue');
var b3 = new Ball(50, 85, 5, 0, 20, 'black');
var b4 = new Ball(420, 85, -1, 0, 20, 'blue');
var b5 = new Ball(50, 155, 5, 0, 20, 'black');
var b6 = new Ball(630, 155, -5, 0, 20, 'blue');
var b7 = new Ball(50, 225, 5, 0, 20, 'black'); 
var b8 = new Ball(260, 225, 2, 0, 20, 'blue'); 

var time = 0;

function animate(){
    ++time;
    requestAnimationFrame(animate);
    
// ########################## CANVAS 1 ##########################
    c.clearRect(0,0, 700, 250);

    c.beginPath();
    c.arc(b1.x + b1.dx, b1.y + b1.dy, b1.r, 0, Math.PI * 2, false);
    c.strokeStyle = b1.color;
    c.stroke();
    
    c.font = "20px Arial";
    c.strokeText("a)", 12.5, 30);
    c.strokeText("b)", 12.5, 90);
    c.strokeText("c)", 12.5, 160);
    c.strokeText("d)", 12.5, 230);



    c.beginPath();
    c.arc(b2.x + b2.dx, b2.y + b2.dy, b2.r, 0, Math.PI * 2, false);
    c.strokeStyle = b2.color;
    c.stroke();

    c.beginPath();
    c.arc(b3.x + b3.dx, b3.y + b3.dy, b3.r, 0, Math.PI * 2, false);
    c.strokeStyle = b3.color;
    c.stroke();

    c.beginPath();
    c.arc(b4.x + b4.dx, b4.y + b4.dy, b4.r, 0, Math.PI * 2, false);
    c.strokeStyle = b4.color;
    c.stroke();

    c.beginPath();
    c.arc(b5.x + b5.dx, b5.y + b5.dy, b5.r, 0, Math.PI * 2, false);
    c.strokeStyle = b5.color;
    c.stroke();

    c.beginPath();
    c.arc(b6.x + b6.dx, b6.y + b6.dy, b6.r, 0, Math.PI * 2, false);
    c.strokeStyle = b6.color;
    c.stroke();

    c.beginPath();
    c.arc(b7.x + b7.dx, b7.y + b7.dy, b7.r, 0, Math.PI * 2, false);
    c.strokeStyle = b7.color;
    c.stroke();

    c.beginPath();
    c.arc(b8.x + b8.dx, b8.y + b8.dy, b8.r, 0, Math.PI * 2, false);
    c.strokeStyle = b8.color;
    c.stroke();

    
    
    if(b1.x + b1.r == b2.x - b2.r ){
        b2.dx = b1.dx;
        b1.dx = 0;   
        audio.play();
    }
    if(b3.x + b3.r >= b4.x - b4.r){
        var temp = b4.dx;
        b4.dx = b3.dx;
        b3.dx = temp;
    }
    if(b5.x + b5.r >= b6.x - b6.r){
        b5.dx = 0;
        b6.dx = 0;
    }
    if(b7.x + b7.r >= b8.x - b8.r){
        var temp = b7.dx;
        b7.dx = b8.dx;
        b8.dx = temp;
    }
    if(time >= 160){
        time = 0;
        delete b1;
        delete b2;
        delete b3;
        delete b4;
        delete b5;
        delete b6;

        b1 = new Ball(50, 25, 5, 0, 20, 'black');
        b2 = new Ball(360, 25, 0, 0, 20, 'blue');
        b3 = new Ball(50, 85, 5, 0, 20, 'black');
        b4 = new Ball(420, 85, -1, 0, 20, 'blue');
        b5 = new Ball(50, 155, 5, 0, 20, 'black');
        b6 = new Ball(630, 155, -5, 0, 20, 'blue');
        b7 = new Ball(50, 225, 5, 0, 20, 'black'); 
        b8 = new Ball(260, 225, 2, 0, 20, 'blue'); 
    }
   
    b1.x += b1.dx;
    b2.x += b2.dx;
    b3.x += b3.dx;
    b4.x += b4.dx;
    b5.x += b5.dx;
    b6.x += b6.dx;
    b7.x += b7.dx;
    b8.x += b8.dx;
}



animate();