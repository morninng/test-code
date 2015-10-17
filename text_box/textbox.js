function Argument_VM(){
	self = this;

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
	self.visible_loading = ko.observable(false);

	self.textarea_wrapper_css = ko.observable("textarea_wrapper_default");

	self.input_text2 = ko.observable();

	self.visible_content = ko.observable(true);
	self.text_content = ko.observable();

  self.TextFocused2.subscribe( function(focused) {
	   		console.log(" id is" + self.arg_id);
	   if (focused) {
	   		console.log(" textbox focused");
	   		this.textarea_wrapper_css("textarea_wrapper_focused");
	   		this.visible_loading(true);
			}
	   if (!focused) {
	   		console.log("textbox not focused");
	   		this.save_input_data();
			}

	}, self);
}

Argument_VM.prototype.initialize = function(argument_obj){

	var self = this;
	self.arg_id = argument_obj.id;
	self.arg_obj = argument_obj;
	self.root_element_id = "#Arg_" + self.arg_id;
	console.log("initialized" + self.arg_id);

}


Argument_VM.prototype.save_input_data = function(){
	


}



Argument_VM.prototype.click_save_arg = function(){
	var self = this;
	self.textarea_wrapper_css("textarea_wrapper_saved");
	self.visible_save_button(false);
	self.show_save_message();

}


Argument_VM.prototype.onEnterTextbox2 = function(data, event){

	var self = this;
	console.log(event.keyCode);
	self.visible_save_button(true);
	self.count++;

	self.textarea_wrapper_css("textarea_wrapper_updating");

  if(event.keyCode === 13 ){
		self.textarea_wrapper_css("textarea_wrapper_saved");

  	var inputed_value = self.input_text2();
  	var number_row = self.update_height( inputed_value);
		self.count = 0
  }

  console.log(inputed_value);
}


Argument_VM.prototype.show_save_message = function(){
	var self = this;
	self.visible_save_indicate(true);
	$(".save_message", self.root_element_id ).css('opacity','1');
	$(".save_message", self.root_element_id ).animate({opacity:0},1000);

}


Argument_VM.prototype.update_height = function(text){

	var self = this;	

	converted_text = add_linebreak_html(text);
	self.hidden_html(converted_text);
	var hidden_height = $(".hidden_text", self.root_element_id).height();
	var current_height = $(".content_textarea", self.root_element_id).height();
	if(current_height< (hidden_height+ 20)){
		$(".content_textarea", self.root_element_id).height(hidden_height + 20);	
	}

}


	
function add_linebreak_html(context){
	var converted_context = context.split("<").join("&lt;");
	converted_context = converted_context.split(">").join("&gt;");
	//改行を改行タグに置き換える
	converted_context = converted_context.split("\n").join("<br>");

	return converted_context;
}







