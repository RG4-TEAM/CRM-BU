<?php
	require('utils/connect-db.php');
	$sql_high_value = "SELECT * FROM ca WHERE KAMR = ''";
	$query_high_value = mysqli_query($conn,$sql_high_value);
	$data = array();
	
?>