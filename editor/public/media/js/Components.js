function Components(id){
	var comp = this;
	// set variables
	var VLTA = document.createElement('div');
	var mainHLTA = document.createElement('div');
	var mainVLTA = document.createElement('div');
	var VL = document.createElement('li');
	var mainHL = document.createElement('div');
	var mainVL = document.createElement('ul');
	var a4_end = document.createElement('div');
	var tree_end = document.createElement('div');

	var minimizedBtn = document.createElement('div');
	var captionDiv = document.createElement('em');
	var fullrow = document.createElement('div');

	// properties
	var _id;
	var _value = null;
	this.getId = function(){
		return _id;
	};
	this.setValue = function(value){
		_value = value;
	};
	this.getValue = function(){
		if(mainHLTA.querySelector('.index') != 'undefined' && mainHLTA.querySelector('.index') != null){
			return mainHLTA.querySelector('.index').innerText;
		} else {
			return _value;
		}
	};
	this.getIndex = function(){
		var parent = VLTA.parentNode;
		var children = parent.children;
		for (var i = 0; i < children.length; i++) {
			if(VLTA == children[i]){
				return i;
			}
		}
	};
	// set ClassName
	VLTA.className = 'VLTA';
	mainHLTA.className = 'mainHLTA';
	mainVLTA.className = 'mainVLTA';
	a4_end.className = 'a4_end';
	a4_end.id = 'a4_end';
	VL.className = 'VL';
	mainHL.className = 'mainHL';
	mainVL.className = 'mainVL';
	tree_end.className = 'tree_end';
	minimizedBtn.className = 'minimizedBtn';
	captionDiv.className = 'captionDiv';
	// set value
	minimizedBtn.innerHTML = '+';
	fullrow.className = 'fullrow';

	// Getters
	this.getVLTA = function(){
		return VLTA;
	};
	this.getVL = function(){
		return VL;
	};
	this.getMainVLTA = function(){
		return mainVLTA;
	};
	this.getMainVL = function(){
		return mainVL;
	};
	this.getMainHLTA = function(){
		return mainHLTA;
	};
	this.getMainHL = function(){
		return mainHL;
	};
	this.getFullRow = function(){
		return fullrow;
	}
	// Specific methods
	var children_arr = [];
	this.AddChild = function(child_comp){
		children_arr.push(child_comp);
		child_comp.setParent(comp);
	};
	this.getChildAtIndex = function(index){
		return children_arr[index];
	};
	this.AddChildBefore = function(new_child, child){
		var index = children_arr.indexOf(child);
		children_arr.splice(index, 0, new_child);
		new_child.setParent(comp);
	};
	this.AddChildAfter = function(new_child, child){
		var index = children_arr.indexOf(child);
		
		if(index == children_arr.length-1){
			children_arr.push(new_child);
		}
		
		else{
			children_arr.splice(index+1, 0, new_child);
		}
			new_child.setParent(comp);
	};
	this.getChildren = function(index){
		if(typeof index == 'undefined'){
			return children_arr;
		}
		
		else{
			return children_arr[index];
		}
	};
	/*......................................................*/
	var allNodes = [];
	function getNodes(component){
		for(var i=0;i<component.getChildren().length;i++){
			allNodes.push(component.getChildren(i));
			
			if(component.getChildren(i).getChildren().length > 0){
				getNodes(component.getChildren(i));
			}
		
		}
			return allNodes;
	};
	// set parent()
	var parent = null;
	this.getParent = function(){
		return parent;
	};
	this.setParent = function(comp_parent){
		parent = comp_parent;
	};
	// remove child
	this.remove = function(child){
		var index = children_arr.indexOf(child);
		children_arr.splice(index, 1);
	};


	switch(id){
		case '0':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA"><span class="index"></span><div class="TA" placeholder="Ad" style="font-weight: bolder; width: 100%;text-align:center;" contentEditable></div><div class="a4_nov" style="text-align:center;user-select:text;"></div></div><div class="buttonsHL"></div>';
			a4_end.innerHTML += '<div id="seher_tarix_nomre" class="a4_end_child" style="width: 30%;float: left;margin-left: 10px;text-align:center;" placeholder="Şəhər/Tarix/Nömrə" contentEditable="true"></div><div id="qebul_eden_orqan" class="a4_end_child" style="width: 30%;float: right;margin-right: 10px;text-align:center;" placeholder="Qəbul edən orqan" contentEditable="true"></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.appendChild(a4_end);
			VLTA.id = id; 
			_id = id;
			_value = 'Ad';
		// Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerText = 'Ad';
			mainHL.appendChild(captionDiv);
			tree_end.innerHTML += '<li class="VL tarix_tree tree_end_child"> Şəhər/Tarix/Nömrə </li><br /><li class="VL qebul_eden_orqan_tree tree_end_child"> Qəbul edən orqan </li>';
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.appendChild(tree_end);
			VL.id = id;
			break;
		case '1':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA"><span class="index"></span><div class="TA" placeholder="Preambula" style="font-weight: 500; width: 100%;font-style: italic;text-align:left" contentEditable></div></div><div class="buttonsHL"><button class="buttons" id="sil" title="Sil"></button></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.id = id;
			_id = id;
			_value = 'Preambula';
		//Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerHTML = 'Preambula';
			mainHL.appendChild(captionDiv);
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.id = id;
			break;
		case '2':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA" style="display: block;text-align:center;"><span class="labelTA" style="font-weight: 700;">Bölmə <span class="index"><span id="index_1"></span></span></span><div class="TA" text-align="center" style="font-weight: 700;" contentEditable></div></div><div class="buttonsHL"><button class="buttons" id="evvel" title="Əvvəl əlavə et"></button><button class="buttons" id="sil" title="Sil"></button><button class="buttons" id="sonra" title="Sonra əlavə et"></button></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.id = id;
			_id = id;
		// Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerHTML = 'Bölmə ';
			captionDiv.innerHTML += '<span id="index_1">1</span>';
			mainHL.appendChild(captionDiv);
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.id = id;
			break;
		case '3':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA" style="display: block;text-align:center;"><span class="labelTA" style="font-weight: 700;">Fəsil <span class="index"><span id="index_1"></span></span></span><div class="TA" text-align="center" style="font-weight: bold;" contentEditable></div></div><div class="buttonsHL"><button class="buttons" id="evvel" title="Əvvəl əlavə et"></button><button class="buttons" id="sil" title="Sil"></button><button class="buttons" id="sonra" title="Sonra əlavə et"></button></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.id = id;
			_id = id;
		// Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerHTML = 'Fəsil ';
			captionDiv.innerHTML += '<span id="index_1"></span>'; 
			mainHL.appendChild(captionDiv);
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.id = id;
			break;
		case '4':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA" style="display: block;"><span class="labelTA" style="font-weight: 700;display:flex;float:left;margin-right:5px;">Maddə <span class="index"><span id="index_1" style="margin-left:5px;"></span></span></span><div class="TA" style="text-align: left;" contentEditable></div></div><div class="buttonsHL"><button class="buttons" id="evvel" title="Əvvəl əlavə et"></button><button class="buttons" id="sil" title="Sil"></button><button class="buttons" id="sonra" title="Sonra əlavə et"></button></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.id = id;
			_id = id;
		// Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerHTML = 'Madde ';
			captionDiv.innerHTML += '<span id="index_1">1</span>'; 
			mainHL.appendChild(captionDiv);
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.id = id;
			break;
		case '5':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA" style="display: block;"><span class="labelTA" style="font-weight: 500;float:left;margin-right:5px;"><span class="index"><span id="index_1"></span><span id="index_2"></span></span></span><div class="TA" style="text-align: left;" contentEditable></div></div><div class="buttonsHL"><button class="buttons" id="evvel" title="Əvvəl əlavə et"></button><button class="buttons" id="sil" title="Sil"></button><button class="buttons" id="sonra" title="Sonra əlavə et"></button></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.id = id;
			_id = id;
		// Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerHTML += 'Bənd <span id="index_1">1.</span><span id="index_2">1</span>'; 
			mainHL.appendChild(captionDiv);
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.id = id;
			break;
		case '6':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA" style="display: block;"><span class="labelTA" style="font-weight: 500;float:left;margin-right:5px;"><span class="index"><span id="index_1"></span><span id="index_2"></span><span id="index_3"></span></span></span><div class="TA" style="text-align: left;" contentEditable></div></div><div class="buttonsHL"><button class="buttons" id="evvel" title="Əvvəl əlavə et"></button><button class="buttons" id="sil" title="Sil"></button><button class="buttons" id="sonra" title="Sonra əlavə et"></button></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.id = id;
			_id = id;
		// Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerHTML += 'Bənd <span id="index_1">1.</span><span id="index_2">1.</span><span id="index_3">1</span>'; 
			mainHL.appendChild(captionDiv);
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.id = id;
			break;
		case '7':
		// A4
			mainHLTA.innerHTML = '<div class="mainDivTA" style="display: block;"><span class="labelTA" style="font-weight: 500;float:left;margin-right:5px;"><span class="index"><span id="index_1"></span><span id="index_2"></span><span id="index_3"></span><span id="index_4"></span></span></span><div class="TA" style="text-align: left;" contentEditable></div></div><div class="buttonsHL"><button class="buttons" id="evvel" title="Əvvəl əlavə et"></button><button class="buttons" id="sil" title="Sil"></button><button class="buttons" id="sonra" title="Sonra əlavə et"></button></div></div>';
			VLTA.appendChild(mainHLTA);
			VLTA.appendChild(mainVLTA);
			VLTA.id = id;
			_id = id;
		// Tree
			mainHL.appendChild(fullrow);
			mainHL.appendChild(minimizedBtn);
			captionDiv.innerHTML += 'Bənd <span id="index_1">1.</span><span id="index_2">1.</span><span id="index_3">1.</span><span id="index_4">1</span>'; 
			mainHL.appendChild(captionDiv);
			VL.appendChild(mainHL);
			VL.appendChild(mainVL);
			VL.id = id;
			break;
		
		default:
			console.log('Element (komponent) tapilmadi');
	}

			mainHLTA.querySelector('.TA').onfocus = function() {
				if (!Component.unsaved) { // eger melumatlarda deyisiklik olarsa
					Component.curr_text = mainHLTA.querySelector('.TA').innerHTML;
					Component.TA = this;
				}
				if ($(VL).parents('.mainVL').eq(0).css('display') == 'none') {
					$(VL).parents('.mainVL').css('display', 'block');
					var min_btns = $(VL).parents('.VL');
					for (var i = 0; i < min_btns.length; i++) {
						min_btns.eq(i).find('.minimizedBtn').eq(0).text('-');
					}
				}
				if (!fullrow.classList.contains('fullrow_clicked')) {
					$(".fullrow").removeClass('fullrow_clicked');
					fullrow.className += ' fullrow_clicked';
					fullrow.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}
			}
			mainHLTA.onclick = function() {
				this.querySelector('.TA').focus();
			}

			mainHLTA.querySelector('.TA').onkeydown = function(e){
				var tas = document.querySelectorAll('.TA');
				var ta = this;
				if (e.ctrlKey && e.altKey && e.shiftKey && e.keyCode == 13) {

				}
				else if (e.ctrlKey && e.shiftKey && e.keyCode == 13) { // if ctrl + alt + ENTER
					for (var index = 0; index < tas.length; index++) {
						if (ta == tas[index]) {
							if (index - 1 < 0) {
								tas[tas.length - 1].focus();
							} else {
								tas[index - 1].focus();
							}
						}
					}
				}
				else if (e.ctrlKey && e.altKey && e.keyCode == 13) {
				}
				else if (e.ctrlKey && e.keyCode == 13) { // if ctrl + ENTER
					for (var index = 0; index < tas.length; index++) {
						if (ta == tas[index]) {
							if (index + 1 == tas.length) {
								tas[0].focus();
							} else {
								tas[index + 1].focus();
							}
						}
					}
				}
				else if (e.keyCode == 13) {
					document.execCommand('insertHTML', false, '<br>'); // prevent create <p> tag in Microsoft Edge
				}
			}
			mainHLTA.querySelector('.TA').onkeyup = function() {
				if (this == Component.TA) {
					Component.last_text = mainHLTA.querySelector('.TA').innerHTML;
					if (Component.curr_text != Component.last_text) {
						Component.unsaved = true;
					} else {
						Component.unsaved = false;
					}
				}
					Component.unsaved_tab[Component.qanun_id] = true;
			}
			mainHLTA.querySelector('.TA').addEventListener('paste', function(){
				var ta = this;
				Component.unsaved = true;
				Component.unsaved_tab[Component.qanun_id] = true;
				setTimeout(function() {
					ta.innerHTML = ta.innerHTML.trim().replace(/(<\/?(?:div|b|u|i|img|h2|strong)[^>]*>)|<[^>]+>/ig, '$1');
				}, 0)
			}, true);
			mainHLTA.querySelector('.TA').onmouseover = function() {
				// var btns = mainHLTA.querySelectorAll('#evvel, #sil, #sonra');
				if (Component.edit) {
					mainHLTA.classList.remove('mainHLTA_edit_on');
					mainHLTA.className += ' mainHLTA_edit_on'
					this.contentEditable = "true";
				} else {
					mainHLTA.classList.remove('mainHLTA_edit_on');
					this.contentEditable = "false";
				}
			}
			
		// scroll into view
			if (_id == 0) {
				var tree_end_child = VL.querySelectorAll('.tree_end_child');
				var a4_end_child = VLTA.querySelectorAll('.a4_end_child');
				for (var i = 0; i < tree_end_child.length; i++) {
					tree_end_child[i].onclick = function() {
						VLTA.querySelector('.a4_end').scrollIntoView({
							behavior: 'smooth',
							block: 'center'
						});
					}

					a4_end_child[i].onmouseover = function() {
						if (Component.edit) {
							this.contentEditable = "true";
						} else {
							this.contentEditable = "false";
						}
					}
					a4_end_child[i].onkeyup = function() {
						Component.unsaved = true;
						Component.unsaved_tab[Component.qanun_id] = true;
					}
				}

			}
		var clicked = false;
		captionDiv.onclick = function(){
			fullrow.click();
		}


		fullrow.onclick = function(){
			if (Component.ctrlPressed) {
				if (_id != 0) {
					if (fullrow.classList.contains('fullrow_taked')) {
						Component.remove_picked_comps(comp);
					} else {
						Component.add_picked_comps(comp);
					}
				}
			}

			else if (!clicked) {

				mainHLTA.querySelector('.TA').focus();
				mainHLTA.querySelector('.TA').innerHTML = mainHLTA.querySelector('.TA').innerHTML;

				mainHLTA.scrollIntoView({
					behavior: 'smooth',
					block: 'center'
				});
				Component.remove_picked_comps();
				mainHLTA.className += ' scrollColor';
				fullrow.className += ' fullrow_clicked';
				clicked = true;
			
			} else {
				
				mainHLTA.classList.remove('scrollColor');
				var class_name = fullrow.className.split(' ')[1];
				fullrow.classList.remove(class_name);
				clicked = false;
			
			}
			$(".fullrow").on('click', function(e){
				if (clicked == true) {
					
					if (e.target != fullrow) {
						mainHLTA.classList.remove('scrollColor');
						fullrow.classList.remove('fullrow_clicked');
						clicked = false;
					}

				}
			});
		}
		fullrow.onmouseover = function() {
			if ($(mainVL).is(':hidden')) {
				if (mainVLTA.children.length > 0) {
					fullrow.setAttribute('title', Component.getById(mainVLTA.children[0].id) + ' sayı: ' + mainVLTA.children.length);
				} else {
					fullrow.setAttribute('title', 'NULL');
				}
			} else {
				fullrow.removeAttribute('title');
			}
		}
		// minimized button
		minimizedBtn.onclick = function(){

			if (mainVL.children.length > 0) {

				if ($(mainVL).is(':hidden')) {
					$(mainVL).show(150);
					this.innerText = '-';
				} else {
					$(mainVL).hide(150);
					this.innerText = '+';
				}

			}
		
		}
		// evvel button
		if (mainHLTA.querySelector('#evvel') != null) {
			mainHLTA.querySelector('#evvel').onclick = function(){
				var newComp = new Components(_id);

				VLTA.parentNode.insertBefore(newComp.getVLTA(), VLTA);
				VL.parentNode.insertBefore(newComp.getVL(), VL);
				
				new_el_style(newComp);

				sort(VLTA.parentNode, VL.parentNode, _id);

				Component.unsaved = true;
				Component.unsaved_tab[Component.qanun_id] = true;

				// scroll and focus on new el
				scrollToNewEl(newComp);
			}
		
		} 
		// sil button
		if (mainHLTA.querySelector('#sil') != null) {
			
			mainHLTA.querySelector('#sil').onclick = function(){
				var sil = confirm('Əminsinizmi? Bütün tərkib hissələri də silinəcəkdir.');
				if (sil) {
					var parent_vlta = VLTA.parentNode;
					var parent_vl = VL.parentNode;

					parent_vlta.removeChild(VLTA);
					parent_vl.removeChild(VL);

					if(_id != 1){
						
						sort(parent_vlta, parent_vl, _id);
					
					}
						Component.unsaved = true;
						Component.unsaved_tab[Component.qanun_id] = true;
				}
			}
		
		}
		// sonra button
		if (mainHLTA.querySelector('#sonra') != null) {
			
			mainHLTA.querySelector('#sonra').onclick = function(){
				
				var newComp = new Components(_id);
				
				VLTA.parentNode.insertAfter(newComp.getVLTA(), VLTA);
				VL.parentNode.insertAfter(newComp.getVL(), VL);

				new_el_style(newComp);

				sort(VLTA.parentNode, VL.parentNode, _id);
			
				Component.unsaved = true;
				Component.unsaved_tab[Component.qanun_id] = true;

				// scroll and focus on new el
				scrollToNewEl(newComp);
			}
		
		}

		// drag and drop menu item 
		mainHLTA.ondrop = function(e){
			e.preventDefault();
			var _let = false;
			var comp_id;
			// if (mainVLTA.children.length == 0) {
				var id = e.dataTransfer.getData("Text");

				if (id == 5) { // if bend1
					
					if (_id != 0 && _id != 1) { // if no Ad and no Preambula
						
						if ( (id == _id) || (id < _id) ) { // if bend == diger bend(e)
							comp_id = parseInt(id) + (parseInt(_id) - parseInt(id)) + 1;
							comp_id = String(comp_id);

							if (comp_id < 8) {
								_let = true;
							}
						} else {
							comp_id = id;
							_let = true;
						}
					}

				}
				else if (parseInt(id) > parseInt(_id) && id < 8) { // id < 8 cunki max 7 element var
					comp_id = id;
					_let = true;
				}
				else {
					// mainHLTA.children[0].children[1].innerText = id;
				}

				if (_let) {

	 					var newComp = new Components(comp_id);
	 					var no_preambula = true;
						if (mainVLTA.hasChildNodes()) {
							no_preambula = mainVLTA.children[0].id=='1'?false:true;
							
							if (comp_id < mainVLTA.children[0].id) {
								var vls = [];
								for (var i = 0; i < mainVLTA.children.length; i++) {
									var arr = {};
									arr['vlta'] = mainVLTA.children[i];
									arr['vl'] = mainVL.children[i];
									vls.push(arr);
								}
								for (var i = 0; i < vls.length; i++) {
									newComp.getMainVLTA().appendChild(vls[i]['vlta']);
									newComp.getMainVL().appendChild(vls[i]['vl']);
								}

							}


						}
						if (no_preambula) {

							mainVLTA.appendChild(newComp.getVLTA());
							mainVL.appendChild(newComp.getVL());

							new_el_style(newComp);

							// sort
							sort(newComp.getVLTA().parentNode, newComp.getVL().parentNode, comp_id);

							Component.unsaved = true;
							Component.unsaved_tab[Component.qanun_id] = true;

							_let = false;

							// scroll and focus on new el
							scrollToNewEl(newComp);

						}

				}

			// }
				mainHLTA.classList.remove('mainHLTAonoverYes');
				fullrow.classList.remove('mainHLTAonoverYes');
				overed = false;
		};
		var overed = false;
		mainHLTA.ondragover = function(e) {
			e.preventDefault();
			if (!overed) {
				// if (e.target.className == 'TA' || e.target.className == 'buttonsHL' || e.target.className == 'mainHLTA' || e.target.className == 'a4_nov' || e.target.className == 'labelTA') {
						mainHLTA.className += ' mainHLTAonoverYes';
						fullrow.className += ' mainHLTAonoverYes';
						overed = true;
				// }
			}

		};
		mainHLTA.ondragenter = function(e) {
			e.preventDefault();
		};
		mainHLTA.ondragleave = function(e) { 
			e.preventDefault();
			mainHLTA.classList.remove('mainHLTAonoverYes');
			fullrow.classList.remove('mainHLTAonoverYes');
			overed = false;
		};
		// end of menu item drag and drop
		
		// drag and drop tree side - start
		if (_id != 0 && _id != 1) {
			mainHL.setAttribute('draggable', 'true');
			mainHL.ondragstart = function(e) {Component.dragged_element = comp; e.dataTransfer.setData("VL", e.target); e.dataTransfer.effectAllowed = 'move';};
			// mainHL.ondragend = function(e) { e.preventDefault(); Component.dragged_element = null;};
			mainHL.ondrop = function(e) {
				e.preventDefault();

				var ff = false;
				if (Component.dragged_element.getId() == '5' || Component.dragged_element.getId() == '6' || Component.dragged_element.getId() == '7') {
					var prev_parent_vlta = Component.dragged_element.getVLTA().parentNode;
					var prev_parent_vl = Component.dragged_element.getVL().parentNode;
					ff = true;
				}
				if (Component.dragged_element.getId() == _id) {
					VL.parentNode.insertAfter(Component.dragged_element.getVL(), VL);
					VLTA.parentNode.insertAfter(Component.dragged_element.getVLTA(), VLTA);
					sort(VLTA.parentNode, VL.parentNode, Component.dragged_element.getId());
				} 
				else {
					mainVL.appendChild(Component.dragged_element.getVL());
					mainVLTA.appendChild(Component.dragged_element.getVLTA());
					sort(mainVLTA, mainVL, Component.dragged_element.getId());
				}
					if (ff) {
						sort(prev_parent_vlta, prev_parent_vl, Component.dragged_element.getId());
					}

					new_el_style(Component.dragged_element);
					Component.dragged_element = null;
					Component.unsaved = true;
					Component.unsaved_tab[Component.qanun_id] = true;

					fullrow.classList.remove('mainHLonoverYes');
					fullrow.classList.remove('onoverYes');
					mainHLTA.classList.remove('mainHLonoverYes');
					mainHLTA.classList.remove('onoverYes');
					overed = false;

			};
			mainHL.ondragover = function(e) {
				e.preventDefault();

				// if (e.dataTransfer.getData("VL") != e.dataTransfer.getData("Text")) {

					if ( ( (Component.dragged_element.getId() == 6 || Component.dragged_element.getId() == 7) &&
							Component.dragged_element.getId() -_id > 1) || // bend2 ve ya bend3-duse ve ozlerinden 2+ pille yuxari parentNode-a kecirilirse

						     Component.dragged_element.getMainHL() == this || // ozuduse
						     Component.dragged_element.getVL().parentNode == mainVL|| // ozunun parentNode-dusa
						     Component.dragged_element.getId() < _id) { // prioritetce boyuk olanlar kicik olanlarin terkibine kecirilirse

						e.dataTransfer.dropEffect = 'none';  // drop etmek olmaz

					} 
					else if (Component.dragged_element.getId() == _id) {
						if (!overed) {
							fullrow.className += ' onoverYes';
							mainHLTA.className += ' onoverYes';
							overed = true;
						}
					}
					else {
						
						if (!overed) {
							fullrow.className += ' mainHLonoverYes';
							mainHLTA.className += ' mainHLonoverYes';
							overed = true;
						}
					
					}
				// }

			};
			mainHL.ondragleave = function(e) {
				e.preventDefault();
				// remove classname
				fullrow.classList.remove('mainHLonoverYes');
				fullrow.classList.remove('onoverYes');
				mainHLTA.classList.remove('mainHLonoverYes');
				mainHLTA.classList.remove('onoverYes');
				overed = false;
			};
			mainHL.ondragenter = function(e) {
				e.preventDefault();
			};
			// drag and drop tree side - end

		} // end if

}
// insert after function
Node.prototype.insertAfter = function(n,r) {
    this.insertBefore(n,r.nextSibling);
};
Element.prototype.documentOffsetTop = function () {
    return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
};

// style for new added element
function new_el_style(newComp){
	newComp.getMainHLTA().className += ' animate';
	newComp.getFullRow().className += ' animate';
	setTimeout(function(){
	
		var className = newComp.getFullRow().className.split(' ')[1];
		newComp.getFullRow().classList.remove(className);
		newComp.getMainHLTA().classList.remove(className);
	
	}, 5000);
}
// scroll to a new element
function scrollToNewEl(newComp){
	newComp.getMainHLTA().querySelector('.TA').focus();
	newComp.getMainHLTA().scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	});
	// newComp.getMainHL().scrollIntoView({
	// 	behavior: 'smooth',
	// 	block: 'center'
	// });
}

// sort function
function sort(mainvlta, mainvl, comp_id){

	if (comp_id == 2 || comp_id == 3 || comp_id == 4) { // if bolme fesil madde
		var a4_el = document.getElementById('div_of_comps').querySelectorAll('[id="' +comp_id+ '"]');
		var tree_el = document.getElementById('leftUL').querySelectorAll('[id="' +comp_id+ '"]');
		
		var dot = '';
		if (comp_id == 4) {
			dot = '.';
		}
		for (var i = 0; i < a4_el.length; i++) {
			a4_el[i].querySelector('#index_1').innerText = (i+1) + dot;
			tree_el[i].querySelector('#index_1').innerText = (i+1) + dot;

			// sort if has children
			if (a4_el[i].querySelector('.mainVLTA').children.length > 0) {
			 	
				var child_id = a4_el[i].querySelector('.mainVLTA').children[0].id;
				
				sort(a4_el[i].querySelector('.mainVLTA'), tree_el[i].querySelector('.mainVL'), child_id);
			
			}
		}
	}

	else if (comp_id == 5) { // if bend_1
		var j = 1;
		if (mainvlta.children.length == 1) {
			j = 0;
		}

		for (var i = 0; i < mainvlta.children.length; i++, j++) {

			var a4_index_1 = mainvlta.children[i].querySelector('#index_1');
			var a4_index_2 = mainvlta.children[i].querySelector('#index_2');

			var dot = '.';
			if (mainvlta.parentNode.id == 4) {
				dot = '';
			}
			a4_index_1.innerText = mainvlta.parentNode.children[0].querySelector('#index_1').innerText + dot;
			a4_index_2.innerText = (j) + '.';

		
			var tree_index_1 = mainvl.children[i].querySelector('#index_1');
			var tree_index_2 = mainvl.children[i].querySelector('#index_2');
			tree_index_1.innerText = mainvl.parentNode.children[0].querySelector('#index_1').innerText + dot;
			tree_index_2.innerText = (j) + '.';

			// sort if has children
			if (mainvlta.children[i].querySelector('.mainVLTA').children.length > 0) {
				
				var child_id = mainvlta.children[i].querySelector('.mainVLTA').children[0].id;
				
				sort(mainvlta.children[i].querySelector('.mainVLTA'), mainvl.children[i].querySelector('.mainVL'), child_id);
				
			}
		}
	}

	else if (comp_id == 6) {
		var j = 1;
		if (mainvlta.children.length == 1) {
			j = 0;
		}
		
		for (var i = 0; i < mainvlta.children.length; i++, j++) {

			var a4_index_1 = mainvlta.children[i].querySelector('#index_1');
			var a4_index_2 = mainvlta.children[i].querySelector('#index_2');
			var a4_index_3 = mainvlta.children[i].querySelector('#index_3');
			a4_index_1.innerText = mainvlta.parentNode.children[0].querySelector('#index_1').innerText;
			a4_index_2.innerText = mainvlta.parentNode.children[0].querySelector('#index_2').innerText;
			a4_index_3.innerText = (j) + '.';

		
			var tree_index_1 = mainvl.children[i].querySelector('#index_1');
			var tree_index_2 = mainvl.children[i].querySelector('#index_2');
			var tree_index_3 = mainvl.children[i].querySelector('#index_3');
			tree_index_1.innerText = mainvl.parentNode.children[0].querySelector('#index_1').innerText;
			tree_index_2.innerText = mainvl.parentNode.children[0].querySelector('#index_2').innerText;
			tree_index_3.innerText = (j) + '.';

			// sort if has children
			if (mainvlta.children[i].querySelector('.mainVLTA').children.length > 0) {
				
				var child_id = mainvlta.children[i].querySelector('.mainVLTA').children[0].id;
				
				sort(mainvlta.children[i].querySelector('.mainVLTA'), mainvl.children[i].querySelector('.mainVL'), child_id);
				
			}
		}
	}

	else if (comp_id == 7) {
		var j = 1;
		if (mainvlta.children.length == 1) {
			j = 0;
		}
		
		for (var i = 0; i < mainvlta.children.length; i++, j++) {

			var a4_index_1 = mainvlta.children[i].querySelector('#index_1');
			var a4_index_2 = mainvlta.children[i].querySelector('#index_2');
			var a4_index_3 = mainvlta.children[i].querySelector('#index_3');
			var a4_index_4 = mainvlta.children[i].querySelector('#index_4');
			a4_index_1.innerText = mainvlta.parentNode.children[0].querySelector('#index_1').innerText;
			a4_index_2.innerText = mainvlta.parentNode.children[0].querySelector('#index_2').innerText;
			a4_index_3.innerText = mainvlta.parentNode.children[0].querySelector('#index_3').innerText;
			a4_index_4.innerText = (j) + '.';

		
			var tree_index_1 = mainvl.children[i].querySelector('#index_1');
			var tree_index_2 = mainvl.children[i].querySelector('#index_2');
			var tree_index_3 = mainvl.children[i].querySelector('#index_3');
			var tree_index_4 = mainvl.children[i].querySelector('#index_4');
			tree_index_1.innerText = mainvl.parentNode.children[0].querySelector('#index_1').innerText;
			tree_index_2.innerText = mainvl.parentNode.children[0].querySelector('#index_2').innerText;
			tree_index_3.innerText = mainvl.parentNode.children[0].querySelector('#index_3').innerText;
			tree_index_4.innerText = (j) + '.';
			
		}
	
	}

	// else if(comp_id > 4 && comp_id < 8) {
	// 	var index_count = 1;
	// 	var index_exist = true;
	// 	while (index_exist) {
	// 		if()
	// 	}
	// }
}