//Create variables here
var dog, happyDog, database, foodS, foodStock, house;
var firebase,feed,addfood,feedTime, lastFed,foodObj;
var Image1,Image2,Image3,Image4;
function preload()
{
  //load images here
  Image1 = loadImage("images/dogimg2.png")
  Image2 = loadImage("images/dogimg3.jpg")
  Image3 = loadImage("images/House.jpg")
  Image4 = loadImage("images/Milk.png")
}

function setup() {
  database = firebase.database()
  createCanvas(500, 500);
  Image4.resize(50,50);
  dog = createSprite(300,300,5,5)
  Image1.resize(150,150)
  dog.addImage(Image1);
  foodObj = new food();
  lastFed = "No Data";
  
  Image2.resize(150,150)
  foodS = foodObj.getFoodStock();
  
  feed = createButton("Feed the dog")
  feed.position(680,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(780,95);
  addFood.mousePressed(addFoods);

  
  
}

function draw() {  
  background("white");
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
      lastFed = data.val(); 
  });
  //add styles here
  fill("black")
  stroke(51)
  
  textSize(25)
  text("Food Remaining: " + foodS,150,450)

  foodObj.display()
    fill("black")
    textSize(15);
    if(lastFed>=12){
      text("Last Feed :"+lastFed%12 + " PM",250,30);
    }else if (lastFed == 0){
      text("Last Feed : 12 AM",250,30);
    }else{
      text("Last Feed : "+ lastFed + " AM",250,30)
    }
    if (foodS == 30){
      fill("red")
      text("You have reached maximum stock..",150,480)
    }
    //name = input.value(); 
  drawSprites();
  }

function addFoods(x){
  //foodS++
  if(foodS+1>=30){
    foodS = 30;
  }
  else{
    foodS = foodS+1
  } 
  foodObj.updateFoodStock(foodS,lastFed);
}
  function feedDog() {  
    dog.addImage(Image2);
    var time = hour();

    if(foodS-1<=0){
      foodS = 0;
    }
    else{
      foodS = foodS-1
    }
    foodObj.updateFoodStock(foodS,time);
  }