	function addCustomerNote(){
		var add_note=$('#add_new_note').val();
		
		if(add_note!='') {
			var dataString = 'note='+add_note;
			if(tableNameStr=="Invoices"){
				dataString += '&invoice_uuid='+tableUUIDStr;
			}else if(tableNameStr=="orders"){
				dataString += '&order_uuid='+tableUUIDStr;
			}else if(tableNameStr=="Companies"){
				dataString += '&customer_uuid='+tableUUIDStr;
			}else if(tableNameStr=="Tasks"){
				dataString += '&task_uuid='+tableUUIDStr;
			}else if(tableNameStr=="Projects"){
				dataString += '&project_uuid='+tableUUIDStr;
			}
			dataString += '&redirect=false';
			//console.log(dataString);
			//console.log(tableNameStr)
			$.ajax({
				type: "GET",
				url: "savenote.cgi",
				data: dataString,
				cache: false,
				success: function(html){
					if(html.success){
						var note_uuid= html.uuid;
						if(note_uuid!=""	){
						var date_time= html.date;
						$("#add_new_note").val("");
						//var username="<!--HIT_EXECUTE _HIT_HTMLTXT:= _HIT_NAMETXT -->";
						var username=html.user_name;
						$(".notes_end").before('<div class="notes"><div class="form-group"><div CLASS="col-sm-8"><input class="note_uuid" type="hidden" value="'+note_uuid+'" /><div ALIGN="LEFT" STYLE="text-align::left; padding-left:0px;">'
							+'<label class="col-sm-9"  STYLE="padding-left:0px; padding-top:7px;" id="user_details">'+username+' ('+date_time+')</label></div>'
							+'<div STYLE=" padding-left:15px;">&nbsp;<button type="button" id="edit" class="btn btn-danger btn-sm" onclick="editCustomerNote($(this))">Edit Note</button>&nbsp;<button type="button" id="delete" class="btn btn-primary btn-sm" onclick="deleteCustomerNote($(this))">Delete</button>&nbsp;<button type="button" id="save" class="btn btn-danger btn-sm" onclick="saveCustomerNote($(this))" style="display:none">Save Note</button>&nbsp;<button type="button" id="cancel" class="btn btn-primary btn-sm" onclick="cancelCustomerNote($(this))" style="display:none">Cancel</button></div>'
							+'</div></div>'
							+'<div class="form-group" ><div CLASS="col-sm-8"><textarea name="note" class="form-control col-sm-5 note" rows="3" id="note" readonly>'+add_note+'</textarea></div></div>'
							+'</div>');
						}
					}else if(html.error){
						__alertMessage(html.error);
					}
				}
			});
		}else{
			__alertMessage('Please add some note');
		}
	}

function editCustomerNote(x){
	var note = x.parents('.notes');
	note.find("#note").attr('readonly',false);
	note.find('#edit').hide();
	note.find('#delete').hide();
	note.find('#save').show();
	note.find('#cancel').show();
}
function cancelCustomerNote(x) {
	var note = x.parents('.notes');
	note.find('#edit').show();
	note.find('#delete').show();
	note.find('#save').hide();
	note.find("#note").attr('readonly',true);
	note.find('#cancel').hide();
}
function deleteCustomerNote(x) {
	var note = x.parents('.notes');
	var uuid_note= note.find('.note_uuid').val();
	var invoice_uuid=$('#invoice_uuid').val();

	var dataString = 'note_uuid='+uuid_note+'&redirect=false';

	$.ajax({
	type: "POST",
	url: "deletenotes.cgi",
	data: dataString,
	cache: false,
	success: function(html){
		if(html.success){
			note.hide();
		}else if(html.error){
			__alertMessage(html.error);
		}
	}
	});
}	
function saveCustomerNote(x){	
	var note = x.parents('.notes');
	var uuid_note= note.find('.note_uuid').val();
	var add_note=note.find('#note').val();
		
	if(add_note!='') {
	
		var dataString = 'note='+add_note+'&note_uuid='+uuid_note;
		if(tableNameStr=="Invoices"){
			dataString += '&invoice_uuid='+tableUUIDStr;
		}else if(tableNameStr=="orders"){
			dataString += '&order_uuid='+tableUUIDStr;
		}else if(tableNameStr=="Companies"){
			dataString += '&customer_uuid='+tableUUIDStr;
		}else if(tableNameStr=="Tasks"){
			dataString += '&task_uuid='+tableUUIDStr;
		}else if(tableNameStr=="Projects"){
			dataString += '&project_uuid='+tableUUIDStr;
		}
		dataString += '&redirect=false';
		$.ajax({
			type: "GET",
			url: "savenote.cgi",
			data: dataString,
			cache: false,
			success: function(html)		{
				if(html.success){
				var date_time= html.date;
				//var username="<!--HIT_EXECUTE _HIT_HTMLTXT:= _HIT_NAMETXT -->";
				var username=html.user_name;
				var user_details=username+" ("+date_time+")";
				note.find('#user_details').html(user_details);
			
				note.find("#note").attr('readonly',true);
				note.find('#save').hide();
				note.find('#cancel').hide();
				note.find('#edit').show();
				note.find('#delete').show();
				}else if(html.error){
					__alertMessage(html.error);
				}
			}
		});
	}else{
		alert('Please add some note');
	}
}