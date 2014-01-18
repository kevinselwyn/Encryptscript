<?php

$KEY = "0102030405060708090a0b0c0d0e0f10";
$IV = "0102030405060708090a0b0c0d0e0f10";

header("Content-Type: application/encryptscript");

function hex2str($hex) {
	$str = "";

	for ($i = 0; $i < strlen($hex); $i += 2) {
		$str .= chr(hexdec(substr($hex, $i, 2)));
	}

	return $str;
}

$filename = preg_replace("/\.php$/", ".js", basename(__FILE__));
$data = file_get_contents($filename);
$method = "aes-128-cbc";
$password = hex2str($KEY);
$options = 0;
$iv = hex2str($IV);

$output = openssl_encrypt($data, $method, $password, $options, $iv);

echo $output;

?>