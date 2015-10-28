
function ChangeTab(tab_name, tab_content_name){


	$('.tab_pane_custom' ).removeClass('active');
	$( tab_content_name ).addClass('active');
	$('.nav_tabs_custom li' ).removeClass('active');
	$(tab_name).addClass('active');

}