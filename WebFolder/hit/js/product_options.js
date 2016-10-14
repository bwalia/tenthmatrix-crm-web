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
		//console.log(subOptionArr);
	}	

/**$.prompt("Are you sure to delete this specification?", {
	title: "",
	buttons: { "Yes": true, "No": false },
	submit: function(e,v,m,f){
		if(v){
			row.remove();
			$.prompt.close();
		}else{
			$.prompt.close();
		}
	}
});**/
		
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
        		
				htmlStr+='<tr class="item-row"><td><span class="s_parameter_name">'+item+'</span><input type="text" class="parameter_name" value="'+item+'" style="display:none"></td><td><a href="javascript:void(0)" class="savelink" style="display:none">Done</a>&nbsp;<a href="javascript:void(0)" class="removelink" >Remove</a>&nbsp;<a href="javascript:void(0)" class="cancellink" style="display:none">Cancel</a></td></tr>';
			});
		}
		$('.item').after(htmlStr);
		bind();
	});
	
}
$(function() {
	fetchsuboptions();
	
	$("#addrow").click(function(){
		$(".item").after('<tr class="item-row"><td><span class="s_parameter_name" style="display:none" ></span><input type="text" class="parameter_name" value=""></td><td><a href="javascript:void(0)" class="savelink" >Done</a>&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a>&nbsp;<a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
		var curr_row = $('.item').next();
		curr_row.find('.parameter_name').focus();
		if ($(".delete").length > 0) $(".delete").show();
    	bind();
  	});
  	
  	bind();

            // add uniform plugin styles to html elements
            $("input:checkbox").uniform();
		   		
			// validate form on keyup and submit
			$.validator.addMethod('checkinteger', function(value, element, param) {
			return (value != 0);
			}, 'Please enter a non zero value!');
		
			$("#ProductForm").validate({
				ignore: "",
				onkeyup: false,
				errorClass: 'error',
				validClass: 'valid',
				errorElement: "em",
				errorPlacement: function(error, element) {
					$(element).closest('div').append(error);
				},
				onfocusout: false,
				invalidHandler: function(form, validator) {
					var errors = validator.numberOfInvalids();
					if (errors) {                    
						validator.errorList[0].element.focus();
					}
				},
				rules: {
					name: { required: true  },
				},
				submitHandler: function (form) {
					var sub_options= subOptionArr.toString(); 
					$('#sub_options').val(sub_options);
    				var uuid= $('#uuid').val();  
					var name= $('#name').val(); 
					var status=false;
					if($('#status').is(':checked')){
						status= true;
					}
				
    				var sub_optionsStr= $('#sub_options').val(); 
					$.ajax({
						type: "POST",
						url: "saveproductoptions.cgi",
						data: {'uuid' : uuid, "sub_options" : sub_optionsStr,"name" :name, "status": status},
						cache: false,
						success: function(response){
							if(response.error){
								$.prompt(response.error);
							}else if(response.success){
								location.href="product_option.shtml?uuid="+response.success;
							}
						}
					});
				}
			});	
});
         