document.querySelectorAll('input[type="submit"]')
  .forEach((el) => el.addEventListener('click', (evt) => {
    evt.preventDefault();

    let pin = evt.target.id.split('_')[1];

    console.log(`Pin ${pin} was changed`);

    let url = "/gpio?";

    let input = document.querySelector(`#in_${pin}`);
    let output = document.querySelector(`#out_${pin}`);

    let dir = document.querySelector(`input[id$=_${pin}]:checked`);

    let value;

    if(dir == null) alert("Choose in or out");
    else if (dir.value == 'out') value = document.querySelector('[name=voltage]:checked').value;

    url += `pin=${pin}&dir=${dir.value}`;

    if(dir.value == 'out') url += `&value=${value}`;

    console.log(url);

  }));

document.querySelectorAll('label[for^=out]').
  forEach((el) => el.addEventListener('click', (evt) => {
    document.querySelector('.voltage-controller').style.display = "block";
  }));

document.querySelector('.voltage-controller > a').addEventListener('click', (evt) => {
  evt.preventDefault();
  document.querySelector('[value=low]').checked = true;
})
