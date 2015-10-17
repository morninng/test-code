function Argument_VM(){
	self = this;

	self.title_input = ko.observable();

	self.style_value = ko.observable();
	self.hidden_html = ko.observable();
	self.visible_textarea = ko.observable(true);
	self.input_text = ko.observable();
	self.input_title = ko.observable();
	self.TextFocused = ko.observable();
	self.TextFocused2 = ko.observable();
	self.TitleFocused = ko.observable();
	self.textarea1_css = ko.observable();
	self.onEnterTextbox = ko.observable();
	self.visible_save_button = ko.observable(false);
	self.visible_save_indicate = ko.observable(false);
	self.visible_loading = ko.observable(false);

	self.textarea_wrapper_css = ko.observable("textarea_wrapper_default");

	self.input_text2 = ko.observable();

	self.visible_content = ko.observable(true);
	self.text_content = ko.observable();


}

Argument_VM.prototype.initialize = function(argument_obj){

	var self = this;
	self.arg_id = argument_obj.id;
	self.argument_obj = argument_obj;
	self.root_element_id = "#Arg_" + self.arg_id;
	console.log("initialized" + self.arg_id);
	self.count = 0;

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

  self.TitleFocused.subscribe( function(focused) {
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


Argument_VM.prototype.save_input_data = function(){

	var self = this;
	self.textarea_wrapper_css("textarea_wrapper_saved");
	self.count = 0

	var context = self.input_text2();
	if(context){
		if(context.length>1){
			self.argument_obj.set("main_content_set", true);
		}
		self.argument_obj.set("main_content", context);
	}

	var title_context = self.input_text2();
	if(title_context){
		if(title_context.length>1){
			self.argument_obj.set("title_set", true);
		}
		self.argument_obj.set("title", title_context);
	}

	self.argument_obj.increment("main_count");
	self.argument_obj.save(null, {
	  success: function(obj) {
	    console.log("saved");
			self.textarea_wrapper_css("textarea_wrapper_saved");
			self.show_save_message();
			self.check_edit_status();
	  },
	  error: function(obj, error) {
	    alert('Failed to create new object, with error code: ' + error.message);

	  }
	});

}
Argument_VM.prototype.check_edit_status = function(){
	var self = this;

	var content_focusd = self.TextFocused2();
	var title_focused = self.TitleFocused();

	if(!content_focusd && !title_focused){
		self.textarea_wrapper_css("textarea_wrapper_default");
	  self.visible_loading(false);
	self.visible_save_button(false);
	}

}


Argument_VM.prototype.click_save_arg = function(){
	var self = this;
	/*
	self.visible_save_button(false);
	self.show_save_message();
	*/
}

Argument_VM.prototype.onEnterTitle = function(data, event){
	var self = this;
	self.input_data_manage(data, event,"title");
}


Argument_VM.prototype.onEnterTextbox2 = function(data, event){
	var self = this;
	self.input_data_manage(data, event,"main");

}

Argument_VM.prototype.input_data_manage = function(data, event, type){

	var self = this;
	console.log(event.keyCode);
	self.visible_save_button(true);

	self.textarea_wrapper_css("textarea_wrapper_updating");
	if(event.keyCode === 32 && self.prev_keycode != 32){ /*space*/
		self.count++;
		console.log("space count up");
	}

  if((event.keyCode === 13 && self.prev_keycode != 13) /*Enter*/
  	 || (event.keyCode === 190 && self.prev_keycode != 190) /*period*/
  	 || (event.keyCode === 188 && self.prev_keycode != 188) /*comma*/
  	 || (self.count > 3)
  	 ){
  	
  	switch(type){
  		case "main":
  			var inputed_value = self.input_text2();
  			var number_row = self.update_height( inputed_value);
  		break;
  		case "title":
  		break;
  	}
  	self.save_input_data();
  	self.count = 0;
  }
  self.prev_keycode = event.keyCode;

}



Argument_VM.prototype.show_save_message = function(){
	var self = this;
	self.visible_save_indicate(true);
	$(".save_message", self.root_element_id ).css('opacity','1');
	$(".save_message", self.root_element_id ).animate({opacity:0},1500);

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

