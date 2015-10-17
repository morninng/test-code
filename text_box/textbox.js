function textbox_mgr(){
	self = this;

	self.TextboxFocused = ko.observable();
	self.title_input = ko.observable();

	self.style_value = ko.observable();
	self.hidden_html = ko.observable();
	self.visible_textarea = ko.observable(true);
	self.input_text = ko.observable();
	self.TextFocused = ko.observable();
	self.TextFocused2 = ko.observable();
	self.textarea1_css = ko.observable();
	self.onEnterTextbox = ko.observable();
	self.visible_save_button = ko.observable(false);
	self.visible_save_indicate = ko.observable(false);

	self.textarea_wrapper_css = ko.observable("textarea_wrapper_default");

	self.input_text2 = ko.observable();

	self.visible_content = ko.observable(true);
	self.text_content = ko.observable();

  self.TextFocused2.subscribe( function(focused) {
	   if (focused) {
	   		console.log(" textbox1 focused");
	   		self.textarea_wrapper_css("textarea_wrapper_focused");
			}
	   if (!focused) {
	   		console.log("textbox1 not focused");
			}

	});
}





textbox_mgr.prototype.click_save_arg = function(){
	var self = this;
	self.textarea_wrapper_css("textarea_wrapper_saved");
	self.visible_save_button(false);
	self.show_save_message();

}


textbox_mgr.prototype.onEnterTextbox2 = function(data, event){

	var self = this;
	console.log(event.keyCode);
	self.visible_save_button(true);
	self.count++;

	self.textarea_wrapper_css("textarea_wrapper_updating");

  if(event.keyCode === 13 ){
		self.textarea_wrapper_css("textarea_wrapper_saved");

  	var inputed_value = self.input_text2();
  	var number_row = self.update_height( inputed_value, "#content_textarea");
		self.count = 0
  }

  console.log(inputed_value);
}


textbox_mgr.prototype.show_save_message = function(){
	var self = this;
	self.visible_save_indicate(true);
	$("#save_message").css('opacity','1');
	$("#save_message").animate({opacity:0},1000);

}


textbox_mgr.prototype.update_height = function(text, element_name){

	var self = this;	

	converted_text = add_linebreak_html(text);
	self.hidden_html(converted_text);
	var hidden_height = $("#hidden_text").height();
	var current_height = $("#content_textarea").height();
	if(current_height< (hidden_height+ 20)){
		$("#content_textarea").height(hidden_height + 20);	
	}

}


	
function add_linebreak_html(context){
	var converted_context = context.split("<").join("&lt;");
	converted_context = converted_context.split(">").join("&gt;");
	//改行を改行タグに置き換える
	converted_context = converted_context.split("\n").join("<br>");

	return converted_context;
}







