# remote-gpio

In order to run this project, you need to install Node.js.

Clone this repository, then `cd remote-gpio` and run `npm install` from a terminal.

Run `node index` and this will run the server on http://localhost:8000. Alternately, you can use a tool such as `localtunnel` (run `npm install -g localtunnel` followed by `lt --port 8000` in the root of the project) to serve the app to a globally accessible domain.

The server should run on a Raspberry Pi board in order to configure its GPIO pins. However, if the `rpio` library cannot find a hardware connection, it will emulate a Raspberry Pi 3 layout by default.
