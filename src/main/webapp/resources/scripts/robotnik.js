function drawRobotnik() {


    var x = 0,
        y = 0;
    var canvas = document.getElementById('canvas-robotnik'),
        ctx = canvas.getContext('2d');


    /*Some objects that have to stay in the back*/

    ctx.beginPath();
    ctx.arc((x + 40), (y + 22), 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "gray"
    ctx.fill();


    ctx.beginPath();
    ctx.arc((x + 12), (y + 22), 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "gray"
    ctx.fill();


    ctx.beginPath();

    ctx.strokeStyle = "black";
    ctx.strokeRect((x + 45), (y + 31), 12, 7);
    ctx.fillStyle = "lightgray";
    ctx.fillRect((x + 45), (y + 31), 12, 7);



    ctx.beginPath();
    ctx.moveTo((x + 47), (y + 31));
    ctx.arc((x + 47), (y + 31), 10, 1.5 * Math.PI, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "yellow"
    ctx.fill();

    ctx.beginPath();

    ctx.strokeStyle = "black";
    ctx.strokeRect((x + 54), (y + 31), 3, 7);
    ctx.fillStyle = "darkgray";
    ctx.fillRect((x + 54), (y + 31), 3, 7);




    /*Draw Robotnik's body*/

    ctx.beginPath();

    ctx.fillStyle = "red";
    ctx.fillRect((x + 13), (y + 14), 25, 18);

    ctx.strokeStyle = "black";
    ctx.strokeRect((x + 13), (y + 14), 25, 18);

    ctx.beginPath();

    ctx.fillStyle = "yellow";
    ctx.fillRect((x + 20), (y + 14), 10, 18);
    ctx.strokeRect((x + 20), (y + 14), 10, 18);

    /*Draw Robotnik's head*/
    ctx.beginPath();

    ctx.moveTo((x + 30), (y + 8));
    ctx.arc((x + 25), (y + 8), 6, 0, 2 * Math.PI);

    ctx.stroke();
    ctx.fillStyle = "lightpink"
    ctx.fill();

    /*Draw Robotnik's eyes*/
    ctx.beginPath();

    ctx.arc((x + 22), (y + 8), 1.5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "lightblue"
    ctx.fill();

    ctx.beginPath();

    ctx.arc((x + 25), (y + 8), 1.5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "lightblue"
    ctx.fill();


    /*Draw Robotnik'snose and mustaches*/
    ctx.beginPath();


    ctx.moveTo((x + 23), (y + 12));
    ctx.lineTo((x + 13), (y + 8));
    ctx.lineTo((x + 15), (y + 10));
    ctx.lineTo((x + 13), (y + 12));
    ctx.lineTo((x + 17), (y + 12));
    ctx.lineTo((x + 13), (y + 14));
    ctx.lineTo((x + 23), (y + 12));
    ctx.stroke();
    ctx.fillStyle = "brown"
    ctx.fill();


    ctx.beginPath();

    ctx.arc((x + 23), (y + 11), 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "salmon"
    ctx.fill();

    ctx.beginPath();


    ctx.moveTo((x + 23), (y + 12));
    ctx.lineTo((x + 36), (y + 8));
    ctx.lineTo((x + 38), (y + 10));
    ctx.lineTo((x + 35), (y + 12));
    ctx.lineTo((x + 39), (y + 12));
    ctx.lineTo((x + 35), (y + 14));
    ctx.lineTo((x + 23), (y + 12));
    ctx.stroke();
    ctx.fillStyle = "brown"
    ctx.fill();

    /*Draw Eggmobile*/


    ctx.beginPath();

    ctx.arc((x + 25), (y + 28), 23, 1.9 * Math.PI, 1.1 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "lightgray"
    ctx.fill();

    ctx.beginPath();

    ctx.arc((x + 25), (y + 28), 23, 0.25 * Math.PI, 0.75 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "black"
    ctx.fill();

    ctx.beginPath();

    ctx.moveTo((x + 10), (y + 45));
    ctx.arc((x + 10), (y + 45), 12, 1.3 * Math.PI, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "black"
    ctx.fill();


    ctx.beginPath();
    ctx.moveTo((x + 25), (y + 22));
    ctx.arc((x + 25), (y + 22), 23, Math.PI, 1.3 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "rgba(122, 251, 227, 0.44)";
    ctx.fill();

    ctx.beginPath();

    ctx.arc((x + 10), (y + 35), 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "yellow"
    ctx.fill();


    ctx.beginPath();


    ctx.strokeRect((x + 24), (y + 38), 4, 6);
    ctx.fillStyle = "gold";
    ctx.fillRect((x + 24), (y + 38), 4, 6);


    ctx.beginPath();


    ctx.fillStyle = "black";
    ctx.fillRect((x + 38), (y + 36), 1.5, 4);
    ctx.fillStyle = "gold";
    ctx.fillRect((x + 40), (y + 36), 1.5, 4);
    ctx.fillStyle = "black";
    ctx.fillRect((x + 42), (y + 36), 1.5, 4);
    ctx.fillStyle = "gold";
    ctx.fillRect((x + 44), (y + 36), 1, 4);

    ctx.beginPath();

    ctx.arc((x + 35), (y + 31), 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();

    ctx.arc((x + 35), (y + 31), 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();


    ctx.beginPath();

    ctx.arc((x + 35), (y + 19), 17, 0.23 * Math.PI, 0.76 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "silver"
    ctx.fill();
}