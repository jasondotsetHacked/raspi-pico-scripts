# LED button

This example turns an external LED on while a push button is held and turns it off when released.

## What the script does

`main.js` sets GP15 as an output and GP14 as an `INPUT_PULLUP`. It checks the button every 20 ms. Since the input is pulled HIGH internally, connecting the button to ground reads LOW (pressed).

## Wire it to an original Raspberry Pi Pico (RP2040)

You will need a push button, an external LED, a 330 Ω resistor, a breadboard, and jumper wires.

| Component connection | Pico pin |
| --- | --- |
| GP15 (physical pin 20) | Through a 330 Ω resistor to LED long leg (anode) |
| LED short leg (cathode) | GND (for example, physical pin 18) |
| One side of button | GP14 (physical pin 19) |
| Opposite electrical side of button | GND |

Place a four-leg tactile button across the breadboard's center gap so each switched side lands on opposite sides. The button's legs are usually connected in pairs on each side; verify your part's layout. Do not connect 5 V to a GPIO. Use a series resistor for the LED.

## Set up Kaluma

Install the Kaluma RP2040 firmware once: hold **BOOTSEL** while connecting USB, then copy the Raspberry Pi Pico `.uf2` from [Kaluma downloads](https://kalumajs.org/download/) to the `RPI-RP2` drive. Install Node.js, then install the CLI:

```sh
npm install -g @kaluma/cli
```

## Run this example

Connect the Pico normally (without holding BOOTSEL), open a terminal in this directory, and run:

```sh
kaluma flash main.js
```

Hold the button to light the LED. Release it to turn the LED off. The 20 ms polling loop does not debounce contact bounce, so a brief flicker is possible. See the [Kaluma Pico setup guide](../README.md) for more detail.
