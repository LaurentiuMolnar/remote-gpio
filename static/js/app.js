document.querySelectorAll('input[type="submit"]')
  .forEach((el) => el.addEventListener('click', (evt) => {
    evt.preventDefault();

    /*

      Once a button was clicked, we gather the information about the pin configuration the user is about to make.
      The information includes the direction of the pin (input/output), the pin number and the value if the pin is configured
      as an output (High/Low)

    */

    let pin = evt.target.id.split('_')[1]; // Get the pin number from the button id

    console.log(`Pin ${pin} was changed`);

    let url = "/gpio?";

    let dir = document.querySelector(`input[id$=_${pin}]:checked`);

    let value;

    if(dir == null) {
      alert("Choose in or out");
      return;
    } else if (dir.value == 'out') value = document.querySelector('[name=voltage]:checked').value;

    // Build the final url according to the configuration

    url += `pin=${pin}&dir=${dir.value}`;

    if(dir.value == 'out') url += `&value=${value}`;

    console.log(url);

    if(dir) {

      // Send a GET request to the URL we made earlier. The URL tells the backend how the pin should be configured

      fetch(url)
      .then((response) => response.json().then(data => console.log(data)))
      .catch((err) => console.error(err))
      ;
    }

  }));

// The voltage controller is initially hidden. Clicking an out label will make it visible to choose a value for the pin. Default is LOW

document.querySelectorAll('label[for^=out]').
  forEach((el) => el.addEventListener('click', (evt) => {
    document.querySelector('.voltage-controller').style.display = "block";
  }));

// Configuring a pin as an input will hide the voltage controller because you cannot set the value of an input
document.querySelectorAll('label[for^=in]').
  forEach((el) => el.addEventListener('click', (evt) => {
    document.querySelector('.voltage-controller').style.display = "none";
  }));


// Clicking the RESET button on the voltage controller will reset the voltage option to LOW
document.querySelector('.voltage-controller > a').addEventListener('click', (evt) => {
  evt.preventDefault();
  document.querySelector('[value=low]').checked = true;
})
