function tabmgr(){
	var self = this;
	
}



tabmgr.prototype.createDom = function(el_name){


  var tab_obj_array =[
    {name:"Gov", tab_description:"Gov Argument", active_str:""},
    {name:"Opp", tab_description:"Opp Argument", active_str:""},
    {name:"note", tab_description:"Own note", active_str:"active"},
    {name:"reflection", tab_description:"Reflection", active_str:""}
  ];

  var Tab_Template = _.template($("[data-template='tab_template']").html());
  self.tab_root_element = $(el_name);
  var tab_html_text = Tab_Template({list:tab_obj_array});
  self.tab_root_element.html(tab_html_text);


}


function ChangeTab(tab_name, tab_content_name){


  $('.tab_pane_custom' ).removeClass('active');
  $( tab_content_name ).addClass('active');
  $('.nav_tabs_custom li' ).removeClass('active');
  $(tab_name).addClass('active');

}