var allBars = [];
var darkenAmount = 0.65;

// ProgressBar Class
class ProgressBar {
    constructor(x, y, width, height, r, g, b, a, vertical) {
        this.drawX = x;
        this.drawY = y;

        this.width = width;
        this.height = height;

        this.barR = clamp(r, 0, 255);
        this.barG = clamp(g, 0, 255);
        this.barB = clamp(b, 0, 255);

        this.backgroundR = clamp(Math.round(r + (r * -darkenAmount)), 0, 255);
        this.backgroundG = clamp(Math.round(g + (g * -darkenAmount)), 0, 255);
        this.backgroundB = clamp(Math.round(b + (b * -darkenAmount)), 0, 255);

        this._alpha = clamp(a, 0, 255);
        this._progress = 0;
        this.vertical = vertical;
        this.visible = true;
    }

    render() {
        if (!this.visible) return;

        if (this.vertical) {
            // vertical bar
            API.drawRectangle(this.drawX - 4, this.drawY - 4, this.width + 8, this.height + 8, 0, 0, 0, this._alpha); // outline
            API.drawRectangle(this.drawX, this.drawY + this.height, this.width, -this.height, this.backgroundR, this.backgroundG, this.backgroundB, this._alpha); // background
            API.drawRectangle(this.drawX, this.drawY + this.height, this.width, -((this.height / 100) * this._progress), this.barR, this.barG, this.barB, this._alpha); // content
        } else {
            // horizontal bar
            API.drawRectangle(this.drawX - 4, this.drawY - 4, this.width + 8, this.height + 8, 0, 0, 0, this._alpha); // outline
            API.drawRectangle(this.drawX, this.drawY, this.width, this.height, this.backgroundR, this.backgroundG, this.backgroundB, this._alpha); // background
            API.drawRectangle(this.drawX, this.drawY, ((this.width / 100) * this._progress), this.height, this.barR, this.barG, this.barB, this._alpha); // content
        }
    }

    // Functions
    setPosition(newX, newY) {
        this.drawX = newX;
        this.drawY = newY;
    }

    setSize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
    }

    setColor(newR, newG, newB) {
        this.barR = clamp(newR, 0, 255);
        this.barG = clamp(newG, 0, 255);
        this.barB = clamp(newB, 0, 255);

        this.backgroundR = clamp(Math.round(this.barR + (this.barR * -darkenAmount)), 0, 255);
        this.backgroundG = clamp(Math.round(this.barG + (this.barG * -darkenAmount)), 0, 255);
        this.backgroundB = clamp(Math.round(this.barB + (this.barB * -darkenAmount)), 0, 255);
    }

    get progress() {
        return this._progress;
    }

    set progress(newProgress) {
        this._progress = clamp(newProgress, 0, 100);
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(newAlpha) {
        this._alpha = clamp(newAlpha, 0, 255);
    }

    delete() {
        var index = allBars.indexOf(this);
        if (index !== -1) allBars.splice(index, 1);
    }
}

// Functions
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function createProgressBar(x, y, width, height, r, g, b, a, vertical) {
    var newBar = new ProgressBar(x, y, width, height, r, g, b, a, vertical);
    allBars.push(newBar);
    return newBar;
}

function removeAllProgressBars() {
    while (allBars.length) allBars.pop();
}

// Rendering
API.onUpdate.connect(function() {
    if (allBars.length < 1) return;
    for (var i = 0; i < allBars.length; i++) allBars[i].render();
});