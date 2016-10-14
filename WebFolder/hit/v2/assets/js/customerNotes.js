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
						if(note_uuid!=""){
							var date_time= html.date;
							$("#add_new_note").val("");
							//var username="<!--HIT_EXECUTE _HIT_HTMLTXT:= _HIT_NAMETXT -->";
							var username=html.user_name;
							var addnewrowhtml='<tr class="notes"><td class="vertical-middle ">'+date_time;
                        	addnewrowhtml+='<td class="vertical-middle ">'+username+'</td>';
                        	addnewrowhtml+='<td class="vertical-middle "><textarea readonly class="form-control width-300 no-padding no-border disabled note" id="note" name="note">'+add_note+'</textarea></td>';
                        	addnewrowhtml+='<td class="vertical-middle">';
                        	addnewrowhtml+='<input class="note_uuid" type="hidden" value="'+note_uuid+'" />';
                        	addnewrowhtml+='<a title="Save note" href="javascript:void(0)" onClick="saveCustomerNote($(this))" style="display:none" id="save"><i class="fa fa-save big-size color-carrot"></i></a>';
                       		addnewrowhtml+='<a title="Edit note" href="javascript:void(0)" onClick="editCustomerNote($(this))" id="edit"><i class="ion-edit big-size color-carrot"></i></a>';
                        	addnewrowhtml+='<a title="Delete note" href="javascript:void(0)" onClick="deleteCustomerNote($(this))" id="delete"><i class="ion-trash-b big-size color-carrot ion-android-deletes"></i></a>';
                        	addnewrowhtml+='<a title="Cancel" href="javascript:void(0)"  onClick="cancelCustomerNote($(this))" style="display:none" id="cancel"><i class="ion-android-cancel big-size color-carrot"></i></a>';
                       		addnewrowhtml+='</td></tr>';
                        
							$(".notes_end").before(addnewrowhtml);
						}
					}else if(html.error){
						__alertMessage(html.error);
					}
					noteStr='';
				}
			});
		}else{
			__alertMessage('Please add some note');
		}
	}

function editCustomerNote(x){
	var note = x.parents('.notes');
	noteStr= note.find('#note').val();
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
	note.find('#note').val(noteStr);
	note.find("#note").attr('readonly',true);
	note.find('#cancel').hide();
	noteStr='';
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
	noteStr='';
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
				var username="<!--HIT_EXECUTE _HIT_HTMLTXT:= _HIT_NAMETXT -->";
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
		__alertMessage('Please add some note');
	}
}
$(document).ready(function () {
var noteStr='';
});