	function addCustomerNote(){
		var add_note=$('#add_new_note').val();
		$("#errMsg").remove();
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
			$.ajax({
				type: "GET",
				url: "savenote.cgi",
				data: dataString,
				cache: false,
				success: function(html){
					if(html.success){
						var note_uuid= html.uuid;
						if(note_uuid!=""){
							var date_time= html.date;
							$("#add_new_note").val("");
							var username=html.user_name;
							var contentStr='<tr><td>'+username+'</td><td>'+date_time+'</td><td>'+add_note+'</td></tr>';
							$("#notesBody").append(contentStr);
							$('#popupLogin').popup('close');
						}
					}else if(html.error){
						$(".newMsgStr").before(html.error);
					}
				}
			});
		}else{
			$(".newMsgStr").before('<span id="errMsg" style="color:#CC0000">* Please add some note!</span>');
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