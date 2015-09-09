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
    	var users = xmlHttp.responseText;
    	
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
