(function(ext) {

   var usersData = [
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
    	return usersData[user-1].isTracked;
    };
    ext.getPosition = function(user, coordinate) {
    	ext.getdata();
    	if( coordinate == "horizontal" )
    		return usersData[0].position[0];
    	else if( coordinate == "vertical" )
    		return usersData[0].position[1];
    	return null;
    };
    ext.getInteraction = function(user, interaction) {
    	ext.getdata();
    	return false;
    };
    ext.getEffectorCoordinate = function(user, effector, axis) {
    	ext.getdata();
    	return 5;
    };
	
    ext.getdata = function(){
    	
    	var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", "http://127.0.0.1:14303/poll", false ); 
    	xmlHttp.send( null );
    	xhr.onreadystatechange = 
            function () { 
            	if(smlHttp.readyState == 4)
            	{
            		var users = xmlHttp.responseText.Split('#');
			for(var i=0; i<6; i++)
			{
	    		var data = users[i].Split('*');
	    		
	    		var userData = data[0].Split("/");
	    		usersData[i].id = userData[0];
	    		usersData[i].isTracked = userData[1];
	    		
	    		var position = data[1].Split("/");
	    		usersData[i].position[0] = position[0];
	    		usersData[i].position[1] = position[1];
	    		
	    		var interactions = data[2].Split("/");
	    		usersData[i].interactions.righthand = interactions[0];
	    		usersData[i].interactions.lefthand = interactions[1];
	    		usersData[i].interactions.jumping = interactions[2];
	    		
	    		var effectors = data[3].Split("/");
	    		usersData[i].effectors.righthand[0] = effectors[0];
	    		usersData[i].effectors.righthand[1] = effectors[1];
	    		usersData[i].effectors.righthand[2] = effectors[2];
	    		usersData[i].effectors.lefthand[0] = effectors[3];
	    		usersData[i].effectors.lefthand[1] = effectors[4];
	    		usersData[i].effectors.lefthand[2] = effectors[5];
	    		usersData[i].effectors.rightfoot[0] = effectors[6];
	    		usersData[i].effectors.rightfoot[1] = effectors[7];
	    		usersData[i].effectors.rightfoot[2] = effectors[8];
	    		usersData[i].effectors.leftfoot[0] = effectors[9];
	    		usersData[i].effectors.leftfoot[1] = effectors[10];
	    		usersData[i].effectors.leftfoot[2] = effectors[11];
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
		effectoraxis: ["side", "up", "forward"],
		endeffector: ["right-hand", "left-hand", "right-foot", "left-foot"],
	}
	};

    // Register the extension
    ScratchExtensions.register('Ninus', descriptor, ext);
})({});
