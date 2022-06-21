let walls = [];
let ray;
let particle;

function setup() {
    createCanvas(400, 400);
    
    // Walls around perimeter
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));

    // Building demo
    walls.push(new Boundary(100, 100, 300, 100));
    walls.push(new Boundary(100, 100, 100, 300));
    walls.push(new Boundary(100, 300, 300, 300));
    walls.push(new Boundary(300, 300, 300, 100));

    particle = new Particle(width/2, height/2, walls);
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }
    if(mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0){
        particle.updatePos(mouseX, mouseY);
    }
    else {
        particle.updatePos(width/2, height/2);
    }
    particle.look(walls);
    particle.show();
}