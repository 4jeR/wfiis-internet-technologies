function draw_canvas() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("canvas_img");
    ctx.drawImage(img, 0, 0);
}

function draw_canvas_pend() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("canvas_img");
    ctx.drawImage(img, 5, 5);
}

function draw_canvas_zzp() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("canvas_img");
    ctx.drawImage(img, 0, 0);
}