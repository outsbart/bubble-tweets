/**
 * Sends all the tweets to the game using PUBNUB's SDK.
 */
(function(PUBNUB, Game, settings) {
  PUBNUB.init({
    subscribe_key: settings.PUBNUB_SUBSCRIBE_KEY
  }).subscribe({
    channel : settings.PUBNUB_CHANNEL,
    message : function(msg){
      var hashtags = msg.entities.hashtags;

      // only spawn a ball if the tweet has at least one hashtag
      if (hashtags.length) {
        Game.spawnBall('#' + hashtags[0].text);
      }
    }
  });
})(PUBNUB, Game, t2bsettings);
