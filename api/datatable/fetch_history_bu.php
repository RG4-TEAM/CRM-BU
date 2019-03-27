

<?php
  require('../../utils/db_connector.php');

  if(!array_key_exists("ca", $_GET) 
      || (is_null($_GET['ca']) 
      || empty($_GET['ca']))){
    echo json_encode([], JSON_UNESCAPED_UNICODE);
    exit(0);
  }

  $fetch_bu_history = "
    SELECT history
          , history.CODE
          , code.CODE_NAME
          , STAFF
          , PAYMENT 
    FROM crm_bu.history
      JOIN crm_bu.code ON history.CODE = code.CODE
    WHERE history.ca = ?
    ORDER BY history DESC
  ";

  $stmt = $conn->prepare($fetch_bu_history);
  $stmt->bind_param("i", $_GET['ca']);
  $stmt->execute();
  $result = $stmt->get_result();

  while($row = $result->fetch_assoc()){
    $data_list[] = $row;
  }

  echo json_encode($data_list, JSON_UNESCAPED_UNICODE);