    function cleanChatLog(param1) {
        
        if (param1 === "withDB") {
        
            var toBeSend = param1;
                        
            $.ajax({  // to validate users name input
				type: "POST",
				url: "../xat/php/xat.php",
                data: {"delALL" : JSON.stringify(toBeSend)},
                success: function(data) {
          
					$('#feedback').html(data);
                    var backFromPHP = data;
                    //var backFromPHP = JSON.parse(data);
                    console.log("back from php:",backFromPHP); 
					    
                } // success
          
              });  // ajax   

        } // if withDB
        
    } // cleanChatLog

    //Load the file containing the chat log
	function loadLog(){		 // this next.

		/* lives still some quote, but might be handy at some point
		function stripquotes(a) {
 		
 		    if (a.charAt(0) === '"' && a.charAt(a.length-1) === '"') {
        	
        		return a.substr(1, a.length-2);
    		
    		}
    		
    			return a;

			} // quote stripper
		*/
        
            var toBeSend = "showAll";
                        
            $.ajax({  // to validate users name input
				type: "POST",
				url: "../xat/php/xat.php",
                data: {"showALL" : JSON.stringify(toBeSend)},
                success: function(data) {
          
					$('#feedback').html(data);
                    var backFromPHP = data;
                    //var backFromPHP = JSON.parse(data);
                    console.log("back from php:",backFromPHP); 
                    
                    backFromPHP = backFromPHP.replace(/"/g, '');
   
                    			// .replace(/"/g, '') replaces all quotes
                    			// .replace(/^"|"$/g, '') replaces quotes around

                    document.getElementById("xatLog").innerHTML=backFromPHP;
					    
                } // success
          
              });  // ajax   
	
	
	/*
saved to save scroll script
	
		$.ajax({
		
			url: "log.html",
			cache: false,
			success: function(html){		
				$("#chatbox").html(html); //Insert chat log into the #chatbox div	
				
				//Auto-scroll			
				var newscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height after the request
			
				if(newscrollHeight > oldscrollHeight){

					$("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div

				}					
		  	},
		});
		
		
	
		
		*/
		
	}  // function loadLog


function buttonX(butID) {
	
	console.log("buttonX activated, with butID:",butID);
	
	switch (butID) {
		
		case "enter":  // this will set the name of user
		
			var usersName = document.getElementById("name").value;
            console.log("users input:",usersName);
			
			$.ajax({  // to validate users name input
				type: "POST",
				url: "../xat/php/xat.php",
                data: {"forTest" : JSON.stringify(usersName)},
                success: function(data) {
          
					$('#feedback').html(data);
                    var backFromPHP = data;
                    //var backFromPHP = JSON.parse(data);
                    console.log("back from php:",backFromPHP); 
					
					if (backFromPHP != "") {
						
					$("#loginform").hide();	
					document.getElementById("nimi").innerHTML = backFromPHP;
					$("#wrapper").fadeIn("slow");	
                        
                    setInterval (loadLog, 2500);	//Reload file every 2500 ms
                        
                        
					} // if name is not empty
                    
                } // success
          
              });  // ajax   
		
		break;
		
		case "exit":
		
			//when user clicks exit link
			/* some easier log out propably..
            
				var exit = confirm("Are you sure you want to end the session?");
				
				if(exit==true){window.location = 'php/xat.php?logout=true';}				
			*/			
		break;
		
		case "submitmsg":

			var whoSends = document.getElementById("name").value;
			var clientmsg = $("#usermsg").val();
            
			var packToSend = [whoSends, clientmsg];

    		console.log("clientMSG:",packToSend);
                        
            $.ajax({  // to validate users name input
				type: "POST",
				url: "../xat/php/xat.php",
                data: {"toDB" : JSON.stringify(packToSend)},
                success: function(data) {
          
					$('#feedback').html(data);
                    var backFromPHP = data;
                    //var backFromPHP = JSON.parse(data);
                    console.log("back from php:",backFromPHP); 
                    
                   // document.getElementById("line30").textContent=backFromPHP;
                    
                } // success
          
              });  // ajax   
		
		break;
		
		default:
		console.log("butID not in switch-list");
		
	} // switch of butID
	
} // function buttonX

$(document).ready(function(){  // when page is ready, hide links
        
    console.log("page loaded");    
    $("#wrapper").hide(); 

	$(":button").click(function (event) {  // event listener for buttons.
	
		console.log("event listener for button activated");
			  
		buttonX(this.id); // fires buttonX with id of button
			  
	});		// event listener
    
    cleanChatLog("withDB");

}); // on load.
			
 