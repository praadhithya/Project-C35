class food {
    constructor(){
      this.image = loadImage("images/Milk.png");
     }

display(){
  var x=80,y=50
  push();
  imageMode(CENTER);
  if(foodS>=0){
    for (var i=0;i<foodS;i++){
      if(i%10 == 0){
        x = 80
        y = y+50; 
      }
    image(this.image,x,y,50,50);
    x = x + 30;
    }
 }
  pop();
}

readStock(data){
  foodS = data.val();
}
showerror(){
   console.log("error");
}
getFoodStock() {
  var foodStockRef = database.ref('Food');
  foodStockRef.on("value",function(data){foodS = data.val();})
  this.foodStock = foodS;
} 



updateFoodStock(x,y){
 database.ref('/').set({
   Food:x,FeedTime:y})
   this.foodStock = foodS;
} 
deductFood(){
  
} 


}
