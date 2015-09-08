(function(ext) {
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
    	return false;
    };
    ext.getPosition = function(user, coordinate) {
    	return 10;
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
})({});
