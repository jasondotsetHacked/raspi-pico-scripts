# Raspberry Pi Pico Scripts

JavaScript experiments for the **original Raspberry Pi Pico (RP2040)** using [Kaluma](https://kalumajs.org/).

## What you need

- Raspberry Pi Pico (original RP2040)
- A USB data cable
- Windows 11 (these steps use PowerShell)
- [Node.js](https://nodejs.org/) with npm
- [VS Code](https://code.visualstudio.com/) or another editor
- Optional: breadboard, jumper wires, LEDs, 330 Ω resistors, and push buttons

**Note:** The Pico is a microcontroller, not a Raspberry Pi Linux computer. It does not use a microSD card or Raspberry Pi OS.

## 1. Install Kaluma firmware on the Pico

1. Download the **RP2040/Pico Kaluma firmware** `.uf2` from the [Kaluma releases](https://github.com/kaluma-project/kaluma/releases).
2. Unplug the Pico.
3. Hold the Pico's **BOOTSEL** button while plugging its USB cable into your computer.
4. Release BOOTSEL when the **RPI-RP2** drive appears.
5. Copy the downloaded `.uf2` file onto that drive.
6. The Pico will reboot automatically and the drive will disappear. That's expected.

You only need to repeat this when changing/updating the firmware.

## 2. Install the Kaluma CLI

Open a PowerShell terminal:

```powershell
node --version
npm --version
npm install -g @kaluma/cli
```

## 3. Test the connection

Connect the Pico normally (without pressing BOOTSEL). Run:

```powershell
kaluma shell
```

The shell should connect to the Pico's serial COM port. Try blinking the built-in LED (GPIO 25 on the original Pico):

```javascript
pinMode(25, OUTPUT);
const timer = setInterval(() => digitalToggle(25), 500);
```

To stop that timer while still in the shell:

```javascript
clearInterval(timer);
digitalWrite(25, LOW);
```

Type `.exit` to leave the shell, or close the terminal. Restarting the Pico also stops running shell timers.

## 4. Write and flash a script

Create `main.js` in a project folder:

```javascript
pinMode(25, OUTPUT);
setInterval(() => digitalToggle(25), 500);
```

Open a terminal **in the folder containing `main.js`**, then run:

```powershell
kaluma flash main.js
```

The CLI uploads your JavaScript program to the Pico. You can edit the file and run the same command to upload changes.

## Example: cycle three LEDs with one button

Use one **330 Ω series resistor per LED**, connecting each GPIO through its resistor to the LED's long leg (anode), and its short leg (cathode) to GND.

| Component | Pico GPIO | Physical pin |
| --- | --- | --- |
| Red LED | GP15 | 20 |
| Yellow LED | GP16 | 21 |
| Green LED | GP17 | 22 |
| Button | GP14 | 19 |
| Ground | GND | 18 |

With the USB connector at the top, physical pins 18–20 are near the bottom of the **left** row; pins 21–22 are near the bottom of the **right** row. Place a four-leg tactile button across the breadboard's center gap. Connect GP14 to one side and GND to the opposite switch side.

```javascript
const leds = [15, 16, 17];
const button = 14;
let current = 0;
let wasPressed = false;

leds.forEach(pin => pinMode(pin, OUTPUT));
pinMode(button, INPUT_PULLUP);

function updateLeds() {
  leds.forEach((pin, index) => {
    digitalWrite(pin, index === current ? HIGH : LOW);
  });
}

updateLeds();

setInterval(() => {
  const pressed = digitalRead(button) === LOW;
  if (pressed && !wasPressed) {
    current = (current + 1) % leds.length;
    updateLeds();
  }
  wasPressed = pressed;
}, 20);
```

Each new button press cycles **red → yellow → green → red**. If a press sometimes skips colors, add button debouncing.

## Troubleshooting

- **`ENOENT: main.js`** — Run `kaluma flash main.js` from the folder where the file exists, or provide its path.
- **`Opening COM3: Access denied`** (or another COM number) — Another program, often `kaluma shell` or a serial monitor, still has the port open. Close it and retry.
- **No Pico drive shows up** — Use a USB **data** cable and hold BOOTSEL **before** connecting USB.
- **No serial connection** — Make sure Kaluma firmware is installed and the Pico is connected normally, without BOOTSEL.
- **LED does not light** — Check polarity (long leg toward the resistor/GPIO), breadboard rows, GND, and resistor connections.
- **Unexpected repeated behavior in shell** — Each `setInterval` starts another timer. Clear old timers or reconnect the Pico.

## Hardware safety

**Pico GPIO uses 3.3 V logic and is not 5 V tolerant.** Do not connect a GPIO pin directly to 5 V. Always use a current-limiting resistor with each external LED.
