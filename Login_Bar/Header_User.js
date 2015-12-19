function Header_User(){
}

Header_User.prototype.handleEvent = function(){

}
Header_User.prototype.initialize = function(){
	var self = this;
	self.handleEvent();

	self.currentUser = Parse.User.current();
	var recent_login =  self.get_value_fromCookie("recent_login")
	if (self.currentUser && recent_login) {
	  self.construct_dom_for_logeduser();
	} else {
	  Parse.User.logOut();
	  self.construct_login_dom();
	}

}

Header_User.prototype.set_cookie = function(key,value, duration){
	var dt = new Date();
	dt.setTime(dt.getTime() + duration );
	document.cookie = key + '=' + value + ';  expires=' + dt.toGMTString() + '; path=/';
	return;
}

Header_User.prototype.get_value_fromCookie = function(key){

	var cookie_data = document.cookie;
	var cookie_array = cookie_data.split("; ");

	for(var i=0; i < cookie_array.length;i++){
		var c = cookie_array[i].split("=");
		if(c[0] === key){
			return c[1];
		}
	}
	return null;
}

Header_User.prototype.construct_login_dom = function(){
	var self = this;

	$("#profile_pict").html("");
	$("#logout").html("");
	var login_html = "<input type=button onclick='header_obj.goto_login_page()' value='login' >"
	var dom_login = $("#login");
	dom_login.html(login_html);

}

Header_User.prototype.goto_login_page = function(){
	var self = this;
	window.location.href = "./register.html";
}


/*
Header_User.prototype.construct_login_dom = function(){
		var dom_div = $('<div>');
		var dom_a_facebook = $('<a>');
		dom_a_facebook.attr({href:"javascript:void(0)" , onclick:"click_fb_login()"});
		//var facebook_login_form = "<fb:login-button scope='public_profile,email' onlogin='click_fb_login;'></fb:login-button>"
		//dom_div.html(facebook_login_form);
		var dom_img_fb_logo = $('<img>');
		dom_img_fb_logo.attr({src:"./img/fb_logo.jpg"});

		dom_a_facebook.append(dom_img_fb_logo);
		dom_div.append(dom_a_facebook);
		var dom_login = $("#login");
		dom_login.html(dom_div);
}
*/

Header_User.prototype.construct_dom_for_logeduser = function(){
	var self = this;
	console.log("-----loged user --------");

	var currentUser = Parse.User.current();
	var first_name = currentUser.get("FirstName");
	var last_name = currentUser.get("LastName");
	var link = currentUser.get("link");
	var profile_picture_src = currentUser.get("Profile_picture");

	$("#login").html("");
	$("#profile_pict").html("<img src=" + profile_picture_src + ">");
	$("#logout").html("<a href='javascript:void(0)' onclick='header_obj.logout()'>logout</a>");

}

Header_User.prototype.logout = function(){
	var self = this;
	Parse.User.logOut();
  location.reload();
}

/*
Header_User.prototype.click_fb_login = function(){
	var self = this;
	Parse.FacebookUtils.logIn(null, {
	  success: function(user) {
	    if (!user.existed()) {
	      console.log("---------go to profile edit page---------");
	      RegistFbGraphData();
	    } else {
	      console.log("--------User loged in mixidea--------");
	      RegistFbGraphData();
	    //  construct_dom_for_logeduser();
	    }
	  },
	  error: function(user, error) {
	  	Parse.User.logOut();
	  	//remove_all_mixidea_local_data();
	  	alert("please click login button again after this page is refreshed");
    	location.reload();
    	window.location.href = "./register.html";
	  }
	});
}
*/

/*

Header_User.prototype.RegistFbGraphData = function(){

	var self = this;
  FB.api(
   	"/me?fields=picture,first_name,last_name,email,timezone,link",
      function (response) {
        if (response && !response.error) {
        	self.graph_response = response;
          var ext_data = self.currentUser.get("ext_data");

          if(ext_data){
            var User_Extension = Parse.Object.extend("User_Extension");
          	var user_ext_query = new Parse.Query(User_Extension);  
          	user_ext_query.get(self.ext_data.id, {
          		success: function(ext_data_found){
          			self.ext_data = ext_data_found;
          			self.update_user_profile();
          		},
          		error: function(){
          			console.log("ext data cannot be found");
          			var User_Extension = Parse.Object.extend("User_Extension");
          			var user_ext = new User_Extension();
          			self.ext_data = user_ext;
          			update_user_profile()
          		}
          	});
          }else{
          	var User_Extension = Parse.Object.extend("User_Extension");
          	var user_ext = new User_Extension();
          	self.ext_data = user_ext;
          	update_user_profile(response, currentUser, user_ext)
          }
        }
      }
  );
}
*/

/*
Header_User.prototype.update_user_profile = function(){
	var self = this;
	self.ext_data.set("email", response.email );
	self.ext_data.set("link", response.link );
	self.ext_data.set("timezone", response.timezone );

	user_ext_ACL = new Parse.ACL(self.currentUser);
	user_ext_ACL.setPublicReadAccess(true);
	self.ext_data.setACL(user_ext_ACL);

	self.currentUser.set("fb_id", response.id );
	self.currentUser.set("FirstName", response.first_name);
	self.currentUser.set("LastName", response.last_name);
	self.currentUser.set("Profile_picture", response.picture.data.url);
	self.currentUser.set("ext_data",user_ext)

	self.currentUser.save(null, {
		success: function(){
			var duration = 60000 * 60 * 24 * 30;
			//var duration = 60000;
			set_cookie("recent_login", "a", duration);
			alert("saved");
			location.reload();
		},
		error: function(){
			alert("fail to save");
			window.location.href = "./home";
		}
	});
}
*/
