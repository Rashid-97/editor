<?php 
	
namespace app\components;
use PDO;

class Db {

	private $db;
	public function __construct() {

		$config = require (ROOT. '/app/config/db_params.php');
		try {
			$this->db = new PDO('dblib:version=7.0;charset=UTF-8;host='.$config['host'].';dbname='.$config['database'].'', $config['user'], $config['password']);
		}
		catch (PDOException $e) {
			die("Cannot access to database!");
		}

	}

	public function query($sql, $params = []) {

		$result = $this->db->prepare($sql);
		if (!empty($params)) {
			if (isAssocArr($params)) {
				foreach ($params as $key => $val) {
					if (is_int($val)) {
						$type = PDO::PARAM_INT;
						$result->bindValue(':'.$key, $val, $type);
					} else if (is_string($val)){
						$type = PDO::PARAM_STR;
						$result->bindValue(':'.$key, $val, $type);
					} else {
						$result->bindValue(':'.$key, $val);
					}
				}
			}
		}
			$result->execute($params);
			return $result;
	}

	public function query_with_transaction($sql_arr, $sql_arr_params = []) {
		try {  
		  	$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		  	$this->db->beginTransaction();
		  	if (!empty($sql_arr_params)) {
			  	for ($i=0; $i < count($sql_arr); $i++) {
			  		$this->query($sql_arr[$i], $sql_arr_params[$i]);
			  	}
		  	} else {
		  		for ($i=0; $i < count($sql_arr); $i++) {
			  		$this->query($sql_arr[$i]);
			  	}
		  	}
		  	return $this->db->commit();

		} catch (Exception $e) {
		  	return $this->db->rollBack();
		  	// echo "Səhv: " . $e->getMessage();
		}
	}

	public function row($sql, $params = []) {
		$result = $this->query($sql, $params);
		return $result->fetchAll(PDO::FETCH_ASSOC);
	}

	public function column($sql, $params = []) {
		$result = $this->query($sql, $params);
		return $result->fetchColumn();
	}

	public function lastInsertId() {
		return $this->db->lastInsertId();
	}

	// public function insert($table_name, $assoc_data_arr) {
	// 	$sql = "INSERT INTO ". $table_name. "(";
	// 	$columns = '';
	// 	$values = '';
	// 	$countt = count($assoc_data_arr);
	// 	foreach ($assoc_data_arr as $column => $value) { 
	// 		$columns.= $column;
	// 		$values.= ":" .$column;
			// $params[$column] = $value;
	// 		--$countt;
	// 		if (!$countt)
	// 			break;

	// 		$columns.= ",";
	// 		$values.= ",";
	// 	}
	// 		$sql.= $colums. ") VALUES(" .$values. ")";
			// $this->query($sql, $params);
	// }

}

 ?>