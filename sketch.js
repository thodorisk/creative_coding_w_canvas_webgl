const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math'); //function for linear interpolation
const random = require('canvas-sketch-util/random'); //deterministic randomness
const palettes = require('nice-color-palettes');

const settings = {
  suffix: random.getSeed(),
  dimensions: [2048, 2048]
};

const sketch = () => {
  const palette = random.pick(palettes).slice(0, 5); //pick 5 colors

  const createGrid = () => {
    const points = [];
    const count = 40;

    for (let x = 0; x<count; x++) {
      for(let y = 0; y<count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.05;

        // give individual radius to circles
        points.push({
          color: random.pick(palette),
          radius, // Math.abs(random.gaussian() * 0.01), //random.value() ends up with equal distribution of numbers thats why i use gaussian to produce more organic randomness.
          position: [u, v]
        });
      }
    }

    return points;
  }

  // random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.5); //Math.random() > 0.5);
  const margin = 200;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0,0,width,height);

    points.forEach(data => {
      const {
        position,
        radius,
        color
      } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();

      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.fillText('=',x , y);
    })
  };
};

canvasSketch(sketch, settings);
