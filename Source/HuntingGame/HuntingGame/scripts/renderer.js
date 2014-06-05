function Renderer(height, width) {
    console.log("Renderer constructor.");

    this.width = width;
    this.height = height;
    this.stage =  new Kinetic.Stage({
        container: 'container',
        width: width,
        height: height
    });
}


Renderer.prototype.drawTest= function(){

    var layer = new Kinetic.Layer();

    var rect = new Kinetic.Rect({
        x: 239,
        y: 75,
        width: 100,
        height: 50,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 4
    });

    // add the shape to the layer
   layer.add(rect);

    // add the layer to the stage
    this.stage.add(layer);
};


Renderer.prototype.drawAll = function(){

};

Renderer.prototype.drawBackground = function(){
    var layer = new Kinetic.Layer();

    console.log(this.width + " "+ this.height);
    var rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        fill: 'blue'
    });

    layer.add(rect);
    this.stage.add(layer);
}