let walls = [];
let ray;
let particle1;
let particle2;
let particle3;
let particle4;
let particle5;
let numClick = 0;
let fr = 60;
let p1x;
let p1y;
let p1xSpeed;
let p1ySpeed;

function setup() {
    createCanvas(400, 400);
    frameRate(fr);
    p1x = width/2 + 75;
    p1y = height/2 - 50;
    p1xSpeed = 1;
    p1ySpeed = 1;
    
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
    activeParticles = [particle1, particle2];
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }

        particle1 = new Particle(p1x, p1y, walls, [243, 91, 4, 127]);
        particle1.look(walls);
        particle1.show();

        // Animation
        p1x += p1xSpeed;
        p1y += p1ySpeed;
        //bounce off left and right
        if(p1x < 0 || p1x > width) {
            p1xSpeed = p1xSpeed * -1;
        }

        // bounce off top and bottom
        if(p1y < 0 || p1y > height) {
            p1ySpeed = p1ySpeed * -1;
        }
}

// // state
// let circleX = 100;
// let circleY = 0;
// let xSpeed = 1;
// let ySpeed = 1;

// function setup() {
//   createCanvas(200, 200);
// }

// function draw() {
//   // clear out old frames
//   background(32);

//   // draw current frame based on state
//   circle(circleX, circleY, 50);

//   // modify state
//   circleX = circleX + xSpeed;
//   circleY = circleY + ySpeed;

//   //bounce off left and right
//   if(circleX < 0 || circleX > width) {
//     xSpeed = xSpeed * -1;
//   }

//   // bounce off top and bottom
//   if(circleY < 0 || circleY > height) {
//     ySpeed = ySpeed * -1;
//   }