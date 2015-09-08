(function(ext) {

    var usersData = [
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {right-hand: false, left-hand: false, jumping: false},
    		effectors: {right-hand:[0,0,0], left-hand:[0,0,0], right-foot:[0,0,0], left-foot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {right-hand: false, left-hand: false, jumping: false},
    		effectors: {right-hand:[0,0,0], left-hand:[0,0,0], right-foot:[0,0,0], left-foot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {right-hand: false, left-hand: false, jumping: false},
    		effectors: {right-hand:[0,0,0], left-hand:[0,0,0], right-foot:[0,0,0], left-foot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {right-hand: false, left-hand: false, jumping: false},
    		effectors: {right-hand:[0,0,0], left-hand:[0,0,0], right-foot:[0,0,0], left-foot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {right-hand: false, left-hand: false, jumping: false},
    		effectors: {right-hand:[0,0,0], left-hand:[0,0,0], right-foot:[0,0,0], left-foot:[0,0,0]}
    	},
    	{id:-1, isTracked: false, position:[-100, -100], 
    		interactions: {right-hand: false, left-hand: false, jumping: false},
    		effectors: {right-hand:[0,0,0], left-hand:[0,0,0], right-foot:[0,0,0], left-foot:[0,0,0]}
    	}];
	
	
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    var recievingData = false;
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
    	if(recievingData)
    		return {status: 2, msg: 'Connected to Ninus'};
        return {status: 0, msg: 'Not recieving Ninus data'};
    };

    ext.isTracked = function(user) {
    	return usersData[user].isTracked;
    };
    ext.getPosition = function(user, coordinate) {
    	if(coordinate=="horizontal")
    		return usersData[user].position[0];
    	else if(coordinate == "vertical")
    		return usersData[user].position[1];
    	return null;
    };
    ext.getInteraction = function(user, interaction) {
    	return false;
    };
    ext.getEffectorCoordinate = function(user, effector, axis) {
    	return 5;
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
    
    setInterval(function(){ 
    	var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    	xmlHttp.send( null );
    	var users = xmlHttp.responseText.Split("#");
    	for(int i=0; i<6; i++)
    	{
    		var data = users[i].Split('*');
    		usersData[i].id = data[0].Split("/")[0];
    		usersData[i].isTracked = data[0].Split("/")[1];
    		
    		usersData[i].position[0] = data[1].Split("/")[0];
    		usersData[i].position[1] = data[1].Split("/")[1];
    		
    		usersData[i].interactions.right-hand= data[2].Split("/")[0];
    		usersData[i].interactions.left-hand = data[2].Split("/")[1];
    		usersData[i].interactions.jumping = data[2].Split("/")[2];
    		
    		usersData[i].effectors.rightHand[0] = data[3].Split("/")[0];
    		usersData[i].effectors.rightHand[1] = data[3].Split("/")[1];
    		usersData[i].effectors.rightHand[2] = data[3].Split("/")[2];
    		usersData[i].effectors.leftHand[0] = data[3].Split("/")[3];
    		usersData[i].effectors.leftHand[1] = data[3].Split("/")[4];
    		usersData[i].effectors.leftHand[2] = data[3].Split("/")[5];
    		usersData[i].effectors.rightFoot[0] = data[3].Split("/")[6];
    		usersData[i].effectors.rightFoot[1] = data[3].Split("/")[7];
    		usersData[i].effectors.rightFoot[2] = data[3].Split("/")[8];
    		usersData[i].effectors.leftFoot[0] = data[3].Split("/")[9];
    		usersData[i].effectors.leftFoot[1] = data[3].Split("/")[10];
    		usersData[i].effectors.leftFoot[2] = data[3].Split("/")[11];
    		
    	}
	}, 50);

})({});
