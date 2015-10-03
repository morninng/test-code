
function chat_box(){

	var self = this;

	self.same_member_parseid_array = new Array();
	self.chat_text_input = ko.observable();
	self.chat_message_array = ko.observableArray();
	self.chat_header_title = ko.observable();
	self.visible_maximize_button = ko.observable(false);
	self.visible_collapse_button = ko.observable(true);

}

chat_box.prototype.initialize = function(){

	var self = this;
	// var team_side_str = get_team_side();
	var team_side_str = "government";
	var title_bar = "chat among " + team_side_str;
	self.chat_header_title(title_bar);

}

chat_box.prototype.member_update = function(){


}


chat_box.prototype.click_collapse = function(){

	var self = this;
	 $('#msg_wrap').slideUp("slow");
	self.visible_maximize_button(true);
	self.visible_collapse_button(false);
}

chat_box.prototype.click_expand = function(){

	var self = this;
	 $('#msg_wrap').slideDown("slow");
	self.visible_maximize_button(false);
	self.visible_collapse_button(true);
}


chat_box.prototype.receive_message = function(){

	var self = this;
	var sender_name = "yuta";

	var chat_message_obj = {chat_message:text_message, style:"chat_msg_other", user:sender_name}
	self.chat_message_array.push(chat_message_obj);

}
/*
http://stackoverflow.com/questions/23087721/call-function-on-enter-key-press-knockout-js
*/

chat_box.prototype.onEnterTextbox = function(data, event){

	var self = this;

	if(event.keyCode === 13 ){
		var text_message = self.chat_text_input();
		if(text_message.length>1){
			self.send_message(text_message);
			self.show_own_message(text_message);
			self.chat_text_input(null);
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
		}
	}
	
}

chat_box.prototype.show_own_message = function(text_message){

	var self = this;
	var chat_message_obj = {chat_message:text_message, chat_box_class:"chat_msg_own", sender_name:""}
	self.chat_message_array.push(chat_message_obj);

}

chat_box.prototype.send_message = function(text_message){

	var self = this;
	console.log(text_message);
}


