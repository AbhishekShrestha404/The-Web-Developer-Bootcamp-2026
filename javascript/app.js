const options = ['new', 'list', 'delete', 'quit'];
let userInput = prompt("what would you like to do?");
const todoList = ['a', 'b'];
// userInput = userInput.toLowerCase();
// while (!userInput === options[1] || options[2] || options[3] || options[4]) {
while (userInput !== 'quit' && userInput !== 'q') {
    if (userInput === 'list') {
        console.log("**********");
        for (let i = 0; i < todoList.length; i++) {
            console.log(`${i}:${todoList[i]} `)
        }
        console.log("**********");
    }
    else if (userInput === 'new') {
        const todoItem = prompt("Enter new TODO.")
        todoList.push(todoItem);
        console.log(`${todoItem} added to list.`);
    }

    else if (userInput === 'delete') {
        const index = parseInt(prompt("Which index should be deleted?"));
        if (!Number.isNaN(index)) {
            const deleted = todoList.splice(index, 1);
            console.log(`Deleted ${deleted[0]}`);
        }
        else {
            console.log("Unkown Index");
        }


    }
    else if (userInput === 'quit' || userInput === 'q') {
        console.log("Thanks for playing!");
        console.log(`${todoList[i]}: `)
        console.log(userInput)
    }
    userInput = prompt("what would you like to do?");
}



function repeat(str, repeatNumber) {
    let result = '';
    for (let i = 1; i <= repeatNumber; i++) {
        result += str;
    }
    console.log(`${result} `);
}
repeat('meow');


function returnDay(num) {
    if (num < 1 || num > 7) {
        return null;
    }
    const daysWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return daysWeek[num - 1];
}

const square = {
    area(length) {
        return length * length;
    },
    perimeter(length) {
        return length * 4;
    }
}
const hen = {
    name: 'Helen',
    eggCount: 0,
    layAnEgg() {
        this.eggCount += 1;
        console.log("EGG");
    }
}

const greet = (name) => (`Hey ${name}!`);

const validUserNames = usernames => (usernames.filter(usernames.length < 10))

const allEvens = number => {
    allEvens.every(num % 2 === 0)
}

const container = document.querySelector('#container');

const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

for (let i = 1; i < 100; i++) {
    const img = document.createElement('img');
    img.src = `${baseUrl}${i}.png`;
    container.insertAdjacentElement('afterend', img);
}

