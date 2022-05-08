<?php 

	namespace app\controllers;
	use app\core\Controller;
	use app\models\User;

	class RedaktorController extends Controller{

		private $userId;
		private $userName;
		private $qanun_list;

		public function actionIndex() {

			if (!$this->checkAcl()) {
				$this->view->redirect('/index.php?1');
			}

			$data_arr = ['username' => $_SESSION['username']];
 			$this->view->render('Editor page', $data_arr);

		}
		
		public function actionUpdatePassword() {
			$curr_password = trim($_POST['curr_password']);
			$new_password = trim($_POST['new_password']);
			$response = array(
				'msg' => null,
				'success' => 0,
			);

			$user = new User();
			$this->userId = $user->CheckLogged();
			$this->userName = $user->getUserById($this->userId);
			if (isset($curr_password) && isset($new_password)) {
				if ($curr_password != null && $new_password != null) {

					if ($user->CheckUserData($this->userName, $curr_password)) { // eger movcud sifre duzgun yazildisa
						
						if ($curr_password != $new_password) {
						
							if (strlen($new_password) >= 6) {
								
								if ($user->ChangePasswd($new_password, $this->userId)) {
									$response['msg'] = 'Password was successfully changed!';
									$response['success'] = 1;
									echo json_encode($response);
								} else { // backendde error olarsa
									$response['msg'] = 'Could not change password!';
									echo json_encode($response);
								}

							} else {
								$response['msg'] = 'Password length may not be less than 6 characters.';
								echo json_encode($response);
							}

						} else {
							$response['msg'] = 'Enter the new password!';
							echo json_encode($response);
						}

					} else {
						$response['msg'] = 'The current password was entered incorrectly!';
						echo json_encode($response);
					}

				} else {
					$response['msg'] = 'Fill in the fields!';
					echo json_encode($response);
				}

			}
				return true;
		}

		public function actionAjaxGet() {
			$xmlArray = $this->model->getDataByID($this->route['id']);
			echo $xmlArray;
		}

		public function actionGetQanun() {
			$qanun_list = $this->model->getQanunList();
			if ($qanun_list != false) {
				$html_data = '';

				foreach ($qanun_list as $name => $arr) {
					$html_data.= "<ol><i></i>".$name;
					if (!empty($arr)) {
						foreach ($arr as $key) {
							$html_data.= "<li id=".$key['id']." class='li' style='display:none;'>".$key['adi']."</li>";
						}
					} else {
						$html_data.= "<li style='display:none;list-style-type:none;'>No data</li>";
					}
					$html_data.= "</ol>";
				}
			} else {
				$html_data = "<span style='color:red;'>Could not read data!</span>";
			}
				echo $html_data;
		}
		public function actionGetData() {
			$data_list = $this->model->getQanunData();
			echo $data_list;
		}

		public function actionNewTab() {
			$id = $_POST['id'];
			$index = $_POST['index'];
			if (isset($id) && isset($index)) {
				if($index == 'null')
					$index = null;
				
				if ($this->model->AddTab($id, $index)) {
					echo "Tab value added!";
				} else {
					echo "Tab not added!";					
				}
				return true;
			}
			return false;
		}

		public function actionNewQanun() {
			$newDataArr = $_POST['newDataArr'];

			if (isset($newDataArr)) {
				echo $this->model->saveNewJSONData($newDataArr);
				return true;
			}
			return false;
		}

		public function actionDeleteQanun() {
			$id = $_POST['id'];

			if (isset($id)) {
				if ($this->model->DeleteQanun($id)) {
					echo 'Deleted!';
				}
				return false;
			}
			return false;
		}

		public function actionAjaxSave() {

			$xmlDataArr = $_POST['xmlData'];

			if (isset($xmlDataArr)) {
					
				if ($this->model->saveJSONData($xmlDataArr)) {
					// Redaktor::saveJSONData($xmlData);
					echo "Data was succesfully saved!";
				} else {
					echo "Could not save!(1)";
				}

			} else {
				echo "Could not save!(2)";
			}
		}

		public function actionGetShablon() {
			$xmlArray = $this->model->getShablons();
			echo $xmlArray;
		}

		public function actionSaveAsShablon() {

			$shablon_name = $_POST['shablon_name'];
			$shablon_data = $_POST['shablon_data'];
			if (isset($shablon_data) && isset($shablon_name)) {
				if (trim($shablon_name) != '') {
					$this->model->NewShablon($shablon_name, $shablon_data);
					echo "Added!";
				}

			} else {
			
				echo "Error!!!";
			
			}
				return true;
		}
	
	}

 ?>
