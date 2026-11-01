const leds = [15, 16, 17];
const button = 14;

let current = 0;
let wasPressed = false;

// Configure LEDs
leds.forEach(pin => pinMode(pin, OUTPUT));

// Configure button
pinMode(button, INPUT_PULLUP);

function updateLeds() {
  leds.forEach((pin, index) => {
    digitalWrite(pin, index === current ? HIGH : LOW);
  });
}

// Start with red
updateLeds();

// Check button every 20ms
setInterval(() => {
  const pressed = digitalRead(button) === LOW;

  // Only advance on a new press
  if (pressed && !wasPressed) {
    current = (current + 1) % leds.length;
    updateLeds();
  }

  wasPressed = pressed;
}, 20);