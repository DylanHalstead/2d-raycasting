class Particle{
    constructor(x, y, walls) {
        // Put particle in the middle of the canvas
        this.pos = createVector(x, y);
        this.rays = [];
        // Add rays around the particle
        this.updateRays();
        // TODO, give particles FOV and rotation
        this.offset = 0;
    }

    // Checks for what wall is closest to ray, finds the intersection, and therefore stops ray at said wall
    look (walls) {
        let prev = []
        let triangles = []
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
                stroke(255, 50);
                line(this.pos.x, this.pos.y, closest.x, closest.y);

                // Make Triangles to show casted area
                let x1 = this.pos.x;
                let y1 = this.pos.y;
                let x2 = closest.x;
                let y2 = closest.y;
                let x3 = prev[0];
                let y3 = prev[1];
                if (x3 != null && y3 != null)
                {
                    fill('red');
                    triangle(x1, y1, x2, y2, x3, y3);
                    triangles.push([[x1, y1], [x2, y2], [x3, y3]]);
                }
                prev = [closest.x, closest.y];
            }
        }
        this.calculateCoverage(triangles);
    }

    updatePos(x, y) {
        this.pos.set(x, y)
        this.updateRays();
    }

    updateRays() {
        this.rays = [];
        for (let angle = 0; angle < 360; angle += 2) {
            this.rays.push(new Ray(this.pos, radians(angle)));
        }
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
            this.checkOrder();
        }
    }

    // Function used to make sure sorting is being done correctly
    checkOrder(){
        let wrongOrder = false;
        for(let x = 0; x < this.rays.length; x++){
            while(this.getOccurrence(this.rays, x) > 1)
            {
                for(let y = 0; y < this.rays.length; y++){
                    if(this.rays[y] == this.rays[x]){
                        this.rays.splice(y, 1);
                    }
                    if(this.rays[y] == this.rays[x]){
                        wrongOrder = true;
                    }
                }
            }
        }
        console.log(wrongOrder);
    }

    getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    // TODO, make work with new setup
    // // Rotate the FOV by angle
    // rotate(angle) {
    //     this.offset += angle;
    //     for (let i = 0; i < this.rays.length; i += 1) {
    //         this.rays[i].setAngle(radians(i) + this.offset)
    //     }
    // }

    calculateCoverage(triangles) {
        let areas = []
        for (let triangle of triangles) {
            let a = dist(triangle[0][0], triangle[0][1], triangle[1][0], triangle[1][1]);
            let b = dist(triangle[1][0], triangle[1][1], triangle[2][0], triangle[2][1]);
            let c = dist(triangle[2][0], triangle[2][1], triangle[0][0], triangle[0][1]);
            // Area formula
            let s = (a + b + c) / 2;
            let area = sqrt(s * (s - a) * (s - b) * (s - c));
            areas.push(area);
        }
        let total = 0;
        for (let area of areas) {
            total += area;
        }
        // Calculate the percentage of the screen covered
        const canvasArea = height * width;
        let coveragePercent = total/canvasArea;
        coveragePercent = (coveragePercent * 100).toFixed(2);
        console.log(`${coveragePercent}%`);
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show()
        }
    }
}