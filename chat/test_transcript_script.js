

function transcript_box_wrapper(){
	var self = this;
	self.transcript_obj = null;
}

transcript_box_wrapper.prototype.update_status_from_server = function(){
	var self = this;


}

transcript_box_wrapper.prototype.show = function(el_name){
	var self = this;
	
	if(!self.transcript_obj){

		self.transcript_obj = new transcript_box();
	  var Transcription_html_Template = _.template($('[data-template="transcription_template"]').html());
	  self.transcription_element = $(el_name);
	  var transcription_html_text = Transcription_html_Template();
	  self.transcription_element.html(transcription_html_text);
	  self.transcription_el = document.getElementById('transcription_field');
	  ko.applyBindings(self.transcript_obj , self.transcription_el);

	}
	self.transcript_obj.update();

}

transcript_box_wrapper.prototype.hide = function(){
	var self = this;

	if(!self.transcript_obj){
		return;
	}
  ko.cleanNode(self.transcription_el);
  self.transcription_element.html(null);
  self.transcript_obj = null;
  self.transcription_el = null;
}

function transcript_box(){

	var self = this;

	self.transcript_message_array = ko.observableArray();
	self.transcript_header_title = ko.observable();
	self.visible_maximize_button = ko.observable(false);
	self.visible_collapse_button = ko.observable(true);

}

transcript_box.prototype.update = function(){

	var self = this;

	self.transcript_header_title("transcription");

	var current_speech_id = "11";
	var	transcript_text_array = [{id:"11",short_split_id:"ll",user_id:"yuta", script:"aa", type:"speaker"},
															 {id:"22",short_split_id:"ll",user_id:"yuta", script:"bb", type:"speaker"},
															 {id:"11",short_split_id:"ll",user_id:"yuta", script:"cc", type:"speaker"},
															 {id:"11",short_split_id:"ll",user_id:"yuta", script:"dd", type:"speaker"},
															 {id:"11",short_split_id:"mm",user_id:"mori", script:"ee", type:"poi"},
															 {id:"11",short_split_id:"mm",user_id:"mori", script:"ff", type:"poi"},
															 {id:"11",short_split_id:"nn",user_id:"yuta", script:"gg", type:"speaker"},
															 {id:"11",short_split_id:"oo",user_id:"mori", script:"hh", type:"poi"},
															 {id:"11",short_split_id:"oo",user_id:"mori", script:"ii", type:"poi"},
															 {id:"11",short_split_id:"oo",user_id:"mori", script:"jj", type:"poi"},
															 {id:"11",short_split_id:"oo",user_id:"mori", script:"kk", type:"poi"},
															 {id:"11",short_split_id:"pp",user_id:"yuta", script:"ll", type:"speaker"},
															 {id:"11",short_split_id:"pp",user_id:"yuta", script:"mm", type:"speaker"}]
	var filter_trans_array = transcript_text_array.filter(
		function (value){
			return (value.id==current_speech_id)
		}
	);
	console.log(filter_trans_array);

	var short_speaker_text = "";
	for(var i=0; i< filter_trans_array.length; i++){
		short_speaker_text = short_speaker_text + filter_trans_array[i]["script"];
		if(i < filter_trans_array.length -1){
			if(filter_trans_array[i]["short_split_id"] != filter_trans_array[i+1]["short_split_id"] ){
				var obj = {};
				obj["transcription_message"] = short_speaker_text;
				obj["speaker_role"] = filter_trans_array[i]["type"];
				obj["speaker_name"] = filter_trans_array[i]["user_id"];
				if(obj["speaker_role"] == "speaker"){
					obj["transcription_box_class"] = "transcript_speaker";
				}else{
					obj["transcription_box_class"] = "transcript_poi";
				}

				console.log(obj);
				self.transcript_message_array.push(obj);
				short_speaker_text = "";
			}
		}else{  //last
				var obj = {};
				obj["transcription_message"] = short_speaker_text;
				obj["speaker_role"] = filter_trans_array[i]["type"];
				obj["speaker_name"] = filter_trans_array[i]["user_id"];
				if(obj["speaker_role"] == "speaker"){
					obj["transcription_box_class"] = "transcript_speaker";
				}else{
					obj["transcription_box_class"] = "transcript_poi";
				}
				console.log(obj);
				self.transcript_message_array.push(obj);
		}
	}
/*
	var text_message = "aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa ";
	var sender_name = "Yuta";
	var sender_role = "Speaker";
	var sender_style = "transcript_speaker";

	var transcription_obj_speaker = 
		{transcription_message:text_message, 
			speaker_role:sender_role,
			transcription_box_class:sender_style, 
			speaker_name:sender_name};
	self.transcript_message_array.push(transcription_obj_speaker);

	var text_message2 = "bbb bbb bbb bbb bbb bbb bbb bbb bbb bbb ";
	var sender_name2 = "Moriyama";
	var sender_role2 = "Poi";
	var sender_style2 = "transcript_poi";

	var transcription_obj_poi = 
		{transcription_message:text_message2,
			speaker_role:sender_role2,
		 transcription_box_class:sender_style2,
		  speaker_name:sender_name2}

*/








}


transcript_box.prototype.click_collapse = function(){

	var self = this;
	 $('#transcription_wrap').slideUp("slow");
	self.visible_maximize_button(true);
	self.visible_collapse_button(false);
}

transcript_box.prototype.click_expand = function(){

	var self = this;
	 $('#transcription_wrap').slideDown("slow");
	self.visible_maximize_button(false);
	self.visible_collapse_button(true);
}
transcript_box.prototype.click_close = function(){

	var self = this;
	 $('#transcript_box').slideUp("slow");
	self.visible_maximize_button(false);
	self.visible_collapse_button(false);
}

transcript_box.prototype.mouseover_trans_field = function(){

	var self = this;
	console.log("mouse over");
	$(' .transcription_message, #transcript_body').css('font-size','large');
	$('.transcript_body').css('max-height','200px');
}


transcript_box.prototype.mouseout_trans_field = function(){

	var self = this;
	console.log("mouse out");
	$(' .transcription_message, #transcript_body').css('font-size','');
	$('.transcript_body').css('max-height','100px');


}



