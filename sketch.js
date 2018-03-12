// sketch.js
var canvas;
var s;
var scl;
var cols;
var rows;
var score_display;
var power_up_display;
var reset_button;
var power_up_time;

var clock;
var clock_int;

var open_spaces;
var game_started;

function setup() {
  noLoop();
  game_started = false;
  canvas = createCanvas(200, 200);
  scl = 20;
  rows = height / scl;
  cols = width / scl;

  open_spaces = {}
  for(var i = 0; i < cols; i++) {
    open_spaces[i] = {};
    for(var j = 0; j < rows; j++) {
      open_spaces[i][j] = true;
    }
  }
  frameRate(10);
  score_display = document.getElementById("score_display");
  power_up_display = document.getElementById("power_up_display");
  reset_button = createButton('Start');
  reset_button.position(width/2 - 30, height/2 + 20);
  reset_button.mousePressed(reset);


  createDiv('');
  createDiv('Width');
  width_input = createInput('200');
  createDiv('Height');
  height_input = createInput('200');
  width = parseInt(width_input.value());
  height = parseInt(height_input.value());
  clock = 0;
  clock_int = 3; // clock interval for displaying power ups
  power_up_time = 60;
}

function draw() {
  background(51);
  if(game_started) {
    clock++;
    s.update();
    if(s.is_dead()) {
      game_started = false;
      noLoop();
      reset_button.show();
    }
    else {
      s.show();
      if(s.is_on(f)) {
        s.eat(f);
        f.reset();
      }
      f.show();
      score_display.innerHTML = s.length;
      if(s.power_up_timer > clock) {
        power_up_display.innerHTML = s.power_up_timer - clock;
      }
      else {
        power_up_display.innerHTML = 0;
      }
    }
  }
}

function keyPressed() {
  switch(keyCode) {
    case LEFT_ARROW:
      if(s.length < 2 || s.dx != 1){
        s.dir(-1,0);
      }
      break;
    case RIGHT_ARROW:
      if(s.length < 2 || s.dx != -1) {
        s.dir(1,0);
      }
      break;
    case UP_ARROW:
      if(s.length < 2 || s.dy != 1) {
        s.dir(0,-1);
      }
      break;
    case DOWN_ARROW:
      if(s.length < 2 || s.dy != -1) {
        s.dir(0,1);
      }
      break;
    default:
      break;
  }
}

function reset() {
  width = parseInt(width_input.value());
  height = parseInt(height_input.value());
  canvas.size(width, height);
  reset_button.position(width/2 - 30, height/2 + 10);
  scl = 20;
  rows = height / scl;
  cols = width / scl;
  open_spaces = {}
  for(var i = 0; i < cols; i++) {
    open_spaces[i] = {};
    for(var j = 0; j < rows; j++) {
      open_spaces[i][j] = true;
    }
  }
  s = new Snake();
  f = new Food();
  reset_button.hide();
  reset_button.html('Play Again');
  loop();
  game_started = true;
}
