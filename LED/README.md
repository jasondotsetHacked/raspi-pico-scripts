# LED

This example turns on one external LED and leaves it on.

## What the script does

`main.js` configures GP15 as an output and drives it HIGH. The LED stays lit until the Pico resets or another program changes that pin.

## Wire it to an original Raspberry Pi Pico (RP2040)

You will need an LED, a 330 Ω resistor, a breadboard, and jumper wires.

| Connection | Pico pin |
| --- | --- |
| GP15 (physical pin 20) | Through the resistor to the LED long leg (anode) |
| LED short leg (cathode) | GND (for example, physical pin 18) |

The resistor can go on either side of the LED, as long as it is in series. Check the LED polarity. Pico GPIO uses 3.3 V and is not 5 V tolerant.

## Set up Kaluma

Install the Kaluma RP2040 firmware on the Pico once: hold **BOOTSEL** while connecting USB, then copy the Raspberry Pi Pico `.uf2` from [Kaluma downloads](https://kalumajs.org/download/) onto the `RPI-RP2` drive. The Pico reboots when the copy finishes. Install the command line tool on your computer with Node.js:

```sh
npm install -g @kaluma/cli
```

## Run this example

Connect the Pico normally over USB, open a terminal in this directory, and flash the script:

```sh
kaluma flash main.js
```

The external LED should turn on. Repeat the flash command after editing the script. See the [Kaluma Pico setup guide](../README.md) for more detail.
