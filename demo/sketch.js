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

    let clipping = []
    // Detect polygon clippage
    if(activeParticles.length > 1){
        for (let i = 0; i < activeParticles.length - 1; i++) {
            // clipping.push(clip(activeParticle[i].polygon, clip(activeParticle[i+1].polygon)) 
        }
    }

    let coverage = 0;
    for(let activeParticle of activeParticles){
        activeParticle.look();
        activeParticle.show();
        // coverage += activeParticle.calculateCoverage(activeParticle.triangles);
    }

    document.querySelector('#percent').textContent = `${coverage.toFixed(2)}% Covered`;
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

// Used to find where polygons are clipping eachother, takes in an array of vertices, returns an array of vertices
function clip(subjectPolygon, clipPolygon) {
    var cp1, cp2, s, e;
    var inside = function(p) {
        return (
            (cp2[0] - cp1[0]) * (p[1] - cp1[1]) > (cp2[1] - cp1[1]) * (p[0] - cp1[0])
        );
    };
    var intersection = function() {
        var dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]],
        dp = [s[0] - e[0], s[1] - e[1]],
        n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
        n2 = s[0] * e[1] - s[1] * e[0],
        n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);
        return [(n1 * dp[0] - n2 * dc[0]) * n3, (n1 * dp[1] - n2 * dc[1]) * n3];
    };
    var outputList = subjectPolygon;
    cp1 = clipPolygon[clipPolygon.length - 1];
    for (j in clipPolygon) {
        var cp2 = clipPolygon[j];
        var inputList = outputList;
        outputList = [];
        s = inputList[inputList.length - 1]; //last on the input list
        for (i in inputList) {
            var e = inputList[i];
            if (inside(e)) {
                if (!inside(s)) {
                    outputList.push(intersection());
                }
                outputList.push(e);
            } else if (inside(s)) {
                outputList.push(intersection());
            }
            s = e;
        }
        cp1 = cp2;
    }
    return outputList;
}

function calculcateCoverage(particles) {
    for(let particle of particles){
        
    }
}