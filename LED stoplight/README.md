# LED stoplight

This example shows red, yellow, and green LEDs in sequence. Each new button press advances to the next LED.

## What the script does

`main.js` uses GP15, GP16, and GP17 as LED outputs and GP14 as an `INPUT_PULLUP` button input. It starts with the first LED on and advances once on each detected press edge, wrapping back to the first LED after the third.

## Wire it to an original Raspberry Pi Pico (RP2040)

You will need three LEDs, three 330 Ω resistors (one per LED), a push button, a breadboard, and jumper wires.

| Component connection | Pico pin |
| --- | --- |
| Red LED anode through 330 Ω resistor | GP15 (physical pin 20) |
| Yellow LED anode through 330 Ω resistor | GP16 (physical pin 21) |
| Green LED anode through 330 Ω resistor | GP17 (physical pin 22) |
| Each LED cathode | GND (for example, physical pin 18) |
| One side of button | GP14 (physical pin 19) |
| Opposite electrical side of button | GND |

Put each resistor in series between its GPIO and the LED anode (long leg); connect each short leg to GND. Place the four-leg button across the breadboard center gap, with the switched sides on opposite sides. Button leg layouts vary, so check the part. The internal pull-up makes a press read LOW. Pico GPIO is 3.3 V and not 5 V tolerant.

## Set up Kaluma

Install Kaluma RP2040 firmware once: hold **BOOTSEL** while connecting USB, then copy the Raspberry Pi Pico `.uf2` from [Kaluma downloads](https://kalumajs.org/download/) to the `RPI-RP2` drive. Install Node.js on your computer, then install the CLI:

```sh
npm install -g @kaluma/cli
```

## Run this example

Connect the Pico normally over USB, open a terminal in this directory, and flash the script:

```sh
kaluma flash main.js
```

Each button press advances red → yellow → green → red. There is no debounce logic, so a noisy button may occasionally advance more than once. See the [Kaluma Pico setup guide](../README.md) for more detail.
