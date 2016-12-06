function save() {
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
					}else if(response.error){
						$.prompt(response.error);
					}	
				}
			});
			
	} else {
		$.prompt('Please enter value for both fields!');
	}
}
function generate_code(src,des){
	var val=document.getElementById(src).value;
	var patt=/[^A-Za-z0-9_-]/g;
	var result=val.replace(patt,' ');
	result=result.replace(/-/g, ' ');
	result=result.replace(/\s+/g, ' ');
	result = result.replace(/^\s+|\s+$/g,'');
	result=result.replace(/\s/g, '-');
	result=result.toLowerCase();
	document.getElementById(des).value=result;
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
		
		if(id!='' && id!="undefined" && id!=null){
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
				type: "GET",
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
			//console.log(result.error);
		}else{
			$.each(result, function(i,item){
				if(item.uuid){
					htmlStr+='<tr class="item-row"><td><input type="hidden" class="item_uuid" value="'+item.uuid+'"><span class="s_parameter_name">'+item.name+'</span><input type="text" class="parameter_name form-control" value="'+item.name+'" style="display:none"></td><td><span class="s_parameter_value" >'+item.value+'</span><input style="display:none" type="text" class="parameter_value form-control" value="'+item.value+'"></td><td><a href="javascript:void(0)" class="editlink" title="Edit"><i class="fa fa-pencil"></i></a>&nbsp;<a href="javascript:void(0)" class="savelink" style="display:none" title="Save"><i class="fa fa-save"></i></a>&nbsp;<a href="javascript:void(0)" class="removelink" title="Delete" ><i class="fa fa-trash"></i></a>&nbsp;<a href="javascript:void(0)" class="cancellink" style="display:none" title="Cancel"><i class="fa fa-remove"></i></a></td></tr>';
				}
			});
		}
		$('.item').after(htmlStr);
		
		$('#table-breakpoint').basictable('destroy');
		$('#table-breakpoint').basictable({
    		breakpoint: 751
   		});
		bind();
	});
	
}

	function checkExistence(form, e, nameStr){
		var jsonRow = 'checkalready.cgi?field_value='+e+'&table_name=Products&field_name='+nameStr;
		$.getJSON(jsonRow,function(html){
			if(html.result=="yes" ){
				$('#'+nameStr+'errorEM').show();
				$('.'+nameStr+'errorNameClass').removeClass("valid");
				$('.'+nameStr+'errorNameClass').addClass("error");
				return false;
			}else{
				$('#'+nameStr+'errorEM').hide();
				$('.'+nameStr+'errorNameClass').removeClass("error");
				$('.'+nameStr+'errorNameClass').addClass("valid");
				return true;
			}
		});
	}
	
$(function() {
	
	//fetchavailableoptions();
	$("#addrow").click(function(){
		$(".item").after('<tr class="item-row"><td><span class="s_parameter_name" style="display:none" ></span><input type="text" class="parameter_name form-control" value=""></td><td><span class="s_parameter_value" style="display:none" ></span><input type="text" class="parameter_value form-control" value=""></td><td><a href="javascript:void(0)" class="editlink" style="display:none" title="Edit"><i class="fa fa-pencil"></i></a>&nbsp;<a href="javascript:void(0)" class="savelink" title="Save"><i class="fa fa-save"></i></a>&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" title="Delete"><i class="fa fa-trash"></i></a>&nbsp;<a href="javascript:void(0)" class="cancellink" title="Cancel"><i class="fa fa-remove"></i></a></td></tr>');
		var curr_row = $('.item').next();
		curr_row.find('.parameter_name').focus();
		if ($(".delete").length > 0) $(".delete").show();
		
		$('#table-breakpoint').basictable('destroy');
		$('#table-breakpoint').basictable({
    				breakpoint: 751
   		});
    	bind();
  	});
  	
  	bind();
            // add uniform plugin styles to html elements
           // $("input:checkbox").uniform();
			
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
    		
			// validate form on keyup and submit
			$.validator.addMethod('checkinteger', function(value, element, param) {
			return (value != 0);
			}, 'Please enter a non zero value!');
		
			$('.save_exit').click(function(e){
				var selected_categories= $('#categories').val();  
				$('#selected_categories').val(selected_categories);
			});
			
			$("#uploadImageBtn").change(function(){
				if (this.files && this.files[0]) {
					var reader = new FileReader();
					reader.onload = function (e) {
						$('.set_upload_image').attr('src', e.target.result);
					};
					reader.readAsDataURL(this.files[0]);
				 }
			});
	
		var tiny_options=new Array();
		tiny_options['selector']= "textarea#Description";
		tiny_options['plugins']= "advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor";
		tiny_options['imagetools_toolbar']= "rotateleft rotateright | flipv fliph | editimage imageoptions";
		tinymce.init(tiny_options);
});
          var config = {
      '.chosen-select'           : {},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
    
function fetchavailableoptions_old() {
	$.getJSON("loadavailableproductoptions.cgi?product_uuid="+$('#Product_uuid').val(),function(result){
		var htmlStr="";
		if(result.error){
		
		}else{
			var table_html="";
			var optionStatusStr= new Array();
			
			$.each(result, function(i,item){
				if(item.options){
					if(item.options!=""){
						table_html+='<div class="field-box span12"><label style="padding-left: 2px;">';
						table_html+='<input type="checkbox" value="true" id="option_'+item.uuid+'" onClick="mainOptionChecked(\''+item.uuid+'\')"> '+item.name;
						table_html+='</label></div>';
						var subTableHtmlStr='';
						subTableHtmlStr+='<div class="field-box span12" id="submenu_'+item.uuid+'" style="display:none;">';
								
						$.each(item.options, function(i,row){
							subTableHtmlStr+='<label class="span2"><input ';
							if(row.displayed=="yes"){
								subTableHtmlStr+=' checked ';
							}
							subTableHtmlStr+='class="option_'+row.value+' module_'+item.uuid+'" type="checkbox" value="'+row.value+'" onClick="set_permissions(\''+item.uuid+'\',event)"> '+row.value+'</label>';
						});
						subTableHtmlStr+='<label class="span2"><button onclick="saveOption(\''+item.uuid+'\')"> Save</button></span>';
						subTableHtmlStr+='</div>';
						table_html+=subTableHtmlStr;
						
					}
				}                
			});
			$("#ava_options").html(table_html);
			
		}
	});
	
}
function remove_image(uuid){
	$.prompt("Are you sure to remove this image?", {
		buttons: { "Yes": true, "No": false },
		submit: function(e,v,m,f){
			if(v){
				$.ajax({
					type: "POST",
					url: "deleteandchangeprodimg.cgi",
					data: { "product_uuid" : $('#Product_uuid').val(), "image_uuid" : uuid, "action" : 'delete'},
					cache: false,
					success: function(response){
						if(response.success){
							$.prompt(response.success);
							fetchuploadedimages();
						}else if(response.error){
							$.prompt(response.error);
						}	
					}
				});
				$.prompt.close();	
			}else{
				$.prompt.close();
			}
		}
	});
}
function modify_image(e){
		$.ajax({
			type: "GET",
			url: "deleteandchangeprodimg.cgi",
			data: { "product_uuid" : $('#Product_uuid').val(), "image_uuid" : e, "action" : 'change_status', "default" : "yes"},
			cache: false,
			success: function(response){
				if(response.success){
					$.prompt(response.success);
					fetchuploadedimages();
				}else if(response.error){
					$.prompt(response.error);
				}	
			}
		});
}

function fetchuploadedimages() {
	$.getJSON("loadproductimages.cgi?product_uuid="+$('#Product_uuid').val()+"&"+Math.random(),function(result){
		var htmlStr="";
		if(result.error){
			$('#img_loading_div').hide();
		}else{
			var table_html="";
			var optionStatusStr= new Array();
			
			$.each(result, function(i,row){
				table_html+='<div class="col-sm-2 mrgntp">';
				table_html+='<img alt="" ';
				if(row.default=="yes"){
					table_html+='class="imgbrdrslectd"';
				}else{
					table_html+='class="imgbrdr"';
				}
				//table_html+=' src="'+row.image_path+'">';
				//"data:image/".$mimetype.";base64,".$imagebase64;
				
				table_html+=' src="data:image/'+row.extension+';base64,'+row.base64code+'">';
				if(row.default=="no"){
					table_html+='<div class="row"><div class="span3">';
				}
				table_html+='<input type="checkbox" class="check" value="true">';
				if(row.default=="no"){
					table_html+='<a title="Set as default image" href="javascript:void(0)" onClick="modify_image(\''+row.image_uuid+'\')" class="btn btn-default btn-xs" STYLE="margin:0 7px;"><i class="fa fa-paste"> &nbsp; Set as Default Image</i></a>';
					table_html+='<a title="Remove" href="javascript:void(0)" onClick="remove_image(\''+row.image_uuid+'\')" class="btn  btn-danger btn-file btn-xs" style="float:right"><i class="fa fa-trash"></i></a>';
				}
				if(row.default=="no"){
					table_html+='</div></div>';
				}
				table_html+='</div>';
			             
			});
			$("#product_images").html(table_html);
			$('#img_loading_div').hide();
		}
	});
	
}

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
						table_html+='<div CLASS="span3 boxbcg">';
						table_html+='<h3><input type="checkbox" value="true" id="option_'+item.uuid+'" onClick="mainOptionChecked(\''+item.uuid+'\')"> '+item.name+'<span style="float:right;"><a style="float:right" class="btn  btn-danger btn-file btn-xs" target="_blank" href="product_option.shtml?uuid='+item.uuid+'" title="Add more options"><i class="icon-pencil"></i></a></span></h3>';
						table_html+='<div CLASS="overflowdata"><table class="table table-hover tablebox">';
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
												
						subTableHtmlStr+='</table></div>';
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
function upload_image(id,e){
	e.preventDefault();
	
	if ($('#'+id)[0].files && $('#'+id)[0].files[0] && $('#'+id)[0].files[0].name!="no_image.gif") {
		var val = $('#'+id).val().toLowerCase();   
		var regex  =  new RegExp("(.*?)\.(jpg|jpeg|png|gif|bmp|tiff)$");
		if(!(regex.test(val))){
			__alertMessage("Please select valid image file");
			$('#'+id).val('');
		}else{
			var filesize=Number($('#'+id)[0].files[0].size)/(1024*1024);
			if(filesize>1){
				__alertMessage("You can upload files only upto 1 MB");
				$('#'+id).val('');
			}else{
				var data = new FormData();
				var files= $('#'+id)[0].files;
				var curr_uuid=$('#Product_uuid').val();
				data.append('product_uuid', curr_uuid);
				$.each(files, function(key, value){
					data.append('image', value);
				});
				
				var prompt_title='Uploading Image';
				var prompt_html='<img src="loading.gif"  style="padding:20px;" width="64" >';
				//processPrompt(prompt_title,prompt_html,true,false);
				
				if(true){
					$.ajax({
						url: 'uploadproductimage.cgi?files',
						type: 'POST',
						data: data,
						cache: false,
						dataType: 'json',
						processData: false, // Don't process the files
						contentType: false, // Set content type to false as jQuery will tell the server its a query string request
						success: function(response){
							if(response.success){
								$('#'+id).val(null);
								$('#'+id).val('');
								$("#set_upload_image").attr("src","img/no_image.gif'");
								fetchuploadedimages();
								__alertMessage(response.success);
							}else if(response.error){
								__alertMessage(response.error);
							}
						},
						error(){
							__alertMessage("Error in uploading image, please try after some time!");
						}
					});
				}
			}
		}	
	}else{
		var errMsg= "Please select image to upload!";
		__alertMessage(errMsg);
		$('#'+id).focus();
	}
}
