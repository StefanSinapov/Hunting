function Renderer(height, width) {
    console.log("Renderer constructor.");

    this.width = width;
    this.height = height;
    this.stage =  new Kinetic.Stage({
        container: 'container',
        width: width,
        height: height
    });

   this.layer = new Kinetic.Layer();

};


Renderer.prototype.drawTest= function(){
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
    this.layer.add(rect);

    // add the layer to the stage
    this.stage.add(this.layer);
}