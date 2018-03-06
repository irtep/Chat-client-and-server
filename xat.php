<?php

		if(isset($_POST['forTest'])){
			
			$PHPinput = json_decode($_POST['forTest']);  // decode to php
			$validatedInput = test_input($PHPinput);   

		} // if post is for test

		if(isset($_POST['toDB'])){
			
			$PHPinput = json_decode($_POST['toDB']);  // decode to php
            $PHPinput1 = test_input($PHPinput[0]);  // validate
            $PHPinput2 = test_input($PHPinput[1]);  // validate
			
                $servername = "localhost";
                $username = "xxxxxxxxx";
                $password = "xxxxxxxxx";
                $dbname = "xxxxxxxxx";

                // Create connection
                $conn = new mysqli($servername, $username, $password, $dbname);
                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }                     

                $sql = "INSERT INTO chatlog (senderis, usermessage)
                VALUES ('$PHPinput1', '$PHPinput2')";

                if ($conn->query($sql) === TRUE) {
                    echo "New record created successfully";
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }                    
                    
                $conn->close();     
			
		} // if post is to DB

		if(isset($_POST['delALL'])){
			
			$PHPinput = json_decode($_POST['delALL']);  // decode to php
			$validatedInput = test_input($PHPinput);
            
                $servername = "localhost";
                $username = "xxxxxxxxx";
                $password = "xxxxxxxxx";
                $dbname = "xxxxxxxxx";
            
                $feedbackmsg1;
                $feedbackmsg2;

                // Create connection
                $conn = new mysqli($servername, $username, $password, $dbname);
                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }                                 
			
                // delete old table
 
                $sql = "DROP TABLE chatlog";           
                
                if ($conn->query($sql) === TRUE) {
                    $feedbackmsg1 = "old table deleted ";
                } else {
                    $feedbackmsg1 = "Error deleting table: " . $conn->error;
                }             
                
                // sql to create new table
                $sql = "CREATE TABLE chatlog (
                ID int NOT NULL AUTO_INCREMENT,
                senderis VARCHAR(15), 
                usermessage VARCHAR(255),
                PRIMARY KEY (ID)
                )";  
                    
                if ($conn->query($sql) === TRUE) {
                   $feedbackmsg2 = "new table created ";
                } else {
                   $feedbackmsg2 = "Error creating table: " . $conn->error;
                }                
                echo $feedbackmsg1,$feedbackmsg2;
            
            $conn->close(); 
			
		} // if post is del all
		
 if (isset($_POST['showALL'])) { // takes post that is named showALL
        
        $dataToPHP = json_decode($_POST["showALL"]); // decode to php
        $PHPinput = test_input($dataToPHP);  // validate
        
                $servername = "localhost";
                $username = "xxxxxxxxx";
                $password = "xxxxxxxxx";
                $dbname = "xxxxxxxxx";

                // Create connection
                $conn = new mysqli($servername, $username, $password, $dbname);
                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }
                    
                $sql = "SELECT senderis, usermessage FROM chatlog";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    // output data of each row
                    while($row = $result->fetch_assoc()) {
                      
             $backToJs = utf8_decode(htmlentities($row["senderis"])). ": ". utf8_decode(htmlentities($row["usermessage"])). "<br>"; 
                    
                    $myJSON = json_encode($backToJs);    
                    echo $myJSON;
                    }
                } else {
                    echo "Chat is open. Write something if you want, please.";
                }                    
                
                $conn->close();     

    } // end of showAll

   
	function test_input($data) {  // tester of input
       
    $data = trim($data);   // Strip unnecessary characters (extra space, tab, newline)
    $data = stripslashes($data);  // strips backslashes
    $data = htmlspecialchars($data); // converts specials to htm-entites //disabled for now as messes Decode
    return $data;  // returns this to sender.
    
    } // tester
   
?>