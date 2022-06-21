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
    walls.push(new Boundary(50, 50, 150, 50));
    walls.push(new Boundary(50, 50, 50, 150));
    walls.push(new Boundary(50, 150, 150, 150));
    walls.push(new Boundary(150, 150, 150, 50));

    walls.push(new Boundary(150, 300, 300, 300));
    walls.push(new Boundary(150, 300, 150, 350));
    walls.push(new Boundary(150, 350, 300, 350));
    walls.push(new Boundary(300, 350, 300, 300));

    walls.push(new Boundary(200, 200, 250, 200));
    walls.push(new Boundary(200, 200, 200, 250));
    walls.push(new Boundary(200, 250, 250, 250));
    walls.push(new Boundary(250, 250, 250, 200));

    walls.push(new Boundary(150, 300, 300, 300));
    walls.push(new Boundary(150, 300, 150, 350));
    walls.push(new Boundary(150, 350, 300, 350));
    walls.push(new Boundary(300, 350, 300, 300));

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