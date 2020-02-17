var canvas2 = document.getElementById('anim2');
canvas2.width = 700;
canvas2.height = 250;
var c2 = canvas2.getContext('2d');



function Ball(x, y, dx, dy, r, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = color;
}

var audio = new Audio('sounds/zderzenie.wav');
var b1_2 = new Ball(50, 130, 5, 0, 40, 'black');
var b2_2 = new Ball(270, 100, 0, 0, 25, 'blue');
var b3_2 = new Ball(370, 160, 0, 0, 20, 'blue');
var b4_2 = new Ball(570, 160, 0, 0, 10, 'blue');

var time2 = 0;

function animate2(){
    ++time2;
    requestAnimationFrame(animate2);
    
// ########################## CANVAS 1 ##########################
    c2.clearRect(0,0, 700, 250);

    c2.beginPath();
    c2.arc(b1_2.x + b1_2.dx, b1_2.y + b1_2.dy, b1_2.r, 0, Math.PI * 2, false);
    c2.strokeStyle = b1_2.color;
    c2.stroke();
    
    c2.font = "30px Arial";
    c2.strokeText("straty energii", 15, 30);
    
    c2.beginPath();
    c2.arc(b2_2.x + b2_2.dx, b2_2.y + b2_2.dy, b2_2.r, 0, Math.PI * 2, false);
    c2.strokeStyle = b2_2.color;
    c2.stroke();

    c2.beginPath();
    c2.arc(b3_2.x + b3_2.dx, b3_2.y + b3_2.dy, b3_2.r, 0, Math.PI * 2, false);
    c2.strokeStyle = b3_2.color;
    c2.stroke();

    c2.beginPath();
    c2.arc(b4_2.x + b4_2.dx, b4_2.y + b4_2.dy, b4_2.r, 0, Math.PI * 2, false);
    c2.strokeStyle = b4_2.color;
    c2.stroke();

    

    if(b1_2.x + b1_2.r >= b2_2.x - b2_2.r + 3){
        b1_2.dx = 2.3;
        b1_2.dy = 0.4;
        
        b2_2.dx = 3.7;
        b2_2.dy = -1.7;    
        
    }

    if(b1_2.x + b1_2.r >= b3_2.x - b3_2.r - 2){
        b1_2.dx = 1.5;
        b1_2.dy = 0.3;

        b3_2.dx = 2.1;
        b3_2.dy = 0.6;    
           
    }

    if(b1_2.x + b1_2.r >= b4_2.x - b4_2.r + 12){
        b1_2.dx = 1.0;
        b1_2.dy = 0.38;

        b4_2.dx = 1.4;
        b4_2.dy = -0.6;
        
    }
    


    if(time2 >= 330){
        time2 = 0;
        delete b1_2;
        delete b2_2;
        delete b3_2;

    

        b1_2 = new Ball(50, 130, 5, 0, 40, 'black');
        b2_2 = new Ball(270, 100, 0, 0, 25, 'blue');
        b3_2 = new Ball(370, 160, 0, 0, 20, 'blue');
        b4_2 = new Ball(570, 160, 0, 0, 10, 'blue');
    }
   
    b1_2.x += b1_2.dx;
    b1_2.y += b1_2.dy;

    b2_2.x += b2_2.dx;
    b2_2.y += b2_2.dy;
    
    b3_2.x += b3_2.dx;
    b3_2.y += b3_2.dy;

    b4_2.x += b4_2.dx;
    b4_2.y += b4_2.dy;
}


animate2();
