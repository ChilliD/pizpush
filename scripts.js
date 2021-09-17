let counter = document.getElementById('count');
let count = 0;
let clickerCount = 0;
let clickVal = 1;
let workerClickVal = 0;
let driverClickVal = 0;
let pizzaVal = 1; //price per pizza
let clickEarn = 1;
let workerEarn = 0;
let driverEarn = 0;
let kitchenEarn = 0;
let accountingMultiplier = 1;
let marketingMultiplier = 1;
let researchMultiplier = 1;
let trainingMultiplier = 1;
let garageMultiplier = 1;
let userName = prompt('Enter Username');

//Upgrade Objects
const clickerUpgrade = {
    cost: 20,
    id: 'clicker',
    get cardText() {
        return `Automaticaly clicks for you every second. <br />
        You currently have ` + clickerCount + ' clickers.'; }
};
const clickUpgrade = {
    cost: 1000,
    id: 'click',
    get cardText() {
        return `Doubles the amount of pizzas you get per click. <br />
         Currently each click is worth `  + clickVal + ` pizzas.`; }
};
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
        Your drivers are currently earning $`  + driverEarn.toFixed(2) + `/sec`; }
};
const kitchenUpgrade = {
    cost: 5000,
    id: 'kitchen',
    get cardText() {
        return `Upgrade your kitchen to increase the value of your pizzas, and the efficiency of your workers. <br />`; }
};
const accountingUpgrade = {
    cost: 50000,
    id: 'accounting',
    get cardText() {
        return `Store Upgrades cost 10% less`; }
};
const marketingUpgrade = {
    cost: 100000,
    id: 'marketing',
    get cardText() {
        return `Click Upgrades cost 15% less`; }
};
const researchUpgrade = {
    cost: 500000,
    id: 'research',
    get cardText() {
        return `Increase pizza value by 25%`; }
};
const trainingUpgrade = {
    cost: 1000000,
    id: 'training',
    get cardText() {
        return `Reduce the cost of workers and drivers, and increase their productivity.`; }
};
const garageUpgrade = {
    cost: 50000000,
    id: 'garage',
    get cardText() {
        return `Faster cars that don't break down increase your delivery speed.`; }
};

function formatNum(n) {
    if (n >= 1e3 && n < 1e6) { return +(n / 1e3).toFixed(2) + "K"; }
    else if (n >= 1e6 && n < 1e9) { return +(n / 1e6).toFixed(2) + "Million"; }
    else if (n >= 1e9 && n < 1e12) { return +(n / 1e9).toFixed(2) + "Billion"; }
    else if (n >= 1e12) { return +(n / 1e12).toFixed(2) + "Trillion"; }
    else { return n.toFixed(0); }
  };

//Initialize
document.getElementById('username').innerText = userName + "'s Restaurant";

document.getElementById('auto-clicker').disabled = true;
document.getElementById('hire-worker').disabled = true;
document.getElementById('new-topping').disabled = true;
document.getElementById('hire-driver').disabled = true;
document.getElementById('double-clickval').disabled = true;
document.getElementById('upgrade-kitchen').disabled = true;
document.getElementById('accounting').disabled = true;
document.getElementById('marketing').disabled = true;
document.getElementById('research').disabled = true;
document.getElementById('training').disabled = true;
document.getElementById('garage').disabled = true;
cardContent(clickerUpgrade);
cardContent(workerUpgrade);
cardContent(pizzaUpgrade);
cardContent(driverUpgrade);
cardContent(clickUpgrade);
cardContent(kitchenUpgrade);
cardContent(accountingUpgrade);
cardContent(marketingUpgrade);
cardContent(researchUpgrade);
cardContent(trainingUpgrade);
cardContent(garageUpgrade);

//Display Cards
function cardContent(nameOfObj) {
    let cardId = nameOfObj.id + '-card';
    let targetCard = document.getElementById(cardId);
    targetCard.innerHTML = nameOfObj.cardText;
}

//Update Funcs
function updateCount() {
    counter.innerHTML = formatNum(count);

    if (count >= clickerUpgrade.cost) {
        document.getElementById('auto-clicker').disabled = false;
    } else {
        document.getElementById('auto-clicker').disabled = true;
    };
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
    if (count >= accountingUpgrade.cost) {
        document.getElementById('accounting').disabled = false;
    } else {
        document.getElementById('accounting').disabled = true;
    };
    if (count >= marketingUpgrade.cost) {
        document.getElementById('marketing').disabled = false;
    } else {
        document.getElementById('marketing').disabled = true;
    };
    if (count >= researchUpgrade.cost) {
        document.getElementById('research').disabled = false;
    } else {
        document.getElementById('research').disabled = true;
    };
    if (count >= trainingUpgrade.cost) {
        document.getElementById('training').disabled = false;
    } else {
        document.getElementById('training').disabled = true;
    };
    if (count >= garageUpgrade.cost) {
        document.getElementById('garage').disabled = false;
    } else {
        document.getElementById('garage').disabled = true;
    };

    cardContent(clickerUpgrade);
    cardContent(workerUpgrade);
    cardContent(pizzaUpgrade);
    cardContent(driverUpgrade);
    cardContent(clickUpgrade);
    cardContent(kitchenUpgrade);
}

function updateButton(buttonName, costVal) {
    let button = document.getElementById(buttonName);
    button.innerText = "Cost: " + formatNum(costVal);
}

//Click Funcs
function pizzaClick() {
    count += Math.round(clickVal * pizzaVal);
    updateCount();
}

function clickerClick() {
    count += Math.round((clickerCount * clickVal) * pizzaVal);
    updateCount();
}

function workerClick() {
    workerEarn = (Math.round((workerClickVal * pizzaVal) * 100) / 100);
    count += (workerEarn / 10);
    updateCount();
}

function driverClick() {
    driverEarn = (Math.round(driverClickVal * pizzaVal) * 1.2);
    count += (driverEarn / 3);
    updateCount();
}

//Upgrade Funcs
function autoClicker() {
    count -= clickerUpgrade.cost;
    updateCount();
    clickerUpgrade.cost = (Math.round((clickerUpgrade.cost * 2) / 10) * 10);
    updateButton("auto-clicker", clickerUpgrade.cost);
    clickerCount += 1;
    clearInterval(clickerClick);
    setInterval(clickerClick, 1000);
}

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
    workerUpgrade.cost = (Math.round((workerUpgrade.cost * 1.75) / 10) * 10); 
    updateButton("hire-worker", workerUpgrade.cost);
    workerClickVal += 1;
    clearInterval(workerClick);
    setInterval(workerClick, 100);
}

function newTopping() {
    count -= pizzaUpgrade.cost;
    updateCount();
    pizzaUpgrade.cost = (Math.round((pizzaUpgrade.cost * 3.5) / 10) * 10);
    updateButton("new-topping", pizzaUpgrade.cost);
    pizzaVal = (pizzaVal * 1.2).toFixed(2);
    cardContent(pizzaUpgrade);
}

function hireDriver() {
    count -= driverUpgrade.cost;
    updateCount();
    driverUpgrade.cost = (Math.round((driverUpgrade.cost * 2.4) / 10 ) * 10);
    updateButton("hire-driver", driverUpgrade.cost);
    driverClickVal += 1;
    clearInterval(driverClick);
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

function upgradeAccounting() {
    count -= accountingUpgrade.cost;
    accountingUpgrade.cost *= 10;
    updateButton("accounting", accountingUpgrade.cost);
}