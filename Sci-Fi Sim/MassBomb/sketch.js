var orbiters=[];
var neworbiters = [];
var gravity =0.0188; //Gravitational constant
var totalMass;
var Trails = [];
//var c=0;
var SolarSystem;


function setup(){
  //frameRate(30);
  createCanvas(windowWidth, windowHeight);
  //createCanvas(4000, 4000);
v1 = 13;
massRatio =33300;

//Make a new GravSystem
//Orbiters is an array of things bodies

 SolarSystem = new GravSystem(orbiters);

//define a relationship between the radius and the mass
//r = 300*Math.pow((100/(3*100*massRatio)),(1/3))
r = 5 //radius of lunar orbit
massearth = 81
nsun = 1

//create the three orbiters
massterra =  orbiters.push(new Orbiter(createVector(width/2,-300+height/2),createVector(-v1,0),createVector(0,0),massearth,2, color(0,128,255)));
//massmercury =  orbiters.push(new Orbiter(createVector(width/2,-117+height/2),createVector(-18,0),createVector(0,0),1,1, color(0,128,255)));
//massvenus =  orbiters.push(new Orbiter(createVector(width/2,-216.9+height/2),createVector(-15,0),createVector(0,0),0.85*massearth,2, color(255,165,0)));
masssol = orbiters.push(new Orbiter(createVector(width/2,height/2),createVector(-v1/massRatio,0),createVector(0,0),nsun*massearth*massRatio,20, color(255,255,0)));
sat = orbiters.push(new Orbiter(createVector(width/2,-300+r+height/2),createVector(-v1-.55,0),createVector(0,0),1,1, random(50,200)));
//massmars =  orbiters.push(new Orbiter(createVector(width/2,-457.2+height/2),createVector(-10.52,0),createVector(0,0),massearth,2, color(255,0,0)));
//massjupiter =  orbiters.push(new Orbiter(createVector(width/2,-1560+height/2),createVector(-5.7,0),createVector(0,0),30*massearth,6, color(255,140,0)));
//massio =  orbiters.push(new Orbiter(createVector(width/2,-1560+9+height/2),createVector(-5.7-2.25,0),createVector(0,0),1,1, color(0,0,0)));
//masseuropa =  orbiters.push(new Orbiter(createVector(width/2,-1560+13+height/2),createVector(-5.7-1.87,0),createVector(0,0),1,1, color(0,0,0)));
//massganymede =  orbiters.push(new Orbiter(createVector(width/2,-1560+20+height/2),createVector(-5.7-1.5,0),createVector(0,0),1,1, color(0,0,0)));
//masscallisto =  orbiters.push(new Orbiter(createVector(width/2,-1560+24+height/2),createVector(-5.7-1.37,0),createVector(0,0),1,1, color(0,0,0)));
 }



function draw(){
background(255);

//the following solves the physics
  for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
      SolarSystem.do_physics(1.0 / 16); // increase the divisor to increase accuracy and decrease simulation speed
  }

  for (i=0;i<orbiters.length;i++){
    orbiters[i].display();
  }

  COM();

  for (var i = Trails.length-1; i >= 0; i--) {
    var p = Trails[i];
    p.run();
    if (p.isDead()) {
      //remove the TrailDot
      Trails.splice(i, 1);
    }
  }

}


function COM(){

  m1 = createVector(0,0)

  totalMass=0;


  for(i=0;i<orbiters.length;i++){
    totalMass=totalMass+orbiters[i].mass;
    m1 = p5.Vector.add(m1,p5.Vector.mult(orbiters[i].position,orbiters[i].mass))
  }

  com = p5.Vector.div(m1,totalMass);
  push();
  fill(0)
  stroke(0)
  line(com.x-5,com.y,com.x+5,com.y,)
  line(com.x,com.y-5,com.x,com.y+5,)
  pop();
}




function windowResized() {
    // Resize necessary elements to fit new window size
    resizeCanvas(windowWidth, windowHeight); // width and height system variables updated here
  }

function keyTyped(){
 if (key === 'c'){
    for ( i = orbiters.length-1; i >= 0; i--){
      orbiters.splice(i,1);
    }
    // for ( i = Trails.length-1; i >= 0; i--){
    //   Trails.splice(i,1);
    // }
  }
}

//vblm= Math.sqrt((0.0188*nsun*massRatio*massearth)/(Math.sqrt((MouseX + MouseY)

function mouseClicked() {

  orbiters.push(new Orbiter(createVector(mouseX,mouseY),createVector(-v1/massRatio,0),createVector(0,0),nsun*massearth*massRatio,2, color(0,0,0)));

  // prevent default
  return false;
}
