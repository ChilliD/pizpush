let counter = document.getElementById('count');
let count = 0;
let clickVal = 1;
let workerClickVal = 0;
let pizzaVal = 1; //price per pizza
let clickEarn = 1;
let workerEarn = 0;
let driverEarn = 0;
let kitchenEarn = 0;

//Upgrade Objects
const workerUpgrade = {
    cost: 100,
    id: 'worker',
    get cardText() { 
        return `Workers push out pizzas automatically. <br />
        You currently have ` + Math.round(workerClickVal) + ` workers <br />
        earning $` + workerEarn.toFixed(2) + `/sec`; }
};
const pizzaUpgrade = {
    cost: 250,
    id: 'topping',
    get cardText() {
        return `Toppings increase the value of each pizza. <br />
        Your pizzas are currently worth $`  + pizzaVal + ` each.`; }
};
const driverUpgrade = {
    cost: 600,
    id: 'driver',
    get cardText() {
        return `Drivers expand your business, <br /> allowing you to earn on the go. <br />
        Your drivers are currently earning $`  + driverEarn + `/sec`; }
};
const clickUpgrade = {
    cost: 1000,
    id: 'click',
    get cardText() {
        return `Doubles the amount of pizzas you get per click. <br />
        Your click is currently worth `  + clickVal + ` pizzas.`; }
};
const kitchenUpgrade = {
    cost: 5000,
    id: 'kitchen',
    get cardText() {
        return `Upgrade your kitchen to increase the value of your pizzas, and the efficiency of your workers. <br />`; }
};


//Initialize
document.getElementById('hire-worker').disabled = true;
document.getElementById('new-topping').disabled = true;
document.getElementById('hire-driver').disabled = true;
document.getElementById('double-clickval').disabled = true;
document.getElementById('upgrade-kitchen').disabled = true;
cardContent(workerUpgrade);
cardContent(pizzaUpgrade);
cardContent(driverUpgrade);
cardContent(clickUpgrade);
cardContent(kitchenUpgrade);

//Display Cards
function cardContent(nameOfObj) {
    let cardId = nameOfObj.id + '-card';
    let targetCard = document.getElementById(cardId);
    targetCard.innerHTML = nameOfObj.cardText;
}

//Update Funcs
function updateCount() {
    counter.innerHTML = count.toFixed(0);

    if (count >= workerUpgrade.cost) {
        document.getElementById('hire-worker').disabled = false;
    } else {
        document.getElementById('hire-worker').disabled = true;
    };

    if (count >= pizzaUpgrade.cost) {
        document.getElementById('new-topping').disabled = false;
    } else {
        document.getElementById('new-topping').disabled = true;
    };

    if (count >= driverUpgrade.cost) {
        document.getElementById('hire-driver').disabled = false;
    } else {
        document.getElementById('hire-driver').disabled = true;
    };

    if (count >= clickUpgrade.cost) {
        document.getElementById('double-clickval').disabled = false;
    } else {
        document.getElementById('double-clickval').disabled = true;
    };

    if (count >= kitchenUpgrade.cost) {
        document.getElementById('upgrade-kitchen').disabled = false;
    } else {
        document.getElementById('upgrade-kitchen').disabled = true;
    };

    cardContent(workerUpgrade);
    cardContent(pizzaUpgrade);
    cardContent(driverUpgrade);
    cardContent(clickUpgrade);
    cardContent(kitchenUpgrade);
}

function updateButton(buttonName, costVal) {
    let button = document.getElementById(buttonName);
    button.innerText = "Cost: " + costVal;
}

//Click Funcs
function pizzaClick() {
    count += Math.round(clickVal * pizzaVal);
    updateCount();
}

function workerClick() {
    workerEarn = (Math.round((workerClickVal * pizzaVal) * 100) / 100);
    count += (workerEarn / 10);
    updateCount();
}

function driverClick() {
    count += Math.round(workerClickVal * (pizzaVal / 2));
    updateCount();
}

//Upgrade Funcs
function doubleClickVal() {
    count -= clickUpgrade.cost;
    updateCount();
    clickUpgrade.cost *= 5;
    updateButton("double-clickval", clickUpgrade.cost);
    clickVal = clickVal * 2;
}

function hireWorker() {
    count -= workerUpgrade.cost;
    updateCount();
    workerUpgrade.cost = (Math.round((workerUpgrade.cost * 1.5) / 10) * 10); 
    updateButton("hire-worker", workerUpgrade.cost);
    workerClickVal += 1;
    setInterval(workerClick, 100);
}

function newTopping() {
    count -= pizzaUpgrade.cost;
    updateCount();
    pizzaUpgrade.cost = (Math.round((pizzaUpgrade.cost * 3.5) / 10) * 10);
    updateButton("new-topping", pizzaUpgrade.cost);
    pizzaVal = (pizzaVal * 1.6).toFixed(2);
    cardContent(pizzaUpgrade);
}

function hireDriver() {
    count -= driverUpgrade.cost;
    updateCount();
    driverUpgrade.cost = (Math.round((driverUpgrade.cost * 2.4) / 10 ) * 10);
    updateButton("hire-driver", driverUpgrade.cost);
    setInterval(driverClick, 333);
    cardContent(driverUpgrade);
}

function newKitchen() {
    count -= kitchenUpgrade.cost;
    updateCount();
    kitchenUpgrade.cost *= 4;
    updateButton("upgrade-kitchen", kitchenUpgrade.cost);
    workerClickVal += 1.5;
    pizzaVal = (pizzaVal * 1.8).toFixed(2);
    cardContent(kitchenUpgrade);
}