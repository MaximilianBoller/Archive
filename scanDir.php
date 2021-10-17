<?php
$dir    = '/blog-posts/';
$files1 = scandir($dir);
$files2 = scandir($dir, 1);

print_r($files1);
print_r($files2);


echo("<h1> Hello Peter </h1>");
?>