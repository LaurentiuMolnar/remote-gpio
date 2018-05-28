document.querySelectorAll('input[type="submit"]')
  .forEach((el) => el.addEventListener('click', (evt) => {
    evt.preventDefault();

    let pin = evt.target.id.split('_')[1];

    console.log(`Pin ${pin} was changed`);

    let url = "/gpio?";

    let input = document.querySelector(`#in_${pin}]`);
    let output = document.querySelector(`#out_${pin}]`);

    console.log(input.value, output.value);

  }));

document.querySelectorAll('label[for^=out]').
  forEach((el) => el.addEventListener('click', (evt) => {
    document.querySelector('.voltage-controller').style.display = "block";
  }));
