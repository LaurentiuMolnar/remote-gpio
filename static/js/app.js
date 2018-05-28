document.querySelectorAll('input[type="submit"]')
  .forEach((el) => el.addEventListener('submit', (evt) => {
    evt.preventDefault();

    console.log(evt.target.id);

  }));
