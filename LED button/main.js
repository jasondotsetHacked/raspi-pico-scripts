pinMode(15, OUTPUT);
pinMode(14, INPUT_PULLUP);

setInterval(() => {
  const pressed = digitalRead(14) === LOW;
  digitalWrite(15, pressed ? HIGH : LOW);
}, 20);