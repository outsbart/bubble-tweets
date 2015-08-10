/**
 * Sends all the tweets to the game!
 */
(function(Game) {
  PUBNUB.init({
    subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
  }).subscribe({
    channel : 'pubnub-twitter',
    message : function(msg){
      var hashtags = msg.entities.hashtags;
      if (hashtags.length) {
        Game.spawnBall('#' + hashtags[0].text);
      }
    }
  });
})(Game);
