(function(ext) {
   ext.lastTimeUpdatedTracking = 0;
   ext.lastTimeUpdatedSpeech = 0;
   ext.minTimeBetweenUpdates = 50;
   ext.licensed = false;
   ext.dataRecieved = false;
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
    	ext.getdata();
    	if(ext.licensed && ext.dataRecieved)
    		return {status: 2, msg: 'Connected to Ninus.'};
    	if(!ext.licensed && ext.dataRecieved)
    		return {status: 1, msg: 'Ninus Scratch only for PC testing without Ninus.'};
        return {status: 1, msg: 'ERROR: Not receiving data. Run Ninus Scratch.'};
    };

    ext.isTracked = function(user) {
    	ext.getdata();
    	return ext.usersData[user-1].isTracked;
    };
    ext.getPosition = function(user, coordinate) {
    	ext.getdata();
    	if( coordinate.indexOf("horizontal")!=-1 )
    		return ext.usersData[user-1].position[0];
    	else if( coordinate.indexOf("vertical")!=-1)
    		return ext.usersData[user-1].position[1];
    	return null;
    };
    ext.getInteraction = function(user, interaction) {
    	ext.getdata();
    	if(interaction.indexOf("raising-right-hand")!=-1)
    		return ext.usersData[user-1].interactions.righthand;
    	if(interaction.indexOf("raising-left-hand")!=-1)
    		return ext.usersData[user-1].interactions.lefthand;
    	if(interaction.indexOf("jumping")!=-1)
    		return ext.usersData[user-1].interactions.jumping;
    	return false;
    };
    ext.getEffectorCoordinate = function(user, effector, axis) {
    	ext.getdata();
    	var axisIndex = 0;
    	if(axis.indexOf("up")!=-1)
    		axisIndex = 1;
    	if(axis.indexOf("forward")!=-1)
    		axisIndex = 2;
 	if(effector.indexOf("right-hand")!=-1)
 		return ext.usersData[user-1].effectors.righthand[axisIndex];
 	if(effector.indexOf("left-hand")!=-1)
 		return ext.usersData[user-1].effectors.lefthand[axisIndex];
 	if(effector.indexOf("right-foot")!=-1)
 		return ext.usersData[user-1].effectors.rightfoot[axisIndex];
 	if(effector.indexOf("left-foot")!=-1)
 		return ext.usersData[user-1].effectors.leftfoot[axisIndex];
    	return -1;
    };
	
    ext.getdata = function(){
    	//alert("Time: "+(new Date).getTime()+" - last: "+ext.lastTimeUpdatedTracking+" > "+ext.minTimeBetweenUpdates);
    	if( (new Date).getTime()-ext.lastTimeUpdatedTracking > ext.minTimeBetweenUpdates )
    	{
    	ext.lastTimeUpdatedTracking = (new Date).getTime();
    	var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", "http://127.0.0.1:14303/poll", true ); 
    	xmlHttp.send( );
    	xmlHttp.onreadystatechange = 
            function () { 
            	if(xmlHttp.readyState == 4)
            	{
            		if(xmlHttp.responseText.indexOf("&")>-1)
            		{
	            		var rawResp = xmlHttp.responseText.split("&");
	            	
	            		var resp = rawResp[0];
	            		if(rawResp[1] == "1")
	            			ext.licensed = true;
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
				ext.dataRecieved = true;
            		}
            	}
            };
    	}
    };
    ext.vocabulary = new Array();
    ext.startVocabulary = function()
    {
    	ext.vocabulary = new Array();
    };
    ext.addWord = function(word)
    {
    	ext.vocabulary.push(word);
    };
    ext.endVocabulary = function()
    {
    	if(ext.vocabulary.length > 0)
    	{
    		var wordsString = "";
    		for(var i=0; i<(ext.vocabulary.length-1); i++)
    			wordsString += ext.vocabulary[i] + "*";
    		wordsString += ext.vocabulary[ext.vocabulary.length-1];
	  	var xmlHttp = new XMLHttpRequest();
	    	xmlHttp.open( "GET", "http://127.0.0.1:15209/+words+"+wordsString+"+words+", true ); 
	    	xmlHttp.send( );
    	}
    };
    ext.lastWordDetected = "";
    ext.wordDetected = function(word)
    {
    	if( (new Date).getTime()-ext.lastTimeUpdatedSpeech > ext.minTimeBetweenUpdates )
    	{
  	ext.lastTimeUpdatedSpeech = (new Date).getTime();
    	var xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", "http://127.0.0.1:15209/poll", true ); 
    	xmlHttp.send( );
    	xmlHttp.onreadystatechange = 
            function () { 
            	if(xmlHttp.readyState == 4)
            	{
            		if(xmlHttp.responseText != "null" && xmlHttp.responseText != "")
            		{
	            		ext.lastWordDetected = xmlHttp.responseText;
            		}
            	}
            };
    	}
        if(ext.lastWordDetected.localeCompare(word)==0)
        {
        	ext.lastWordDetected = "";
        	return true;
        }
        return false;
    };
    
    
    
    // Block and block menu descriptions
    var descriptor = {
	blocks: [
		["b", "is user %m.users tracked", "isTracked"],
		["r", "user %m.users position %m.coordinate", "getPosition"],
		["b", "is user %m.users %m.interaction", "getInteraction"],
		["r", "user %m.users , effector %m.endeffector , coordinate %m.effectoraxis", "getEffectorCoordinate"]
	    	/*,
		[" ", "Start vocabulary", "startVocabulary"],
		[" ", "End vocabulary", "endVocabulary"],
		[" ", "Add word %s", "addWord"],
		["h", "Word %s detected", "wordDetected"],*/
	],
	menus: {
		users: ["1","2","3", "4", "5", "6"],
		coordinate: ["horizontal ", "vertical "],
		interaction: ["raising-right-hand ", "raising-left-hand ", "jumping "],
		effectoraxis: ["side ", "up ", "forward "],
		endeffector: ["right-hand ", "left-hand ", "right-foot ", "left-foot "],
	},
	url: "http://material.ninusuniverse.com/#scratch",
	};

    // Register the extension
    ScratchExtensions.register('Ninus', descriptor, ext);
})({});
