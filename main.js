// game variables
var character = document.getElementById("character");
var game = document.getElementById("game"); 
var interval;
//(the "both" variable will only allow the the if-loop to run once to avoid bugs)
var both = 0;
let moveBy = 1;
var obstacle;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var obstacle7;
var obstacle8;
var obstacle9;
var obstacle10;


function startGame(){
   character;
   gameArea.start();
   obstacle = new component(60, 120, "blue", 50, 120);
   obstacle2 = new component(60, 120, "green", 150, 300);
   obstacle3 = new component(60, 120, "orange", 450, 40);
   obstacle4 = new component(60, 120, "purple", 600, 500);
   obstacle5 = new component(60, 120, "magenta", 900, 70);
   obstacle6 = new component(60, 120, "lightblue", 50, 650);
   obstacle7 = new component(60, 120, "lightgreen", 350, 370);
   obstacle8 = new component(60, 120, "aqua", 700, 200);
   obstacle9 = new component(60, 120, "black", 810, 590);
   obstacle10 = new component(60, 120, "brown", 400, 600);

}

var gameArea = {
   canvas : document.createElement("canvas"),
   start : function(){
      this.canvas.width = 1000;
      this.canvas.height = 800;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
   }
}

//object constructor (standard notation called "component")
function component(width, height, color, x, y){
   this.width = width;
   this.height = height; 
   this.x = x;
   this.y = y;
   ctx = gameArea.context;
   ctx.fillStyle = color;
   ctx.fillRect(this.x, this.y, this.width, this.height);
}

//start the game (it will start when the window loads)
window.addEventListener('load', () => {
   character.style.position = 'absolute';
   character.style.left = 0;
   character.style.top = 0;
});

//four functions (one for each arrow, tells what to do when each of the arrow keys are pressed)
function moveLeft(){
   var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
   if(left>0){
      character.style.left = left - moveBy + 'px';
   }
}
function moveRight(){
   var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
   if(left<960){
      character.style.left = parseInt(character.style.left) + moveBy + "px";
   }
}
function moveUp(){
   var top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
   if(top>0){
      character.style.top = parseInt(character.style.top) - moveBy + 'px';
   }
}
function moveDown(){
   var top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
   if(top<680){
      character.style.top = parseInt(character.style.top) + moveBy + 'px';
   }
}

//determine whether the arrow keys are being pressed
document.addEventListener("keydown", (event) => {
   collisionDetection()
   switch(event.key){
      case 'ArrowLeft':
         moveLeft();
         break;
      case 'ArrowRight':
         moveRight();
         break;
      case 'ArrowUp':
         moveUp();
         break;
      case 'ArrowDown':
         moveDown();
         break;
   }
});

// the object will keep travelling in the arrow direction pressed
document.addEventListener("keydown", event => {
   collisionDetection()

   if (both == 0) {
     both++;
     if(event.key==="ArrowLeft"){
        interval = setInterval(moveLeft, 1);
     }
     if(event.key==="ArrowRight"){
        interval = setInterval(moveRight, 1);
     }
     if(event.key==="ArrowUp"){
         interval = setInterval(moveUp, 1);
     }
     if(event.key==="ArrowDown"){
        interval = setInterval(moveDown, 1);
     }
  }
})
// to stop the object from travelling once the direction key is lifted
document.addEventListener("keyup", event => {
  collisionDetection()
  clearInterval(interval);
  both = 0;
})

function collisionDetection() {
   var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
   var top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
   var characterCoordinate = [left, top];
   var obstacleCoordinate = [obstacle.x, obstacle.y];
   var minX = obstacleCoordinate[0];
   var maxX = obstacleCoordinate[0] + obstacle.width;
   var minY = obstacleCoordinate[1];
   var maxY = obstacleCoordinate[1] + obstacle.height;
   // acceptableObjectRange array: (min x, max x, min y, may y) - these four xy coordinates completely define the wall
   acceptableObjectRange = [minX, maxX, minY, maxY];
   /*if statement logic:
   - if the left characterCoordinate is farther right than the obstacle's minX 
   - if the characterCoordinate is farther left than the obstacle's maxX
   - ^these two statements imply the character is in between the obstacle's min and max width
   - if the characterCoordinate is closer to the bottom than the obstacle's minY
   - if the characterCoordinate is closer to the top than the obstacle's max Y
   - ^these two statements imply the character is between the obstacle's min and may height
   - THEN, the picture is crashing into the obstacle, and it is oh no 
   */
   if (characterCoordinate[0] >= acceptableObjectRange[0] && characterCoordinate[0] <= acceptableObjectRange[1] && characterCoordinate[1] >= acceptableObjectRange[2] && characterCoordinate[1] <= acceptableObjectRange[3]) {
      alert("you have opened a door");
      // call the function that displays the question when the character opens a door
      displayQuestion();
   }
}

// this function is called when the character enters a door
function displayQuestion(){
   // variable to store the data of question. 2 sets of data: 4 radio inputs, 1 submit input. The 1 submit input calls the submitAnswer() function, which checks if the use selected the correct choice. Sidenote: This piece of code is sacred. 
   var data="<input type='radio' name='choice' value='poor'>Donating to the Poor<br>  <input type='radio' name='choice' value='gender'>Fighting for Gender Equality<br>  <input type='radio' name='choice' value='leaders'>Developing Systems Change Leaders<br>  <input type='radio' name='choice' value='None of These'>None of These<br>      <input type='submit' value='Submit Answer' onclick='submitAnswer()'>";  
   document.getElementById('Question-1').innerHTML = "The three focuses of Engineers Without Borders Canada are: Transforming How Buisness is Done, Advocating for Better Policy, and _______."
   document.getElementById('Question-1-Options').innerHTML = data;  
   changeDoorColour();
}

var submitAnswer = function() {

   var radios = document.getElementsByName('choice');
   var val= "";
   for (var i = 0, length = radios.length; i < length; i++) {
       if (radios[i].checked) {
          val = radios[i].value; 
          break;
        }
   }
   
   if (val == "" ) {
     alert("please select choice answer");
   } else if ( val == "leaders" ) {
     alert("Answer is correct!");
   } else {
     alert("Answer is wrong");
   }
 };

 function changeDoorColour(){
   obstacle = new component(60, 120, "red", 50, 120);

}












/* pseudocode 
Next Steps: 
- activate the questions when the door is opened 
- instead of alert function, call the function that displays the html text
- this function needs to be built 
- remember the function already calls submitAnswer()
- pause the game while answering (or make a html pop up that tells the user to answer the question before returning to the game
- keep track of which doors have been opened (score: increase when door open)
- change color of door when opened
- done
*/