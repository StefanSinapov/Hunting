/*
*   Controller object responsible for getting events
 */
function Controller() {
    var self = this;
    var canvas = document.getElementById('drawing');

    this.mouseClick;
    this.mousePosition;

    canvas.addEventListener("click", function (ev) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;
        self.mouseClick = new Coordinate(x, y);
        // console.log(mouseClick.toString())
    });

    canvas.addEventListener("mousemove", function (ev) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;
        self.mousePosition = new Coordinate(x, y);
        //console.log(mousePosition.toString())
    });
}