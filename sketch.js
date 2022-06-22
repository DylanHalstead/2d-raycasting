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

    walls.push(new Boundary(200, 200, 250, 200));
    walls.push(new Boundary(200, 200, 200, 250));
    walls.push(new Boundary(200, 250, 250, 250));
    walls.push(new Boundary(250, 250, 250, 200));

    walls.push(new Boundary(150, 300, 300, 300));
    walls.push(new Boundary(150, 300, 150, 350));
    walls.push(new Boundary(150, 350, 300, 350));
    walls.push(new Boundary(300, 350, 300, 300));

    particle1 = new Particle(width/2, height/2, walls, [243, 91, 4, 127]);
    particle2 = new Particle(width/2, height/2, walls, [92, 173, 72, 127]);
    particle3 = new Particle(width/2, height/2, walls, [183, 68, 184, 127]);
    particle4 = new Particle(width/2, height/2, walls, [4, 139, 168, 127]);
    particle5 = new Particle(width/2, height/2, walls, [210, 181, 55, 127]);
    activeParticles = [particle1];
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }

    if(numClick < 5){
        if(mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0){
            activeParticles[activeParticles.length-1].updatePos(mouseX, mouseY);
        }
        else {
            activeParticles[activeParticles.length-1].updatePos(width/2, height/2, walls);
        }
    }

    let coverage;
    for(let activeParticle of activeParticles){
        activeParticle.look(walls);
        activeParticle.show();
        coverage += activeParticle.calculateCoverage(activeParticle.triangles);
    }
    document.querySelector('#percent').textContent = `${coverage}% Covered`;
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

function easeInOutSine(i) {
    i /= width;
    return -1 * (Math.cos(PI * i) - 1) / 2;
}

function animate() {
    console.log('Started!')
    let x = particle1.pos.x;
    let y = particle1.pos.y;
    let endX = 350;
    let endY = 200;
    while(x != endX || y != endY){
        setTimeout(() => {
            particle1.updatePos(x, y);
            console.log('Running!')
            if (x < endX){
                x++;
            }
            else if(x > endX) {
                x--;
            }

            if (y < endY){
                y++;
            }
            else if(y > endY) {
                y--;
            }
        }, 1000);
    }
}