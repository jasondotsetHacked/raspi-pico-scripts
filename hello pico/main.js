pinMode(25, OUTPUT);

setInterval(() => {
  digitalToggle(25);
}, 500);