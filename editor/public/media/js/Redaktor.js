$(document).ready(function(){
	document.body.click();
	// splitter.js
	setTimeout(function(){
		$('.centerSide').split({
	       orientation: 'vertical',
	       position: '17%',
	       limit: 0,
   		});
	},50);
	// end of splitter method
	
	$(".user_profile").click(function(){
		$(".user_menu").toggle(200);
	});
	// user modal events start
	$(".change_passwd").click(function(){
		$("#myModal").css('display','block');
		document.onkeydown = function(e) {
			if (e.keyCode == 27) {
				$("#myModal").css('display', 'none');
				document.onkeydown = null;
			}
		}
		$(".curr_password").focus();
	});
	$(".modal").keypress(function(e){ // if enter clicked
		var key = e.which;
		 if(key == 13)  // the enter key code
		  {
		    $('.tesdiq').click();
		    return true;  
		  }
	});
	$(".close_modal").on('click',function(){
		$(this).parents('.modal').css('display', 'none');
	});
	$(".tesdiq").click(function(){
		var curr_password = $(".curr_password").val();
		var new_password = $(".new_password").val();

		$.ajax({

			url: '/index.php?5',
			type: 'POST',
			data: {curr_password: curr_password, new_password: new_password},
			success: function(resp){
				console.log(resp)
				resp = JSON.parse(resp);
				alert(resp['msg']);
				if (resp['success']) {
					$(".curr_password").val('');
					$(".new_password").val('');
					$(".modal").css('display', 'none');
				}
			}

		});

	});
	$(".cixis, a.home_img").click(function(){
		if (Component.unsaved) {
			var save = confirm('Dəyişilən məlumatlar saxlanılsın?');
    		if (save) {
    			$('#YaddaSaxla').click();
    		}
		}
	});
	// user modal events end

	/*Scroll to top when arrow up clicked BEGIN*/
	$('.right').scroll(function() {
	    var height = $(this).scrollTop();
	    if (height > 10) {
	        $('#back2Top').fadeIn();
	    } else {
	        $('#back2Top').fadeOut();
	    }
	});
    $("#back2Top").click(function(event) {
        $(".right").animate({ scrollTop: 0 }, "slow");
    });
 	/*Scroll to top when arrow up clicked END*/

 	$(".minimized_left_panel").click(function(){

 		if ($(".left").is(":visible")) {
 			$(".left").hide();
 			$(".right").css('width', '100%');
 			$(this).prop('title', 'Sol paneli aç');
 			$('.minimized_left_panel').css('transform', 'rotateY(0deg)');
 		} else {
 			$(".left").show();
 			$(".left").css('width', '20%');
 			$(".right").css('width', '80%');
 			$(this).prop('title', 'Sol paneli bağla');
 			$('.minimized_left_panel').css('transform', 'rotateY(180deg)');
 		}
 	});


	// menubar start
	var items = ['Preambula', 'Bölmə', 'Fəsil', 'Maddə', 'Bənd'];
	for(var i = 0; i < items.length; i++) {
		var items_div = document.createElement('div');
		items_div.className = 'items_div';
		items_div.id = i + 1;
		
		items_div.setAttribute('draggable', 'true');
		items_div.ondragstart = function(e) { e.dataTransfer.setData("Text", e.target.id); };
		
		items_div.innerText = items[i];
		$(".menubar_content").append(items_div);
	}

	$(".openMenuBtn").click(function(){
		$(".menubar_content").toggle(300);
	});
	//  menubar end
	$(".edit_on").attr('title', 'redaktə rejimi');
	$(".edit").click(function(){
		$(this).toggleClass("edit_on edit_off");
		if ($(".edit").attr('class').split(' ')[1] == 'edit_off') {
			Component.edit = false;
		} else {
			Component.edit = true;
		}
	});

	$(".export2word").click(function(){
		Export2Doc('div_of_comps', $("#div_of_comps").children().find('.TA').eq(0).text());
	});
   	// if page reloads
	$(document.body).on("keydown", this, function (event) {
	    if (event.keyCode == 116 /*if f5 clicked*/) {
	    	if (Component.unsaved) {
	    			qanun_save_id = null;
	    		var save = confirm('Bütün dəyişilən məlumatlar saxlanılsın?');
	    		if (save) {
	    			$('#YaddaSaxla').click();   // check if back button clicked and element added!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    			// return true;
	    		}
	    	}
	    }
	});

	// shablon data start
	$("#ShablonBtn").click(function(){
		var shablon_name = prompt('Şablonun adı:', '');
		if (shablon_name != null) {
			if (shablon_name.trim() != '') {
				var shablon = JSON.stringify(shablon_data($("#div_of_comps").find('.VLTA')));
				$.ajax({
					url: '/index.php?saveAsShablon',
					type: 'POST',
					data: {shablon_data: shablon, shablon_name: shablon_name},
					success: function(resp){
						alert(resp);
						shablon_data = [];
					},
				});
			} else {
				alert('Şablonun adı qeyd olunmalıdır!');
			}
		}
	});
	// hamisini saxla start
	$("#SaveAll").click(function(){
		qanun_save_id = null;
		$('#YaddaSaxla').click();
	});
	$(".delete_file").click(function(){
		var save = confirm('Dokument silinəcəkdir.');
		if (save) {
			$.ajax({
				url: '/index.php?deleteQanun',
				type: 'POST',
				data: {id: Component.qanun_id},
				success: function(resp){
					delete Component.unsaved_tab[Component.qanun_id];
					delete tab_list_qanun[Component.qanun_id];
					$(".tabs_content #"+Component.qanun_id).remove();
					if ($(".tabs_content").children().length != 0) {
						$(".tabs_content").children().children().first().click();
					} else {
						$(".novu").html('');
					}
					alert(resp);
				},
				error: function(resp){
					// console.log(resp);
				}
			});
		}
	});
	// hamisini saxla end
	// shablon data end
	$('#YaddaSaxla').click(function() {
		if (Component.unsaved) { // eger melumatlarda deyisiklik varsa
			xmlDataArr = [];
			if (qanun_save_id != null) {
				combineA4Data(qanun_save_id);
			} else {
				for (var key in tab_list_qanun) {
					if (Component.unsaved_tab[key]) {
						combineA4Data(key);
					}
				}
					qanun_save_id = Component.qanun_id; // aciq olan dokumentin id-si
			}
			// check if data_arr is empty
			var loader = document.createElement('div');
			loader.className = 'loader';
			$.ajax({
				url: '/index.php?save',
				type: 'POST',
				data: {xmlData: xmlDataArr},
				beforeSend: function() {
					$("body").append(loader);
				},
				success: function(resp){
					alert(resp);
					loader.parentNode.removeChild(loader);
					Component.unsaved = false;
					for (var i = 0; i < xmlDataArr.length; i++) {
						$(".tabs_content #" + xmlDataArr[i]['qanun_id']).text(xmlDataArr[i]['qanun_adi']);
					}
				},
				error: function(){
					alert("Bağlantı kəsildi!");
				}
			});
		}
	});
	var select_nov_value;
	var select_orqan_id;
	$("#select_nov").change(function(){
		select_nov_value = $("#select_nov option:selected").val();

		tab_list_qanun[Component.qanun_id]['nov_id'] = parseInt($("#select_nov option:selected").val());
		
		$(".a4_nov").html(Component.GetNovuByValue(select_nov_value, select_orqan_id));
		$(".novu").html($("#select_nov option:selected").text());

		Component.unsaved = true;
		Component.unsaved_tab[Component.qanun_id] = true;
	});
	$("#select_orqan").change(function(){
		select_orqan_id = $("#select_orqan option:selected").attr('id');

		$("#div_of_comps").find('#qebul_eden_orqan').html(Component.qebul_eden_orqan(select_orqan_id));
		$(".a4_nov").html(Component.GetNovuByValue(select_nov_value, select_orqan_id));

		Component.unsaved = true;
		Component.unsaved_tab[Component.qanun_id] = true;
	});
	$("#select_seher").change(function(){
		$("#seher_tarix_nomre").text($("#select_seher option:selected").text() + ' şəhəri ' + $("#seher_tarix_nomre").text());
		Component.unsaved = true;
		Component.unsaved_tab[Component.qanun_id] = true;
	});
	var shablons_opened = false;
	$("#select-shablon").click(function(){
		if (!shablons_opened) {
			$.ajax({
				url: '/index.php?getShablon',
				type: 'POST',
				dataType: 'json',
				success: function(shablonlar){
					
					shablons_opened = true;
				},
				error: function(error){
					console.log(error);
				}
			});
		}
	});

	$(".yeni_qanun").click(function(){
		var arr = {};
		arr['own_value'] = "";
		arr['own_id'] = "0";
		arr['parent_value'] = "NULL";
		arr['parent_id'] = "NULL";
		arr['text'] = "Untitled";

		var newDataArr = {};
		newDataArr['adi'] = 'Untitled';
		newDataArr['nov_id'] = 1;
		newDataArr['xmlData'] = JSON.stringify({comps:[arr], seher_tarix_nomre:"", qebul_eden_orqan:""});
		newDataArr['a4_nov'] = '1';
		newDataArr['in_tab'] = Object.keys(tab_list_qanun).length + 1;
		$.ajax({
			url: '/index.php?newQanun',
			type: 'POST',
			data: {newDataArr : newDataArr},
			success: function(resp) {
				createTab(JSON.parse(resp));
				// tab is opened
				set_tab(resp['id'], $(".tabs_content").children().length + 1);
			},
			error: function() {
				console.log('Errororor')
			}
		});
	});
	var fired_ctrl = false;
	// document.addEventListener('keydown', function (e) {
	// 	if (!fired_ctrl) {
	// 		fired_ctrl = true;
	// 		if (e.shiftKey && e.keyCode == 79) {
	// 			$(".open_qanun").click();
	// 		} else if(e.ctrlKey) {
	// 			Component.ctrlPressed = true;
	// 		}
	// 			e.preventDefault();
	// 	}
	// },false);
	// document.addEventListener('keyup', function () {
	// 	Component.ctrlPressed = false;
	// 	fired_ctrl = false;
	// },false);

	$(".open_qanun").click(function(){
		$('.qanunlar').html('');
		$("#document_window").css('display', 'block');
		document.onkeydown = function(e) {
			if (e.keyCode == 27) {
				$("#document_window").css('display', 'none');
				document.onkeydown = null;
			}
		}
			$.ajax({
				url: '/index.php?getQanun',
				type: 'POST',
				success: function(qanun_list) {
					if (qanun_list != null) {
						$(".qanunlar").html(qanun_list);
						// for (var name in qanun_list) {
						// 	$qanun_nov_ol = $('<ol><i></i>'+name+'</ol>');
						// 	$(".qanunlar").append($qanun_nov_ol);

						// 	for (var prop in qanun_list[name]) {
						// 		var properties = qanun_list[name][prop];
						// 		$qanun_nov_ol.append('<li id="'+properties['id']+'" style="display:none;">'+properties['adi']+'</li>');
						// 	}
						// }

						$(".qanunlar").children().on('click',function(){
							$(this).children().toggle(300);
						});

						$('.qanunlar').children().children().on('click',function(){
							qanun_id = $(this).attr('id');

							$("#document_window").css('display', 'none');
							$('.qanunlar').html('');

							if (qanun_id != null) {
							 // get data
								$.ajax({
									url: '/index.php?get/' + qanun_id,
									type: 'POST',
									dataType: 'json',
									success: function(resp) {
										if (resp != null) {
											createTab(resp);
										}
									},
									error: function(error){
										console.log(error);
									}
								});
							}
							// tab is opened
							set_tab(qanun_id, $(".tabs_content").children().length + 1);
						});
					}
				},
				error: function(err){
					console.log(err)
				}
			});

	});

	$(".A4").on('click', 'a', function(event){

		$.ajax({
			url: $(this).attr('href'),
			type: 'POST',
			dataType: 'json',
			success: function(resp) {
				if (resp != null) {
					createTab(resp);
				}
			},
			error: function(error){
				console.log(error);
			}
		});
		return false;
	})
		// get data from json
		var qanun_id;
		$.ajax({
			url: '/index.php?getData',
			dataType: 'json',
			success: function(data){

				if (data != null) {
					data.forEach(function(el){
						createTab(el);
					});
					// $(".tabs_content .tab_div").find("#"+Object.keys(tab_list_qanun).pop()).click();
				} else {

				}
			}, 
			// end of success function
			error: function(xhr, status, err){
				console.log("Error: "+err);
			}
		}); // end of ajax method

});

var tab_list_qanun = {};
var qanun_save_id = null;
function createTab(response_arr) {
	var id = response_arr['id'];
	var nov_id = response_arr['nov_id'];
	var adi = response_arr['adi'];
	var a4_nov = response_arr['a4_nov'];
	var comp = getData(response_arr['xml_data'], a4_nov);

	if (!$(".tabs_content .tab_div #"+id).length) { // if tab is not exist

		var tab_div = document.createElement('div');
		var new_tab = document.createElement('button'); // tab button
		var close_tab = document.createElement('span'); // tab close button
		var div_of_comps = document.createElement('div');

		tab_div.className = 'tab_div';

		new_tab.className = 'tab';
		new_tab.innerText = adi;
		new_tab.id = id;

		close_tab.className = 'close_tab';
		close_tab.innerText = 'X';

		div_of_comps.className = 'div_of_comps';
		div_of_comps.id = 'div_of_comps';

		tab_div.appendChild(new_tab)
		tab_div.appendChild(close_tab);
		$(".tabs_content").append(tab_div);
		div_of_comps.appendChild(comp.getVLTA());
		tab_list_qanun[id] = {a4:div_of_comps, tree:comp.getVL(), nov_id: nov_id};
		new_tab.onclick = function() {
			$(".tabs_content").children().removeClass('tab-selected');
			tab_div.className += ' tab-selected';

			$(".A4").attr('id', this.id);
			Component.qanun_id = this.id;
			qanun_save_id = this.id;

			$(".A4").find('#div_of_comps').remove();
			$("#leftUL").html('');
			$(".A4").append(tab_list_qanun[this.id]['a4']);
			$("#leftUL").append(tab_list_qanun[this.id]['tree']);
			$(".novu").html(Component.getTextByID(tab_list_qanun[this.id]['nov_id']));
			// $(".a4_nov").html(a4_nov);
		}
		close_tab.onclick = function() {
			if (Component.unsaved_tab[this.parentNode.children[0].id]) {
				qanun_save_id = this.parentNode.children[0].id;
				var save = confirm('Dəyişilən məlumatlar saxlanılsın?');
	    		if (save) {
	    			$('#YaddaSaxla').click();
	    		}
	    		delete Component.unsaved_tab[$(".A4").attr('id')];
			}
			$(".A4").attr('id', '');
			$(".A4").find('#div_of_comps').remove();
			$("#leftUL").html('');

			delete tab_list_qanun[id];

			tab_div.parentNode.removeChild(tab_div);
			if ($(".tabs_content").children().length != 0) {
				$(".tabs_content").children().children().first().click();
			} else {
				$(".novu").html('');
			}
				set_tab(id, 'null');
		}
		new_tab.click();
	} else {
		$(".tabs_content .tab_div").find("#"+id).click();
	}
	
}



function set_tab(id, value) {
	$.ajax({
		url: '/index.php?new-tab',
		type: 'POST',
		data: {id: id, index: value},
		success: function(resp) {
			// console.log(resp)
		},
		error: function(err) {
			console.log(err);
		}
	});
}
var compsArr = [];
function getData (data, a4_nov) {
		for (var key in data['comps']) {
			var comp = new Components(data['comps'][key]['own_id']);
			var arr = {};
			arr['component'] = comp;
			arr['property'] = data['comps'][key];
			compsArr.push(arr);
		}

		for (var i = 0; i < compsArr.length; i++) {
			if (compsArr[i]['component'].getId() == '0') {
				var ad = compsArr[i]['component'];
				if (data['seher_tarix_nomre'] != 'undefined' && data['seher_tarix_nomre'] != null) {
					ad.getVLTA().querySelector('#seher_tarix_nomre').innerHTML = data['seher_tarix_nomre'];
				}
				if (data['qebul_eden_orqan'] != 'undefined' && data['qebul_eden_orqan'] != null) {
					ad.getVLTA().querySelector('#qebul_eden_orqan').innerHTML = data['qebul_eden_orqan'];
				}
				ad.getVLTA().querySelector('.a4_nov').innerHTML = a4_nov;
				break;
			}
		}
		// make hierarchy
		for (var i = 0; i < compsArr.length; i++) {
			
			var VLTA = compsArr[i]['component'].getVLTA();
			var VL = compsArr[i]['component'].getVL();

			for (var k = 1; k < 5; k++) {
				if (typeof(compsArr[i]['component'].getMainHLTA().querySelector('#index_'+k)!='undefined') && compsArr[i]['component'].getMainHLTA().querySelector('#index_'+k) != null) {
					compsArr[i]['component'].getMainHLTA().querySelector('#index_'+k).innerText = compsArr[i]['property']['index_'+k];
					compsArr[i]['component'].getMainHL().querySelector('#index_'+k).innerText = compsArr[i]['property']['index_'+k];
				}
			}
			VLTA.querySelector('.TA').innerHTML = compsArr[i]['property']['text'];
			for (var j = 0; j != i, j < compsArr.length; j++) {
				if (compsArr[i]['property']['own_id'] == compsArr[j]['property']['parent_id']) {
					if (compsArr[i]['property']['own_value'] == compsArr[j]['property']['parent_value']) {
						
						VLTA.querySelector('.mainVLTA').appendChild(compsArr[j]['component'].getVLTA());
						VL.querySelector('.mainVL').appendChild(compsArr[j]['component'].getVL());
						
					}
				} 
			}
		}

	 	compsArr = [];
	 	return ad;
}

// executeCommand function
function executeCommand(comm) {
	document.execCommand(comm);
	Component.unsaved = true;
	Component.unsaved_tab[Component.qanun_id] = true;
}
function createLink() {
	var url = prompt("URL qeyd edin:", "/index.php?get/");
	if ((url != null) && (url != "")) {
		document.execCommand("CreateLink",false,url);
		Component.unsaved = true;
		Component.unsaved_tab[Component.qanun_id] = true;
	}
}
// send data functions
var data_arr = {comps:[], seher_tarix_nomre: '', qebul_eden_orqan:''};
var shablon_arr = [];
var xmlDataArr =[];
function combineA4Data(key) {
	var arr = {};
	arr['xmlData'] = JSON.stringify(A4_Data(tab_list_qanun[key]['a4']));
	arr['qanun_adi'] = tab_list_qanun[key]['a4'].querySelector('.VLTA').querySelector('.TA').innerText;
	arr['qanun_id'] = key;
	arr['nov_id'] = tab_list_qanun[key]['nov_id'];
	arr['a4_nov'] = tab_list_qanun[key]['a4'].querySelector('.VLTA').querySelector('.a4_nov').querySelector('span').id;

	xmlDataArr.push(arr);
	data_arr = {comps:[], seher_tarix_nomre: '', qebul_eden_orqan:''};
}
function A4_Data(data) {
	data = data.querySelectorAll('.VLTA');
	for (var i = 0; i < data.length; i++) {
		var arr = {};
		arr['own_value'] = data[i].querySelector('.mainHLTA').querySelector('.index').innerText;
		arr['own_id'] = data[i].id;

		if (data[i].id != '0') {
			arr['parent_value'] = data[i].parentNode.parentNode.querySelector('.mainHLTA').querySelector('.index').innerText;
			arr['parent_id'] = data[i].parentNode.parentNode.id;
		} else {
			arr['parent_value'] = 'NULL';
			arr['parent_id'] = 'NULL';
		}

		for (var j = 1; j < 5; j++) {
			if (typeof (data[i].querySelector('.mainHLTA').querySelector('#index_' + j)) != 'undefined' && data[i].querySelector('.mainHLTA').querySelector('#index_' + j) != null) {
				var index_ = data[i].querySelector('.mainHLTA').querySelector('#index_' + j);
				arr['index_'+j] = index_.innerText;
			} else {
				break;
			}
		}
		arr['text'] = data[i].querySelector('.TA').innerHTML.replace(/&nbsp;/g, '');
		data_arr['comps'].push(arr);
	}
		data_arr['seher_tarix_nomre'] = document.getElementById('seher_tarix_nomre').innerHTML;
		data_arr['qebul_eden_orqan'] = document.getElementById('qebul_eden_orqan').innerHTML;
		
		return data_arr;
}

function shablon_data(data) {
	for (var i = 0; i < data.length; i++) {
		var arr = {};
		arr['own_value'] = data[i].querySelector('.mainHLTA').querySelector('.index').innerText;
		arr['own_id'] = data[i].id;

		if (data[i].id != '0') {
			arr['parent_value'] = data[i].parentNode.parentNode.querySelector('.mainHLTA').querySelector('.index').innerText;
			arr['parent_id'] = data[i].parentNode.parentNode.id;
		} else {
			arr['parent_value'] = 'NULL';
			arr['parent_id'] = 'NULL';
		}

		for (var j = 1; j < 5; j++) {
			if (typeof (data[i].querySelector('.mainHLTA').querySelector('#index_' + j)) != 'undefined' && data[i].querySelector('.mainHLTA').querySelector('#index_' + j) != null) {
				var index_ = data[i].querySelector('.mainHLTA').querySelector('#index_' + j);
				arr['index_'+j] = index_.innerText;
			} else {
				break;
			}
		}
		shablon_arr.push(arr);
	}
		return shablon_arr;
}

// print page
function printpage(){
	var curr_page = $('body').children();
	var div = document.querySelector('.A4');
	document.body.innerHTML = div.innerHTML;
	window.print();
	document.body.innerHTML = '';
	$('body').append(curr_page);
    return true;
}
// export data to word document
function Export2Doc(element, filename){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' ><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}