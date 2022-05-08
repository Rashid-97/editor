function Component(){
};

// for unsaved data
Component.curr_text = '';
Component.last_text = '';
Component.unsaved = false;
Component.unsaved_tab = {};
Component.qanun_id = null;
Component.TA;
Component.ctrlPressed = false;
Component.picked_comps = {'vlta' : [],'vl' : []};

Component.remove_picked_comps = function(comp){
	if (Component.picked_comps['vlta'].length == Component.picked_comps['vl'].length) {
		if (comp == 'undefined' || comp == null) { // if comp not choosed then will work first FOR loop
			for (var i = 0; i < Component.picked_comps['vlta'].length; i++) {
				// remove color
				Component.picked_comps['vlta'][i].querySelector('.mainHLTA').classList.remove('fullrow_taked');
				Component.picked_comps['vl'][i].querySelector('.fullrow').classList.remove('fullrow_taked');
			}
			Component.picked_comps['vlta'] = [];
			Component.picked_comps['vl'] = [];
		} else { // if choosed comp then will work second FOR loop
			for (var i = 0; i < Component.picked_comps['vlta'].length; i++) {
				if (Component.picked_comps['vlta'][i] == comp.getVLTA() && Component.picked_comps['vl'][i] == comp.getVL()) {
					// remove color
					Component.picked_comps['vlta'][i].querySelector('.mainHLTA').classList.remove('fullrow_taked');
					Component.picked_comps['vl'][i].querySelector('.fullrow').classList.remove('fullrow_taked');
					// the remove from array
					Component.picked_comps['vlta'].splice(i, 1);
					Component.picked_comps['vl'].splice(i, 1);

					break;
				}
			}
		}
	}
}
Component.add_picked_comps = function(comp){
	comp.getVLTA().querySelector('.mainHLTA').className += ' fullrow_taked';
	comp.getVL().querySelector('.fullrow').className += ' fullrow_taked';
	Component.picked_comps['vlta'].push(comp.getVLTA());
	Component.picked_comps['vl'].push(comp.getVL());
}
Component.dragged_element = null;
Component.edit = true;
Component.getById = function(id) {
	switch (id) {
		case '1':
			return 'Preambula';
		case '2':
			return 'Bölmə';
		case '3':
			return 'Fəsil';
		case '4':
			return 'Maddə';
		case '5':
			return 'Bənd_1';
		case '6':
			return 'Bənd_2';
		case '7':
			return 'Bənd_3';
		default:
			// statements_def
			break;
	}
}
Component.qebul_eden_orqan = function(id) {
	switch (id) {
		case '1':
			return 'İlham ƏLİYEV,<br />Azərbaycan Respublikasının Prezidenti';
			break;
		case '2':
			return 'Azərbaycan Respublikası Milli Məclisinin Sədri <br /> O.ƏSƏDOV';
			break;
		default:
			break;
	}
}

Component.getTextByID = function(id) {

	switch (id) {
		case 1:
			return 'Konstitusiya';
		case 2:
			return 'Konstitusiya qanunu';
		case 3:
			return 'Qanun';
		case 4:
			return 'Fərman';
		case 5:
			return 'Sərəncam';
		case 6:
			return 'Qərar';
		case 7:
			return 'Qətnamə';
		case 8:
			return 'Müxtəlif orqanların aktları';
		default:
			return '<span style="color: red;">Seçdiyiniz növ mövcud deyil</span>';
			break;
	}
}

Component.GetNovuByValue = function(val, qeo_id){ // qeo = qebul eden orqan

var arr = {

			'1' : '<span id="1">AZƏRBAYCAN RESPUBLİKASININ KONSTİTUSİYASI</span>',

			'2' : '<span id="2">AZƏRBAYCAN RESPUBLİKASININ KONSTİTUSİYA QANUNU</span>',

			'3' : '<span id="3">AZƏRBAYCAN RESPUBLİKASININ QANUNU</span>',

			'4' : {'1':'<span id="4">AZƏRBAYCAN RESPUBLİKASI PREZİDENTİNİN FƏRMANI</span>', '2':'<span id="5">AZƏRBAYCAN RESPUBLİKASI MİLLİ MƏCLİSİ SƏDRİNİN FƏRMANI</span>'},

			'5' : {'1':'<span id="6">AZƏRBAYCAN RESPUBLİKASI PREZİDENTİNİN SƏRƏNCAMI</span>', '2':'<span id="7">AZƏRBAYCAN RESPUBLİKASI MİLLİ MƏCLİSİ SƏDRİNİN SƏRƏNCAMI</span>'},

			'6' : {'1':'<span id="8">AZƏRBAYCAN RESPUBLİKASI PREZİDENTİNİN QƏRARI</span>', '2':'<span id="9">AZƏRBAYCAN RESPUBLİKASI MİLLİ MƏCLİSİNİN QƏRARI</span>'},

			'7' : '<span id="10">QƏTNAMƏ</span>',

			'8' : '<span id="11">MÜXTƏLİF ORQANLARIN AKTLARI</span>',

		};

		if (typeof arr[val] == 'object' && arr[val].hasOwnProperty(qeo_id) && qeo_id != 'undefined') {
			return arr[val][qeo_id];
		} 
		else if (typeof arr[val] != 'object') {
			return arr[val];
		} else {
			return '<span style="color:red">Qəbul edən orqanı seçin</span>';
		}
}