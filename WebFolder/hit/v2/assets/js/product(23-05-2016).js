function generate_code(src,des){
	var val=$("#"+src).val();
	var patt=/[^A-Za-z0-9_-]/g;
	var result=val.replace(patt,' ');
	result=result.replace(/-/g, ' ');
	result=result.replace(/\s+/g, ' ');
	result = result.replace(/^\s+|\s+$/g,'');
	result=result.replace(/\s/g, '-');
	result=result.toLowerCase();
	$("#"+des).val(result);
}
function save() {
	//$('#specMsgID').remove();
	
	var row = $(this).parents('.item-row');
	var item_uuid=row.find('.item_uuid').val();
	var product_uuid=$('#Product_uuid').val();

	var s_name =row.find('.parameter_name').val();
	var s_value =row.find('.parameter_value').val();

	if(s_name!='' && s_value!='' && product_uuid!=''){
		if(item_uuid!=""){
			var dataString = 'item_uuid='+item_uuid+'&product_uuid='+product_uuid+'&s_name='+s_name+'&s_value='+s_value+'&redirect=false';
		}else{
			var dataString = 'product_uuid='+product_uuid+'&s_name='+s_name+'&s_value='+s_value+'&redirect=false';
		}
			$.ajax({
				type: "POST",
				url: "saveproductextra.cgi",
				data: dataString,
				cache: false,
				success: function(response){
					if(response.success){
						row.find('.item_uuid').val(response.uuid);
						
						row.find('.s_parameter_name').html(s_name);
						row.find('.s_parameter_value').html(s_value);
						
						row.find('.s_parameter_value').show();
						row.find('.s_parameter_name').show();
						
						row.find('.parameter_name').hide();
						row.find('.parameter_value').hide();
						
						row.find('.savelink').hide();
						row.find('.editlink').show();
						row.find('.cancellink').hide();
						row.find('.removelink').show();
						
						//var msg = '<span style="color:green" id="specMsgID">'+response.success+'</span>';
						//$('.specMsg').before(msg);
						$.prompt(response.success);
					}else if(response.error){
						$.prompt(response.error);
						//var msg = '<span style="color:#CC0000" id="specMsgID">'+response.error+'</span>';
						//$('.specMsg').before(msg);
					}	
				}
			});
			
	} else {
		$.prompt('Please enter value for both fields!');
		//var msg = '<span style="color:#CC0000" id="specMsgID">Please enter value for both fields!</span>';
		//$('.specMsg').before(msg);
	}
}

function edit() {
	var row = $(this).parents('.item-row');
	row.find('.s_parameter_name').hide();
	row.find('.s_parameter_value').hide();
	
	row.find('.parameter_name').show();
	row.find('.parameter_value').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.s_parameter_name').focus();
}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var id=row.find('.item_uuid').val();
		if(id!=''){
			row.find('.s_parameter_name').show();
			row.find('.s_parameter_value').show();
			
			row.find('.parameter_name').hide();
			row.find('.parameter_value').hide();
			
			row.find('.savelink').hide();
			row.find('.editlink').show();
			row.find('.cancellink').hide();
			row.find('.removelink').show();
		}else{
			row.remove();
		}
	}
	
function remove() {
	var row = $(this).parents('.item-row');
	var item_uuid =row.find('.item_uuid').val();
	var s_name =row.find('.s_parameter_name').html();
	var s_value =row.find('.s_parameter_value').html();

$.prompt("Are you sure to delete this specification?", {
	title: "",
	buttons: { "Yes": true, "No": false },
	submit: function(e,v,m,f){
		if(v){
			
			var product_uuid=$('#Product_uuid').val();
			var dataString = 'item_uuid='+item_uuid+'&s_name='+s_name+'&s_value='+s_value+'&product_uuid='+product_uuid+'&redirect=false';
			$.ajax({
				type: "POST",
				url: "deleteproductspec.cgi",
				data: dataString,
				cache: false,
				success: function(html){
					row.remove();
					$.prompt.close();
				}
			});
		}else{
			$.prompt.close();
		}
	}
});
		
}
	
function bind() {
	$(".savelink").unbind();
  	$(".editlink").unbind();
  	$(".cancellink").unbind();
  	$(".removelink").unbind();
	
	$(".savelink").click(save);
  	$(".editlink").click(edit);
  	$(".cancellink").click(cancel);
  	$(".removelink").click(remove);
}

function fetchspecifications() {
	$.getJSON("loadproductspec.cgi?product_uuid="+$('#Product_uuid').val(),function(result){
		var htmlStr="";
		if(result.error){
		
		}else{
			$.each(result, function(i,item){
				if(item.uuid){
				htmlStr+='<tr class="item-row"><td><input type="hidden" class="item_uuid" value="'+item.uuid+'"><span class="s_parameter_name">'+item.name+'</span><input type="text" class="form-control  parameter_name" value="'+item.name+'" style="display:none"></td><td><span class="s_parameter_value" >'+item.value+'</span><input style="display:none" type="text" class="form-control parameter_value" value="'+item.value+'"></td><td><a href="javascript:void(0)" class="editlink">Edit</a>&nbsp;<a href="javascript:void(0)" class="savelink" style="display:none">Save</a>&nbsp;<a href="javascript:void(0)" class="removelink" >Remove</a>&nbsp;<a href="javascript:void(0)" class="cancellink" style="display:none">Cancel</a></td></tr>';
				}
				/**$.each(item, function(key, value){
        			htmlStr+='<tr class="item-row"><td><span class="s_parameter_name">'+key+'</span><input type="text" class="form-control parameter_name" value="'+key+'" style="display:none"></td><td><span class="s_parameter_value" >'+value+'</span><input style="display:none" type="text" class="form-control parameter_value" value="'+value+'"></td><td><a href="javascript:void(0)" class="editlink">Edit</a>&nbsp;<a href="javascript:void(0)" class="savelink" style="display:none">Save</a>&nbsp;<a href="javascript:void(0)" class="removelink" >Remove</a>&nbsp;<a href="javascript:void(0)" class="cancellink" style="display:none">Cancel</a></td></tr>';
				});**/
			});
		}
		$('.item').after(htmlStr);
		bind();
	});
	
}

$(function() {
	$("#addrow").click(function(){
		$(".item").after('<tr class="item-row"><td><input type="hidden" class="item_uuid" value=""><span class="s_parameter_name" style="display:none" ></span><input type="text" class="form-control parameter_name" value=""></td><td><span class="s_parameter_value" style="display:none" ></span><input type="text" class="form-control parameter_value" value=""></td><td><a href="javascript:void(0)" class="editlink" style="display:none">Edit</a>&nbsp;<a href="javascript:void(0)" class="savelink" >Save</a>&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a>&nbsp;<a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
		var curr_row = $('.item').next();
		curr_row.find('.parameter_name').focus();
		if ($(".delete").length > 0) $(".delete").show();
    	bind();
  	});
  	
  	bind();
    
			$('.num').keypress(function(e){
				var k = e.which;
    			if ((k<48 || k>57) && (k!=46) && (k!=8) && (k!=0)) {
					e.preventDefault();
					return false;
    			}
			}); 
								
			$('#NumberOfUsers').keypress(function(e){
				var k = e.which;
    			if ((k<48 || k>57) && (k!=8) && (k!=0)) {
        			e.preventDefault();
					return false;
    			}
    		}); 
    		
			$('.save_exit').click(function(e){
				var selected_categories= $('#categories').val();  
				$('#selected_categories').val(selected_categories);
			});
});

function fetchavailableoptions() {
	$.getJSON("loadavailableproductoptions.cgi?product_uuid="+$('#Product_uuid').val()+"&"+Math.random(),function(result){
		var htmlStr="";
		if(result.error){
		
		}else{
			var table_html="";
			var optionStatusStr= new Array();
			
			$.each(result, function(i,item){
				if(item.options){
					if(item.options!=""){
						table_html+='<div CLASS="boxbcg">';
						table_html+='<h3><input type="checkbox" value="true" id="option_'+item.uuid+'" onClick="mainOptionChecked(\''+item.uuid+'\')"> '+item.name+'</h3>';
						table_html+='<div CLASS="overflowdata"><table class="table table-hover tablebox table-bordered "><tbody>';
						var subTableHtmlStr='';
						$.each(item.options, function(i,row){
							subTableHtmlStr+='<tr><td><div class=" field-box" class="pdng3">';
							subTableHtmlStr+='<label"><input ';
							if(row.IsDisplayed=="yes"){
								subTableHtmlStr+=' checked ';
							}
							subTableHtmlStr+='class="option_'+item.uuid+'" type="checkbox" value="'+row.value+'" onClick="set_permissions(\''+item.uuid+'\',event)"> '+row.value+'</label>';
							subTableHtmlStr+='</div></td></tr>';
						});
												
						subTableHtmlStr+='</tbody></table></div>';
						subTableHtmlStr+='<div><a CLASS="btn btn-danger savebtn" href="javascript:void(0)" onclick="saveOption(\''+item.uuid+'\')">Save</a></div>';
						subTableHtmlStr+='</div>';
												
						table_html+=subTableHtmlStr;
						
					}
				}                
			});
			$("#ava_options").html(table_html);
			
		}
	});
	
}
function mainOptionChecked(val){
	val = typeof val !== 'undefined' ? val : '';
	if(val!=""){
		if($('#option_'+val).is(":checked")){
			$('.option_'+val).prop('checked', true);
			$('#submenu_'+val).show();
		}else{
			$('.option_'+val).prop('checked', false);
			$('#submenu_'+val).hide();
		}
	}
}
function saveOption(module){
	var valueStr="";
	$('.option_'+module).each(function(){
		if($(this).is(':checked')){
			if(valueStr!=""){
				valueStr+=","+$(this).val();
			}else{
				valueStr+=$(this).val();
			}
		}
	});
	//if(valueStr!=""){
	$.ajax({
		type: "POST",
		url: "saveproductoptionavailable.cgi",
		data: { "product_uuid" : $('#Product_uuid').val(), "product_option_uuid" : module, "option_value" :valueStr},
		cache: false,
		success: function(response){
			if(response.success){
				$.prompt(response.success);
			}else if(response.error){
				$.prompt(response.error);
			}	
		}
	});
	//}else{
	//	$.prompt("Please select options to save!");
	//}
}
function set_permissions(module, elem){
	var i=0, s_count=0;
		$('.option_'+module).each(function(){
			i++;
			if($(this).is(':checked')){
				s_count++;
			}
		});
		
		if(i!=0 && s_count!=0 && i==s_count){
			$('#option_'+module).prop("indeterminate", false);
			$('#option_'+module).prop("checked", true);
		}else if(i!=0 && s_count!=0 && i>s_count){
			$('#option_'+module).prop("checked", false);
			$('#option_'+module).prop("indeterminate", true);
		}else{
			$('#option_'+module).prop("indeterminate", false);
			$('#option_'+module).prop("checked", false);
		}
}