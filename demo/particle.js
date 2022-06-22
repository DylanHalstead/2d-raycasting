class Particle{
    constructor(x, y, walls, rgba) {
        // Put particle in the middle of the canvas
        this.pos = createVector(x, y);
        this.rays = [];
        // Add rays around the particle
        this.updateRays();
        // TODO, give particles FOV and rotation
        this.fov = 360;
        this.offset = 0;
        this.rgba = rgba;
        this.triangles = [];
    }

    // Checks for what wall is closest to ray, finds the intersection, and therefore stops ray at said wall
    look (walls) {
        let isFirst = true;
        let first = [];
        let last = [];
        let prev = [];
        let triangles = []
        let x1;
        let y1;
        let x2;
        let y2;
        let x3;
        let y3;

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
            if (closest) {
                // stroke(243, 91, 4, 1);
                // line(this.pos.x, this.pos.y, closest.x, closest.y);

                // Make Triangles to show casted area
                x1 = this.pos.x;
                y1 = this.pos.y;
                x2 = closest.x;
                y2 = closest.y;
                x3 = prev[0];
                y3 = prev[1];
                if (x3 != null && y3 != null)
                {
                    stroke(255, 255, 255, 25);
                    strokeWeight(1);
                    fill(this.rgba[0], this.rgba[1], this.rgba[2], this.rgba[3]);
                    triangle(x1, y1, x2, y2, x3, y3);
                    triangles.push([[x1, y1], [x2, y2], [x3, y3]]);
                }
                if(isFirst){
                    first = [x2, y2];
                    isFirst = false;
                }
                last = [x2, y2];
                prev = [closest.x, closest.y];
            }
        }
        // Make sure first and last triangles also connect
        triangle(x1, y1, first[0], first[1], last[0], last[1]);
        triangles.push([[x1, y1], [first[0], first[1]], [last[0], last[1]]]);

        this.triangles = triangles;
    }

    updatePos(x, y) {
        this.pos.set(x, y)
        this.updateRays();
    }

    updateRays() {
        this.rays = [];
        for (let wall of walls) {
            // Find the angle from the particle to a boundary's endpoints
            let angle = Math.atan2(wall.a.y-this.pos.y,wall.a.x-this.pos.x);
            let duplicate = false;
            if(duplicate) continue;
            this.rays.push(new Ray(this.pos, angle));
            this.rays.push(new Ray(this.pos, angle+0.0001));
            this.rays.push(new Ray(this.pos, angle-0.0001));
            angle = Math.atan2(wall.b.y-this.pos.y,wall.b.x-this.pos.x);
            this.rays.push(new Ray(this.pos, angle));
            this.rays.push(new Ray(this.pos, angle+0.0001));
            this.rays.push(new Ray(this.pos, angle-0.0001));
            // Make sure all Rays are sorted by angle for area calculations
            this.rays.sort(function(a, b){
                return a.angle > b.angle;
            })
        }
    }

    calculateCoverage(triangles) {
        let areas = []
        for (let triangle of triangles) {
            // Grab triangle sides' length
            let a = dist(triangle[0][0], triangle[0][1], triangle[1][0], triangle[1][1]);
            let b = dist(triangle[1][0], triangle[1][1], triangle[2][0], triangle[2][1]);
            let c = dist(triangle[2][0], triangle[2][1], triangle[0][0], triangle[0][1]);
            // Area formula
            let s = (a + b + c) / 2;
            let area = sqrt(s * (s - a) * (s - b) * (s - c));
            areas.push(area);
        }

        // Get total area of all triagnle
        let total = 0;
        for (let area of areas) {
            total += area;
        }

        // Calculate the percentage of the screen covered
        const canvasArea = height * width;
        let coveragePercent = total/canvasArea;
        coveragePercent = Number((coveragePercent * 100).toFixed(2));
        return coveragePercent;
    }

    show() {
        fill(this.rgba[0], this.rgba[1], this.rgba[2]);
        ellipse(this.pos.x, this.pos.y, 8);
        // for (let ray of this.rays) {
        //     ray.show()
        // }
    }
}

// Animation functions
