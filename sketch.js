// ===========02====================================================================================================
let current, previous, r, b, paths = [], painting = !1, next = 0;
let ranQuote, tag;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    current = createVector(0, 0);
    previous = createVector(0, 0);
    tag = select("#tag");
    ranQuote = random(['clever','courageous','cooperative','different','interesting','meaningful','collaborative','purposeful','seen','visionary','innovative','ambitious','creative','eager','proud','fierce','great','better','absurd','careless','yourself.','inspirational','original']);
    tag.html(ranQuote);
}

function draw() {
		r = 255;
		b = 0;
    // b = map(mouseX, width/3, width, 0, 250);

    if (background(0,0,250), millis() > next && painting) {
        current.x = mouseX;
        current.y = mouseY;
        let t = p5.Vector.sub(current, previous);
        t.mult(.05);
        paths[paths.length - 1].add(current, t);
        next = millis() + random(100);
        previous.x = current.x;
        previous.y = current.y;
    }

    for (let t = 0; t < paths.length; t++){
        paths[t].update();
        paths[t].display();
		}

    next = 0;
    painting = !0;
    previous.x = mouseX;
    previous.y = mouseY;
    paths.push(new Path);
}

class Path {
    constructor() {
        this.particles = [],
        this.hue = random(100)
    }

    add(t, e) {
        this.particles.push(new Particle(t,e,this.hue,r,0,b));
    }

    update() {
        for (let t = 0; t < this.particles.length; t++){
          this.particles[t].update();
				}
    }

    display() {
        for (let t = this.particles.length - 1; t >= 0; t--){
          this.particles[t].lifespan <= 0 ? this.particles.splice(t, 1) : this.particles[t].display(this.particles[t + 1]);
				}
    }
}
class Particle {
    constructor(t, e, i, h, s, o) {
        this.position = createVector(t.x, t.y),
        this.velocity = createVector(e.x, e.y),
        this.drag = .95,
        this.lifespan = 255,
        this.r = h,
        this.g = s,
        this.b = o
    }
    update() {
        this.position.add(this.velocity);
        this.velocity.mult(this.drag);
        this.lifespan--;
    }

    display() {
        noStroke();
        fill(r, 0, b, this.lifespan / 2);
        ellipse(this.position.x, this.position.y, width/7, width/7);
    }

}
