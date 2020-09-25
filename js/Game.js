class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      //once is asynchronus listner which will get player count only once and then execute getCount 
      var playerCountRef = await database.ref('playerCount').once("value")
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(30);
    text("GameStart",120,100);
    //since a static function call with the class name P
    Player.getPlayerInfo();
    if (allPlayers !== undefined) {
      var display_position = 130;
      for (var plr in allPlayers) {
        //marks the current player in red color 
       if(plr === "player" + player.index){
        fill("red");

       } else{
        fill("black");
       }
       display_position = display_position + 20;
       textSize(15);
       //get data of al the players and display it 
       text(allPlayers[plr].name + ":" + allPlayers[plr].distance,120,display_position)
      }
    }
    //change the distance when the up arrow key is pressed and update in the database 
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance = player.distance + 50;
      player.update()
    }
  }
}
