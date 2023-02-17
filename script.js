let cats = 0;
let lifeTimeCats = 0;
let catsPerSecond = 0;
let oldRandomNumber = 0;

let producers = {
    catToy: {
        quantity: 0,
        price: 10,
        productionRate: 1
    },

    tuna: {
        quantity: 0,
        price: 100,
        productionRate: 5
    },

    catLady: {
        quantity: 0,
        price: 1000,
        productionRate: 25
    }
}

const quantityDisplay = {
    cats: document.getElementById("cats-display"),
    catsPerSecond: document.getElementById("cats-per-second-display"),
    catToy: document.getElementById("catToy-display"),
    tuna: document.getElementById("tuna-display"),
    catLady: document.getElementById("catLady-display"),
    catToyCost: document.getElementById("catToy-cost"),
    tunaCost: document.getElementById("tuna-cost"),
    catLadyCost: document.getElementById("catLady-cost")
}

const footerMessageDisplay = document.getElementById("footer-message");

const catButton = document.getElementById("cat-button");
const catToyButton = document.getElementById("catToy-button");
const tunaButton = document.getElementById("tuna-button");
const catLadyButton = document.getElementById("catLady-button");

const footerMessages = [
    ["cats wander near",
    "cats eye you suspiciously",
    "the cats only want you for food",
    "your cat love is one-sided"],
    ["you have a loyal following of cats",
    "you founded a local cat-lovers club",
    "strays instinctively seek you out",
    "you have a loyalty card at the pet-food store"],
    ["cats find you irresistible",
    "kittens are named after you",
    "you successfully lobbied for a national cat holiday",
    "cat breeders envy you",
    "you have discovered 7 new cat subspecies"]
];

setInterval(produceCats, 1000);
updateFooterMessage();
setInterval(updateFooterMessage, 5000);

catButton.addEventListener('click', function(clickEvent) {
    increaseCats(1);
});

catToyButton.addEventListener('click', function(clickEvent) {
    buyProducer("catToy");
});

tunaButton.addEventListener('click', function(clickEvent) {
    buyProducer("tuna");
});

catLadyButton.addEventListener('click', function(clickEvent) {
    buyProducer("catLady");
});

function increaseCats(amount) {
    cats += amount;
    quantityDisplay.cats.innerText = `Cats: ${cats}`;

    lifeTimeCats += amount;

    updateCostColor();
}

function decreaseCats(amount) {
    cats = cats - amount;
    quantityDisplay.cats.innerText = `Cats: ${cats}`;

    updateCostColor();
}

function produceCats() {
    increaseCats(catsPerSecond);
}

function sumProduction() {
    let sum = 0;

    for (producer in producers) {
        sum += producers[producer].productionRate * producers[producer].quantity;
    }

    return sum;
}

function buyProducer(clickedProducer) {
    if (cats >= producers[clickedProducer].price) {
        decreaseCats(producers[clickedProducer].price);

        producers[clickedProducer].quantity++;
        quantityDisplay[clickedProducer].innerText = `Owned: ${producers[clickedProducer].quantity}`;

        catsPerSecond = sumProduction();
        quantityDisplay.catsPerSecond.innerText = `Cats/Second(CPS): ${catsPerSecond}`;

        increasePrice(clickedProducer);
    }
    else {
        quantityDisplay[`${clickedProducer}Cost`].style.color = "red";
        setTimeout(function() {
            quantityDisplay[`${clickedProducer}Cost`].style.color = "grey";
            updateCostColor();
        }, 1000);
    }
}

function increasePrice(clickedProducer) {
    producers[clickedProducer].price = Math.ceil(producers[clickedProducer].price * 1.15);

    quantityDisplay[`${clickedProducer}Cost`].innerText = `Cost: ${producers[clickedProducer].price} cats`;
}

function updateFooterMessage() {
    let messageTier;

    if (lifeTimeCats < 100) {
        messageTier = 0;
    }
    else if (lifeTimeCats < 1000) {
        messageTier = 1;
    }
    else {
        messageTier = 2;
    }

    let randomNumber = oldRandomNumber;

    while(randomNumber === oldRandomNumber) {
        randomNumber = Math.floor(Math.random() * footerMessages[messageTier].length);
    }

    footerMessageDisplay.innerText = footerMessages[messageTier][randomNumber];

    oldRandomNumber = randomNumber;
}

function updateCostColor() {
    if (cats < producers.catToy.price) {
        if (quantityDisplay.catToyCost.style.color !== "red") {
            quantityDisplay.catToyCost.style.color = "grey";
        }
    }
    else {
        quantityDisplay.catToyCost.style.color = "black";
    }

    if (cats < producers.tuna.price) {
        if (quantityDisplay.tunaCost.style.color !== "red") {
            quantityDisplay.tunaCost.style.color = "grey";
        }
    }
    else {
        quantityDisplay.tunaCost.style.color = "black";
    }

    if (cats < producers.catLady.price) {
        if (quantityDisplay.catLadyCost.style.color !== "red") {
            quantityDisplay.catLadyCost.style.color = "grey";
        }
    }
    else {
        quantityDisplay.catLadyCost.style.color = "black";
    }
}

//ignore this