<?php 

	namespace app\controllers;
	use app\core\Controller;

	class UserController extends Controller{

		public function actionLogin () {

			$username = false;
			$password = false;

			if(isset($_POST['submit'])) {
				$username = $_POST['username'];
				$username = preg_replace('/[^A-Za-z0-9\-]/', '', $username);

				$password = $_POST['password'];
				$password = preg_replace('/[^A-Za-z0-9\-]/', '', $password);

				// errors
				$errors = false;

				// istifadecinin movcudlugu
				$userId = $this->model->CheckUserData($username, $password);
				if (!$userId) {
					$errors[] = 'The information you entered is incorrect';
				} else {
					// eger username ve password duzgundurse sessiyada yadda saxlanilsin
					$this->model->auth($userId, $username);
					// esas sehifeye yonlendirilsin
					$this->view->redirect("/");
				}
			}
			// login sehifesi
			$this->view->render('Login Page');
		}

		public function actionLogout () {
			// start session
			// session_start();

			// istifadecinin id-si sessiyadan silinir 
			unset($_SESSION['admin']);
			unset($_SESSION['username']);

			// login sehifesine kecid
			header ("Location: ".INDEX_URL."1");
		}
	}
