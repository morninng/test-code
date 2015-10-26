function Argument_VM(){
	self = this;

	self.title_input = ko.observable();
	self.title_content = ko.observable();

	self.hidden_html = ko.observable();
	self.isMainTextboxFocused = ko.observable();
	self.isTitleFocused = ko.observable();

	self.visible_button_MainArg_save = ko.observable(false);
	self.visible_button_MainArg_edit = ko.observable(false);
	self.visible_save_indicate = ko.observable(false);
	self.visible_MainArg_editing_icon = ko.observable(false);

	self.visible_title_textbox_edit = ko.observable(false);
	self.visible_title_textbox_written = ko.observable(false);
	self.visible_MainArg_textbox_edit = ko.observable(false);
	self.visible_MainArg_textbox_written = ko.observable(false);
	self.main_content = ko.observable();

	self.arg_content_wrapper_css = ko.observable("textarea_wrapper_default");

	self.main_input = ko.observable();

	self.editor_MainArg_pict_src = ko.observable();
	self.editor_MainArg_name = ko.observable();

}

Argument_VM.prototype.initialize = function(argument_obj){

	var self = this;
	self.arg_id = argument_obj.id;
	self.argument_obj = argument_obj;
	self.root_element_id = "#Arg_" + self.arg_id;
	console.log("initialized" + self.arg_id);
	self.count = 0;

  self.isMainTextboxFocused.subscribe( function(focused) {
	   		console.log(" text focus called id is" + self.arg_id);
	   if (focused) {
	   		this.become_editing_status()
			}
	   if (!focused) {
	   		this.save_input_context();
			}
	}, self);

  self.isTitleFocused.subscribe( function(focused) {

	   console.log(" title focus called id is" + self.arg_id);
	   if (focused) {
	   		this.become_editing_status()
			}
	   if (!focused) {
	   		this.save_input_context();
			}
	}, self);

	self.show_All();
}


Argument_VM.prototype.show_All = function(){

	var self = this;
	self.show_context();
//	self.show_button();
//	self.show_edit_status();

}

Argument_VM.prototype.show_context = function(){
	var self = this;

	var title = self.argument_obj.get("title");
	var title_set = self.argument_obj.get("title_set");
	var content = self.argument_obj.get("main_content");
	converted_context = add_linebreak_html(content);
	var main_content_set = self.argument_obj.get("main_content_set");

	var others_under_editing = false;
	var under_editing_this_element = false;


/*****  content box or textarea*****/	

	if(under_editing_this_element){
		//do not change anything
	}else if (others_under_editing){

			self.visible_MainArg_textbox_written(true);
			self.visible_MainArg_textbox_edit(false);
			self.main_content(converted_context);
			self.main_input(content);

			self.visible_title_textbox_written(true);
			self.visible_title_textbox_edit(false);
			self.title_content(title);
			self.title_input(title);

	}else{

		if(main_content_set){
			self.visible_MainArg_textbox_written(true);
			self.visible_MainArg_textbox_edit(false);
			self.main_content(converted_context);
			self.main_input(content);
		}else{
			self.visible_MainArg_textbox_written(false);
			self.visible_MainArg_textbox_edit(true);
			self.main_content(null);
			self.main_input(null);
		}

		if(title_set){
			self.visible_title_textbox_written(true);
			self.visible_title_textbox_edit(false);
			self.title_content(title);
			self.title_input(title);
		}else{
			self.visible_title_textbox_written(false);
			self.visible_title_textbox_edit(true);
			self.title_content(null);
			self.title_input(null);
		}
	}


/***** save or edit button *****/


	if(under_editing_this_element){
		//do not change anything
	}else if (others_under_editing){
			self.visible_button_MainArg_edit(false);
			self.visible_button_MainArg_save(false);
	}else{
		if(title_set || main_content_set){
			self.visible_button_MainArg_edit(true);
			self.visible_button_MainArg_save(false);
		}else{
			self.visible_button_MainArg_edit(false);
			self.visible_button_MainArg_save(false);
		}
	}
}


Argument_VM.prototype.click_content_edit = function(){

	var self = this;
	self.become_editing_status();
	self.isTitleFocused(true);

}
Argument_VM.prototype.become_editing_status = function(){
	var self = this;

	this.arg_content_wrapper_css("textarea_wrapper_focused");
	self.visible_button_MainArg_edit(false);
	self.visible_button_MainArg_save(true);
	self.visible_MainArg_textbox_written(false);
	self.visible_MainArg_textbox_edit(true);
	self.visible_title_textbox_written(false);
	self.visible_title_textbox_edit(true);
	self.visible_MainArg_editing_icon(true);
}



Argument_VM.prototype.save_input_context = function(){

	var self = this;
	self.count = 0

	var context = self.main_input();
	if(context){
		if(context.length>0){
			self.argument_obj.set("main_content_set", true);
		}
		self.argument_obj.set("main_content", context);
	}else{
		self.argument_obj.set("main_content_set", false);
		self.argument_obj.set("main_content", null);
	}

	var title_context = self.title_input();
	if(title_context){
		if(title_context.length>0){
			self.argument_obj.set("title_set", true);
		}
		self.argument_obj.set("title", title_context);
	}else{
		self.argument_obj.set("title_set", false);
		self.argument_obj.set("title", null);

	}

	self.argument_obj.increment("main_count");
	self.argument_obj.save(null, {
	  success: function(obj) {
	    console.log("saved");
			self.arg_content_wrapper_css("textarea_wrapper_saved");
			self.show_save_message();
			self.check_edit_status();
	  },
	  error: function(obj, error) {
	    alert('Failed to create new object, with error code: ' + error.message);

	  }
	});
}

Argument_VM.prototype.show_save_message = function(){
	var self = this;
	self.visible_save_indicate(true);
	$(".save_message", self.root_element_id ).css('opacity','1');
	$(".save_message", self.root_element_id ).animate({opacity:0},1500);
}

Argument_VM.prototype.check_edit_status = function(){
	var self = this;
	var content_focusd = self.isMainTextboxFocused();
	var title_focused = self.isTitleFocused();

	if(!content_focusd && !title_focused){
		self.arg_content_wrapper_css("textarea_wrapper_default");
	  self.visible_MainArg_editing_icon(false);
		self.visible_button_MainArg_save(false);
		self.show_context();
	}
}

Argument_VM.prototype.click_content_save = function(){
	var self = this;
}

Argument_VM.prototype.onEnterTitle = function(data, event){
	var self = this;
	self.input_data_manage(data, event,"title");
}

Argument_VM.prototype.onEnterContext = function(data, event){
	var self = this;
	self.input_data_manage(data, event,"main");
}

Argument_VM.prototype.input_data_manage = function(data, event, type){

	var self = this;
	console.log(event.keyCode);
	self.visible_button_MainArg_save(true);

	self.arg_content_wrapper_css("textarea_wrapper_updating");
	if(event.keyCode === 32 && self.prev_keycode != 32){ /*space*/
		self.count++;
		console.log("space count up");
	}

  if((event.keyCode === 13 && self.prev_keycode != 13) /*Enter*/
  	 || (event.keyCode === 190 && self.prev_keycode != 190) /*period*/
  	 || (event.keyCode === 188 && self.prev_keycode != 188) /*comma*/
  	 || (self.count > 2)
  	 ){
  	
  	switch(type){
  		case "main":
  			var inputed_value = self.main_input();
  			var number_row = self.update_height( inputed_value);
  		break;
  		case "title":
  		break;
  	}
  	self.save_input_context();
  	self.count = 0;
  }
  self.prev_keycode = event.keyCode;

}

Argument_VM.prototype.update_height = function(text){

	var self = this;	

	converted_text = add_linebreak_html(text);
	self.hidden_html(converted_text);
	var hidden_height = $(".hidden_text", self.root_element_id).height();
	var current_height = $(".MainArg_input_edit", self.root_element_id).height();
	if(current_height< (hidden_height+ 20)){
		$(".MainArg_input_edit", self.root_element_id).height(hidden_height + 20);	
	}
}

	
function add_linebreak_html(context){

	if(!context){
		return null;
	}
	var converted_context = context.split("<").join("&lt;");
	converted_context = converted_context.split(">").join("&gt;");
	//改行を改行タグに置き換える
	converted_context = converted_context.split("\n").join("<br>");

	return converted_context;
}

