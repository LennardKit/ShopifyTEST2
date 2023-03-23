<?php

$json = file_get_contents('https://cdn.shopify.com/s/files/1/0442/0039/4911/t/7/assets/tokens.json?v=115173703682817603001679575552');
echo $json;
return;
$obj = json_decode($json);
echo $obj->access_token;




?>