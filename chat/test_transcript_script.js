

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
	self.transcript_message_array.push(transcription_obj_poi);

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


