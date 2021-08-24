const canvasSketch = require('canvas-sketch');

// the purpose of canvas sketch ??? Code works across the web but also print.
// ctrl + s after focusing on the browser window. exports an image.

const settings = {
  dimensions: 'A4',
  //orientation: 'landscape',
  pixelsPerInch: 300, // printing reasons,
  units: 'cm' //units will be in cm instead of px.
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 2, false); //  canvas wep api basics: CanvasRenderingContext2D.arc()
    context.fillStyle = 'blue';
    context.fill();

    context.lineWidth = width * 0.05;
    context.stroke();
  };
};

canvasSketch(sketch, settings);
