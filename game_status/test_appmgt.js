

function construct_layout(){
    var self = this;
    self.status = "introduction";
}

construct_layout.prototype.update_structure = function(status){

    var self = this;

    self.status = status;

    switch(self.status){
        case "introduction":
            self.construct_layout_introduction();
        break;
        case "preparation":
            self.construct_layout_preparation();

        break;
        case "debate":
            self.construct_layout_debate();

        break;
        case "evaluation":

        break;
        case "complete":

        break;
    }
}

construct_layout.prototype.construct_layout_introduction = function(){

	var Title_html_Template = _.template($('[data-template="title_template"]').html());
    var title_element = $("#title_area");
    var Title_html_text = Title_html_Template();
    title_element.html(Title_html_text);


    $("#container_main").width(1000);

    $("#container_main_left_above_left").width(300);
	var Video_html_Template = _.template($('[data-template="video_area_template"]').html());
    var video_element = $("#container_main_left_above_left_up");
    var Video_html_text = Video_html_Template();
    video_element.html(Video_html_text);


	var Impression_html_Template = _.template($('[data-template="impression_template"]').html());
    var impression_element = $("#container_main_left_above_left_below");
    var impression_html_text = Impression_html_Template();
    impression_element.html(impression_html_text);

    // var left_height = $("#container_main_left_above_left_below").height() + $("#container_main_left_above_left_up").height();

    // $("#container_main_left_above_right").height(left_height);
    $("#container_main_left_above_right").height(230);
    $("#container_main_left_above_right").width(250);
	var PrepDirect_html_Template = _.template($('[data-template="introduction_direction_template"]').html());
    var PrepDirect_element = $("#container_main_left_above_right");
    var PrepDirect_html_text = PrepDirect_html_Template();
    PrepDirect_element.html(PrepDirect_html_text);

    $("#container_main_right").width(450);
	NA_html_Template = _.template($('[data-template="NA_Template"]').html());
	var participant_table_element = $("#container_main_right");
	var NA_html_text = NA_html_Template();
	participant_table_element.html(NA_html_text);


    $("#container_main_left_below").width(550);
	intro_info_html_Template = _.template($('[data-template="intro_info_template"]').html());
	var intro_info_element = $("#container_main_left_below");
	var intro_info_html_text = intro_info_html_Template();
	intro_info_element.html(intro_info_html_text);



    status_bar_html_Template = _.template($('[data-template="status_bar_template"]').html());
    var status_bar_element = $("#container_second_top");
    var status_bar_html_text = status_bar_html_Template();
    status_bar_element.html(status_bar_html_text);
    $("#status_prep").removeClass("status_bar_element");
    $("#status_prep").addClass("status_bar_element_selected");


    var Chat_html_Template = _.template($('[data-template="chat_template"]').html());
    var chat_element = $("#absolute_pain_1");
    var Chat_html_text = Chat_html_Template();
    chat_element.html(Chat_html_text);

    chat_view_model = new chat_box();
    chat_view_model.initialize();
    var chat_el = document.getElementById('chat_field');
    ko.applyBindings(chat_view_model, chat_el);

}



construct_layout.prototype.construct_layout_preparation = function(){

    var Title_html_Template = _.template($('[data-template="title_template"]').html());
    var title_element = $("#title_area");
    var Title_html_text = Title_html_Template();
    title_element.html(Title_html_text);

    $("#container_main_left_above_left").width(300);
    var Video_html_Template = _.template($('[data-template="video_area_template"]').html());
    var video_element = $("#container_main_left_above_left_up");
    var Video_html_text = Video_html_Template();
    video_element.html(Video_html_text);


    var Impression_html_Template = _.template($('[data-template="impression_template"]').html());
    var impression_element = $("#container_main_left_above_left_below");
    var impression_html_text = Impression_html_Template();
    impression_element.html(impression_html_text);

    $("#container_main_right").width(450);
    NA_html_Template = _.template($('[data-template="NA_Template"]').html());
    var participant_table_element = $("#container_main_right");
    var NA_html_text = NA_html_Template();
    participant_table_element.html(NA_html_text);


    status_bar_html_Template = _.template($('[data-template="status_bar_template"]').html());
    var status_bar_element = $("#container_second_top");
    var status_bar_html_text = status_bar_html_Template();
    status_bar_element.html(status_bar_html_text);
    $("#status_prep").removeClass("status_bar_element");
    $("#status_prep").addClass("status_bar_element_selected");


    var Chat_html_Template = _.template($('[data-template="chat_template"]').html());
    var chat_element = $("#absolute_pain_1");
    var Chat_html_text = Chat_html_Template();
    chat_element.html(Chat_html_text);

    chat_view_model = new chat_box();
    chat_view_model.initialize();
    var chat_el = document.getElementById('chat_field');
    ko.applyBindings(chat_view_model, chat_el);









/* ********** */
    $("#container_main_left_above_right").height(230);
    $("#container_main_left_above_right").width(250);
    var PrepDirect_html_Template = _.template($('[data-template="preparation_direction_template"]').html());
    var PrepDirect_element = $("#container_main_left_above_right");
    var PrepDirect_html_text = PrepDirect_html_Template();
    PrepDirect_element.html(PrepDirect_html_text);


    $("#container_main_left_below").width(550);
    intro_info_html_Template = _.template($('[data-template="prep_info_audience_template"]').html());
//    intro_info_html_Template = _.template($('[data-template="prep_info_debater_template"]').html());
    var intro_info_element = $("#container_main_left_below");
    var intro_info_html_text = intro_info_html_Template();
    intro_info_element.html(intro_info_html_text);

}


construct_layout.prototype.construct_layout_debate = function(){

}