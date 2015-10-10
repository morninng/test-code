

function Argument(){

	var self = this;
	self.user_editable = ko.observable(true);

  self.title_content = ko.observable(""); 
  self.title_input = ko.observable();
  self.isTitleTextboxFocused = ko.observable(true); 
  self.is_default_TitleTextboxFocused = ko.observable(true); 

  self.visible_title_textbox_default = ko.observable(true);
  self.visible_title_textbox_written = ko.observable(true);
  self.visible_title_textbox_edit = ko.observable(true);
  self.visible_editor_profile = ko.observable(true);
  self.editor_pict_src = ko.observable();
  self.editor_name = ko.observable();
  self.visible_button_title_save = ko.observable(true);
  self.visible_button_title_cancel = ko.observable(true);
  self.visible_button_title_edit = ko.observable(true);
  self.visible_editing_icon = ko.observable(true);

  self.main_content = ko.observable(""); 
  self.main_input = ko.observable();
  self.isMainTextboxFocused = ko.observable(false);
  self.is_default_MainTextboxFocused = ko.observable(false);

  self.visible_MainArg_textbox_default = ko.observable(true);
  self.visible_MainArg_textbox_written = ko.observable(true);
  self.visible_MainArg_textbox_edit = ko.observable(true);
  self.visible_editor_MainArg_profile = ko.observable(true);
  self.editor_MainArg_pict_src = ko.observable();
  self.editor_MainArg_name = ko.observable();
  self.visible_button_MainArg_save = ko.observable(true);
  self.visible_button_MainArg_cancel = ko.observable(true);
  self.visible_button_MainArg_edit = ko.observable(true);
  self.visible_MainArg_editing_icon = ko.observable(true);



	self.main_link_array = ko.observableArray();
  self.main_link_input = ko.observable("http://");

  self.comment_array = ko.observableArray(false); 
  self.comment_input = ko.observable(); 
  self.comment_input_visible = ko.observable(false);
  self.isCommentInputTextboxFocused = ko.observable();


	self.click_comment_edit_cancel = function(data){
		console.log(data);
	}

	self.click_comment_edit_save = function(data){
		console.log(data);

	}

	self.click_comment_edit = function(data){
		console.log(data);
	}


}

Argument.prototype.change_editable = function(value){
	var self = this;

	self.user_editable(value);
}


Argument.prototype.click_title_edit = function(){
}


Argument.prototype.click_main_edit = function(){
}



Argument.prototype.click_title_save = function(){

}

Argument.prototype.click_main_save = function(){
}



Argument.prototype.click_comment_Add = function(){
}




Argument.prototype.click_title_cancel = function(){

}


Argument.prototype.click_main_cancel = function(){
}



Argument.prototype.setdata = function(title, content){
  var self = this;
  self.title_content(title);
  self.title_input(title);
  self.visible_title_textbox_edit(true);
  self.visible_title_textbox_written(false);
  self.visible_title_textbox_default(false);

  self.visible_MainArg_textbox_default(false);
  self.visible_MainArg_textbox_written(false);
  self.visible_MainArg_textbox_edit(true);

  self.main_content(content);
  self.main_input(content)

}

