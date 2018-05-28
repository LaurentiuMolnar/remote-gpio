const express = require('express');
const app = express();

const rpio = require('rpio');

const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');

const pinout = ["", "3v3", "5v", "gpio2", "5v", "gpio3","gnd","gpio4","gpio14","gnd","gpio15","gpio17", "gpio18","gpio27","gnd","gpio22","gpio23","3v3","gpio24","gpio10","gnd","gpio9","gpio25","gpio11","gpio8","gnd","gpio7","gpio0","gpio1","gpio5","gnd", "gpio6","gpio12","gpio13","gnd","gpio19","gpio16","gpio26","gpio20","gnd","gpio21"]
  .map(el => el.toUpperCase());

  // console.log(pinout.length);

app.use(require("nocache")());
app.use(bodyParser.urlencoded({
  extended: false
}));

require('./authentication').init(app);

app.use(session({
  store: new RedisStore({
    url: "redis://localhost:8000"
  }),
  secret: 'my-super-secret',
  resave: false,
  saveUninitalized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');

app.get("/", passport.authenticationMiddleware, (req, res) => res.render("index", {title: "Remote GPIO control", pinout: pinout}));

app.get("/gpio", (req, res) => {
  console.log(req.query);

  let error;

  switch(req.query.dir) {
    case 'in':
      rpio.open(req.query.pin, rpio.INPUT);
      error = false;
      break;
    case 'out':
      rpio.open(req.query.pin, rpio.OUTPUT, (req.query.value == 'high') ? rpio.HIGH : rpio.LOW);
      error = false;
      break;
    default:
      console.log('There was an error. Try again!');
      error = true;
      break;
  }

  res.status(200).json({
    pin: req.query.pin,
    direction: req.query.dir,
    value: (req.query.dir == 'out') ? req.query.value : 'null',
    error: error
  });

});

app.get('/auth', (req, res) => {
  res.send("Auth page");
});

app.use("/static", express.static("static"));

app.listen(8000, () => console.log(`Server running on port 8000`));
