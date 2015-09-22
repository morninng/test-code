function Game_Status_Mgr(){
	var self = this;
	// var self.timer;


}

Game_Status_Mgr.prototype.initialize = function(){
	var self = this;
	self.$el_start_prep_container = $("#container_main_left_above_right");
	self.$el_start_debate_container = $("#container_main_left_above_right");
	self.$el_start_reflec_container = $("#top_right");
	self.handleEvents()
}
Game_Status_Mgr.prototype.handleEvents = function(){
	var self = this;
	self.$el_start_prep_container.on("click","#start_prep_button", function(e){self.click_PrepStart();});
	self.$el_start_debate_container.on("click","#start_debate_button", function(e){self.click_DebateStart();});
	self.$el_start_reflec_container.on("click","#start_reflec_button", function(e){self.click_ReflecStart();});
}



Game_Status_Mgr.prototype.show_status_bar = function(){

	//ゆくゆくはここに、ステータスバーの色変更ロジックももってくる。

}



Game_Status_Mgr.prototype.click_PrepStart = function() {
	var self = this;
	console.log("preparation start")

   dom_constructor.update_structure("preparation");
	//start_timer();
	//self.update_server_status("preparation");
}


Game_Status_Mgr.prototype.click_DebateStart = function() {
	var self = this;
	console.log("debate start");
	//self.update_server_status("debate");

   dom_constructor.update_structure("debate");

}

Game_Status_Mgr.prototype.click_ReflecStart = function() {
	var self = this;
	console.log("reflec start");
	//self.update_server_status("evaluation");
   dom_constructor.update_structure("introduction");


}

Game_Status_Mgr.prototype.click_GameComplete = function() {
	var self = this;
	console.log("game complete");
	//self.update_server_status("complete");

}


Game_Status_Mgr.prototype.update_server_status = function(str_status) {
	var self = this;

	if(str_status == "preparation"){
		var prep_start_time = new Date();
		appmgr.actual_game_obj.set("prep_start_time", prep_start_time);
	}

	appmgr.actual_game_obj.set("game_status", str_status);
	appmgr.actual_game_obj.save(null, {
	  success: function(obj) {

		var parse_data_counter = get_parse_data_changed_counter();
		if(!parse_data_counter){
			parse_data_counter = 0;
		}
		parse_data_counter++;
		parse_data_counter_str = String(parse_data_counter);
	    gapi.hangout.data.submitDelta({
		        "parse_data_changed_counter":parse_data_counter_str
		});
	  },
	  error: function(obj, error) {

	  }
	});
}



Game_Status_Mgr.prototype.apply_updated_status = function() {
	var self = this;

	var status_num = appmgr.actual_game_obj.get("game_status");
	self.apply_status(status_num);
}



Game_Status_Mgr.prototype.apply_status = function(status_num) {
	var self = this;
	self.reflesh_status();
	switch(status_num){
		case "introduction":
		break;
		case "preparation":
		break;
		case "debate":
		break;
		case "evaluation":
		break;
		case "complete":
		break;
	}
}


Game_Status_Mgr.prototype.count_timer_start = function(start_time) {
	var self = this;
    clearInterval(self.timer);
	self.timer = setInterval( function(){self.count_timer_show(start_time)}, 1000);
}

Game_Status_Mgr.prototype.count_timer_show = function(start_time) {
	var self = this;
	var current_time = new Date();
	var elapsed_time = current_time - start_time;
	var elapled_second = elapsed_time/1000
	var elapsed_hour = elapled_second/60/60;
	elapsed_hour = Math.floor(elapsed_hour);
	var elapsed_minute = (elapled_second - elapsed_hour*60*60)/60;
	elapsed_minute = Math.floor(elapsed_minute);

	elapled_second = elapled_second - elapsed_hour*60*60 - elapsed_minute*60;
	elapled_second = Math.floor(elapled_second);

	elapled_second = ("0" + elapled_second).slice(-2);
	elapsed_minute = ("0" + elapsed_minute).slice(-2);

	self.preparation_time(elapsed_minute + ":" + elapled_second + " has passed");


}

Game_Status_Mgr.prototype.count_timer_hide = function() {
	var self = this;
	self.preparation_time(null);
    clearInterval(self.timer);
}



