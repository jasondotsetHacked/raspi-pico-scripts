# Hello Pico

This example blinks the built-in LED on the original Raspberry Pi Pico.

## What the script does

`main.js` configures GP25 as an output and toggles it every 500 ms, making the on-board LED blink twice per second.

## Wiring

No external wiring is needed. The original Raspberry Pi Pico (RP2040) has its built-in LED connected to GP25 (physical pin 25). This is for the original Pico; Pico W uses a different LED circuit.

## Set up Kaluma

Install Kaluma RP2040 firmware once: hold **BOOTSEL** while connecting USB, then copy the Raspberry Pi Pico `.uf2` from [Kaluma downloads](https://kalumajs.org/download/) to the `RPI-RP2` drive. The Pico reboots after copying. Install Node.js, then install the Kaluma CLI:

```sh
npm install -g @kaluma/cli
```

## Run this example

Connect the Pico normally, open a terminal in this directory, and flash the script:

```sh
kaluma flash main.js
```

The on-board LED should blink. Re-run the flash command after editing `main.js`. See the [Kaluma Pico setup guide](../README.md) for full setup and troubleshooting.
