<?php 

	namespace app\models;
	use app\core\Model;
	
	class User extends Model{

		public function CheckUserData ($username, $password) {

			$params = array('username' => $username);
			$result = $this->db->query('SELECT * FROM [dbo].[user] WHERE username=:username', $params);
			if ($result != false) {
				while ($user = $result->fetch()) {
					$password_hash = $user['password'];
					if (password_verify($password, $password_hash)) {
						return $user['id'];
					}
				}
				return false;
			}
			return false;
		}

		public function auth ($userId, $username) {
			// id-ni sessiyaya yaziriq
			$_SESSION['admin'] = $userId;
			$_SESSION['username'] = $username;
		}

		public function CheckLogged () {
			// eger istifadecinin id-si sessiyada movcuddursa id-si qaytarilsin
			if (isset($_SESSION['user_id'])) {
				return $_SESSION['user_id'];
			}

			header ("Location: ".INDEX_URL."1");
		}

		public function getUserById ($id) {

			$params = ['id' => $id];
			$result = $this->db->query('SELECT username FROM [dbo].[user] WHERE id=:id', $params);
			if ($result) {
				return $result->fetch()['username'];
			}
			return false;
		}

		public function ChangePasswd($new_password, $userId) {

			$hashed_passwd = password_hash($new_password, PASSWORD_DEFAULT);

			$params = array('new_password' => $hashed_passwd, 'id' => $userId);
			$result = $this->db->query('UPDATE [dbo].[user] SET password=:new_password WHERE id=:id', $params);

			return $result;
		}
	}