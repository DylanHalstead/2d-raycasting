let canvas1 = new p5(( sketch ) => {
    let walls = [];
    let particle1;
    let particle2;
    let particle3;
    let particle4;
    let particle5;
    let activeParticles = [];
    let numClick = 0;
    
    sketch.setup = () => {
        canvas1 = sketch.createCanvas(400, 400);
        const width = sketch.width
        const height = sketch.height
        // Walls around perimeter
        walls.push(new Boundary(sketch, 0, 0, width, 0));
        walls.push(new Boundary(sketch, width, 0, width, height));
        walls.push(new Boundary(sketch, width, height, 0, height));
        walls.push(new Boundary(sketch, 0, height, 0, 0));
    
        // Building demo, all in terms a width/height to be scalable
        walls.push(new Boundary(sketch, 0, height/7, width, height/7));
    
        walls.push(new Boundary(sketch, 0, 2 * height/7, width/7, 2 * height/7));
        walls.push(new Boundary(sketch, width/7, 2 * height/7, width/7, height));
    
        walls.push(new Boundary(sketch, 6 * width/7, 3 * height/7, width, 3 * height/7));
        walls.push(new Boundary(sketch, 6 * width/7, 3 * height/7, 6 * width/7, height));
    
        walls.push(new Boundary(sketch, width/4 - width/80, 6 * height/7, width/4 - width/80, height));
        walls.push(new Boundary(sketch, width/4 - width/80, 6 * height/7, 3 * width/4 + width/80, 6 * height/7));
        walls.push(new Boundary(sketch, 3 * width/4 + width/80, 6 * height/7, 3 * width/4 + width/80, height));
    
        walls.push(new Boundary(sketch, width/4 - width/80, 4 * height/7 + height/20, width/4 - width/80, 5 * height/7 + height/20));
        walls.push(new Boundary(sketch, width/4 - width/80, 5 * height/7 + height/20, 11 * width/20, 5 * height/7 + height/20));
        walls.push(new Boundary(sketch, 11 * width/20, 4 * height/7 + height/20, 11 * width/20, 5 * height/7 + height/20));
        walls.push(new Boundary(sketch, width/4 - width/80, 4 * height/7 + height/20, 11 * width/20, 4 * height/7 + height/20));
    
        walls.push(new Boundary(sketch, 3 * width/4 + width/80, height/2, 3 * width/4 + width/80, 5 * height/7 + height/20));
        walls.push(new Boundary(sketch, 5 * width/8 - width/60, height/2, 5 * width/8 - width/60, 5 * height/7 + height/20));
        walls.push(new Boundary(sketch, 3 * width/4 + width/80, height/2, 5 * width/8 - width/60, height/2));
        walls.push(new Boundary(sketch, 3 * width/4 + width/80, 5 * height/7 + height/20, 5 * width/8 - width/60, 5 * height/7 + height/20));
    
        walls.push(new Boundary(sketch, 4 * width/10, 2 * height/7, width/2, 2 * height/7));
        walls.push(new Boundary(sketch, 4 * width/10, 2 * height/7, 4 * width/10, height/10 + 2 * height/7));
        walls.push(new Boundary(sketch, width/2, 2 * height/7, width/2, height/10 + 2 * height/7));
        walls.push(new Boundary(sketch, 4 * width/10, height/10 + 2 * height/7, width/2, height/10 + 2 * height/7));
    
        // Setting up particles
        particle1 = new Particle(sketch, width/2, height/2, walls, [243, 91, 4, 51]);
        // particle1.setFOV(200, 100);
        particle2 = new Particle(sketch, width/2, height/2, walls, [92, 173, 72, 51]);
        particle3 = new Particle(sketch, width/2, height/2, walls, [183, 68, 184, 51]);
        particle4 = new Particle(sketch, width/2, height/2, walls, [4, 139, 168, 51]);
        particle5 = new Particle(sketch, width/2, height/2, walls, [210, 181, 55, 51]);
        activeParticles = [particle1];
    }

    sketch.draw = () => {
        sketch.background(255);
        for (let i = 0; i < walls.length; i++) {
            walls[i].show();
        }
    
        if(numClick < 5){
            if(sketch.mouseX < sketch.width && sketch.mouseY < sketch.height && sketch.mouseX > 0 && sketch.mouseY > 0){
                activeParticles[activeParticles.length-1].updatePos(sketch.mouseX, sketch.mouseY);
            }
            else {
                activeParticles[activeParticles.length-1].updatePos(sketch.width/2, sketch.height/2, walls);
            }
        }

        for(let activeParticle of activeParticles){
            activeParticle.look(walls);
            activeParticle.show();
        }
    }

    sketch.mouseClicked = () => {
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
}, document.querySelector('#canvas-1'));