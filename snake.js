// snake.js

function Snake() {
  this.x = 0;
  this.y = 0;
  this.dx = 1;
  this.dy = 0;
  this.length = 1;
  this.tail = [];
  this.power_up_timer = 0;

  this.update = function() {
    tmp_x = this.x;
    tmp_y = this.y;
    this.x += this.dx * scl;
    this.y += this.dy * scl;
    if(this.power_up_timer > clock) {
      // prevent from dying by hitting edge
      this.x = constrain(this.x, 0, width-scl);
      this.y = constrain(this.y, 0, height-scl);
    }
    // prevent from going backwards if snake has a tail
    if(this.tail.length > 0 && (tmp_x != this.x || tmp_y != this.y)) {
      for(var i = s.tail.length - 1; i > 0; i--) {
        this.tail[i].x = this.tail[i-1].x;
        this.tail[i].y = this.tail[i-1].y;
      }
      this.tail[0].x = tmp_x;
      this.tail[0].y = tmp_y;
    }
  }

  this.show = function() {
    for(var i = 0; i < s.tail.length; i++) {
      this.tail[i].show();
    }
    if(this.power_up_timer > clock && clock % clock_int == 0) {
      fill('cyan');
    }
    else {
      fill(200);
    }
    rect(this.x, this.y, scl, scl);
  }

  this.dir = function(new_dx, new_dy) {
    this.dx = new_dx;
    this.dy = new_dy;
  }

  this.is_on = function(obj) {
    return this.x == obj.x && this.y == obj.y;
  }

  this.eat = function(obj) {
    this.tail = [new Body(this.x, this.y)].concat(this.tail);
    this.length++;
    if(obj.power_up) {
      // already have power_up
      if(this.power_up_timer > clock){
        this.power_up_timer += 60;
      }
      // don't already have power_up
      else {
        this.power_up_timer = clock + power_up_time;
      }
    }
  }

  this.ate_tail = function() {
    // start at 1 because it is not possible to eat first tail piece
    // and if you eat food against wall from direction perpendicular
    // to the wall, the game will think you ate the first tail piece.
    if(this.power_up_timer > clock) return false;
    for(var i = 1; i < this.tail.length; i++) {
      if(this.is_on(this.tail[i])) {
        return true;
      }
    }
    return false;
  }

  this.outside_bounds = function() {
    return this.x >= width
    || this.x < 0
    || this.y >= height
    || this.y < 0;
  }

  this.is_dead = function() {
    if(this.power_up_timer > clock) return false;
    if(this.outside_bounds() || this.ate_tail()) {
      return true;
    }
    return false;
  }
}

function Body(x, y) {
  this.x = x;
  this.y = y;
  this.power_up = false;

  this.show = function() {
    this.power_up_timer = s.power_up_timer;
    if(this.power_up_timer > clock && clock % clock_int == 0) {
      fill('cyan');
    }
    else {
      fill(200);
    }
    rect(this.x, this.y, scl, scl);
  }
}

function Food() {
  this.x = floor(random(cols)) * scl;
  this.y = floor(random(rows)) * scl;
  this.power_up = floor(random(10)) >= 9;
  this.show = function() {
    if(this.power_up) {
      fill('yellow');
    }
    else {
      fill(255,0,100);
    }
    rect(this.x, this.y, scl, scl);
  }

  this.reset = function() {
    this.x = floor(random(cols)) * scl;
    this.y = floor(random(rows)) * scl;
    this.power_up = floor(random(10)) >= 9;
  }
}
