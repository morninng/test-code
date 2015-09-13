
function SoundMgr(){

	var self = this;
	self.poi_sound = null;
	self.hearhear_sound = null;
	self.booboo_sound = null;
}



SoundMgr.prototype.play_sound_poi = function(){
  var self = this;
  self.poi_sound.start(0);

  self.poi_sound = self.context.createBufferSource();
  self.poi_sound.buffer = self.persisted_poi_sound_buffer;
  self.poi_sound.connect(self.context.destination);
}



SoundMgr.prototype.init = function(){

  var self = this;

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  self.context = new AudioContext();

  self.bufferLoader = new BufferLoader(
  	self.context,
    ['https://s3.amazonaws.com/mixidea/poi3.wav',
     'https://s3.amazonaws.com/mixidea/poi3.mp3',],
    self.finishedLoading
  );
  self.bufferLoader.load();
}

SoundMgr.prototype.finishedLoading = function(bufferList) {

  var self = this;

  self.poi_sound = self.context.createBufferSource();
  self.hearhear_sound = self.context.createBufferSource();
  self.booboo_sound = self.context.createBufferSource();

  self.poi_sound.buffer = bufferList[0];
  self.persisted_poi_sound_buffer = bufferList[0];
  self.hearhear_sound.buffer = bufferList[1];
  self.persisted_hearhear_sound_buffer = bufferList[1];
  self.poi_sound.connect(self.context.destination);
  self.hearhear_sound.connect(self.context.destination);

}




function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload.call(sound_mgr, loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}