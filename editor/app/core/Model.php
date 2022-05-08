<?php 

namespace app\core;
use app\components\Db;

abstract class Model {
	
	protected $db;
	public function __construct() {
		$this->db = new Db;
	}

}

 ?>