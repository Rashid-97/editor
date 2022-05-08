<?php 

	// Front Controller
	
	ini_set('display_errors', 1);

	// define paths
	define('ROOT', dirname(__FILE__));
	define('APP_MODELS', ROOT. '/app/models/');
	define('APP_VIEWS', ROOT. '/app/views/');
	define('APP_CONTROLLERS', ROOT. '/app/controllers/');
	// for url
	define("INDEX_URL", "/index.php?");
	// for sql
	define("SQL_PREFIX", "[dbo].");
	define("B_BRACKET", "[");
	define("E_BRACKET", "]");

	include (ROOT. '/app/components/Autoload.php');
	include (ROOT. '/app/components/functions.php');

	use app\components\Router;
	session_start();

	$router = new Router();
	$router->run();
?>