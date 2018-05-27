const express = require('express');
const app = express();

const rpio = require('rpio');

const pinout = ["", "3v3", "5v", "gpio2", "5v", "gpio3","gnd","gpio4","gpio14","gnd","gpio15","gpio17", "gpio18","gpio27","gnd","gpio22","gpio23","3v3","gpio24","gpio10","gnd","gpio9","gpio25","gpio11","gpio8","gnd","gpio7","gpio0","gpio1","gpio5","gnd", "gpio6","gpio12","gpio13","gnd","gpio19","gpio16","gpio26","gpio20","gnd","gpio21"]
  .map(el => el.toUpperCase());

  // console.log(pinout.length);

app.use(require("nocache")());

app.set('view engine', 'pug');

app.get("/", (req, res) => res.render("index", {title: "Remote GPIO control", pinout: pinout}));

app.get("/gpio", (req, res) => {
  console.log(req.query);
  res.send("Success");
});


app.use("/static", express.static("static"));

app.listen(3000, () => console.log(`Server running on port 3000`));
