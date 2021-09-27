let counter = document.getElementById('count');
let count = 0;
let clickerCount = 0;
let clickVal = 1;
let workerClickVal = 0;
let driverClickVal = 0;
let driverSpeed = 333;
let pizzaVal = 1; //price per pizza
let clickEarn = 1;
let workerEarn = 0;
let driverEarn = 0;
let kitchenEarn = 0;
let difficultyMultiplier = 1;
let accountingMultiplier = 1;
let marketingMultiplier = 1;
let researchMultiplier = 1;
let trainingMultiplier = 1;
let garageMultiplier = 1;
let userName = 'Username';

//Upgrade Objects
const upgradeObjects = [
    {
        handle: 'clickerUpgrade',
        elementId: 'auto-clicker',
        cost: 20,
        id: 'clicker',
        multiplier: (2 * marketingMultiplier),
        difficulty: 1.001,
        get cardText() {
            return `Automaticaly clicks for you every second. <br />
            You currently have ` + clickerCount + ' clickers.'; }
    },
    {
        handle: 'clickUpgrade',
        elementId: 'double-clickval',
        cost: 1000,
        id: 'click',
        multiplier: (5 * marketingMultiplier),
        difficulty: 1.1,
        get cardText() {
            return `Doubles the amount of pizzas you get per click. <br />
             Currently each click is worth `  + clickVal + ` pizzas.`; }
    },
    {
        handle: 'workerUpgrade',
        elementId: 'hire-worker',
        cost: 100,
        id: 'worker',
        multiplier: (1.75 * (accountingMultiplier - (trainingMultiplier / 15))),
        difficulty: 1.01,
        get cardText() { 
            return `Workers push out pizzas automatically. <br />
            You currently have ` + Math.round(workerClickVal) + ` workers <br />
            earning $` + workerEarn.toFixed(2) + `/sec`; }
    },
    {
        handle: 'pizzaUpgrade',
        elementId: 'new-topping',
        cost: 250,
        id: 'topping',
        multiplier: (3.5 * accountingMultiplier),
        difficulty: 1.021,
        get cardText() {
            return `Toppings increase the value of each pizza. <br />
            Your pizzas are currently worth $`  + pizzaVal + ` each.`; }
    },
    {
        handle: 'driverUpgrade',
        elementId: 'hire-driver',
        cost: 600,
        id: 'driver',
        multiplier: (1.8 * (accountingMultiplier - (trainingMultiplier / 10))),
        difficulty: 1.001,
        get cardText() {
            return `Drivers expand your business, <br /> allowing you to earn on the go. <br />
            Your drivers are currently earning $`  + driverEarn.toFixed(2) + `/sec`; }
    },
    {
        handle: 'kitchenUpgrade',
        elementId: 'upgrade-kitchen',
        cost: 5000,
        id: 'kitchen',
        multiplier: (8 * accountingMultiplier),
        difficulty: 1.02,
        get cardText() {
            return `Upgrade your kitchen to increase the value of your pizzas, and the efficiency of your workers. <br />`; }
    },
    {
        handle: 'accountingUpgrade',
        elementId: 'accounting',
        cost: 50000,
        id: 'accounting',
        multiplier: (10 * difficultyMultiplier),
        difficulty: 1.002,
        get cardText() {
            return `Store Upgrades cost 10% less`; }
    },
    {
        handle: 'marketingUpgrade',
        elementId: 'marketing',
        cost: 100000,
        id: 'marketing',
        multiplier: (10 * difficultyMultiplier),
        difficulty: 1.002,
        get cardText() {
            return `Click Upgrades cost 15% less`; }
    },
    {
        handle: 'researchUpgrade',
        elementId: 'research',
        cost: 500000,
        id: 'research',
        multiplier: (10 * difficultyMultiplier),
        difficulty: 1.002,
        get cardText() {
            return `Increase pizza value by 25%`; }
    },
    {
        handle: 'trainingUpgrade',
        elementId: 'training',
        cost: 1000000,
        id: 'training',
        multiplier: (10 * difficultyMultiplier),
        difficulty: 1.002,
        get cardText() {
            return `Reduce the cost of workers and drivers, and increase their productivity.`; }
    },
    {
        handle: 'garageUpgrade',
        elementId: 'garage',
        cost: 50000000,
        id: 'garage',
        multiplier: (10 * difficultyMultiplier),
        difficulty: 1.005,
        get cardText() {
            return `Faster cars that don't break down increase your delivery speed.`; }
    }
];


function formatNum(n) {
    if (n >= 1e3 && n < 1e6) { return +(n / 1e3).toFixed(2) + "k"; }
    else if (n >= 1e6 && n < 1e9) { return +(n / 1e6).toFixed(2) + " Million"; }
    else if (n >= 1e9 && n < 1e12) { return +(n / 1e9).toFixed(2) + " Billion"; }
    else if (n >= 1e12 && n < 1e15) { return +(n / 1e12).toFixed(2) + " Trillion"; }
    else if (n >= 1e15 && n < 1e18) { return +(n / 1e15).toFixed(2) + " Quadrillion"; }
    else if (n >= 1e18 && n < 1e21) { return +(n / 1e18).toFixed(2) + " Quintillion"; }
    else if (n >= 1e21 && n < 1e24) { return +(n / 1e21).toFixed(2) + " Sextillion"; }
    else if (n >= 1e24 && n < 1e27) { return +(n / 1e24).toFixed(2) + " Septillion"; }
    else if (n >= 1e27 && n < 1e30) { return +(n / 1e27).toFixed(2) + " Octillion"; }
    else if (n >= 1e30 && n < 1e33) { return +(n / 1e30).toFixed(2) + " Nonillion"; }
    else if (n >= 1e33) { return +(n / 1e33).toFixed(2) + " Decillion"; }
    else { return n.toFixed(0); }
  };

//Initialize
handleButtonStatus();

//Display Cards
const upgrades = document.getElementsByClassName('upgrades');
Array.from(upgrades).forEach(element => element.addEventListener('mouseenter', activateTip));
Array.from(upgrades).forEach(element => element.addEventListener('mouseleave', deactivateTip));
//Mobile
Array.from(upgrades).forEach(element => element.addEventListener('touchstart', activateTip));
Array.from(upgrades).forEach(element => element.addEventListener('touchend', deactivateTip));

function activateTip(event) {
    let targetId = event.target.querySelector('.upgrade-btn').id;
    let targetObj = upgradeObjects.find(obj => obj.elementId == targetId);
    document.getElementById('info-window').style.display = 'block';
    document.getElementById('info-window').innerHTML = targetObj.cardText;
}

function deactivateTip() {
    document.getElementById('info-window').style.display = 'none';
}

//User Funcs
function setUsername() {
    username = prompt('Enter Username');
    document.getElementById('username').innerText = username + "'s Pizzeria";
}

//Update Funcs
function updateCount() {
    counter.innerHTML = formatNum(count);
    handleButtonStatus();
}

function handleButtonStatus() {
    upgradeObjects.forEach((obj) => {
        let isDisabled = true;
        if (count >= obj.cost) { isDisabled = false; }
        else { isDisabled = true; }
        document.getElementById(obj.elementId).disabled = isDisabled;
    });
}

function updateButton(buttonName, costVal) {
    let button = document.getElementById(buttonName);
    let roundedCost;
    
    if (costVal <= 1000) {
        roundedCost = Math.round(costVal / 10) * 10;
    } else if (costVal <= 10000) {
        roundedCost = Math.round(costVal / 100) * 100;
    } else if (costVal <= 100000) {
        roundedCost = Math.round(costVal / 1000) * 1000;
    } else if (costVal <= 1000000) {
        roundedCost = Math.round(costVal / 10000) * 10000;
    } else if (costVal <= 10000000) {
        roundedCost = Math.round(costVal / 100000) * 100000;
    } else if (costVal <= 100000000) {
        roundedCost = Math.round(costVal / 1000000) * 1000000;
    } else {
        roundedCost = Math.round(costVal / 10000000) * 10000000;
    }
    
    button.innerText = "Cost: " + formatNum(roundedCost);
}

//Click Funcs
function pizzaClick() {
    count += Math.round(clickVal * pizzaVal);
    updateCount();
}

function clickerClick() {
    count += Math.round(clickerCount * clickVal * pizzaVal);
    updateCount();
}

function workerClick() {
    workerEarn = Math.round(workerClickVal * pizzaVal * trainingMultiplier);
    count += (workerEarn / 10);
    updateCount();
}

function driverClick() {
    driverEarn = Math.round(driverClickVal * pizzaVal * 1.2 * trainingMultiplier);
    count += (driverEarn / 3);
    updateCount();
}

//Upgrade Funcs
function handleUpgrades(event) {
    let targetId = event.target.id;
    let targetObj = upgradeObjects.find(obj => obj.elementId == targetId);
    let objCost = targetObj.cost;
    let costMultiplier = targetObj.multiplier;

    count -= objCost;
    updateCount();

    targetObj.cost *= costMultiplier * difficultyMultiplier;
    updateButton(targetId, targetObj.cost);

    difficultyMultiplier *= targetObj.difficulty;

    console.log(difficultyMultiplier);

    //Click
    if (targetObj.handle == 'clickerUpgrade') {
        clickerCount += 1;
        clearInterval(clickerClick);
        setInterval(clickerClick, 1000);
    } else if (targetObj.handle == 'clickUpgrade') {
        clickVal = clickVal * 2;
    //Store
    } else if (targetObj.handle == 'workerUpgrade') {
        workerClickVal += (1 * trainingMultiplier);
        clearInterval(workerClick);
        setInterval(workerClick, 100);
    } else if (targetObj.handle == 'pizzaUpgrade') {
        pizzaVal = (pizzaVal * 1.2).toFixed(2);
    } else if (targetObj.handle == 'driverUpgrade') {
        driverClickVal += (1 * trainingMultiplier);
        clearInterval(driverClick);
        setInterval(driverClick, driverSpeed);
    } else if (targetObj.handle == 'kitchenUpgrade') {
        workerClickVal += 1.5;
        pizzaVal = (pizzaVal * 1.8).toFixed(2);
    //Dept
    } else if (targetObj.handle == 'accountingUpgrade') {
        accountingMultiplier *= .90;
        updateButton("hire-worker", (upgradeObjects[2].cost * accountingMultiplier));
        updateButton("new-topping", (upgradeObjects[3].cost * accountingMultiplier));
        updateButton("hire-driver", (upgradeObjects[4].cost * accountingMultiplier));
        updateButton("upgrade-kitchen", (upgradeObjects[5].cost * accountingMultiplier));
    } else if (targetObj.handle == 'marketingUpgrade') {
        marketingMultiplier *= .85;
        updateButton("auto-clicker", (upgradeObjects[0].cost * marketingMultiplier));
        updateButton("double-clickval", (upgradeObjects[1].cost * marketingMultiplier));
    } else if (targetObj.handle == 'researchUpgrade') {
        pizzaVal *= 1.25;
    } else if (targetObj.handle == 'trainingUpgrade') {
        trainingMultiplier *= 1.1;
    } else if (targetObj.handle == 'garageUpgrade') {
        driverSpeed *= .95;
        if (driverSpeed <= 100) {
            document.getElementById('garage').innerText = "Fully Upgraded";
            document.getElementById('garage').disabled = true;
        };
    } else {
        console.log('Nothing Happened');
    };

};