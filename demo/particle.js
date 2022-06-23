class Particle{
    constructor(x, y, walls, rgba) {
        // Put particle in the middle of the canvas
        this.pos = createVector(x, y);
        this.rays = [];
        this.walls = walls;
        this.fov = radians(360);
        this.offset = radians(0);
        this.rgba = rgba;
        this.vertices = []
    }

    // Adjust fov and orientation, used in parallel with limitView
    setFOV(fov, offset) {
        this.fov = radians(fov);
        this.offset = radians(offset);
    }

    limitView(){
        let left = -1 * this.fov/2 + this.offset/2;
        let right = this.fov/2 + this.offset/2;

        let newRays = [];
        for(let ray of this.rays){
            if(ray.angle < right && ray.angle > left) {
                newRays.push(ray);
            }
        }
        if(this.fov != radians(360)){
            newRays.push(new Ray(this.pos, left));
            newRays.push(new Ray(this.pos, right));
        }
        this.rays = newRays;
        this.rays.sort(function(a, b){
            return a.angle > b.angle;
        })
    }

    // Checks for what wall is closest to ray, finds the intersection, and therefore stops ray at said wall
    look () {
        this.vertices = [];
        // Limit view based on fov amount
        this.limitView();
        for (let i = 0; i < this.rays.length; i++) {
            let closest = null;
            let record = Infinity;
            for (let wall of this.walls){
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
            if (closest) {
                // Make Polygon to show casted area
                this.vertices.push([closest.x, closest.y]);
            }
        }
        this.drawPolygon();
    }

    updatePos(x, y) {
        this.pos.set(x, y)
        this.updateRays();
    }

    drawPolygon() {
        beginShape();
        stroke(255, 255, 255, 25);
        fill(this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);
        for(let v of this.vertices){
            vertex(v[0], v[1])
        }
        vertex(this.vertices[0][0], this.vertices[0][1]);
        endShape(CLOSE)
    }

    updateRays() {
        this.rays = [];
        for (let wall of this.walls) {
            // Find the angle from the particle to a boundary's endpoints
            let angle = Math.atan2(wall.a.y-this.pos.y,wall.a.x-this.pos.x);
            this.rays.push(new Ray(this.pos, angle));
            this.rays.push(new Ray(this.pos, angle+0.0001));
            this.rays.push(new Ray(this.pos, angle-0.0001));
            angle = Math.atan2(wall.b.y-this.pos.y,wall.b.x-this.pos.x);
            this.rays.push(new Ray(this.pos, angle));
            this.rays.push(new Ray(this.pos, angle+0.0001));
            this.rays.push(new Ray(this.pos, angle-0.0001));
            // Make sure all Rays are sorted by angle
            this.rays.sort(function(a, b){
                return a.angle > b.angle;
            })
        }
    }

    show() {
        fill(this.rgba[0], this.rgba[1], this.rgba[2]);
        ellipse(this.pos.x, this.pos.y, 8);
    }
}

// Function takes in an array a vertices and returns the shapes area
function calculcateArea(polygon){
    let total = 0;
    for(let i = 0; i < polygon.length - 1; i++){
        let vertices1 = polygon[i];
        let vertices2 = polygon[i+1];
        total += vertices1[0] * vertices2[1] - vertices2[0] * vertices1[1];
    }
    return total/2;
}