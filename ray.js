class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        // Function creates vector pointing at angle input
        this.dir = p5.Vector.fromAngle(angle);
    }

    show() {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
    // https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
    // Being that our wall is a line segment and the ray is an infinite line, we will be looking for 0 < t < 1 (ray) and u > 0 (wall)
    cast(wall) {
        // Wall's endpoints
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        // Ray's endpoints
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        // Check for 0 in denominator
        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denom == 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
        const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denom;
        if (t > 0 && t < 1 && u > 0){
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return;
        }
    }
}