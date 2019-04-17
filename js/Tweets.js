/**
 * Sends all the tweets to the game using PUBNUB's SDK.
 */
var pubnub = new PubNub({
  subscribe_key: t2bsettings.PUBNUB_SUBSCRIBE_KEY
});
pubnub.addListener({
  message: function(message) {
    var hashtags = message.message.entities.hashtags;
    hashtags.forEach(function(hashtag) {
      Game.spawnBall('#' + hashtags[0].text);
    });
  }
});
pubnub.subscribe({
  channels: ['pubnub-twitter']
});
