let walls = [];
let ray;
let particle1;
let particle2;
let particle3;
let particle4;
let particle5;
let numClick = 0;

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

    walls.push(new Boundary(201, 201, 250, 201));
    walls.push(new Boundary(201, 201, 201, 250));
    walls.push(new Boundary(201, 250, 250, 250));
    walls.push(new Boundary(250, 250, 250, 201));

    walls.push(new Boundary(150, 300, 300, 300));
    walls.push(new Boundary(150, 300, 150, 350));
    walls.push(new Boundary(150, 350, 300, 350));
    walls.push(new Boundary(300, 350, 300, 300));

    particle1 = new Particle(width/2, height/2, walls, [243, 91, 4, 51]);
    // for(let ray of particle1.rays){
    //     console.log(ray.angle);
    // }
    particle2 = new Particle(width/2, height/2, walls, [92, 173, 72, 51]);
    particle3 = new Particle(width/2, height/2, walls, [183, 68, 184, 51]);
    particle4 = new Particle(width/2, height/2, walls, [4, 139, 168, 51]);
    particle5 = new Particle(width/2, height/2, walls, [210, 181, 55, 51]);
    activeParticles = [particle1];
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }

    // particle1.setFOV(190, 180);

    if(numClick < 5){
        if(mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0){
            activeParticles[activeParticles.length-1].updatePos(mouseX, mouseY);
        }
        else {
            activeParticles[activeParticles.length-1].updatePos(width/2, height/2, walls);
        }
    }

    for(let activeParticle of activeParticles){
        activeParticle.look();
        activeParticle.show();
    }
}

function mouseClicked(){
    switch(numClick) {
        case 0:
            activeParticles.push(particle2);
            numClick++;
            break;
        case 1:
            activeParticles.push(particle3);
            numClick++;
            break;
        case 2:
            activeParticles.push(particle4);
            numClick++;
            break;
        case 3:
            activeParticles.push(particle5);
            numClick++;
            break;
        default:
            numClick++;
            break;
    }
    // Stop any default behavior
    return false;
}