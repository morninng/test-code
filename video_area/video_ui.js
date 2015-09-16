
function VideoViewModel(){

  var self = this;

/*start speech area*/
  self.visible_start_speech = ko.observable(true); 
  self.start_speech_role_name_array = ko.observableArray();
  self.click_speech_start = function(data, event){
  	console.log(data);
  }
/* speaker info area */
  self.visible_speaker_info = ko.observable(true); 
  self.speaker_name = ko.observable(); 
  self.speech_role = ko.observable();
  self.timer_prefix = ko.observable();
  self.timer_value = ko.observable();

/*complete button*/
  self.visible_complete_button = ko.observable(true);
/*video dummy area*/
  self.video_canvas_style_str = ko.observable();

/*poi field*/
  self.visible_poi_field = ko.observable(true);
  self.visible_poi_button = ko.observable(true);
  self.click_poi = function(data, event){
 	console.log(data);
  }
  self.visible_finish_button = ko.observable(true);
  self.finish_poi = function(data, event){
 	console.log(data);
  }
  self.visible_finish_poi_bySpeaker = ko.observable(true);
  self.finish_poi_bySpeaker = function(data, event){
 	console.log(data);
  }

  self.poi_candidate_view_array = ko.observableArray();
  self.cancel_poi = function(data, event){
 	console.log(data);
  }
  self.take_poi = function(data, event){
 	console.log(data);
  }


  self.click_complete_speech = function(data, event){
    console.log(data)
  }

}

 
VideoViewModel.prototype.initialize = function(){
 	var self = this;
 	var own_role_name = [{button_role_name:"PM"},{button_role_name:"DPM"},{button_role_name:"GW"}];
 	self.start_speech_role_name_array(own_role_name);

  self.speaker_name("Yuta Moriyama");
  self.speech_role("PrimeMinister");

  self.timer_prefix("time");
  self.timer_value("10:32");


  var poi_candidate_obj_1 = {img_url:"./../booboo.jpg", 
            name:"Mai Soeda",
            PoiTake_button_visible:false, 
            Cancel_button_visible:true, 
            hangout_id: "aaa"};

  var poi_candidate_obj_2 = {img_url:"./../searchimage2.jpg", 
            name:"Kae Sonodallllllll",
            PoiTake_button_visible:true, 
            Cancel_button_visible:false, 
            hangout_id: "bbb"};


  var poi_candidate_obj_3 = {img_url:"./../booboo.jpg", 
            name:"Morninng Star Dash",
            PoiTake_button_visible:false, 
            Cancel_button_visible:true, 
            hangout_id: "ccc"};

  self.poi_candidate_view_array.push(poi_candidate_obj_1);
  self.poi_candidate_view_array.push(poi_candidate_obj_2);
  self.poi_candidate_view_array.push(poi_candidate_obj_3);


  self.visible_finish_button(false);
  self.visible_finish_poi_bySpeaker(false);


};



