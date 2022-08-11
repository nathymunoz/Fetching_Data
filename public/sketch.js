let canvas;
let URL = 'https://catfact.ninja/fact';
let URL1 = 'https://randomuser.me/api/';
let URL2 = 'https://api.coindesk.com/v1/bpi/currentprice.json';
let URL3 = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
let URL4 = 'https://dog.ceo/api/breeds/image/random';
let catFact = null;
let userFact = null;
let coinFact = null;
let coinusd  = null;
let popFact = null;
let dogFact  = null;

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');

    buttonGato = createButton('gatos');
    buttonGato.position(150, 50);
    buttonGato.mousePressed(gatoApi);

    buttonPerro = createButton('perros');
    buttonPerro.position(400, 400);
    buttonPerro.mousePressed(perroApi);

    buttonUser = createButton('user');
    buttonUser.position(580, 50);
    buttonUser.mousePressed(userApi);

    buttonBit = createButton('bitcoin');
    buttonBit.position(900, 50);
    buttonBit.mousePressed(bitApi);

    buttonPop = createButton('population');
    buttonPop.position(1300, 50);
    buttonPop.mousePressed(popApi);


    console.log(fetch(URL).then(response => response.json()));

}

function gatoApi() {

    userFact = null;
    coinFact = null;
    coinusd  = null;
    popFact = null;
    dogFact  = null;

    fetch(URL)
    .then(response => response.json())
    .then(data => {catFact=data
        console.log(catFact.fact) // nos entrega un objeto

    })

}

function perroApi() {

    userFact = null;
    coinFact = null;
    coinusd  = null;
    popFact = null;
    catFact  = null;

    fetch(URL4)
    .then(response => response.json())
    .then(result => {dogFact=result.message
        console.log(dogFact) // nos entrega un objeto
        img = loadImage(dogFact);
    })

}

function userApi() {

    catFact = null;
    coinFact = null;
    coinusd  = null;
    popFact = null;
    dogFact  = null;

    fetch(URL1)
    .then(response => response.json())
    .then(result => {userFact=result.results
        userFact = userFact[0].name;
        userFact = userFact.title+' '+userFact.first+' '+userFact.last;
    })

}

function popApi() {

    catFact = null;
    coinFact = null;
    coinusd  = null;
    userFact = null;
    dogFact  = null;

    fetch(URL3)
    .then(response => response.json())
    let variable = response
    return variable
    .then(data => {popFact=data
        console.log(popFact.fact) // nos entrega un objeto

    })

}

function bitApi() {

    catFact = null;
    userFact = null;
    coinusd  = null;
    popFact = null;
    dogFact  = null;

    fetch(URL2)
    .then(response => response.json())
    .then(result => {coinFact=result.time
        coinusd=result.bpi;
        coinusd=coinusd.USD; // conversión de dolar
        coinusd=coinusd.code+' '+coinusd.rate;
    })

}

function draw() {
    background(0, 50);
    background(0);
    newCursor();

    if(catFact != null) {
    
   textSize(20);
    textWrap(WORD);
    text(catFact.fact, 40, 100, 300);
    }

    if(userFact != null) {
        textSize(25);
        textWrap(WORD);
        text(userFact, 500, 100, 400);
    }

    if(coinFact != null) {
        textSize(30);
        textWrap(WORD);
        text('BITCOIN'+'\n'+coinFact.updated+'\n'+coinusd, 800, 100, 400);
    }

    if(dogFact != null) {
        image(img, 230, 450, img.height = 400);
    }
    
    if(popFact != null) {
    
        textSize(20);
         textWrap(WORD);
         text(popFact.fact, 1300, 100, 300);
         }
}

// function mouseClicked(){
    
//     fetch(URL)
//     .then(response => response.json())
//     .then(data => {catFact=data})
// }

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

// se demora en entregar la información. Por eso hay una promesa
// lenguaje interpretado = la red lee linea por liea
// fetch guarda por parametro una URL
// catFact lo igualamos a lo que nos trae el servidor