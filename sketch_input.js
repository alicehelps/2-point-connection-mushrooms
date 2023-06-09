let input_1, input_2



let  event_on_1 = event_on_2 = event_on_5 = false

let chimes;
let sss;

function preload() {
	chimes = loadSound('IMG_3158.mp3');
	sss    = loadSound('IMG_8307.mp3');
}

function input_buttons(){
	input_1 = createButton ('input_1');
	input_1.mousePressed(event_1);
	input_2 = createButton ('input_2');
	input_2.mousePressed(event_2);
	input_5 = createButton("input_5");
    input_5.mousePressed(event_5);

}

//when you click the point the sounds play like they would if you touched the mushroom
function mouseClicked() {
	let d = dist(mouseX, mouseY, (windowWidth/4), windowHeight/2 );
	if (d< 50){
		chimes.play();
		
	}
	let d2 = dist(mouseX, mouseY, windowWidth-(windowWidth/4), windowHeight/2 );
	if (d2<50){
		sss.play();
	}
}

function event_1(){
  event_on_1 = !event_on_1
}
function event_2(){
  event_on_2 = !event_on_2
}

function event_5() {
	event_on_5 = !event_on_5;
  }