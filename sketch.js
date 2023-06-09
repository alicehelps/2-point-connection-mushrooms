let point_A = [];
let point_B = [];

let point_AtoB_link = [];
let point_BtoA_link = [];


function pointA(){
  if(event_on_1 && frameCount%20===0){
    let f = new Fungus(R_x_pt, up_y_pt);
    point_A.push(f);
  }

  for (let i=point_A.length-1; i>=0; i-=1) {
    
    let f = point_A[i];
    f.stroke_clr = (noise(frameCount*i/100)*100)+155
    f.update(point_A, R_x_pt, bot_y_pt);

    if(f.old_b()){
      point_A.splice(i, 1); 
    }

    f.display();
  }
}

function pointB(){
  if(event_on_2 && frameCount%20===0){
    let f = new Fungus(L_x_pt, up_y_pt);
    point_B.push(f);
  }

  for (let i=point_B.length-1; i>=0; i-=1) {
    
    let f = point_B[i];
    f.stroke_clr = (noise(frameCount*i/100)*100)+155
    f.update(point_B, R_x_pt, bot_y_pt);

    if(f.old_b()){
      point_B.splice(i, 1); 
    }

    f.display();
  }
}


function abLink(){
  if(event_on_5 && frameCount%60===0){
    let a2b = new Fungus(R_x_pt, up_y_pt, 0.01,'AB');
    point_AtoB_link.push(a2b); 
  }

  if(event_on_5 && frameCount%60===0){
    let b2a = new Fungus(L_x_pt, up_y_pt, Math.PI*1,'AB');
    point_BtoA_link.push(b2a);
  }

  //a to b
  for (let i=point_AtoB_link.length-1; i>=0; i-=1) {
    let f = point_AtoB_link[i];
    f.update(point_AtoB_link, L_x_pt, up_y_pt);
    
    f.chanceSplit = 0;
    if(f.old_a()){
      point_AtoB_link.splice(i, 1); 
    }

    f.display();
  }
  //b to a
  for (let i=point_BtoA_link.length-1; i>=0; i-=1) {
    
    let f = point_BtoA_link[i];
    
    f.update(point_BtoA_link, R_x_pt, up_y_pt);
    
    f.chanceSplit = 0;
    if(f.old_a()){
      point_BtoA_link.splice(i, 1); 
    }

    f.display();
  }
}

class Fungus {
    constructor(x, y, angle, link) {
      
      // values for all Fungus objects
      this.angleChangeAmt = radians(12);
      this.speed =          random(6);
      this.chanceSplit =    1.4;
      this.splitAngle =     radians(3);
      this.strokeWeight = 2;
      this.stroke_clr = 255;
      
  
      this.angle = angle || random(0, Math.PI*2);
     
    
      // variables set and updated every frame
      this.x =     x;
      this.y =     y;
      this.prevX = x;
      this.prevY = y;
      this.distFromCenter;
      this.age =   0;
  
      //connection 
      this.if_link = random(100);
      this.link_type = link;
      this.link_x_move = 0;
      this.link_y_move = 0;
      this.link_speed = 0;

      this.chimes = loadSound('IMG_3158.mp3');  
      this.sss    = loadSound('IMG_8307.mp3'); 
    }  
    
    update(array,b_x,b_y) {
      
      // increase age of this tendril
      this.age += 1.8;
      
  
      // calculate the distance from the center of
      // the sketch using the Pythagorean theorem squareroot of (1/2width-x)squared+(1/2height-y)squared
      this.distFromCenter = sqrt(pow(width/2-this.x, 2) + pow(height/2-this.y, 2));
      
      // move in a random direction
      this.angle += random(-this.angleChangeAmt, this.angleChangeAmt);
      this.prevX = this.x;
      this.prevY = this.y;
      
      //this.speed *= map(this.age,0,5000,1,0)
      if(this.link_type==='AB'){
        this.speed = dist(this.x,this.y,b_x,b_y)/300
        this.angleChangeAmt = radians(33);
        
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        this.x = lerp(this.x,b_x,this.link_speed);
        this.y = lerp(this.y,b_y,this.link_speed);
        this.strokeWeight -= 0.001;
        this.link_speed += 0.0001;
        
      }else{
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        this.speed += random(-0.01,1)
        this.speed *= map(this.age,0,400,1,0)
        this.strokeWeight -= 0.01;
      }
  
     
      // randomly split into two Fungus objects
      if (random(200) < this.chanceSplit) {
        let f = new Fungus(this.x,this.y, this.angle + this.splitAngle);
        array.push(f);
        this.angle -= this.splitAngle;
      }
      
      if(clean_count){
        this.age += 40
      }

      this.old_a = function(){
        return(this.speed<0.0001 || this.age > 1500)
      }

      this.old_b = function(){
        return(this.speed<0.0001 || this.age > 400)
      }

    } 
    
    display() {
      stroke(this.stroke_clr);
      strokeWeight(this.strokeWeight);
      line(this.prevX,this.prevY, this.x,this.y);
    }
  }
  