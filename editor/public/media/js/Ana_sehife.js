$(document).ready(function(){
	
  	$('.qanun_nov').on('click', function(){

	      	if ($(this).parent().children().eq(1).children().length != 0){
	      		if($(this).parent().children().eq(1).is(":hidden")){
					$(this).parent().children().eq(1).show(300);
    				$(this).children(0).text("");
	      		}
	  			
	  			else if($(this).parent().children().eq(1).is(":visible")){
	  				$(this).parent().children().eq(1).hide(300);
    				
    				$(this).children(0).text('-'+$(this).parent().children().eq(1).children().length);
	  			}
	      	} else {
	      		alert('Məlumat yoxdur!');
	      	}
    });
    $('.qanun_link .sil').on('click', function(){
    	var link = $(this).parent().children().eq(0).attr('href');
        link = link.replace('/index.php?', "");

    	$this_parent = $(this).parent();
    	$span = $(this).parents('.qanun').eq(0).find('#sayi').eq(0);
    	$qanun_name = $(this).parent().parent();
    	$.ajax({

    		url: '/index.php?delete/' +link,
    		type: 'POST',
    		success: function(msg){
    			$this_parent.remove();
                if($qanun_name.children().length == 0) {
    			     $qanun_name.hide(300);
                }
    			$span.text(' - ' + $qanun_name.children().length);
    			alert(msg);
    		},
    		error: function(){
    			alert('baglanti kesildi!');
    		}

    	});

    });

});	