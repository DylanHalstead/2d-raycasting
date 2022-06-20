class Particle{
    constructor() {
        // Put particle in the middle of the canvas
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        for (let angle = 0; angle < 360; angle += 2) {
            this.rays.push(new Ray(this.pos, radians(angle)));
        }
    }

    update(x, y) {
        this.pos.set(x, y)
    }

    look (walls) {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls){
                const pt = ray.cast(wall);
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
                stroke(255, 100);
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