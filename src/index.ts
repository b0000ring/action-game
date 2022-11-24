import { Application, Sprite, Text} from 'pixi.js';

// Create the application helper and add its render target to the page
let app = new Application({ width: 640, height: 360 });
document.body.appendChild(app.view as unknown as Node);

// Create the sprite and add it to the stage
const text = new Text('This is a PixiJS text', {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0xff1010,
  align: 'center',
});
app.stage.addChild(text);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  text.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
  text.y = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});