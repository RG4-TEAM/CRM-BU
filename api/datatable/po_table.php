<?php
  require('../../utils/db_connector.php');

  $fetch_automatic = "
                        SELECT 
                            purchase.PURCHASE_ID AS purchase_id,
                            ca.CA AS ca,
                            bp.CUSTOMER_NAME AS cus_name ,
                            COUNT(purchase_lineitem.purchase_id) AS service_num,
                            purchase.PURCHASE_STATUS AS po_status
                        FROM purchase 
                        INNER JOIN ca
                        ON purchase.UserID = ca.UserID
                        INNER JOIN bp
                        ON ca.BP = bp.BP
                        INNER JOIN purchase_lineitem
                        ON purchase_lineitem.purchase_id = purchase.PURCHASE_ID
                        GROUP BY purchase_lineitem.purchase_id";

  $fetch_automatic_query = $conn->query($fetch_automatic);
  $ca_obj = $fetch_automatic_query->fetch_all(MYSQLI_ASSOC);
  echo json_encode($ca_obj, JSON_UNESCAPED_UNICODE);