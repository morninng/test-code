/*

function AfterDebateTabWrapper(){
	var self = this;
	self.summary_tab_obj = null;

}

AfterDebateTabWrapper.prototype.update_from_server = function(){



}

AfterDebateTabWrapper.prototype.add = function(){
	var self = this;

	self.summary_tab_obj = new SummaryTab();

}

AfterDebateTabWrapper.prototype.remove = function(){
	var self = this;


}
*/



function AfterDebateTab(){
	var self = this;
	self.link_array = ko.observableArray();
  self.input_url = ko.observable();
  self.input_after_dis_prop = ko.observable();
  self.after_dis_prop_array = ko.observableArray();

  self.edit_content = function(data){
  	self.changeElementState(data, "edit");
  }
  self.edit_conten_cancel = function(data){
  	self.changeElementState(data, "cancel");
  }

  self.edit_conten_save = function(data){
		console.log("edit save");
		var arg_id = data.id;
		var updated_content = data["context_edit"]


		var Argument = Parse.Object.extend("Argument");
		var arg_query = new Parse.Query(Argument);
		arg_query.get(arg_id, {
			success: function(arg_obj) {
				arg_obj.set("context", updated_content);
				arg_obj.increment("count");
				arg_obj.save(null, {
					success: function(obj) {
						self.show_after_dis_prop();
					},
				  error: function(gameScore, error) {
						alert("fail to save");
				  }
				});
		  },
		  error: function(object, error) {
		    alert("fail to save");
		  }
		});



  }

}



AfterDebateTab.prototype.changeElementState = function(data, in_update_type){

		var self = this;

  	var type = data.arg_type;
  	var context_array = new Array();

  	var wrapper_func_array;
  	switch(type){
  		case "AfterDis_Prop":
  			wrapper_func_array = self.after_dis_prop_array;
  		break;
  		case "AfterDis_Opp":
  		break;
  		case "GeneralComment":
  		break;
  	}
  	var index= NaN;
  	for(var i=0; i<wrapper_func_array().length; i++){
  		if(wrapper_func_array()[i]["id"] == data["id"]){
  			index=i;
  		}
  	}
  	if(!isNaN(index)){
  		var context_obj = new Object();
  		context_obj["id"] = data["id"];
  		context_obj["user_img_src"] = data["user_img_src"];
  		context_obj["user_name"] = data["user_name"];
  		context_obj["context_edit"] = data["context_edit"];
  		context_obj["context_text"] = data["context_text"];
  		context_obj["arg_type"] = data["arg_type"];

  		switch(in_update_type){
  			case "edit":
		  		context_obj["visible_edit_button"] = false;
		  		context_obj["visible_edit_context"] = true;
		  		context_obj["visible_context_text"] = false;
  			break;
  			case "cancel":
		  		context_obj["visible_edit_button"] = true;
		  		context_obj["visible_edit_context"] = false;
		  		context_obj["visible_context_text"] = true;
		  	break;
  		}

			wrapper_func_array.splice(index,1,context_obj);
  	}
}


AfterDebateTab.prototype.onEnterLinkInput = function(){

  if(event.keyCode !== 13 ){
  	return;
  }

  var self = this;

  var input_url = self.input_url();
  var valid_url = is_valid_Url(input_url)
  if(!valid_url){
  	return;
  }

	var data_sent = EncodeHTMLForm(input_url);
	console.log(data_sent);
	$.ajax({
	  url: "http://mixidea.org/api/get_ogp.php",
	  data: data_sent,
	  type: "POST",
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  }
	 }).done(function(response_obj){
	 	console.log(response_obj);

 		if(!response_obj.url){
 			response_obj["url"] = input_url;
 		}
 		if(!response_obj.title){
 			response_obj["title"] = input_url;
 		}
 		if(!response_obj.description){
 			response_obj["description"] = input_url;
 		}
 		if(!response_obj.site_name){
 			response_obj["site_name"] = "";
 		}

 		var UrlOgp = Parse.Object.extend("UrlOgp");
		var url_ogp = new UrlOgp();
		for(key  in response_obj){
			url_ogp.set(key,response_obj[key]);
		}
		url_ogp.set("game_id",actual_game_obj.id);
		actual_game_obj.add("related_url",url_ogp);
		actual_game_obj.save(null, {
		  success: function(obj) {
		  	self.input_url(null);
		  	self.show_links();
		  },
		  error: function(gameScore, error) {
		  	alert("fail to save");
		  }
		});
	});
	


}

AfterDebateTab.prototype.add_after_dis_prop = function(){

	var self = this;

	console.log("add_after_dis_prop");
	var text = self.input_after_dis_prop();
	console.log(text);


	var Argument = Parse.Object.extend("Argument");
	var arg_obj = new Argument();
	arg_obj.set("context",text);
	arg_obj.set("user",global_own_parse_id);
	arg_obj.set("count",0);
	actual_game_obj.add("AfterDis_Prop",arg_obj);
	actual_game_obj.save(null, {
	  success: function(obj) {
	  	self.input_after_dis_prop(null);
	  	self.show_after_dis_prop();
	  },
	  error: function(gameScore, error) {
	  	alert("fail to save");
	  }
	});
}


AfterDebateTab.prototype.show_after_dis_prop = function(){
	var self = this;

  var Game = Parse.Object.extend("Game");
  var game_query = new Parse.Query(Game);
  game_query.include("AfterDis_Prop");
  game_query.get(global_debate_game_id, {
    success: function(game_obj) {
      var prop_array = game_obj.get("AfterDis_Prop");
    	for(var i=0; i<prop_array.length; i++ ){

    		var context_obj = new Object();
    		context_obj["id"] = prop_array[i].id;
    		context_obj["user_img_src"] = "./searchimage2.jpg";
    		context_obj["user_name"] = "Yuta";
    		context_obj["visible_edit_button"] = true;
    		context_obj["visible_edit_context"] = false;
    		context_obj["visible_context_text"] = true;
    		context_obj["context_edit"] = prop_array[i].get("context");
    		context_obj["context_text"] = prop_array[i].get("context");
    		context_obj["count"] = prop_array[i].get("count");
    		context_obj["arg_type"] = "AfterDis_Prop";

    		var exist = false;

    		for(var j=0; j<self.after_dis_prop_array().length; j++){
    			if(self.after_dis_prop_array()[j]["id"] == prop_array[i].id){
       			exist =true;
    				if(self.after_dis_prop_array()[j]["count"] != prop_array[i].get("count")){
    					self.after_dis_prop_array.splice(j,1,context_obj);
						}
					}
				}
				if(!exist){
    			self.after_dis_prop_array.push(context_obj);
				}
			}
    },
    error: function(gameScore, error) {
    	console.log("retrieveing links failed");
  	}
	});
}






AfterDebateTab.prototype.show_links = function(){

	var self = this;

  var Game = Parse.Object.extend("Game");
  var game_query = new Parse.Query(Game);
  game_query.include("related_url");
  game_query.get(global_debate_game_id, {
    success: function(obj) {
    	var url_ogp_array = obj.get("related_url");
    	for(var i=0; i<url_ogp_array.length; i++ ){
    		var exist = false;
    		for(var j=0; j<self.link_array().length; j++){
    			if(self.link_array()[j]["link_url"] == url_ogp_array[i].get("url")){
    				exist = true;
    			}
    		}
    		if(exist == false){
    			var obj = new Object();
    			obj["id"] = url_ogp_array[i].id;
    			obj["title"] = url_ogp_array[i].get("title");
    			obj["img_src"] = url_ogp_array[i].get("image");
    			obj["link_url"] = url_ogp_array[i].get("url");
    			obj["description"] = url_ogp_array[i].get("description");
    			obj["site_name"] = url_ogp_array[i].get("site_name");
    			self.link_array.push(obj);
    		}
    	}
    },
    error: function(gameScore, error) {
    	console.log("retrieveing links failed");
  	}
	});
}



AfterDebateTab.prototype.show_prop_argument = function(){

}

AfterDebateTab.prototype.add_prop_argument = function(){

}

AfterDebateTab.prototype.edit_prop_argument = function(){

}

AfterDebateTab.prototype.show_opp_argument = function(){
	// show it as a knockout array with counter
	// value is updated only when the counter is not the same

	// the logic is mostly the same as argument comment

}
AfterDebateTab.prototype.add_opp_argument = function(){
	// counter is 0
}

AfterDebateTab.prototype.edit_opp_argument = function(){
		//retrieve counter value and increase the counter and update
}

AfterDebateTab.prototype.show_evaluation_comment = function(){

}

AfterDebateTab.prototype.add_evaluation_comment = function(){

}

AfterDebateTab.prototype.edit_evaluation_comment = function(){

}




function is_valid_Url(s) {
    var regexp = /((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/;	
    return s.indexOf(' ') < 0 && regexp.test(s);
}






function EncodeHTMLForm(data){
    var params = [];
    for( var name in data )
    {
        var value = data[ name ];
        var param = encodeURIComponent( name ).replace( /%20/g, '+' )
            + '=' + encodeURIComponent( value ).replace( /%20/g, '+' );
        params.push( param );
    }
    return params.join('&');
}