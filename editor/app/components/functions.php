<?php 

	function isAssocArr(array $arr) {
	    if (array() === $arr) return false;
	    return array_keys($arr) !== range(0, count($arr) - 1);
	}

 ?>