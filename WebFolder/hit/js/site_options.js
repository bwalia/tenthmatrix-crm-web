function saveDb() {
	var row = $(this).parents('.db-item-row');
	var uuid_site=$('#site_uuid').val();
	
	var uuid=row.find('.db_uuid').val();
	var db_host_name =row.find('.i_db_host_name').val();
	var db_user_name =row.find('.i_db_user_name').val();
	var db_password=row.find('.i_db_password').val();
	var db_name =row.find('.i_db_name').val();
	var db_selected =row.find('.db_selected').val();
	var db_server_type =row.find('.server_type').val();
	
	var site_page="yes";
	
	if(db_selected!='' && db_host_name!='' && db_user_name!='' && db_password!='' && db_name!=""){
		if(uuid!=''){
					var dataString = 'uuid='+ uuid +'&type='+db_selected+'&database_name='+db_name+'&host_name='+db_host_name+'&user_name='+db_user_name+'&user_password='+db_password+'&uuid_site='+uuid_site+'&site_page='+site_page+'&action=save&redirect=false&table_name=db_detail&server_type='+db_server_type;
				} else {
					var dataString = 'database_name='+db_name+'&type='+db_selected+'&host_name='+db_host_name+'&user_name='+db_user_name+'&user_password='+db_password+'&uuid_site='+uuid_site+'&site_page='+site_page+'&redirect=false&table_name=db_detail&server_type='+db_server_type;
				}
				//alert(dataString)
				$.ajax({
					type: "GET",
					url: "savedbdetail.cgi",
					data: dataString,
					cache: false,
					success: function(html){
						if(html.error){
							__alertMessage(html.error);
							//row.remove();
						}else if(html.uuid!=""){
						row.find('.s_db_host_name').html(db_host_name);
						row.find('.s_db_user_name').html(db_user_name);
						row.find('.s_db_password').html('');
						row.find('.s_db_name').html(db_name);
						row.find('.s_db_selected').html(db_selected);
						row.find('.s_db_host_name').html(db_host_name);
						row.find('.s_server_type').html(db_server_type);
						
						row.find('.db_uuid').val(html.uuid);
						row.find('.s_db_host_name').show();
						row.find('.s_db_selected').show();
						row.find('.s_server_type').show();
						row.find('.s_db_user_name').show();
						row.find('.s_db_password').show();
						row.find('.s_db_name').show();
						row.find('.i_db_name').hide();
						row.find('.i_db_password').hide();
						row.find('.i_db_user_name').hide();
						row.find('.i_db_selected').hide();
						row.find('.i_db_host_name').hide();
						row.find('.i_server_type').hide();
	
						row.find('.savedblink').hide();
						row.find('.editdblink').show();
						row.find('.canceldblink').hide();
						row.find('.removedblink').show();
						}
					}
				});
			
	} else {
		__alertMessage('Enter all values');
	}
}

	function editDB() {
		var row = $(this).parents('.db-item-row');
		row.find('.s_db_host_name').hide();
		row.find('.s_db_selected').hide();
		row.find('.s_server_type').hide();
		row.find('.s_db_user_name').hide();
		row.find('.s_db_password').hide();
		row.find('.s_db_name').hide();
		row.find('.i_db_name').show();
		row.find('.i_db_password').show();
		row.find('.i_db_user_name').show();
		row.find('.i_db_selected').show();
		row.find('.i_db_host_name').show();
		row.find('.i_server_type').show();
		
		row.find('.savedblink').show();
		row.find('.editdblink').hide();
		row.find('.canceldblink').show();
		row.find('.removedblink').hide();
	
		row.find('.s_db_host_name').focus();
	}
	
	function cancelDb() {
		var row = $(this).parents('.db-item-row');
		var uuid=row.find('.db_uuid').val();
		if(uuid!=''){
			row.find('.s_db_host_name').show();
			row.find('.s_db_selected').show();
			row.find('.s_db_user_name').show();
			row.find('.s_server_type').show();
			row.find('.s_db_password').show();
			row.find('.s_db_name').show();
			row.find('.i_db_name').hide();
			row.find('.i_db_password').hide();
			row.find('.i_db_user_name').hide();
			row.find('.i_db_selected').hide();
			row.find('.i_db_host_name').hide();
			row.find('.i_server_type').hide();
	
			row.find('.savedblink').hide();
			row.find('.editdblink').show();
			row.find('.canceldblink').hide();
			row.find('.removedblink').show();
		}else{
			row.remove();
		}
	}
	
	function removeDb() {
		var row = $(this).parents('.db-item-row');
		var item_uuid=row.find('.db_uuid').val();
		var item_server_type=row.find('.s_server_type').html();
		var item_db_selected=row.find('.s_db_selected').html();
		var site_uuid=$('#site_uuid').val();
		var msg="Are you sure to delete "+item_server_type+" "+item_db_selected+"?"
		$.prompt(msg, {
			title: "",
			buttons: { "No": 0, "Yes": 1 },
			submit: function(e,v,m,f){
				if(v==1){
					var dataString = 'delete_uuids='+ item_uuid+'&uuid_site='+site_uuid+'&table_name=db_detail&site_page=yes&redirect=false';
					$.ajax({
						type: "GET",
						url: "deleteftpordb.cgi",
						data: dataString,
						cache: false,
						success: function(html){
							row.remove();
						}
					});
				}else{
					$.prompt.close();
				}
			}
		});
		
	}	



function db_bind() {
	$(".savedblink").unbind();
 	$(".editdblink").unbind();
	$(".canceldblink").unbind();
	$(".removedblink").unbind();
	
  	$(".savedblink").click(saveDb);
  	$(".editdblink").click(editDB);
  	$(".canceldblink").click(cancelDb);
  	$(".removedblink").click(removeDb);
}

$(function() {
	$("#add_db_details").click(function(){
    	$(".db_item").after('<tr class="db-item-row"><td><span class="s_db_selected" style="display:none"></span><div class="i_db_selected ui-select"><select class="db_selected form-control" name="db_selected"><option value="mysql" >Mysql</option><option value="mongodb">Mongo DB</option></select></div></td><td><span class="s_server_type" style="display:none"></span><div class="i_server_type ui-select"><select class="server_type form-control" name="server_type"><option value="Dev">Dev</option><option value="Staging">Staging</option><option value="Live">Live</option></select></div></td><td><input class="db_uuid" type="hidden" /><span class="s_db_host_name" style="display:none"></span><input type="text" class="form-control i_db_host_name" value="" ></td><td><span class="s_db_user_name" style="display:none"></span><input type="text" class="form-control i_db_user_name" value="" ></td><td><span class="s_db_password" style="display:none" ></span><input type="password" class="form-control i_db_password" value="" ></td><td><span class="s_db_name"></span><input type="text" class="i_db_name form-control" value=""></td><td ><a href="javascript:void(0)" class="editdblink" style="display:none" title="Edit"><i class="fa fa-pencil"></i></a><a href="javascript:void(0)" class="savedblink" title="Save"><i class="fa fa-save"></i></a></td><td><a href="javascript:void(0)" class="removedblink" style="display:none" title="Remove"><i class="fa fa-trash"></i></a><a href="javascript:void(0)" class="canceldblink" title="Cancel"><i class="fa fa-remove"></i></a></td></tr>');
		var curr_row = $('.db_item').next();
		curr_row.find('.i_db_host_name').focus();
		db_bind();
	});
  
	db_bind();
});