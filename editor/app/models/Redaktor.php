<?php 

	namespace app\models;
	use app\core\Model;

	class Redaktor extends Model {

		public function getQanunList() {

			$result = $this->db->query("SELECT q_nov.name, q.id, q.adi 
				FROM [dbo].[qanun_novleri] q_nov
				LEFT JOIN [dbo].[qanun] q ON q.nov_id=q_nov.id");

			if ($result != false) {
				while ($row = $result->fetch()) {
					if ($row['id'] != null) {
						$arr[$row['name']] [] = array('id' => $row['id'], 'adi' => $row['adi']);
					} else {
						$arr[$row['name']] = [];
					}
				}
				return $arr;
			} else {
				return false;
			}

		}
		
		public function getQanunData() {

			$result = $this->db->query("SELECT q.id, q.adi, q.json_data, a4.id a4_id, a4.name AS a4_name, q_nov.id AS nov_id, q_nov.link_name FROM [dbo].[qanun] q
									LEFT JOIN [dbo].[qanun_novleri] q_nov ON q.nov_id=q_nov.id
									LEFT JOIN [dbo].[a4_nov] a4 ON q.a4_nov=a4.id
									WHERE q.in_tab IS NOT NULL ORDER BY q.in_tab");
			
			if ($result != false) {

				while ($row = $result->fetch()) {

					$arr['id'] = $row['id'];
					$arr['adi'] = $row['adi'];
					$arr['nov_id'] = $row['nov_id'];
					$arr['xml_data'] = json_decode($row['json_data']);
					$arr['a4_nov'] = "<span id='".$row['a4_id']."'>".$row['a4_name']."</span>";
					$qanunlar_list [] = $arr;

				}
				return json_encode($qanunlar_list);
			
			} else {
					return false;
				}

		}
		public function getDataByID ($id) {
			
			$params = array('id' => $id);
			$result = $this->db->query("SELECT q.id, q.adi, q.json_data, q_nov.id nov_id, a4.id a4_id, a4.name a4_name FROM [dbo].[qanun] q
				LEFT JOIN [dbo].[qanun_novleri] q_nov ON q_nov.id=q.nov_id
				LEFT JOIN [dbo].[a4_nov] a4 ON q.a4_nov=a4.id WHERE q.id=:id"
																, $params);

			if ($result != false) {
				$row = $result->fetch();
				// while ($row = $result->fetch()) {
					$arr['id'] = $row['id'];
					$arr['adi'] = $row['adi'];
					$arr['nov_id'] = $row['nov_id'];
					$arr['xml_data'] = json_decode($row['json_data']);
					$arr['a4_nov'] = "<span id='".$row['a4_id']."'>".$row['a4_name']."</span>";
				// }
				return json_encode($arr);

			} else {
				return false;
			}

		}
		public function AddTab($id, $index) {

			$params = array('index' => $index, 'id' => $id);
			$result = $this->db->query('UPDATE [dbo].[qanun] SET in_tab=:index WHERE id=:id', $params);

			return $result;
		}

		// private function getXmlData($xml) {

		// 	$xml_data = simplexml_load_string($xml) or die("Cant read xml data");
		// 	$properties = $xml_data->property;

		// 	foreach ($properties as $key) {
				
		// 		$sub_data['own_value'] = (string) $key['own_value'];
		// 		$sub_data['own_id'] = (string) $key['own_id'];
		// 		$sub_data['parent_value'] = (string) $key['parent_value'];
		// 		$sub_data['parent_id'] = (string) $key['parent_id'];

		// 		for ($i = 1; $i < 5; $i++) {
		// 			if (isset ($key['index_'.$i]) ) {
		// 				$sub_data['index_'.$i] = (string) $key['index_'.$i];
		// 			}
		// 		}
		// 		$sub_data['text'] = htmlspecialchars_decode((string) $key);
				
		// 		$xmlArray[] = $sub_data;
			
		// 	}
		// 		$struktur['components'] = $xmlArray;
		// 		$struktur['seher_tarix_nomre'] = htmlspecialchars_decode((string) $xml_data->seher_tarix_nomre);
		// 		$struktur['qebul_eden_orqan'] = htmlspecialchars_decode((string) $xml_data->qebul_eden_orqan);

		// 		return json_encode($struktur);
		// }

		// private function saveXMLData ($xmlData) {
			
		// 	$data = json_decode($xmlData);
		// 	if (is_array($data[0]) || is_object($data[0])) {

		// 		$data_xml = new DOMDocument();
		// 		$properties = $data_xml->createElement('properties');
		// 		foreach ($data[0] as $key => $value) {
		// 			$nodes = $data_xml->createElement('property');
		// 			$nodes->setAttribute('own_value', $value->{'own_value'});
		// 			$nodes->setAttribute('own_id', $value->{'own_id'});
		// 			$nodes->setAttribute('parent_value', $value->{'parent_value'});
		// 			$nodes->setAttribute('parent_id', $value->{'parent_id'});

		// 			for ($i = 1; $i < 5; $i++) {
		// 				if (isset($value->{'index_'.$i})) {
		// 					$nodes->setAttribute('index_'.$i, $value->{'index_'.$i});
		// 				}
		// 			}
		// 			$nodes->nodeValue = htmlspecialchars($value->{'text'});
		// 			$properties->appendChild($nodes);
		// 		}
		// 		$seher_tarix_nomre = $data_xml->createElement('seher_tarix_nomre');
		// 		$qebul_eden_orqan = $data_xml->createElement('qebul_eden_orqan');
		// 		$seher_tarix_nomre->nodeValue = htmlspecialchars($data[1]);
		// 		$qebul_eden_orqan->nodeValue = htmlspecialchars($data[2]);


		// 		$properties->appendChild($seher_tarix_nomre);
		// 		$properties->appendChild($qebul_eden_orqan);

		// 		$data_xml->appendChild($properties);
		// 		return $data_xml->saveXML();
		// 	}
		// }

		public function saveJSONData ($jsonDataArr) {

			foreach ($jsonDataArr as $key ) {
				$name = strip_tags($key['qanun_adi']);
				$json_data = $key['xmlData'];
				$id = $key['qanun_id'];
				$nov_id = $key['nov_id'];
				$a4_nov = $key['a4_nov'];

				$sql_arr[] = "UPDATE [dbo].[qanun] SET adi=N?, json_data=N?, nov_id=?, a4_nov=? WHERE id=?";
				$sql_arr_params[] = array($name, $json_data, $nov_id, $a4_nov, $id);
			}
				return $result = $this->db->query_with_transaction($sql_arr, $sql_arr_params);
		}
		public function saveNewJSONData($newDataArr) {

			$adi = strip_tags($newDataArr['adi']);
			$adi = preg_replace('/[^A-Za-z0-9\-]/', '', $adi);

			$nov_id = $newDataArr['nov_id'];
			$json_data = $newDataArr['xmlData'];
			$a4_nov = $newDataArr['a4_nov'];
			$in_tab = $newDataArr['in_tab'];

			$params = array(
				'adi' => $adi,
				'nov_id' => $nov_id,
				'json_data' => $json_data,
				'a4_nov' => $a4_nov,
				'in_tab' => $in_tab,
			);
			$result = $this->db->query('INSERT INTO [dbo].[qanun] (adi, nov_id, json_data, a4_nov, in_tab) VALUES (:adi, :nov_id, :json_data, :a4_nov, :in_tab)', $params);
			
			if ($result) {
				return $this->getDataByID($this->db->lastInsertId());
			}
			return false;
		}

		// public function AddNewQanun ($newDataArr) {

		// 		$adi = strip_tags($newDataArr['adi']);
		// 		$adi = preg_replace('/[^A-Za-z0-9\-]/', '', $adi);

		// 		$nov_id = $newDataArr['nov_id'];
		// 		$xml = self::saveXMLData($newDataArr['xmlData']);
		// 		$a4_nov = $newDataArr['a4_nov'];

		// 		$db = Db::getConnection();

		// 		$sql = 'INSERT INTO [dbo].[qanunlar] (adi, nov_id, xml_data, a4_nov) VALUES (:adi, :nov_id, :xml_data, :a4_nov)';
		// 		$result = $db->prepare($sql);
		// 		$result->bindParam(':adi', $adi, PDO::PARAM_STR);
		// 		$result->bindParam(':nov_id', $nov_id, PDO::PARAM_INT);
		// 		$result->bindParam(':xml_data', $xml);
		// 		$result->bindParam(':a4_nov', $a4_nov, PDO::PARAM_INT);

		// 		if ($result->execute()) {
		// 			return self::getDataByID($db->lastInsertId());
		// 		}
		// 		return false;
		// }

		public function DeleteQanun($id) {
			
			$params = array('id' => $id);

			$result = $this->db->query('DELETE FROM [dbo].[qanun] WHERE id=:id', $params);
			return $result;

		}

		public function Qanun_exist ($id) {
			
			$params = array('id' => $id);

			$result = $this->db->query('SELECT * FROM [dbo].[qanun] WHERE id=:id', $params);
			return $result;

		}

		// private function saveShablonXML ($data) {
		// 	$data = json_decode($data);
		// 	if(is_array($data) || is_object($data)){

		// 		$data_xml = new DOMDocument();
		// 		$properties = $data_xml->createElement('properties');
		// 		foreach ($data as $key => $value) {
		// 			$nodes = $data_xml->createElement('property');
		// 			$nodes->setAttribute('own_value', $value->{'own_value'});
		// 			$nodes->setAttribute('own_id', $value->{'own_id'});
		// 			$nodes->setAttribute('parent_value', $value->{'parent_value'});
		// 			$nodes->setAttribute('parent_id', $value->{'parent_id'});

		// 			for ( $i = 1; $i < 5; $i ++) {
		// 				if (isset($value->{'index_'.$i})) {
		// 					$nodes->setAttribute('index_'.$i, $value->{'index_'.$i});
		// 				}
		// 			}
		// 			$properties->appendChild($nodes);
		// 		}

		// 		$data_xml->appendChild($properties);
		// 		return $data_xml->saveXML();
		// 	}
		// }

		public function getShablons() {

			// $db = Db::getConnection();
			// $sql = 'SELECT * FROM [dbo].[shablonlar]';
			// $result = $db->prepare($sql);

			// if ($result->execute()) {
			// 	while ($row = $result->fetch()) {
			// 		$arr['id'] = $row['id'];
			// 		$arr['shablon_name'] = $row['shablon_name'];
			// 		$arr['shablon_xml'] = $row['shablon_xml'];

			// 		$shablonArr[] = $arr;
			// 	}
			// 	return json_encode($shablonArr);
			// }
		}

		public function NewShablon ($shablon_name, $shablon_data) {

			// $shablon_xml = self::saveShablonXML($shablon_data);

			// $db = Db::getConnection();
			// $sql = 'INSERT INTO [dbo].[shablonlar] (shablon_name, shablon_xml) VALUES (:shablon_name, :shablon_xml)';
			// $result = $db->prepare($sql);
			// $result->bindParam(':shablon_name', $shablon_name, PDO::PARAM_STR);
			// $result->bindParam(':shablon_xml', $shablon_xml);

			// return $result->execute();
		}
	}

 ?>