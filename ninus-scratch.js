(function(ext) {

   ext.usersData = [
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {righthand: false, lefthand: false, jumping: false},
    		effectors: {righthand:[0,0,0], lefthand:[0,0,0], rightfoot:[0,0,0], leftfoot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {righthand: false, lefthand: false, jumping: false},
    		effectors:  {righthand:[0,0,0], lefthand:[0,0,0], rightfoot:[0,0,0], leftfoot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {righthand: false, lefthand: false, jumping: false},
    		effectors:  {righthand:[0,0,0], lefthand:[0,0,0], rightfoot:[0,0,0], leftfoot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {righthand: false, lefthand: false, jumping: false},
    		effectors:  {righthand:[0,0,0], lefthand:[0,0,0], rightfoot:[0,0,0], leftfoot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {righthand: false, lefthand: false, jumping: false},
    		effectors:  {righthand:[0,0,0], lefthand:[0,0,0], rightfoot:[0,0,0], leftfoot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {righthand: false, lefthand: false, jumping: false},
    		effectors:  {righthand:[0,0,0], lefthand:[0,0,0], rightfoot:[0,0,0], leftfoot:[0,0,0]}
    	}];
	
	
	
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
    	if(true)
    		return {status: 2, msg: 'Connected to Ninus'};
        return {status: 0, msg: 'Not recieving Ninus data'};
    };

    ext.isTracked = function(user) {
    	ext.getdata();
    	return ext.usersData[user-1].isTracked;
    };
    ext.getPosition = function(user, coordinate) {
    	ext.getdata();
    	if( coordinate == "horizontal" )
    		return ext.usersData[user-1].position[0];
    	else if( coordinate == "vertical" )
    		return ext.usersData[user-1].position[1];
    	return null;
    };
    ext.getInteraction = function(user, interaction) {
    	ext.getdata();
    	if(interaction == "raising-right-hand")
    		return ext.usersData[user-1].interactions.righthand;
    	if(interaction == "raising-left-hand")
    		return ext.usersData[user-1].interactions.lefthand;
    	if(interaction == "jumping")
    		return ext.usersData[user-1].interactions.jumping;
    	return false;
    };
    ext.getEffectorCoordinate = function(user, effector, axis) {
    	ext.getdata();
    	var axisIndex = 0;
    	if(axis.contains("up"))
    		axisIndex = 1;
    	if(axis.contains("forward"))
    		axisIndex = 2;
 	if(effector == "right-hand")
 		return ext.userData[user-1].effectors.righthand[axisIndex];
 	if(effector == "left-hand")
 		return ext.userData[user-1].effectors.lefthand[axisIndex];
 	if(effector == "right-foot")
 		return ext.userData[user-1].effectors.rightfoot[axisIndex];
 	if(effector == "left-foot")
 		return ext.userData[user-1].effectors.leftfoot[axisIndex];
    	return 0;
    };
	
    ext.getdata = function(){
    	
    	var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", "http://127.0.0.1:14303/poll", true ); 
    	xmlHttp.send( );
    	xmlHttp.onreadystatechange = 
            function () { 
            	if(xmlHttp.readyState == 4)
            	{
            		var resp = xmlHttp.responseText;
            		var users = resp.split("#");
			for(var i=0; i<6; i++)
			{
				
	    		var data = users[i].split("*");
	    		var userData = data[0].split("/");
	    		ext.usersData[i].id = userData[0];
	    		ext.usersData[i].isTracked = "true" == (userData[1]);
	    		
	    		var position = data[1].split("/");
	    		ext.usersData[i].position[0] = position[0];
	    		ext.usersData[i].position[1] = position[1];
	    		
	    		var interactions = data[2].split("/");
	    		ext.usersData[i].interactions.righthand = "true" == (interactions[0]);
	    		ext.usersData[i].interactions.lefthand = "true" == (interactions[1]);
	    		ext.usersData[i].interactions.jumping = "true" == (interactions[2]);
	    		
	    		var effectors = data[3].split("/");
	    		ext.usersData[i].effectors.righthand[0] = effectors[0];
	    		ext.usersData[i].effectors.righthand[1] = effectors[1];
	    		ext.usersData[i].effectors.righthand[2] = effectors[2];
	    		ext.usersData[i].effectors.lefthand[0] = effectors[3];
	    		ext.usersData[i].effectors.lefthand[1] = effectors[4];
	    		ext.usersData[i].effectors.lefthand[2] = effectors[5];
	    		ext.usersData[i].effectors.rightfoot[0] = effectors[6];
	    		ext.usersData[i].effectors.rightfoot[1] = effectors[7];
	    		ext.usersData[i].effectors.rightfoot[2] = effectors[8];
	    		ext.usersData[i].effectors.leftfoot[0] = effectors[9];
	    		ext.usersData[i].effectors.leftfoot[1] = effectors[10];
	    		ext.usersData[i].effectors.leftfoot[2] = effectors[11];
	    		
	    		}

            	}
            };
    };


    // Block and block menu descriptions
    var descriptor = {
	blocks: [
		["b", "is user %m.users tracked", "isTracked"],
		["r", "user %m.users position %m.coordinate", "getPosition"],
		["b", "is user %m.users %m.interaction", "getInteraction"],
		["r", "user %m.users , effector %m.endeffector , coordinate %m.effectoraxis ", "getEffectorCoordiate"],
	],
	menus: {
		users: ["1","2","3", "4", "5", "6"],
		coordinate: ["horizontal", "vertical"],
		interaction: ["raising-right-hand", "raising-left-hand", "jumping"],
		effectoraxis: ["side ", "up ", "forward "],
		endeffector: ["right-hand", "left-hand", "right-foot", "left-foot"],
	}
	};

    // Register the extension
    ScratchExtensions.register('Ninus', descriptor, ext);
})({});
