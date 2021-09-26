<?php
$dir    = '/blog-posts';
$files1 = scandir($dir);
$files2 = scandir($dir, 1);

echo($files1);
echo($files2);
?>