const form = document.querySelector('form');
const h2 = document.querySelector('h2');
const input = document.querySelector('input');


function createList(text) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');

    li.textContent = text;
    ul.appendChild(li);

    return ul;
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const list = createList(input.value);
    h2.insertAdjacentElement('afterend', list);
    input.value = '';

})

const h1 = document.querySelector('h1');
const username = document.querySelector('username');

username.addEventListener('input'), () => {

    h1.textContent = `Welcome, ${username.value}`;
}

