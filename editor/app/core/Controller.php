<?php 
	
namespace app\core;
use app\core\View;

abstract class Controller {

	public $route;
	public $view;
	private $acl;

	public function __construct($route) {

		$this->route = $route;
		$this->view = new View($route);
		$this->model = $this->loadModel($route['controller']);

	}

	public function loadModel($path) {
		$model = 'app\models\\' .ucfirst($path);

		if (class_exists($model)) {
			return new $model;
		}

	}

	public function checkAcl() {
		$this->acl = require (ROOT . '/app/acl/acl.php');

		if ($this->is_acl('all')) {
			return true;
		}
		else if (isset($_SESSION['admin']) && $this->is_acl('admin')) {
			return true;
		}
		return false;
	}

	private function is_acl($key) {
		return in_array($this->route['controller'].'/'.$this->route['action'], $this->acl[$key]);
	}
}

?>