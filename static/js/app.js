document.querySelectorAll('input[type="submit"]')
  .forEach((el) => el.addEventListener('click', (evt) => {
    evt.preventDefault();

    let pin = evt.target.id.split('_')[1];

    console.log(`Pin ${pin} was changed`);

  }));

document.querySelectorAll('label[for^=out]').
  forEach((el) => el.addEventListener('check', (evt) => {
    document.querySelector('.voltage-controller').style.display = "block";
  }));
