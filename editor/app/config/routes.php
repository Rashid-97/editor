<?php 

	return array(

		'' => [
			'controller' => 'redaktor',
			'action' => 'index',
		],
		'index.php?' => [
			'controller' => 'redaktor',
			'action' => 'index',
		],

		// login
		'1' => [
			'controller' => 'user',
			'action' => 'login',
		],
		// logout
		'2' => [
			'controller' => 'user',
			'action' => 'logout',
		],
		// update password
		'5' => [
			'controller' => 'redaktor',
			'action' => 'updatePassword',
		],

		// redaktor ajax
		'saveAsShablon' => [
			'controller' => 'redaktor',
			'action' => 'saveAsShablon',
		],
		'save' => [
			'controller' => 'redaktor',
			'action' => 'ajaxSave',
		],
		'get/{id:\d+}' => [
			'controller' => 'redaktor',
			'action' => 'ajaxGet',
		],
		'getQanun' => [
			'controller' => 'redaktor',
			'action' => 'getQanun',
		],
		'getData' => [
			'controller' => 'redaktor',
			'action' => 'getData',
		],
		'new-tab' => [
			'controller' => 'redaktor',
			'action' => 'newTab',
		],
		'newQanun' => [
			'controller' => 'redaktor',
			'action' => 'newQanun',
		],
		'getShablon' => [
			'controller' => 'redaktor',
			'action' => 'getShablon',
		],
		'deleteQanun' => [
			'controller' => 'redaktor',
			'action' => 'deleteQanun',
		],
	);

 ?>