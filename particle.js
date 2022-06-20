class Particle{
    constructor(walls) {
        // Put particle in the middle of the canvas
        this.pos = createVector(width/2, height/2);
        // Add rays around the particle
        this.rays = [];
        this.updateRays();

        this.offset = 0;
    }

    rotate(angle) {
        this.offset += angle;
        for (let i = 0; i < this.rays.length; i += 1) {
            this.rays[i].setAngle(radians(i) + this.offset)
        }
    }

    updatePos(x, y) {
        this.pos.set(x, y)
        this.updateRays();
    }

    updateRays() {
        this.rays = [];
        for(let wall of walls) {
            // Find the angle from the particle to a boundary's endpoints
            let angle = Math.atan2(wall.a.y-this.pos.y,wall.a.x-this.pos.x);
            this.rays.push(new Ray(this.pos, angle));
            
            angle = Math.atan2(wall.b.y-this.pos.y,wall.b.x-this.pos.x);
            this.rays.push(new Ray(this.pos, angle));
        }
    }

    // Checks for what wall is closest and therefore stops emmiting at said wall
    look (walls) {
        for (let i = 0; i < this.rays.length; i++) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls){
                const pt = this.rays[i].cast(wall);
                if (pt) {
                    // Calculate distance between wall and ray
                    const d = p5.Vector.dist(this.pos, pt);
                    // Store closest wall's position
                    if(d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if(closest) {
                stroke(255, 50);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show()
        }
    }
}