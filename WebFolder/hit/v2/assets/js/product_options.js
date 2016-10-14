var subOptionArr=[];

function save() {
	var row = $(this).parents('.item-row');
	var s_name =row.find('.parameter_name').val();
	
	if(s_name!=''){
		if ($.inArray(s_name, subOptionArr) < 0) {
          	subOptionArr.push(s_name); 
          	//console.log(subOptionArr);
        }
      
		row.find('.s_parameter_name').html(s_name);
		row.find('.s_parameter_name').show();
		row.find('.parameter_name').hide();
		row.find('.savelink').hide();
		row.find('.cancellink').hide();
		row.find('.removelink').show();
			
	} else {
		row.find('.parameter_name').focus();
		$.prompt('Please enter value for the field!');
	}
}

	
	function cancel() {
		var row = $(this).parents('.item-row');
		row.remove();
	}
	
function remove() {
	var row = $(this).parents('.item-row');
	var s_name =row.find('.parameter_name').val();
	if(s_name!=''){
		subOptionArr.splice($.inArray(s_name, subOptionArr),1);
		row.remove();
	}	
		
}
	
function bind() {
	$(".savelink").unbind();
  	//$(".editlink").unbind();
  	$(".cancellink").unbind();
  	$(".removelink").unbind();
	
	$(".savelink").click(save);
  //	$(".editlink").click(edit);
  	$(".cancellink").click(cancel);
  	$(".removelink").click(remove);
}
function fetchsuboptions() {
	$.getJSON("loadproductoptions.cgi?start=0&end=100&tablname=product_options&option_uuid="+$('#uuid').val()+"&"+Math.random(),function(result){
		var htmlStr="";
		if(result.values){
			$.each(result.values, function(i,item){
				if ($.inArray(item, subOptionArr) < 0) {
          			subOptionArr.push(item); 
        		}
        		
				htmlStr+='<tr class="item-row"><td><span class="s_parameter_name">'+item+'</span><input type="text" class="parameter_name form-control" value="'+item+'" style="display:none"></td><td><a href="javascript:void(0)" class="savelink" style="display:none">Done</a>&nbsp;<a href="javascript:void(0)" class="removelink" >Remove</a>&nbsp;<a href="javascript:void(0)" class="cancellink" style="display:none">Cancel</a></td></tr>';
			});
		}
		$('.item').after(htmlStr);
		bind();
	});
	
}
$(function() {
	fetchsuboptions();
	
	$("#addrow").click(function(){
		$(".item").after('<tr class="item-row"><td><span class="s_parameter_name" style="display:none" ></span><input type="text" class="parameter_name form-control" value=""></td><td><a href="javascript:void(0)" class="savelink" >Done</a>&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a>&nbsp;<a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
		var curr_row = $('.item').next();
		curr_row.find('.parameter_name').focus();
		if ($(".delete").length > 0) $(".delete").show();
    	bind();
  	});
  	
  	bind();

            // add uniform plugin styles to html elements
            $("input:checkbox").uniform();

});
         