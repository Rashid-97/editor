<!DOCTYPE html>
<html>
<head>
  	<meta charset="UTF-8">
	<meta http-equiv="x-ua-compatible" content="IE=edge">
	<title>Editor</title>
	<script src="/public/media/js/jquery/JQuery.js"></script>
	<script src="/public/media/js/jquery/splitter.js"></script>
	<script src="/public/media/js/Redaktor.js"></script>
  	<script src="/public/media/js/Components.js"></script>
	<script src="/public/media/js/Component.js"></script>
	<script src="/public/media/js/smoothscroll.js"></script>

	<link rel="icon" href="/public/media/images/armm.png">

  	<link rel="stylesheet" href="/public/media/css/splitter.css">
	<link rel="stylesheet" href="/public/media/css/Components.css">
	<link rel="stylesheet" href="/public/media/css/Redaktor.css">

</head>
<body>

	<header class="upperSide" id="upperSide">
		<div class="header_top">
			<div class="user_profile"> <img src="/public/media/icons/user_profile.png" alt=""> <?php echo $username; ?> 
				<div class="user_menu">
					<button class="change_passwd"> Change password </button>
					<a href="/index.php?2" class="cixis"> Logout </a>
				</div>
			</div>
			
			<div class="link_image">
				<img class="image" src="/public/media/images/armm.png" alt="Sekil">
				<b style="margin-top:3vh;float: right;font-size: x-large;font-family: monospace;color: darkgrey">Milli Majlis of the Republic of Azerbaijan
</b>
			</div>
		</div>
		<nav class="header_bottom">
			<!-- <a href="/" class="home_img"> <img src="/public/media/icons/home.png" alt="" style="margin-top: 0.5vh"> </a>
			<sup style="margin-left: 2vh;font-size: large;"> <?php echo "/ ".$nov." / ".$id; ?> </sup> -->
			<button class="open_qanun"> <img src="/public/media/icons/open_qanun.png" alt="Open icon" title="Open a law"> </button>
			<button class="yeni_qanun"> <img src="/public/media/icons/new_qanun.png" alt="Yeni qanun" title="New law"> </button>
			<div>
				<select name="novler" id="select_nov" class="selects" title="Choose type">
					<option disabled selected>Choose type</option>
					<option value="1">Konstitusiya</option>
					<option value="2">Konstitusiya Qanunu</option>
					<option value="3">Qanun</option>
					<option value="4">Fərman</option>
					<option value="5">Sərəncam</option>
					<option value="6">Qərar</option>
					<option value="7">Qətnamə</option>
					<option value="8">Müxtəlif orqanların aktları</option>
				</select>
			</div>
			<div>
				<select name="qebul_eden_orqan" id="select_orqan" class="selects" title="Qəbul edən orqan">
					<option disabled selected>Qəbul edən orqan</option>
					<option value="ARP" id="1">Azərbaycan Respublikasının Prezidenti</option>
					<option value="ARMM" id="2">Azərbaycan Respublikasının Milli Məclisi</option>
				</select>
			</div>
			<div>
				<select name="seher" id="select_seher" class="selects" title="Choose city">
					<option disabled selected>City</option>
					<option value="baki" id="1">Baku</option>
					<option value=".." id="2">...</option>
				</select>
			</div>
			<!-- <div>
				<select name="shablonlar" id="select-shablon" class="selects" title="Choose template">
					<option disabled selected>Template</option>
				</select>
			</div> -->
			<!-- <button class="minimized" title="Üst paneli bağla"> X </button> -->
		</nav>
		
	</header>

	<div class="panel">
		<span class="novu"> </span>
		<div class="menubar">

			<button class="openMenuBtn"></button>
			<div class="menubar_content"> </div>
		</div>
		<button class="edit edit_on"></button>
		<button type="button" id="cap_et" onclick="printpage()"></button>
		<div class="wysiwyg">
			<button class="bold wysiwyg_parts" onclick="executeCommand('bold')"><b>B</b></button>
			<button class="italic wysiwyg_parts" onclick="executeCommand('italic')"><em><b>I</b></em></button>
			<button class="underline wysiwyg_parts" onclick="executeCommand('underline')"><u>U</u></button>
			<button class="createLink wysiwyg_parts wysiwyg_parts_icon" onclick="createLink()"></button>
			<button class="unlink wysiwyg_parts wysiwyg_parts_icon" onclick="executeCommand('unlink')"></button>
			<button class="justifyLeft wysiwyg_parts wysiwyg_parts_icon" onclick="executeCommand('justifyLeft')"></button>
			<button class="justifyCenter wysiwyg_parts wysiwyg_parts_icon" onclick="executeCommand('justifyCenter')"></button>
			<button class="justifyRight wysiwyg_parts wysiwyg_parts_icon" onclick="executeCommand('justifyRight')"></button>
			<button class="justifyFull wysiwyg_parts wysiwyg_parts_icon" onclick="executeCommand('justifyFull')"></button>
			<!-- <button class="insertImage wysiwyg_parts" onclick="executeCommand('insertImage')">insertImage</button> -->
		</div>

		<button class="export2word" title="Export to Word"> <i></i> </button>
		<button class="YaddaSaxla" id="YaddaSaxla" title="Save"></button>
		<button class="SaveAll" id="SaveAll" title="Save all"></button>

		<button class="ShablonBtn" id="ShablonBtn" title="Add to template"></button>

	</div>
	
	<div>
		<div class="centerSide">
				 <div class="left" id="left">
				 	<ul id="leftUL" style="margin-top:2vh;">


				 	</ul>
				 </div>
				 
    		 	 <!-- <button class="minimized_left_panel" title="Sol paneli bağla"> .</button> -->
	    		 <div class="right">
	    		 	<div class="tabs_content"></div>
	    		 	<button class="delete_file" title="Delete document"></button>
	    		 	<div class="A4">
	    		 		<div class="imageDiv" id="imageDiv">
	    		 		 	<img src="/public/media/images/Gerb.jpg" alt="Gerb" class="gerb" draggable="false">	
	    		 		</div>
	    		 		<!-- <div class="div_of_comps" id="div_of_comps">


	    		 		</div> -->
			 			
	    		 	</div>

	    		 	<button id="back2Top">&#10148;</button>

	    		 </div>
		</div>
	</div>

	
	<footer class="bottomSide">Made by Rashid Mammadov 2019-2020</footer>

	<div id="myModal" class="modal"> 
		<div class="modal-content">
			<span class="close_modal">&times;</span> <br><br><br>

			<div class="password_field">
			
				<label class="labels">Current password</label>
			    <div> 
	                <input type="password" class="password curr_password"> 
	            </div> <br><br>
		    
		       	<label class="labels">New password</label>
	            <div> 
	                <input type="password" class="password new_password"> 
	            </div> <br><br>
		
				<button class="tesdiq"> Change </button>
			</div>

		</div>
	</div>

	<!-- open qanun window -->
	<div id="document_window" class="modal">
		<div class="qanuns_content">

			<div class="document">
				<span class="close_modal">&times;</span>
				<div class="qanunlar">
					
				</div>
			</div>
		</div>
	</div>
</body>
</html>
