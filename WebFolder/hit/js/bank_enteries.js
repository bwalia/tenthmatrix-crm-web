function getMonthName(m) {
		if(m==1){ monthName= "Jan";}
		else if(m==2){ monthName= "Feb";}
		else if(m==3){ monthName= "Mar"; }
		else if(m==4){ monthName= "Apr"; }
		else if(m==5){ monthName= "May"; }
		else if(m==6){ monthName= "Jun"; }
		else if(m==7){ monthName= "Jul"; }
		else if(m==8){ monthName= "Aug"; }
		else if(m==9){ monthName= "Sep"; }
		else if(m==10){ monthName= "Oct"; }
		else if(m==11){ monthName= "Nov"; }
		else if(m==12){ monthName= "Dec"; }
		else{ monthName= m; }
		return monthName;
}

function __showHideEntryDetails(){
	if ($("#hide_entry_details").is(":checked")) {
		$(".bankEntryTrClass").removeClass('selectTable');
		$(".detailTrClass").hide();
		$(".hideReceiptDetails").hide();
		$(".showReceiptDetails").show();
		showallReceiptsFlag=false;
  	} else {
		$(".bankEntryTrClass").addClass('selectTable');
		$(".detailTrClass").show();
		$(".hideReceiptDetails").show();
		$(".showReceiptDetails").hide();
		showallReceiptsFlag=true;
  	} 
}

function __filterByBill(value){
	if(checkAllFlag==true){
		$("#chk_all").trigger('click');
	}
	bill=value;
	
	start=0, end=start+25;
	
	start_date=$('#start_date').val();
	end_date=$('#end_date').val();
	$('#content_table').html('');
	refreshCommonElements();
}

function __filterByType(value){
	if(checkAllFlag==true){
		$("#chk_all").trigger('click');
	}
	entry_type=value;
	
	start=0, end=start+25;
	
	start_date=$('#start_date').val();
	end_date=$('#end_date').val();
	$('#content_table').html('');
	refreshCommonElements();
}
function __showselectedBank(value){
	if(checkAllFlag==true){
		$("#chk_all").trigger('click');
	}
	bank_account=value;
	
	start=0, end=start+25;
	
	start_date=$('#start_date').val();
	end_date=$('#end_date').val();
	$('#content_table').html('');
	refreshCommonElements();
}

function __filterResults(str){
	if(checkAllFlag==true){
		$("#chk_all").trigger('click');
	}
	
	if(str=="pending"){
		$('.showPending').attr('disabled','disabled');
		$('.showAllBankStatements').removeAttr('disabled');
		$('.showReconciled').removeAttr('disabled');
		$('.showPending').css('color','#a8b5c7');
		$('.showReconciled').removeAttr('style');
		$('.showAllBankStatements').removeAttr('style');
		$('.showNeedToConfirm').removeAttr('disabled');
		$('.showNeedToConfirm').removeAttr('style');
	}else if(str=="reconciled"){
		$('.showReconciled').attr('disabled','disabled');
		$('.showAllBankStatements').removeAttr('disabled');
		$('.showPending').removeAttr('disabled');
		$('.showReconciled').css('color','#a8b5c7');
		$('.showAllBankStatements').removeAttr('style');
		$('.showPending').removeAttr('style');
		$('.showNeedToConfirm').removeAttr('disabled');
		$('.showNeedToConfirm').removeAttr('style');
	}else{
		$('.showAllBankStatements').attr('disabled','disabled');
		$('.showReconciled').removeAttr('disabled');
		$('.showPending').removeAttr('disabled');
		$('.showAllBankStatements').css('color','#a8b5c7');
		$('.showReconciled').removeAttr('style');
		$('.showPending').removeAttr('style');
		$('.showNeedToConfirm').removeAttr('disabled');
		$('.showNeedToConfirm').removeAttr('style');
	}
	
	status=str;
	
	start=0, end=start+25;

	start_date=$('#start_date').val();
	end_date=$('#end_date').val();
	$('#content_table').html('');
	refreshCommonElements();
}

function __showForm_AddSet(val,name){
	if(val!=""){
	if(name!=''){
		selected='';
		$('.check').each(function(){
			if($(this).is(":checked")){
				if(selected==''){
					selected=$(this).val();
				}else{
					selected+=","+$(this).val();
				}
			}
		});
		$("#remove_selected").val(selected);
		var get_selectedStr=$("#remove_selected").val();
		if(get_selectedStr!='' || add_from_manager==true){
			if(val=='new_set'){
				var statesdemo = {
					state0: {
						title: 'Please enter name of new set',
						html:'<div id="message"></div><input type="text" name="new_set" id="new_set" value="userset_1" class="form-control"><br />',
						buttons: { Cancel : 0, Ok: 1 },
						focus: "#new_set",																		
						submit:function(e,v,m,f){ 
							if(v==1) {
								e.preventDefault();
								var new_set=$('#new_set').val().trim();
								
								if(new_set!=''){
									var exist=false;
									$('#add_sets option').each(function() {
										if(new_set.toLowerCase()==$(this).text().toLowerCase()){
											exist=true;
										}
									});
									if(exist==false){
										$.ajax({
											type: "POST",
											dataType: "json",
											url: "savebankset.cgi",
											data: {"selected" : selected, "set" : 'add_to_'+new_set},
											cache: false,
											success: function(html)	{
												if(html.success){
													if(html.setUUID){
														$('#opt_new_set').before('&lt;option value="'+html.setUUID+'"&gt;'+new_set+'&lt;/option&gt;');
														$('#add_sets').val(html.setUUID);
														$('#sets_list').prepend('&lt;option value="'+html.setUUID+'" &gt;'+ new_set+'&lt;/option&gt;');
														$(".jqibox").remove();
														selected_set=new_set;
														setUUID=html.setUUID;
														show_load_prompt();
													}
													
												}else if(html.error){
													$('#message').html('* '+result.Err);
												}
											}
										});
									}else{
										$('#message').html('* '+new_set+' already exists. Please enter another name of set');
									}
								}else{
									$('#message').html('* Please enter name of new set');
									$('#new_set').focus();
								}
							}
							if(v==0) {
								$.prompt.close();
								$('#add_sets').val('');
								add_from_manager=false;
							}
						}
					},
					state1: {
						html:'Do you want to load the records of '+selected_set+'?',
						buttons: { No : 0, Yes: 1 },
						focus: 1,
						submit:function(e,v,m,f){
							e.preventDefault();
							if(v==0)
								$.prompt.close();
							else if(v==1)
								location.href='bank_enteries.shtml?set='+selected_set+'&set_uuid='+setUUID;
						}
					}
				};
				$.prompt(statesdemo);
			}else{
				$.ajax({
					type: "POST",
					dataType: "json",
					url: "savebankset.cgi",
					data: {"selected" : selected, "set" : 'add_to_'+name},
					cache: false,
					success: function(html)	{
						if(html.success){
							if(html.setUUID){
								selected_set=name;
								setUUID=html.setUUID;
								show_load_prompt();
							}else{
								$.prompt(html.success);
							}
						}else if(html.error){
							$.prompt(html.error);
						}
					}
				});
			}
		}else{
			__alertModalBox('Please select some entries to add to set!');
			$('#add_sets').val('');
		}
	}
	}
}

function show_load_prompt(){
	code = $('#load_prompt').text();
	(new Function(code))();
}

function add_new_set(){
	add_from_manager=true;
	//__showForm_AddSet('new_set','new_set');
	code = $('#new_set_prompt').text();
	(new Function(code))();
}

function load_from_set(val, name){
	if(val!='' && val!=null){
		location.href='bank_enteries.shtml?set='+name+'&set_uuid='+val;
	}
	else{
		$("#set_mgr_err").html('* Please select a Set');
		$('#sets_list').focus();
	}
}
function del_set(set_uuid, set_name, del_type){
	if(set_uuid!='' && set_uuid!=null){
		if(del_type==1){
			var state_title='About to delete selected set. Are you sure you want to go ahead?';
			var prompt_title='Deleting selected set';
			show_del_prompt(state_title, prompt_title, set_uuid, set_name, del_type);						
		}
		else{
			var state_title='About to delete bank entries permanently of the selected set. Are you sure you want to go ahead?';
			var prompt_title='Deleting Bank statements in selected set';
			show_del_prompt(state_title, prompt_title, set_uuid, set_name, del_type);
		}		
	}
	else{
		$("#set_mgr_err").html('* Please select a Set');
		$('#sets_list').focus();
	}
}

function show_del_prompt(state_title, prompt_title, set_uuid, set_name, del_type){
	var statesdemo = {
		state0: {
			title: state_title,
			html:'',
			buttons: { 'Argh! No stop' : 0, 'Sure, go ahead': 1 },																		
			submit:function(e,v,m,f){ 
				//console.log(f);
				if(v==1) {
					var prompt_html='<img src="loading.gif"  style="padding:20px;" width="32" >';
					processPrompt(prompt_title,prompt_html,true,false);	
					delete_set(set_uuid, set_name, del_type);
				}
				if(v==0) {
					$.prompt.close();								
				}
			}
		},					
	};			
	$.prompt(statesdemo);
}

function delete_set(set_uuid, set_name, del_type) {
	jsonRow = 'addDelBankEnteriesSets.cgi?tablname='+tablname+'&set_uuid='+set_uuid+'&del_type='+del_type;			
	$.getJSON(jsonRow,function(result){
		if(result.Succ){
			if(del_type==1 || del_type==3) {
				/*$('#sets_list option:selected').remove();
				$('#add_sets option[value="'+set_uuid+'"]').hide();
				$('#load_sets option[value="'+set_uuid+'"]').hide();*/
				location.href="bank_enteries.shtml";
			}
			$("#set_mgr_msg").html('* Deleted successfully');
		}
		if($('#dialog').html().length>0){
			processPrompt('','',false,true);
		}
	});
}

function processPrompt(title,msg,start_prmt,stop_prmt){
	if(start_prmt){
		$( "#dialog" ).attr('title', title);
		$( "#dialog" ).html(msg);
		$( "#dialog" ).dialog({ modal: true, resizable: false, draggable: false, closeOnEscape: false });
		$('.ui-dialog-titlebar-close').remove();
		$('.ui-dialog').css('z-index', 99999);
		$('.ui-widget-overlay').css('z-index', 99998);
	}
	else if(stop_prmt){
		$( "#dialog" ).dialog( "destroy" );
		$( "#dialog" ).html('');
	}
}

function reset_dates(){
	if(checkAllFlag==true){
		$("#chk_all").trigger('click');
	}
	$('#content_table').html('');
	$('#img_loading_div').show();
	start=0, end=start+25;
	$('#start_date').val('');
	$('#end_date').val('');
	start_date=$('#start_date').val();
	end_date=$('#end_date').val();
	$('#content_table').html('');
	bank_account='';
	
	refreshCommonElements();	
}
function uploadDocument(){
	$("#u_window_emsg").html("");
	$("#u_window_smsg").html("");
	if ($('#u_document_attach')[0].files && $('#u_document_attach')[0].files[0]) {
		var prompt_title="Please wait...";
		var prompt_html='<img src="loading.gif"  style="padding:20px;" width="32" >';
		processPrompt(prompt_title,prompt_html,true,false);
		var u_bankuuid= $("#u_bankuuid").val();
		var u_table_uuid= $("#u_table_uuid").val();
		var u_tableName= $("#u_tableName").val();
		if(u_table_uuid!="" && u_tableName!=""){
			var data = new FormData();
			var files= $('#u_document_attach')[0].files;
			data.append('uuid', u_table_uuid);
			data.append('table', u_tableName);
			$.each(files, function(key, value){
				data.append('file_content', value);
			});
			$.ajax({
				type: "POST",
				url: "upload_doc.cgi",
				data: data,
				dataType: 'json',
				cache: false,
				processData: false, // Don't process the files
				contentType: false, // Set content type to false as jQuery will tell the server its a query string request
				success: function(html){
					if(html.success){
						processPrompt('','',false,true);
						//$('#u_window_smsg').html(html.success);
						if(entryFormFlag){
							loadRecPayRows(u_bankuuid);
						}else{
							refreshBankentryRow(u_bankuuid);
						}
						$("#uploadDocumentManager").modal('hide');
					}else if(html.error){
						processPrompt('','',false,true);
						$('#u_window_emsg').html(html.error);
					}else if(html.Result){
						processPrompt('','',false,true);
						if(entryFormFlag){
							loadRecPayRows(u_bankuuid);
						}else{
							refreshBankentryRow(u_bankuuid);
						}
						$("#uploadDocumentManager").modal('hide');
					}
				},
				error: function( jqXHR, textStatus, errorThrown ){
					processPrompt('','',false,true);
					$('#u_window_emsg').html('<span style="color:#FF0000">* Sorry, please try after some time!</span>');
				},
				complete:function( jqXHR, textStatus){
					processPrompt(prompt_title,prompt_html,false,true);
				}
			});
		}else{
			$('#u_window_emsg').html("* Document can't be uploaded for this entry!");
		}
	}else{
		$('#u_window_emsg').html("* Please attach document!");
	}
}

function open_upload_window(b,uuid,t,check){
	var checkStr = typeof check !== 'undefined' ? check : '';
	//console.log(b+" "+uuid+" "+t);
	$("#u_window_emsg").html("");
	$("#u_window_smsg").html("");
	$("#u_document_attach").val('');
	$("#u_table_uuid").val('');
	$("#u_tableName").val('');
	$("#u_bankuuid").val("");
	
	if(checkStr!=""){
		var statesdemo = {
			state0: {
				title: '',
				html:'Do you want to upload a new file and overwrite the existing file?',
				buttons: { 'Argh! No stop' : 0, 'Sure, go ahead': 1 },																		
				submit:function(e,v,m,f){ 
					//console.log(f);
					if(v==1) {
						$("#u_table_uuid").val(uuid);
						$("#u_bankuuid").val(b);
						$("#u_tableName").val(t);
						$("#uploadDocumentManager").modal('show');
					}
					if(v==0) {
						$.prompt.close();								
					}
				}
			},					
		};			
		$.prompt(statesdemo);
		
		
	}else{
		$("#u_table_uuid").val(uuid);
		$("#u_bankuuid").val(b);
		$("#u_tableName").val(t);
		$("#uploadDocumentManager").modal('show');
	}
	
}

var xhrAbortLoad;	
function load_data(refRow){
	var keyword= $("#keyword").val();
	var jsonRow = 'load_bankenteriesnew.cgi?start='+start+'&end='+end+'&tablname='+tablname+'&start_date='+start_date+'&end_date='+end_date+'&set='+selected_set+'&setUUID='+setUUID;
	if(start_date!='' || end_date!=''){
		jsonRow +='&date_selected=yes';
	}else{
		jsonRow +='&date_selected=no';
	}
	if(keyword!=''){
		jsonRow +='&keyword='+keyword;
	}
					
	if(bank_account!=''){
		jsonRow +='&uuid_bank='+bank_account;
	}
	if(status!=''){
		jsonRow +='&status='+status;
	}
	var refRowUUID = typeof refRow !== 'undefined' ? refRow : '';
	completeScroll=true;
	var JSONdata=new Array();
	if(refRowUUID!=""){
		var jsonRow = 'load_bankenteriesnew.cgi?uuid_entry='+refRowUUID;	
	}else{
		if(entry_type!=''){
			jsonRow +='&entry_type='+entry_type;
		}
		if(bill!=''){
			jsonRow +='&bill='+bill;
		}
	}
	if(setUUID!=""){
		$("#remove_from_set").show();
	}else{
		$("#remove_from_set").hide();
	}
	
	if(xhrAbortLoad) xhrAbortLoad.abort();
	xhrAbortLoad=$.getJSON(jsonRow,function(result){
		if(result.displaying){
		$('.display_records').html(result.displaying);
		}
		if(result.Alert){
			complete=true;
			__alertModalBox('No more records found!');
			$('#display_more_btn').hide();
			$('#table-breakpoint').basictable({
    				breakpoint: 751
   			});
		}else{
		var table_html='';
			$.each(result.aadata, function(i,row){
				var statusStr=row.status;
				var maintableClass="";
				if(row.paid_in>0 && row.paid_out==0){
					maintableClass='money-in';
				}else if(row.paid_out>0 && row.paid_in==0){
					maintableClass='money-out';
				}
				if(refRowUUID==""){
					if(row.Receipts!=''){
						table_html+='<tr class="invoice_'+row.uuid+' selectTable bankEntryTrClass '+maintableClass+'"><td class="hidden-xs">';
					}else{
						table_html+='<tr class="invoice_'+row.uuid+' '+maintableClass+'"><td  class="hidden-xs">';
					}
				}
				if(checkAllFlag==true){
					table_html+='<input name="Select" class="check" checked type="checkbox" id="Select" value="'+row.uuid+'"></td>';
				}else{
					table_html+='<input name="Select" class="check" type="checkbox" id="Select" value="'+row.uuid+'"></td>';
				}
				
				table_html+='<td><span class="date_'+row.uuid+' label label-';
				if(statusStr.toLowerCase()=="reconciled"){
					table_html+='success';
				}else{
					table_html+='warning';
				}
				table_html+='">'+row.date+'</span></td>';
				
				table_html+='<td>'+row.type+'</td>';
				table_html+='<td><span class="description_'+row.uuid+'">'+row.description+'</span></td>';
				table_html+='<td><span class="paid_out_'+row.uuid+'">'+row.paid_out+'</span></td>';
				table_html+='<td><span class="paid_in_'+row.uuid+'">'+row.paid_in+'</span></td>';
			
				//table_html+='<td>'+row.balance+'</td>';
				table_html+='<td><span class="amount_due_'+row.uuid+'">'+row.amount_due+'</span></td>';
					table_html+='<td><select class="form-control" name="status" id="status_'+row.uuid+'" onchange="saveStatus(this,\''+row.uuid+'\',\''+row.status+'\')">';
					if(row.status=="reconciled"){
					table_html +='<option value="Create missing links">Create missing links</option>';
					//table_html +='<option value="pending">Pending</option>';
					table_html +='<option value="reconciled" selected>Reconciled</option>';
					}else if(row.status=="need to confirm" || row.status=="Create missing links"){
						table_html +='<option value="Create missing links" selected>Create missing links</option>';
						table_html +='<option value="pending">Pending</option>';
						if(row.paid_in>0 && row.paid_out==0){
							table_html +='<option value="reconciled">Scan Remittance Advice & Reconcile</option>';
						}else if(row.paid_out>0 && row.paid_in==0){
							table_html +='<option value="reconciled">Scan Bill & Reconcile</option>';
						}
					}else{
						table_html +='<option value="Create missing links">Create missing links</option>';
						table_html +='<option value="pending" selected>Pending</option>';
						if(row.paid_in>0 && row.paid_out==0){
							table_html +='<option value="reconciled">Scan Remittance Advice & Reconcile</option>';
						}else if(row.paid_out>0 && row.paid_in==0){
							table_html +='<option value="reconciled">Scan Bill & Reconcile</option>';
						}
					}
					table_html +='</select></td>';
				
				var commentStr=row.comment;
				if(commentStr!=""){
					table_html+='<td><span class="'+row.uuid+'"><span id="note_'+row.uuid+'">'+row.comment+'</span> <a href="javascript:void(0)" onclick="editNote(\''+row.uuid+'\')" title="Edit"><i class="table-edit"></i></a></span></td>';
				}else{
					table_html+='<td><span class="'+row.uuid+'"><a href="javascript:void(0)" onclick="addNote(\''+row.uuid+'\')" title="Add">Add</a></span></td>';
				}
				table_html+='<td><a href="bank_entry.shtml?uuid='+row.uuid+'"><i class="fa fa-pencil"></i></a>';
				if(isAdminUser==1 || isAdminUser=="1"){
				table_html+='&nbsp;<a class="delete_icon_'+row.uuid+'" href="javascript:void(0)" onClick="deleteBankEntry(\''+row.uuid+'\')"><i class="fa fa-trash"></i></a>';
				}
				if(row.Receipts!=''){
					table_html+='&nbsp;';
					if(showallReceiptsFlag==true){
					table_html+='<span class="hideReceiptDetails_'+row.uuid+' hideReceiptDetails hidden-xs" style=""><a href="javascript:void(0)" onclick="viewReceipt(\''+row.uuid+'\')" title="Hide Receipt"><i class="fa fa-eye-slash"></i></a></span><a href="javascript:void(0)" onclick="viewReceipt(\''+row.uuid+'\')" title="Show Receipt"><span class="showReceiptDetails_'+row.uuid+' showReceiptDetails" style="display:none;"><i class="fa fa-eye"></i></a></span>';
					}else{
					table_html+='<span class="hideReceiptDetails_'+row.uuid+' hideReceiptDetails hidden-xs" style="display:none;"><a href="javascript:void(0)" onclick="viewReceipt(\''+row.uuid+'\')" title="Hide Receipt"><i class="fa fa-eye-slash"></i></a></span><a href="javascript:void(0)" onclick="viewReceipt(\''+row.uuid+'\')" title="Show Receipt"><span class="showReceiptDetails_'+row.uuid+' showReceiptDetails" style=""><i class="fa fa-eye"></i></a></span>';
					}
				}
				table_html+='</td>';
				if(refRowUUID==""){					
					table_html+='</tr>';
				}else{
					$('.invoice_'+refRowUUID).html("");
					
					$('.invoice_'+refRowUUID).html(table_html);
				}
				var receiptTableHtmlStr="";
				if(row.Receipts!=''){
					var secondTRClass="";
					if(row.paid_in>0 && row.paid_out==0){
						secondTRClass='receiptTrClass';
					}else if(row.paid_out>0 && row.paid_in==0){
						secondTRClass='paymentTrClass';
					}
					if(showallReceiptsFlag==true){
						receiptTableHtmlStr+='<tr id="displayReceipt_'+row.uuid+'" class="detailTrClass '+secondTRClass+' hidden-xs" >';
					}else{
						receiptTableHtmlStr+='<tr id="displayReceipt_'+row.uuid+'" class="detailTrClass '+secondTRClass+' hidden-xs" style="display:none;" >';
					}
					receiptTableHtmlStr+='<td colspan="14" align="left" style="background:#f5fafc; position:relative;" class="tdmrgnbtm"><div class="payment-detail"><table border="0" cellspacing="0" cellpadding="0" class="table table-hover" style="background:#fff; border-radius:5px; margin-bottom: 0px;"><tr>';
					
					if(row.paid_in>0 && row.paid_out==0){
						receiptTableHtmlStr+='<td><strong>Receipt No.</strong></td><td><strong>Sales Invoice No.</strong></td><td><strong>Customer Account No.</strong></td><td><strong>Entry Date</strong></td><td><strong>Mode of Payment</strong></td><td><strong>Amount Received</strong></td><td><strong>Remittance Advice</strong></td>';
					}else if(row.paid_out>0 && row.paid_in==0){
						receiptTableHtmlStr+='<td><strong>Payment No.</strong></td><td><strong>Purchase Invoice No.</strong></td><td><strong>Supplier Account No.</strong></td><td><strong>Entry Date</strong></td><td><strong>Mode of Payment</strong></td><td><strong>Amount Received</strong></td><td><strong>Bill</strong></td>';
					}
					receiptTableHtmlStr+='</tr>';
					var count=1;
					
					$.each(row.Receipts, function(i,newRow){
						var receiptdate= newRow.date;
						var passTableNameStr="";
						if(newRow.form=="payment"){
							passTableNameStr='Payments';
						}else if(newRow.form=="receipt"){
							passTableNameStr='Receipts';
						}
						
						receiptTableHtmlStr+='<tr>';
						if(newRow.uuid!=""){
							if(newRow.form=="payment"){
								receiptTableHtmlStr+='<td><a target="_blank" href="payment.shtml?uuid='+newRow.uuid+'" title="Go to Payment Detail">'+newRow.receipt_id+'</a></td>';
							}else if(newRow.form=="receipt"){
								receiptTableHtmlStr+='<td><a target="_blank" href="receipt.shtml?uuid='+newRow.uuid+'" title="Go to Receipt Detail">'+newRow.receipt_id+'</a></td>';
							}
						}else{
							receiptTableHtmlStr+='<td>'+newRow.receipt_id+'</td>';
						}
						if(newRow.inv_uuid!=""){
							if(newRow.form=="payment"){
								receiptTableHtmlStr+='<td><a target="_blank" href="purchase_invoice.shtml?uuid='+newRow.inv_uuid+'" title="Go to Purchase Invoice Detail">'+newRow.inv_no+'</a></td>';
							}else{
								receiptTableHtmlStr+='<td><a target="_blank" href="invoice.shtml?uuid='+newRow.inv_uuid+'" title="Go to Invoice Detail">'+newRow.inv_no+'</a></td>';
							}
						}else{
							receiptTableHtmlStr+='<td>'+newRow.inv_no+'</td>';
						}
						receiptTableHtmlStr+='<td><a target="_blank" href="customers.shtml?keyword='+newRow.client_name+'" title="'+newRow.client_id+' ('+newRow.client_name+')">'+newRow.client_id+' ('+newRow.client_name+')</td>';
						receiptTableHtmlStr+='<td>'+receiptdate+'</td><td>'+newRow.mode+'</td><td>'+newRow.amount+'</td>';
						if(newRow.doc_name){
							if(newRow.doc_name!=""){
								if(newRow.doc_uuid!=""){
									receiptTableHtmlStr+='<td>'+newRow.doc_name+' <a onclick="download_file(\''+newRow.doc_uuid+'\')" href="javascript:void(0)" title="Download '+newRow.doc_name+'"><i class="icon-download-alt"></i></a> <a onclick="open_upload_window(\''+row.uuid+'\',\''+newRow.uuid+'\',\''+passTableNameStr+'\', \'reupload\')" href="javascript:void(0)" title="Upload"><i class="icon-upload-alt"></i></a></td>';
								}else{
									receiptTableHtmlStr+='<td>'+newRow.doc_name+' <a onclick="open_upload_window(\''+row.uuid+'\',\''+newRow.uuid+'\',\''+passTableNameStr+'\', \'reupload\')" href="javascript:void(0)" title="Upload"><i class="icon-upload-alt"></i></a></td>';
								}
							}else{
							//receiptTableHtmlStr+='<td>No Attached</td>';
								receiptTableHtmlStr+='<td>No Attached (<a onclick="open_upload_window(\''+row.uuid+'\',\''+newRow.uuid+'\',\''+passTableNameStr+'\')" href="javascript:void(0)" title="Upload"><i class="icon-upload-alt"></i></a>)</td>';
							}
						}else{
							//receiptTableHtmlStr+='<td>No Attached</td>';
							receiptTableHtmlStr+='<td>No Attached (<a onclick="open_upload_window(\''+row.uuid+'\',\''+newRow.uuid+'\',\''+passTableNameStr+'\')" href="javascript:void(0)" title="Upload"><i class="icon-upload-alt"></i></a>)</td>';
						}
				
						receiptTableHtmlStr+='</tr>';
						count++;
					});
					receiptTableHtmlStr+='</table></div></td></tr>';
					//table_html+='</div></table></td></tr>';
				}else{
					//table_html+='</tr>';
				}
				table_html+=receiptTableHtmlStr;
				if(refRowUUID!=""){
					$('#displayReceipt_'+refRowUUID).remove();
					$('.invoice_'+refRowUUID).after(receiptTableHtmlStr);
				}
			});
				if(refRowUUID!=""){
					
				}else{
					$('#content_table').append(table_html);
				}
				$('#table-breakpoint').basictable({
    				breakpoint: 751
   				 });
				complete=false;
				$('#display_more_btn').show();	
				
			}
		$('#img_loading_div').hide();
		completeScroll=false;
	});
}

function deleteBankEntry(e){
	var r = confirm("Are you sure to delete?");
	if (r == true) {
   		if(e!=""){
			$.ajax({
				type: "GET",
				dataType: "json",
				url: "deletebankentry.cgi",
				data: {"delete_uuid" : e},
				cache: false,
				success: function(html)	{
					if(html.success){
						__alertModalBox(html.success);
						$(".invoice_"+e).remove();
						$("#displayReceipt_"+e).remove();
					}else if(html.error){
						__alertModalBox(html.error);
					}
				}
			});
		}else{
			__alertModalBox('This entry can\'t be deleted!');
		}
	}
}

function remove_from_set(){
	var selectedStr="";
	$('.check').each(function(){
		if($(this).is(":checked")){
			if(selectedStr==''){
				selectedStr=$(this).val();
			}else{
				selectedStr+=","+$(this).val();
			}
		}
	});
	$("#remove_selected").val(selectedStr);
	var get_selectedStr=$("#remove_selected").val();
	
	if (setUUID!="") {
		if(get_selectedStr!=""){
   			$.ajax({
				type: "POST",
				dataType: "json",
				url: "deletesetrecrods.cgi",
				data: {"selected_uuids" : get_selectedStr, "set_uuid" : setUUID},
				cache: false,
				success: function(html)	{
					if(html.success){
						__alertModalBox(html.success);
						refreshTable();
					}else if(html.error){
						__alertModalBox(html.error);
					}
				}
			});
		}else{
			__alertModalBox('Please select some entries to remove from set!');
		}
	}else{
		__alertModalBox('Please select a set!');
	}
	
}

function c_cancelNewPurchaseInvoice(){
	$(".c_addPurchasbtn").hide();
	
	$("#c_purchaseInvEntry").hide();
	get_suppliers("","c_n_supplierDropdown","supplier");
	$("#c_n_purchase_amount").val("");
	$("#c_n_purchase_bill").val("");
	$("#c_n_uuid_analysis_ledger").val("");
	$("#c_n_uuid_analysis_account").val("");
	$('#c_is_vat').attr("checked", false);
}

function cancelNewPurchaseInvoice(){
	$("#reconcileWin").show();
	$(".addPurchasbtn").show();
	
	$("#purchaseInvEntry").hide();
	get_suppliers("","supplierDropdown","supplier");
	$("#n_purchase_amount").val("");
	$("#n_purchase_bill").val("");
	$("#n_uuid_analysis_ledger").val("");
	$("#n_uuid_analysis_account").val("");
	$('#is_vat').attr("checked", false);
}

function clearAlertMsg(){
	$("#pi_window_smsg").html("");
}

function addPurchaseInvWin(){
	$("#pi_window_smsg").html("");
	$("#n_purchase_bill").val("");
	$("#n_purchase_amount").val("");
	get_suppliers("","supplierDropdown","supplier");
	get_analysis_ledger();
	get_ledger_accounts();
	var bankamountField= $("#bankamountField").val();
	
	var bank_uuid= $("#bankentryuuidField").val();
	var due_amount= $(".amount_due_"+bank_uuid).val();
	
	due_amount= Number(due_amount);
	bankamountField= Number(bankamountField);
	
	if(due_amount!="" && due_amount!=0){
		$("#n_purchase_amount").val(due_amount);
	}else{
		$("#n_purchase_amount").val(bankamountField);
	}
	
	$(".addPurchasbtn").hide();
	$("#reconcileWin").hide();
	$("#purchaseInvEntry").show();
}

	function get_analysis_ledger(customer_uuid,div){
		customer_uuid = typeof customer_uuid !== 'undefined' ? customer_uuid : '';
		$('.analysisledgerClass').find('.ui-autocomplete-input').val('');
		var jsonRow = 'getledgersonsearch.cgi?srch=';
		if(customer_uuid!=""){
			jsonRow+='&client='+customer_uuid;
		}
		
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';
				var returnUUIDStr="";
				if(result.error){
				
				}else{
					var i=0;
					$.each(result, function(i,item){
						returnUUIDStr=item.uuid;
						html += '<option value="'+item.uuid+'">'+item.name+'</option>';
						i++;
					});
				}
				$('.analysis_ledgers').html(html);
				if(customer_uuid!=""){
					if(div!=""){
						if(i==1){
						$('#'+div).val(returnUUIDStr);
						}
						$('#'+div).combobox("destroy");
						$('#'+div).combobox();
					}else{
						if(i==1){
						$('.analysis_ledgers').val(returnUUIDStr);
						}
						$('.analysis_ledgers').combobox("destroy");
						$('.analysis_ledgers').combobox();
					}
				}else{
					$('.analysis_ledgers').combobox();
				}
			}
		});
	}
	
	
	function get_ledger_accounts(customer_uuid, ledger_uuid, div){
		customer_uuid = typeof customer_uuid !== 'undefined' ? customer_uuid : '';
		ledger_uuid = typeof ledger_uuid !== 'undefined' ? ledger_uuid : '';
		div = typeof div !== 'undefined' ? div : '';
		//console.log("1:"+customer_uuid+" 2:"+ledger_uuid+" 3:"+div);
		
		$('.analysisaccountClass').find('.ui-autocomplete-input').val('');
		var jsonRow = 'getanalysisaccountsonsearch.cgi?srch=';
		if(customer_uuid!=""){
			jsonRow+='&client='+customer_uuid;
		}else{
			if(ledger_uuid!=""){
				jsonRow+='&ledger_uuid='+ledger_uuid;
			}
			jsonRow+='&money=out';
		}
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';
				var returnUUIDStr="";
				if(result.error){
				
				}else{
					var count=0;
					$.each(result, function(i,item){
						returnUUIDStr=item.uuid;
						html += '<option value="'+item.uuid+'">'+item.name+'</option>';
						count++;
					});
				}
				
				if(customer_uuid!=""){
					if(div!=""){
						$('#'+div).html(html);
						if(count==1){
							$('#'+div).val(returnUUIDStr);
						}
						$('#'+div).combobox("destroy");
						$('#'+div).combobox();
					}else{
						$('.analysis_accounts').html(html);
						if(count==1){
							$('.analysis_accounts').val(returnUUIDStr);
						}
						$('.analysis_accounts').combobox("destroy");
						$('.analysis_accounts').combobox();
					}
				}else{
					$('.analysis_accounts').html(html);
					$('.analysis_accounts').combobox();
				}
			}
		});
	}
	
function addPurchaseInvForMisiingLinks(){
	$("#cpi_window_emsg").html("");
	$("#c_n_purchase_bill").val("");
	$("#c_n_purchase_amount").val("");
	get_suppliers("","c_n_supplierDropdown","supplier");
	get_analysis_ledger();
	get_ledger_accounts();
	
	var bankamountField= $("#c_bankamountField").val();
	
	var bank_uuid= $("#c_bankentryuuidField").val();
	var due_amount= $(".amount_due_"+bank_uuid).val();
	
	due_amount= Number(due_amount);
	bankamountField= Number(bankamountField);
	
	if(due_amount!="" && due_amount!=0){
		$("#c_n_purchase_amount").val(due_amount);
	}else{
		$("#c_n_purchase_amount").val(bankamountField);
	}
	
	$(".c_addPurchasbtn").hide();
	$("#missingLinkForm").hide();
	$("#c_purchaseInvEntry").show();
}
function saveNewPurchaseInvoice(){
	$("#pi_window_smsg").html("");
	var supplier_uuid= $("#supplierDropdown").val();
	var amount= $("#n_purchase_amount").val();
	var bank_uuid= $("#bankentryuuidField").val();
	var uuid_analysis_ledger= $("#n_uuid_analysis_ledger").val();
	var uuid_analysis_account= $("#n_uuid_analysis_account").val();
	//alert(uuid_analysis_ledger+" 2:"+uuid_analysis_account);
	var is_vat=false;
	if($('#is_vat').is(':checked')){
		is_vat= true;
	}
	if(supplier_uuid!="" && amount!=""){
		var prompt_title="Please wait...";
		var prompt_html='<img src="loading.gif"  style="padding:20px;" width="32" >';
		processPrompt(prompt_title,prompt_html,true,false);
		var data = new FormData();
		var files= $('#n_purchase_bill')[0].files;
		data.append('client_uuid', supplier_uuid);
		data.append('amount', amount);
		data.append('is_vat', is_vat);
		data.append('bank_uuid', bank_uuid);
		data.append('uuid_ledger', uuid_analysis_ledger);
		data.append('uuid_account', uuid_analysis_account);
		$.each(files, function(key, value){
			data.append('file_content', value);
		});
	
		$.ajax({
			type: "POST",
			url: "autocreatepinpay.cgi",
			data: data,
			dataType: 'json',
			cache: false,
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			success: function(html){
				if(html.success){
					$("#purchaseInvEntry").hide();
					$("#n_purchase_amount").val("");
					$("#r_window_smsg").html(html.success);
					$('#is_vat').attr("checked", false);
					processPrompt("","",false,true);
				}else if(html.error){
					$("#pi_window_smsg").html(html.error);
					processPrompt("","",false,true);
				}
			}
		});
	}else{
		$("#pi_window_smsg").html("* Please enter amount and supplier name!");
	}
}

function c_saveNewPurchaseInvoice(){
	$("#cpi_window_emsg").html("");
	var supplier_uuid= $("#c_n_supplierDropdown").val();
	var amount= $("#c_n_purchase_amount").val();
	var bank_uuid= $("#c_bankentryuuidField").val();
	var uuid_analysis_ledger= $("#c_n_uuid_analysis_ledger").val();
	var uuid_analysis_account= $("#c_n_uuid_analysis_account").val();
	alert(uuid_analysis_ledger+" 2:"+uuid_analysis_account);
	var is_vat=false;
	if($('#c_is_vat').is(':checked')){
		is_vat= true;
	}
	if(supplier_uuid!="" && amount!=""){
		var prompt_title="Please wait...";
		var prompt_html='<img src="loading.gif"  style="padding:20px;" width="32" >';
		processPrompt(prompt_title,prompt_html,true,false);
		
		//if(uuid_analysis_ledger!="" && uuid_analysis_account!=""){
			var data = new FormData();
			var files= $('#c_n_purchase_bill')[0].files;
			data.append('client_uuid', supplier_uuid);
			data.append('amount', amount);
			data.append('is_vat', is_vat);
			data.append('bank_uuid', bank_uuid);
			data.append('uuid_ledger', uuid_analysis_ledger);
			data.append('uuid_account', uuid_analysis_account);
			$.each(files, function(key, value){
				data.append('file_content', value);
			});
			$.ajax({
				type: "POST",
				url: "autocreatepinpay.cgi",
				data: data,
				dataType: 'json',
				cache: false,
				processData: false, // Don't process the files
				contentType: false, // Set content type to false as jQuery will tell the server its a query string request
				success: function(html){
					if(html.success){
						getreceiptdetails('bank_uuid');
						$("#c_purchaseInvEntry").hide();
						$("#c_n_purchase_amount").val("");
						$("#c_window_smsg").html(html.success);
						$('#c_is_vat').attr("checked", false);
						processPrompt("","",false,true);
					}else if(html.error){
						$("#cpi_window_emsg").html(html.error);
						processPrompt("","",false,true);
					}
				}
			});
		//}else{
		//	$("#cpi_window_emsg").html("* Please select analysis ledger and account!");
		//}
	}else{
		$("#cpi_window_emsg").html("* Please enter amount and supplier name!");
	}
}
function saveCreateMissingLinks(){
	var formtype= $("#c_formTypeField").val();
	var uuid=$("#c_bankentryuuidField").val();
	var client_uuid= $('#c_linkcustomer').val();
	var invoice_uuid= $('#c_invoice_uuid').val();
	var receipt_uuid= $('#c_receipt_uuid').val();
	
	if((client_uuid!="" || invoice_uuid!="" || receipt_uuid!="") && uuid!=""){
		var goAhead=false;
		if(formtype=="Receipt"){
			var errorMsg = '* Please upload Remittance!';
			goAhead=true;
		}else if(formtype=="Payment"){
			if(invoice_uuid!="" || receipt_uuid!=""){
				var errorMsg = '* Please upload scanned Bill !';
				if ($('#c_document_attach')[0].files && $('#c_document_attach')[0].files[0]) {
					goAhead=true;
				}else{
					goAhead=false;
					$('#c_window_emsg').html(errorMsg);
				}
			}else{
				goAhead=true;
			}
		}
		
		if(goAhead){
			var prompt_title="Please wait...";
			var prompt_html='<img src="loading.gif"  style="padding:20px;" width="32" >';
			processPrompt(prompt_title,prompt_html,true,false);
			
			var saveFlag=false;
			var data = new FormData();
			var files= $('#c_document_attach')[0].files;
			data.append('customer_uuid', client_uuid);
			data.append('bank_entry_uuid', uuid);
			data.append('req_from', 'bank_entry');
			$.each(files, function(key, value){
				data.append('file_content', value);
			});
				
			if(formtype=="Receipt"){
				data.append('action', 'sale_invoice');
				data.append('sale_invoice_uuid', invoice_uuid);
				data.append('receipt_uuid', receipt_uuid);
				//var datastringStr="action=sale_invoice&customer_uuid="+client_uuid+"&bank_entry_uuid="+uuid+"&sale_invoice_uuid="+invoice_uuid+"&receipt_uuid="+receipt_uuid;
				saveFlag=true;
			}else if(formtype=="Payment"){
				data.append('action', 'purchase_invoice');
				data.append('purchase_inv_uuid', invoice_uuid);
				data.append('payment_uuid', receipt_uuid);
				//var datastringStr="action=purchase_invoice&customer_uuid="+client_uuid+"&bank_entry_uuid="+uuid+"&purchase_inv_uuid="+invoice_uuid+"&payment_uuid="+receipt_uuid;
				saveFlag=true;
			}
			if(saveFlag==true){
				$.ajax({
					type: "POST",
					url: "createmissinglinks.cgi",
					data: data,
					dataType: 'json',
					cache: false,
					processData: false, // Don't process the files
					contentType: false, // Set content type to false as jQuery will tell the server its a query string request
					success: function(html){
						if(html.success){
							processPrompt('','',false,true);
							var msg=html.success;
							if(html.success3){
								if(msg!=""){
									msg+=" & task "+html.success3;
								}else{
									msg=html.success3;
								}
							}
							$('#c_window_smsg').html(msg);
							$("#invNoVal").val('');
							$("#c_invoice_uuid").val("");
							$("#c_inv_no").val("");
							$("#c_recipt_no").val("");
							$("#c_receipt_uuid").val("");
							if(formtype=="Receipt"){
								get_suppliers("","c_linkcustomer");
							}else if(formtype=="Payment"){
								get_suppliers("","c_linkcustomer","supplier");
							}
							$("#missingLinkForm").hide();
							$("#createMissingTable").html("");	
							getreceiptdetails('bank_uuid');
									
						}else if(html.success2){
							processPrompt('','',false,true);
							$('#c_window_smsg').html(html.success2);
							$("#invNoVal").val('');
							$("#c_invoice_uuid").val("");
							$("#c_inv_no").val("");
							$("#c_recipt_no").val("");
							$("#c_receipt_uuid").val("");
							if(formtype=="Receipt"){
								get_suppliers("","c_linkcustomer");
							}else if(formtype=="Payment"){
								get_suppliers("","c_linkcustomer","supplier");
							}
							$("#missingLinkForm").hide();
							$("#createMissingTable").html("");	
							getreceiptdetails('bank_uuid');
						}else if(html.error){
							processPrompt('','',false,true);
							$('#c_window_emsg').html(html.error);
						}
					},
					error: function( jqXHR, textStatus, errorThrown ){
						processPrompt('','',false,true);
						$('#c_window_emsg').html('<span style="color:#FF0000">* Sorry, please try after some time!</span>');
					},
					complete:function( jqXHR, textStatus){
						processPrompt(prompt_title,prompt_html,false,true);
					}
				});
			}else{
				$('#c_window_emsg').html('This link can\'t be created!');
			}
		}
		/**else{
			if(formtype=="Receipt"){
				var errorMsg = '* Please upload Remittance!';
			}else if(formtype=="Payment"){
				var errorMsg = '* Please upload scanned Bill !';
			}
			$('#c_window_emsg').html(errorMsg);
		}**/
	}else{
		$('#c_window_emsg').html('Please fill atleast one field!');
	}
}

function deletemissingLink(e,formtype){
	var qryStr="";
	if(formtype=="Receipt"){
		qryStr='sale';
	}else if(formtype=="Payment"){
		qryStr='purchase';
	}
	if(qryStr!="" && e!=""){
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "unlink_bankentry.cgi",
		data: {"action" : qryStr, "entry_link_uuid" : e},
		cache: false,
		success: function(html)	{
			if(html.success){
				$('#c_window_smsg').html(html.success);
				getreceiptdetails('bank_uuid');
				//$('#reconcileManager').modal('hide');
			}else if(html.error){
				$('#r_window_emsg').html(html.error);
				$("#invNoVal").val('');
				$("#invamountVal").val('');
				$("#invUUIDVal").val("");
				$("#clientName").val("");
				$("#clientUUID").val("");
			}
		}
	});
	}else{
	
	}
}

function getreceiptdetails(para){
	var id=$("#c_bankentryuuidField").val();
	var formtype= $("#c_formTypeField").val();
	var qryStr='';
	if(formtype=="Receipt"){
		qryStr='sale_invoice';
	}else if(formtype=="Payment"){
		qryStr='purchase_invoice';
	}
	$("#c_inv_no").prop("readonly", false);
	var requestBool=false;
	var cgiStr='getInvoiceclientinfo.cgi';
	
	var valStr='';
	if(para=="rec_no"){
		requestBool=true;
		valStr=$("#c_recipt_no").val();
	}else if(para=="inv_no"){
		requestBool=true;
		valStr=$("#c_inv_no").val();
	}else if(para=="bank_uuid"){
		requestBool=true;
		valStr=id;
		cgiStr='getrecinvclientonload.cgi';
	}
	
	if(requestBool==true && valStr!=""){
		var jsonRow = cgiStr+'?'+para+'='+valStr+'&action='+qryStr;
		$.getJSON(jsonRow,function(result){
			if(para=="bank_uuid"){
				var tableStr="";
				if(result.error){
					$('#createMissingTable').html('');
				}else{
					$.each(result, function(i,b_row){
						if(b_row.error){
							$('#createMissingTable').html('');
						}else{
							tableStr+="<tr>";
							tableStr+="<td>"+b_row.receipt_id+"</td>";
							tableStr+="<td>"+b_row.receipt_date+"</td>";
							tableStr+="<td>"+b_row.invoice_id+"</td>";
							tableStr+="<td>"+b_row.company_name+"</td>";
							tableStr+="<td>"+b_row.amount+"</td>";
							tableStr+="<td><a href='javascript:void(0)' onclick='deletemissingLink(\""+b_row.link_uuid+"\",\""+formtype+"\")'>Unlink</a></td>";
							tableStr+="</tr>";	
						}
					});	
					$("#createMissingTable").html(tableStr);	
				}
			}else{
				if(result.error){
					$('#c_window_emsg').html(result.error);
					$("#c_invoice_uuid").val("");
					$("#c_inv_no").val("");
					$("#c_recipt_no").val("");
					$("#c_receipt_uuid").val("");
					get_suppliers("", "c_linkcustomer");
				}else{
				
					$("#c_invoice_uuid").val(result.invoice_uuid);
					if(result.invoice_id){
						$("#c_inv_no").val(result.invoice_id);
						if(para=="rec_no"){
							$("#c_inv_no").prop("readonly", true);
						}
					}
					if(result.receipt_id){
						$("#c_recipt_no").val(result.receipt_id);
						if(para=="bank_uuid" && result.invoice_id){
							$("#c_inv_no").prop("readonly", true);
						}
					}
					if(result.receipt_uuid){
						$("#c_receipt_uuid").val(result.receipt_uuid);
					}
					
					get_suppliers('', "c_linkcustomer", "",result.company_name);
				}
			}
		});
	}
}

function refreshCommonElements(){
	$('#table-breakpoint').basictable('destroy');
	$('#img_loading_div').show();
	$('#display_more_btn').hide();
	load_data();	
}
function refreshTable(){
	$('#content_table').html('');
	start=0;
	tab='';
	refreshCommonElements();
}

function openmissingLinkForm(){
	$(".c_addPurchasbtn").hide();
	$("#c_purchaseInvEntry").hide();
	
	$('#c_linkcustomer').removeClass("PaymentLinkCustomers");
	$('#c_linkcustomer').removeClass("ReceiptLinkCustomers");
	$("#c_invoice_uuid").val("");
	$("#c_inv_no").val("");
	$("#c_recipt_no").val("");
	$("#c_receipt_uuid").val("");
	var formtype=$("#c_formTypeField").val();
	if(formtype=="Payment"){
		$('#c_CustomerLabel').html("Search For Supplier");
		$('#c_reciptNoLabel').html("Payment no :");
		$('#c_invnoLabel').html("Purchase Invoice no :");
		$('#c_attachdocumentLabel').html("Attach Bill :");
		//$(".attachLabel").css("width", "100"); 
		$('#c_linkcustomer').addClass("PaymentLinkCustomers");
		get_suppliers("","c_linkcustomer","supplier");
	}else if(formtype=="Receipt"){
		$('#c_CustomerLabel').html("Search For Company");
		$('#c_reciptNoLabel').html("Receipt no :");
		$('#c_invnoLabel').html("Sale Invoice no :");
		$('#c_attachdocumentLabel').html("Attach Remittance Advice");
		
		//$(".attachLabel").css("width", "190"); 
		$('#c_linkcustomer').addClass("ReceiptLinkCustomers");
		get_suppliers("","c_linkcustomer");
		
	}
	$("#missingLinkForm").show();
	$(".c_newCreateMisLinkDiv").hide();
	$("#c_newCreateMissingBody").html("");
}

function refreshMissingLinksManager(){
	$(":file").filestyle('clear');
	$("#c_window_emsg").html('');
	$("#c_window_smsg").html('');
	$("#invNoVal").val('');
	$("#c_document_attach").val('');
	$("#c_formTypeField").val('');
	$("#createMissingTable").html('');
	var uuidStr=$("#c_bankentryuuidField").val();
	if(entryFormFlag){
		loadRecPayRows(uuidStr);
	}else{
		refreshBankentryRow(uuidStr);
	}
	var selectedOption=$("#c_selectedStatusField").val();
	if(selectedOption==""){
		$("#status_"+uuidStr).val("pending");
	}else{
		$("#status_"+uuidStr).val(selectedOption);
	}
	$("#c_bankentryuuidField").val("");
	$("#c_selectedStatusField").val("");
	$("#c_bankamountField").val("");
	$("#c_invoice_uuid").val("");
	$("#c_inv_no").val("");
	$("#c_recipt_no").val("");
	$("#c_receipt_uuid").val("");
	//get_suppliers("","c_linkcustomer");
	$("#missingLinkForm").hide();
	$(".c_newCreateMisLinkDiv").hide();
	c_cancelNewPurchaseInvoice();
}

function createmissinglinks(formtype, uuid,selectedOption,amountRec){
	$("#c_formTypeField").val(formtype);
	$("#c_bankentryuuidField").val(uuid);
	$("#c_selectedStatusField").val(selectedOption);
	$("#c_bankamountField").val(amountRec);
	
	//get_suppliers("","c_linkcustomer");
	getreceiptdetails('bank_uuid');
	$('#c_window_smsg').html('');
	$('#c_window_emsg').html('');
	$('#createMisLinkHead').html('');
	if(formtype=="Payment"){
		var headerStr='<th>Payment No</th><th>Payment Date</th><th>Purchase Invoice No</th><th>Customer Name</th><th>Amount</th><th>Action</th>';
		$('#createMisLinkHead').html(headerStr);
	}else if(formtype=="Receipt"){
		var headerStr='<th>Receipt No</th><th>Receipt Date</th><th>Invoice No</th><th>Customer Name</th><th>Amount</th><th>Action</th>';
		$('#createMisLinkHead').html(headerStr);
	}
	$('#createMissingLinksManager').modal('show');
}

function viewReceipt(num){
	$("#displayReceipt_"+num).toggle();
	
	if($(".invoice_"+num).hasClass('selectTable')){
		$(".invoice_"+num).removeClass('selectTable');
		$(".showReceiptDetails_"+num).show();
		$(".hideReceiptDetails_"+num).hide();	
	}else{
		$(".invoice_"+num).addClass('selectTable');
		//$(".receiptDetails_"+num).html('Hide Receipt');
		$(".showReceiptDetails_"+num).hide();
		$(".hideReceiptDetails_"+num).show();
	}
	
}
	function addNote(uuid){
		$.prompt({
			state0: {
				title: 'Add Note',
				html: '<textarea class="form-control" name="bankNote" class="span4" rows="3" id="bankNote"></textarea>',
				buttons: { Cancel: 0 , Save: 1 },																		
				submit:function(e,v,m,f){ 
					if(v==1) {
						e.preventDefault();
						var bankNoteStr= $('#bankNote').val();
						if(bankNoteStr!=''){
							//console.log(uuid);
							//console.log(bankNoteStr);
							$.ajax({
								type: "GET",
								url: "setbankstatus.cgi",
								data: {"uuid": uuid , "value" : bankNoteStr , "action" : "note"},
								dataType: 'json',
								cache: false,
								success: function(html){
									if(html.Success){
										$('.'+uuid).html('');
										var addNoteStr='<span id="note_'+uuid+'">'+html.note+'</span> <a href="javascript:void(0)" onclick="editNote(\''+uuid+'\')" title="Edit"><i class="table-edit"></i></a></span>';
										$('.'+uuid).html(addNoteStr);
										$('#bankNote').val();
										$.prompt.close();
									}else{
										$('#bankNote').val();
										$.prompt.close();
									}
									//console.log(html);
									
								}
							});
						}else{
							var errmsg = '<div style="color:#CC0000;">* Please add note!</div>';
							$('#bankNote').before(errmsg);
						}
					}
					if(v==0) {
						$.prompt.close();
					}
				}
			},
		});
	}
	function editNote(uuid){
		var noteStr= $('#note_'+uuid).html();
		var chPos=noteStr.indexOf(")");
		var note= noteStr.substr(chPos+1);
		$.prompt({
			state0: {
				title: 'Edit Note',
				html: '<textarea class="form-control" name="bankNote" class="span4" rows="3" id="bankNote">'+note+'</textarea>',
				buttons: { Cancel: 0 , Save: 1 },																		
				submit:function(e,v,m,f){ 
					if(v==1) {
						e.preventDefault();
						var bankNoteStr= $('#bankNote').val();
						if(bankNoteStr!=''){
							//console.log(uuid);
							//console.log(bankNoteStr);
							$.ajax({
								type: "GET",
								url: "setbankstatus.cgi",
								data: {"uuid": uuid , "value" : bankNoteStr , "action" : "note"},
								dataType: 'json',
								cache: false,
								success: function(html){
									if(html.Success){
										$('.'+uuid).html('');
										var addNoteStr='<span id="note_'+uuid+'">'+html.note+'</span> <a href="javascript:void(0)" onclick="editNote(\''+uuid+'\')" title="Edit"><i class="table-edit"></i></a></span>';
										$('.'+uuid).html(addNoteStr);
									
										$('#bankNote').val();
										$.prompt.close();
									}else{
										$('#bankNote').val();
										$.prompt.close();
									}
								}
							});
						}else{
							var errmsg = '<div style="color:#CC0000;">* Please add note!</div>';
							$('#bankNote').before(errmsg);
						}
					}
					if(v==0) {
						$.prompt.close();
					}
				}
			},
		});
	}
	
	function callstatuscgi(valueStr,uuid){
		$.ajax({
			type: "GET",
			url: "setbankstatus.cgi",
			data: {"uuid": uuid , "value" : valueStr , "action" : "status"},
			dataType: 'json',
			cache: false,
			success: function(html){
				if(html.Success){
				if(valueStr=="reconciled"){
					$('#status'+uuid+ 'option[value="reconciled"]').text('Reconciled');
					$('.date_'+uuid).removeClass('label-warning');
					$('.date_'+uuid).removeClass('label-warning');
					$('.date_'+uuid).addClass('label-success');
				}else if(valueStr=="need to confirm"){
					$('.date_'+uuid).removeClass('label-warning');
					$('.date_'+uuid).removeClass('label-success');
					$('.date_'+uuid).addClass('label-warning');
				}else{
					$('.date_'+uuid).removeClass('label-warning');
					$('.date_'+uuid).removeClass('label-success');
					$('.date_'+uuid).addClass('label-warning');
				}
				}
			}
		});
	}
	
	function refreshReconcileManager(){
		$('body').removeClass("modal-open");
		$(":file").filestyle('clear');
		$("#invNoVal").val('');
		$("#searchInvoiceField").val('');
		$("#invamountVal").val('');
		$("#formTypeField").val('');
		$("#bankamountField").val('');
		$(".reconcileTable").html('');
		
		$("#invamountLabel").html('');
		$("#invnoLabel").html('');
		$("#attachdocumentLabel").html('');
		$("#c_document_attach").val('');
		var uuidStr=$("#bankentryuuidField").val();
		if(entryFormFlag){
			loadRecPayRows(uuidStr);
		}else{
			refreshBankentryRow(uuidStr);
		}
		var selectedOption=$("#selectedStatusField").val();
		if(selectedOption==""){
			$("#status_"+uuidStr).val("pending");
		}else{
			$("#status_"+uuidStr).val(selectedOption);
		}
		$("#bankentryuuidField").val("");
		$("#selectedStatusField").val("");
		$("#invUUIDVal").val("");
		$("#clientName").val("");
		$("#clientUUID").val("");
		
		//
		$("#purchaseInvEntry").hide();
		$("#reconcileWin").show();
		$(".addPurchasbtn").show();
		$("#n_purchase_amount").val("");
		
		$('#is_vat').attr("checked", false);
	}
	
	function refreshPurInvoiceTable(){
	 	var tableStr='';
		var tableHeadingStr= '<thead><tr><th style="margin-left:-7px;"><div class="th-inner">PIN</div></th><th><div class="th-inner">Amount</div></th><th><div class="th-inner">Date</div></th><th><div class="th-inner">Status</div></th><th><div class="th-inner">Client</div></th></tr></thead>';
	
		var purcInvJsonStr = 'loadpurchase_invoices.cgi?start=0&end=1000&tablname=Invoices';
		var inv_keyStr= $("#searchInvoiceField").val();
		if(inv_keyStr!=""){
			purcInvJsonStr+="&keyword="+inv_keyStr;
		}
		var JSONdata=new Array();
		var statusArr=new Array();
		var uuidArr=new Array();
		$.getJSON(purcInvJsonStr,function(result){
			if(result.Alert){
				
			}else{
			 	$.each(result.uuid, function(i,item){
					JSONdata[i]=new Array();
					uuidArr[i]=item					
				}); 
				$.each(result.PurchaseId, function(i,item){
					JSONdata[i][0]='<td id="r_invno">'+item+'</td>';
				}); 
				$.each(result.BenfName, function(i,item){
					JSONdata[i][4]='<td id="r_client">'+item+'</td>';	
				});
				$.each(result.ClientID, function(i,item){					
					JSONdata[i][5]='<td id="r_clientuuid" style="display:none;">'+item+'</td>';
					});
				$.each(result.PurchasedDate, function(i,item){					
					JSONdata[i][2]='<td id="r_invdate">'+item+'</td>';
				});
				$.each(result.Balance, function(i,item){					
					JSONdata[i][1]='<td id="r_invamount">'+item+'</td>';
				});
				$.each(result.Status, function(i,item){					
					JSONdata[i][3]='<td id="r_invStatus">'+item+'</td>';
					statusArr[i]=item;
				});
							
				$.each(JSONdata, function(i,row){
					tableStr+='<tr id="'+uuidArr[i]+'" onClick="clickedRowVals(\''+uuidArr[i]+'\')" ';
					if(statusArr[i]=="Paid"){
						tableStr+=' style="display:none;"';
					}else if(statusArr[i]=="Partially Paid"){
						tableStr+=' class="warning"';
					}
					tableStr+='>';
					$.each(row, function(i,col){
						tableStr+=col;
					});
					tableStr+='</tr>';
				});
				if(tableStr!=""){
					var mainTableSTr=tableHeadingStr+tableStr;
					$(".reconcileTable").html(mainTableSTr);
				}
			}
		});
	}
	
	function refreshInvoicesTable(){
	 	var tableStr='';
		var tableHeadingStr= '<thead><tr><th><div class="th-inner">Inv no</div></th><th><div class="th-inner">Amount</div></th><th><div class="th-inner">Date</div></th><th><div class="th-inner">Status</div></th><th><div class="th-inner">Invoiced to</div></th></tr></thead>';
		
		var jsonRowStr = 'loadinvoices.cgi?start=0&end=50&tablname=Invoices&tab=due';
		var inv_keyStr= $("#searchInvoiceField").val();
		if(inv_keyStr!=""){
			jsonRowStr+="&keyword="+inv_keyStr;
		}
		$.getJSON(jsonRowStr,function(result){	
			if(result.Alert){
				//
			}else{
				tableStr+= '<tbody>';
				$.each(result, function(i,row){
					if(row.uuid){
						var invoiceStatus='';
						if(row.invoice_status){
							invoiceStatus=row.invoice_status;
						}
						tableStr+= '<tr id="'+row.uuid+'" onClick="clickedRowVals(\''+row.uuid+'\')"';
						if(invoiceStatus.toLowerCase()=="Partially Paid"){
							tableStr+= ' class="warning"';
						}else if(row.AgeDay>60){
							tableStr+= ' class="warning"';
						}else if(row.AgeDay>30){
							tableStr+= ' class="info"';
						}
						tableStr+= '>';
						if(row.inv_id){
						tableStr+= '<td id="r_invno">'+row.inv_id+'</td>';
						}
         				tableStr+= '<td id="r_invamount">'+row.balance_due_base_currency+'</td>';
         				tableStr+= '<td id="r_invdate">'+row.inv_date+'</td>';
         				tableStr+= '<td id="r_invStatus">'+invoiceStatus+'</td>';
         				tableStr+= '<td id="r_client">'+row.company_Name+'</td>';
         				tableStr+= '<td id="r_clientuuid" style="display:none;">'+row.company_uuid+'</td>';
						tableStr+= '</tr>';
						
					}
				});
				tableStr+= '</tbody>';
			}
			
			if(tableStr!=""){
				var mainTableSTr=tableHeadingStr+tableStr;
				$(".reconcileTable").html(mainTableSTr);
			}
		});
	}
	
	function clickedRowVals(e){
		var bank_amount=$("#bankamountField").val();
		
		$("#invUUIDVal").val(e);
		
		var r_clientuuid=$("#"+e).find('#r_clientuuid').html();
		$("#clientUUID").val(r_clientuuid);
		
		var r_clientName=$("#"+e).find('#r_client').html();
		$("#clientName").val(r_clientName);
		
		var r_invno=$("#"+e).find('#r_invno').html();
		$("#invNoVal").val(r_invno);
		var r_invamount=$("#"+e).find('#r_invamount').html();
		var bankID=$("#bankentryuuidField").val();
		
		var due_amount=$(".amount_due_"+bankID).html();
		
		due_amount= Number(due_amount);
		bank_amount= Number(bank_amount);
		r_invamount= Number(r_invamount);
		
		if(due_amount!="" && due_amount!=0 && due_amount<=bank_amount){
			if(due_amount<r_invamount){
				//var titleStr="Selected amount is greater than bank entry amount, do you want to continue?"
				$.prompt("", {
					title: "Selected amount is greater than bank due amount, do you want to continue?",
					buttons: { "Yes": false, "No, I m here by mistake": true },
					submit: function(e,v,m,f){
						if(v){
							$("#invamountVal").val("");
							$("#invUUIDVal").val("");
							$("#clientName").val("");
							$("#clientUUID").val("");
							$("#invNoVal").val("");
						}else{
							$("#invamountVal").val(due_amount);
						}
					}
				});
			}else if(r_invamount<due_amount){
				$.prompt("Selected amount is lesser than bank due amount, do you want to continue?", {
					buttons: { "Yes": false, "No, I m here by mistake": true },
					submit: function(e,v,m,f){
						if(v){
							$("#invamountVal").val("");
							$("#invUUIDVal").val("");
							$("#clientName").val("");
							$("#clientUUID").val("");
							$("#invNoVal").val("");
						}else{
							$("#invamountVal").val(r_invamount);
						}
					}
				});
			}else{
				$("#invamountVal").val(r_invamount);
			}
		}else{
			if(bank_amount<r_invamount){
				$.prompt("Selected amount is greater than bank entry amount, do you want to continue?", {
					buttons: { "Yes": false, "No, I m here by mistake": true },
					submit: function(e,v,m,f){
						if(v){
							$("#invamountVal").val("");
							$("#invNoVal").val("");
							$("#invUUIDVal").val("");
							$("#clientName").val("");
							$("#clientUUID").val("");
						}else{
							$("#invamountVal").val(bank_amount);
						}
					}
				});
			}else if(r_invamount<due_amount){
				$.prompt("Selected amount is lesser than bank entry amount, do you want to continue?", {
					buttons: { "Yes": false, "No, I m here by mistake": true },
					submit: function(e,v,m,f){
						if(v){
							$("#invamountVal").val("");
							$("#invUUIDVal").val("");
							$("#clientName").val("");
							$("#clientUUID").val("");
							$("#invNoVal").val("");
						}else{
							$("#invamountVal").val(r_invamount);
						}
					}
				});
			}else{
				$("#invamountVal").val(r_invamount);
			}
		}
	}
	
	function clickedMissingLinkNew(r_no,r_uuid, i_no, i_uuid, amount){
		$('#c_window_emsg').html("");
		var r_uuid = typeof r_uuid !== 'undefined' ? r_uuid : '';
		var i_uuid = typeof i_uuid !== 'undefined' ? i_uuid : '';
		var r_no = typeof r_no !== 'undefined' ? r_no : '';
		var i_no = typeof i_no !== 'undefined' ? i_no : '';
		var r_invamount = typeof r_uuid !== 'undefined' ? amount : '';
		
		var bank_amount=$("#c_bankamountField").val();
		$("#c_invoice_uuid").val(i_uuid);
		$("#c_receipt_uuid").val(r_uuid);
		$("#c_inv_no").val(i_no);
		$("#c_recipt_no").val(r_no);
		
		var bankID=$("#c_bankentryuuidField").val();
		
		var due_amount=$(".amount_due_"+bankID).html();
		
		due_amount= Number(due_amount);
		bank_amount= Number(bank_amount);
		r_invamount= Number(r_invamount);
		
		if(due_amount!="" && due_amount!=0 && due_amount<=bank_amount){
			if(r_invamount>due_amount){
				$('#c_window_emsg').html("Selected amount is greater than bank due amount");
				$("#c_invoice_uuid").val("");
				$("#c_receipt_uuid").val("");
				$("#c_inv_no").val("");
				$("#c_recipt_no").val("");
			}
		}else{
			if(r_invamount>bank_amount){
				$('#c_window_emsg').html("Selected amount is greater than bank amount");
				$("#c_invoice_uuid").val("");
				$("#c_receipt_uuid").val("");
				$("#c_inv_no").val("");
				$("#c_recipt_no").val("");
			}
		}
	}
	
	function refreshBankentryRow(e){
		$('#table-breakpoint').basictable('destroy');
		
		load_data(e);	
	}
	
	function reconcile_bankentry(){
		var bank_uuid= $("#bankentryuuidField").val();
		
		var formTypeField= $("#formTypeField").val();
		var selectiondropdownOption= $("#selectedStatusField").val();
		var bank_amount=$("#bankamountField").val();
		var inv_no=$("#invNoVal").val();
		var amountOfInvoice=$("#invamountVal").val();
		var date_received=$(".date_"+bank_uuid).html();
		var receiptdateArr= date_received.split("-");
		date_received=receiptdateArr[2]+'/'+receiptdateArr[1]+'/'+receiptdateArr[0];
													
		var invoice_uuid=$("#invUUIDVal").val();
		var company_name=$("#clientName").val();
		var client_uuid=$("#clientUUID").val();
		amountOfInvoice=Number(amountOfInvoice);
		bank_amount=Number(bank_amount);
		//console.log(amountOfInvoice+" "+bank_amount);
		if(inv_no!="" && invoice_uuid!="" && client_uuid!="" && bank_uuid!=""){
			if(isNaN(amountOfInvoice)){
				var errorMsg = '* Please add valid Invoice amount!';
				$('#r_window_emsg').html(errorMsg);
			}else{
				var goAhead=false;
				if(formTypeField=="Receipt"){
					var errorMsg = '* Please upload Remittance!';
					goAhead=true;
				}else if(formTypeField=="Payment"){
					var errorMsg = '* Please upload scanned Bill !';
					if ($('#document_attach')[0].files && $('#document_attach')[0].files[0]) {
						 goAhead=true;
					}else{
						goAhead=false;
						$('#r_window_emsg').html(errorMsg);
					}
				}
				
				if(goAhead){
					if(amountOfInvoice<=bank_amount){
						var prompt_title="Please wait...";
						var prompt_html='<img src="loading.gif"  style="padding:20px;" width="32" >';
						processPrompt(prompt_title,prompt_html,true,false);	
					
						var data = new FormData();
						var files= $('#document_attach')[0].files;
						data.append('client_uuid', client_uuid);
						data.append('date_received', date_received);
						data.append('company_name', company_name);
						data.append('amount', amountOfInvoice);
						data.append('uuid_bank_entry', bank_uuid);
						data.append('req_from', 'bank_entry');
						$.each(files, function(key, value){
							data.append('file_content', value);
						});
				
						var urlSTR='';
						if(formTypeField=="Receipt"){
							data.append('inv_no', inv_no);
							data.append('invoice_uuid', invoice_uuid);
							//var dataString = "inv_no="+inv_no+"&date_received="+date_received+"&invoice_uuid="+invoice_uuid+"&company_name="+company_name+"&client_uuid="+client_uuid+"&amount="+amountOfInvoice+"&req_from=bank_entry&uuid_bank_entry="+bank_uuid;
							urlSTR="savebankreceipt.cgi";
						}else if(formTypeField=="Payment"){
							data.append('purchase_inv_no', inv_no);
							data.append('purchase_invoice_uuid', invoice_uuid);
							//var dataString = "purchase_inv_no="+inv_no+"&date_received="+date_received+"&purchase_invoice_uuid="+invoice_uuid+"&company_name="+company_name+"&client_uuid="+client_uuid+"&amount="+amountOfInvoice+"&req_from=bank_entry&uuid_bank_entry="+bank_uuid;
							urlSTR="savebankpayment.cgi";
						}				
						if(urlSTR!=""){
							$.ajax({
								type: "POST",
								dataType: "json",
								url: urlSTR,
								data: data,
								cache: false,
								processData: false, // Don't process the files
								contentType: false, // Set content type to false as jQuery will tell the server its a query string request
								success: function(html)	{
									processPrompt('','',false,true);
									
									if(html.success){
										if(entryFormFlag){
											loadRecPayRows(bank_uuid);
										}else{
											refreshBankentryRow(bank_uuid);
										}
										refreshReconcileManager();
										$('#reconcileManager').modal('hide');
									}else if(html.error){
										$('#r_window_emsg').html(html.error);
										$("#invNoVal").val('');
										$("#invamountVal").val('');
										$("#invUUIDVal").val("");
										$("#clientName").val("");
										$("#clientUUID").val("");
									}
								},
								error: function( jqXHR, textStatus, errorThrown ){
									processPrompt('','',false,true);
									$('#r_window_emsg').html('<span style="color:#FF0000">* Sorry, please try after some time!</span>');
								},
								complete:function( jqXHR, textStatus){
									processPrompt(prompt_title,prompt_html,false,true);
								}
							});
						}
					}else{
						var errorMsg = '* Selected amount is greater than Bank entry amount!';
						$('#r_window_emsg').html(errorMsg);
					}
				}
			}
		}else{
			var errorMsg = '* Please select atleast one!';
			$('#r_window_emsg').html(errorMsg);
		}
	}
	             
	function __saveReceipt_Payment(form,uuid, selectedOption, amountReceived){
		$(".addInvbtn").hide();
		$(".addPurchasbtn").hide();
		$("#formTypeField").val(form);
		
		$("#bankentryuuidField").val(uuid);
		$("#selectedStatusField").val(selectedOption);
		$("#bankamountField").val(amountReceived);
		if(form=="Payment"){
			refreshPurInvoiceTable();
			$("#invnoLabel").html("Purchase Invoice No");
			$("#invamountLabel").html("Amount");
			$(".attachLabel").css("width", "100"); 
			$("#attachdocumentLabel").html("Attach Bill");
			$(".addPurchasbtn").show();
		}else if(form=="Receipt"){
			refreshInvoicesTable();
			$("#invnoLabel").html("Sales Invoice Number");
			$("#invamountLabel").html("Amount");
			$(".attachLabel").css("width", "185"); 
			$("#attachdocumentLabel").html("Attach Remittance Advice");
			$(".addInvbtn").show();
		}
		$('body').addClass("modal-open");
		$('#reconcileManager').modal('show');
	}
	
	function saveStatus(evn, uuid, selected){
		
		var valueStr= $(evn).val();
		var paid_inVal=$('.paid_in_'+uuid).html();
		var paid_outVal=$('.paid_out_'+uuid).html();
		//console.log(paid_outVal+"  "+paid_inVal);
		if(valueStr=="reconciled"){
			if(paid_inVal>0 && paid_outVal==0){
				__saveReceipt_Payment("Receipt", uuid, selected, paid_inVal);
			}else if(paid_outVal>0 && paid_inVal==0){
				__saveReceipt_Payment("Payment", uuid, selected, paid_outVal);
			}
		}else if(valueStr=="Create missing links"){
			var valstr="";
			if(paid_inVal>0 && paid_outVal==0){
				 valstr="Receipt";
				 createmissinglinks(valstr, uuid,selected, paid_inVal);
			}else if(paid_outVal>0 && paid_inVal==0){
				 valstr="Payment";
				 createmissinglinks(valstr, uuid,selected, paid_outVal);
			}
		}else{
			callstatuscgi(valueStr,uuid);
		}
	}
   
	function get_suppliers(uuid,div,qryStr1,qryStr2){
		qryStr1 = typeof qryStr1 !== 'undefined' ? qryStr1 : '';
		qryStr2 = typeof qryStr2 !== 'undefined' ? qryStr2 : '';
		var jsonRow = 'getcompaniesonsearch.cgi?srch='+qryStr2;
		if(qryStr1!=""){
		jsonRow+='&companies='+qryStr1;
		}
		$.getJSON(jsonRow,function(result){	
			if(result){
				/**var suppliers = new Array();
				$.each(result, function(i,item){
					var val= item.value;
					suppliers.push(val);
				});
				$('#supplier_'+uuid).autocomplete({
               		source: suppliers
               	});
               	**/
               	var html='<option value=""></option>';
               	if(qryStr2!=""){
               		var html='';
               	}
               	var selectedVal="";
				$.each(result, function(i,item){
					if(qryStr2!=""){
						selectedVal=item.CustoemrUUID;
						html += '<option value="'+item.CustoemrUUID+'" selected>'+item.value+'</option>';
					}else{
						html += '<option value="'+item.CustoemrUUID+'">'+item.value+'</option>';
					}
				});
				if(uuid!=""){
					$('#'+div+'_'+uuid).html('');
					$('#'+div+'_'+uuid).html(html);
					if(qryStr2!=""){
						$('#'+div+'_'+uuid).combobox("destroy");
					}
					if(selectedVal!=""){
						$('#'+div+'_'+uuid).val(selectedVal);
					}else{
						$('#'+div+'_'+uuid).val("");
						$(".ui-autocomplete-input").val("");
					}
					$('#'+div+'_'+uuid).combobox();
				}else{
					$('#'+div).html('');
					$('#'+div).html(html);
					if(qryStr2!=""){
						$('#'+div).combobox("destroy");
					}
					if(selectedVal!=""){
						$('#'+div).val(selectedVal);
					}else{
						$('#'+div).val("");
						$(".ui-autocomplete-input").val("");
					}
					$('#'+div).combobox();
				}
			}			
		});
	}
	
	function getCustomerRecInvDetails(){
		$('#c_window_emsg').html("");
		$(".c_addPurchasbtn").hide();
		var client_uuid=$("#c_linkcustomer").val();
		var formtype=$("#c_formTypeField").val();
		var actionStr="";
		if(formtype=="Payment"){
			actionStr="purchase";
			var headerStr='<th><div class="th-inner">Payment No</div></th><th><div class="th-inner">PIN</div></th><th><div class="th-inner">Payment Date</div></th><th><div class="th-inner">Amount</div></th>';
			$('#c_newCreateMisLinkHead').html(headerStr);
		}else if(formtype=="Receipt"){
			actionStr="sale";
			var headerStr='<th><div class="th-inner">Receipt No</div></th><th><div class="th-inner">Invoice No</div></th><th><div class="th-inner">Receipt Date</div></th><th><div class="th-inner">Amount</div></th>';
			$('#c_newCreateMisLinkHead').html(headerStr);
		}
		
		var jsonRow = 'getclientpayrec.cgi?client_uuid='+client_uuid+'&action='+actionStr;
		if(xhrAbortCustomerLoad) xhrAbortCustomerLoad.abort();
		xhrAbortCustomerLoad=$.getJSON(jsonRow,function(result){
			$("#c_newCreateMissingBody").html("");
			$('.c_newCreateMisLinkDiv').hide();
			var tableStr="";
			if(result.error){
				$('#c_window_emsg').html(result.error);
				$("#c_invoice_uuid").val("");
				$("#c_receipt_uuid").val("");
				$("#c_inv_no").val("");
				$("#c_recipt_no").val("");
				if(formtype=="Payment"){
					$(".c_addPurchasbtn").show();
				}
			}else{
				if(formtype=="Payment"){
					$(".c_addPurchasbtn").show();
				}
				$.each(result, function(i,b_row){
					if(b_row.error){
						if(formtype=="Payment"){
							$(".c_addPurchasbtn").show();
						}
						$('#c_window_emsg').html(result.error);
						$("#c_invoice_uuid").val("");
						$("#c_receipt_uuid").val("");
						$("#c_inv_no").val("");
						$("#c_recipt_no").val("");
					}else{
						tableStr+='<tr onClick="clickedMissingLinkNew(\''+b_row.rec_no+'\',\''+b_row.rec_uuid+'\',\''+b_row.inv_no+'\',\''+b_row.inv_uuid+'\',\''+b_row.amount+'\')">';
						//tableStr+="<td>"+b_row.company_name+"</td>";
						tableStr+="<td>"+b_row.rec_no+"</td>";
						tableStr+="<td>"+b_row.inv_no+"</td>";
						tableStr+="<td>"+b_row.rec_date+"</td>";
						tableStr+="<td>"+b_row.amount+"</td>";
						tableStr+="</tr>";	
					}
				});	
				$("#c_newCreateMissingBody").html(tableStr);	
				$('.c_newCreateMisLinkDiv').show();
			}
		});
		
	}
	
	 var xhr;
  (function( $ ) {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );
 
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
 
      _createAutocomplete: function() {
		  var ele_select= this.element;
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            tooltipClass: "ui-state-highlight"
          });
 
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
		  	//alert("show all");
            ui.item.option.selected = true;
			
            this._trigger( "select", event, {
              item: ui.item.option
            });
			if(ele_select.attr('class')=='PaymentLinkCustomers'){
				getCustomerRecInvDetails();
			}
			if(ele_select.attr('class')=='ReceiptLinkCustomers'){
				getCustomerRecInvDetails();
			}	
			if(ele_select.attr('class')=='companiesDropDown'){
				clearAlertMsg();
			}
			if(ele_select.attr('id')=='c_n_supplierDropdown'){
				var c_uuid=$("#c_n_supplierDropdown").val();
				get_ledger_accounts(c_uuid,"","c_n_uuid_analysis_account");
				get_analysis_ledger(c_uuid,"c_n_uuid_analysis_ledger");
			}
			if(ele_select.attr('id')=='supplierDropdown'){
				var c_uuid=$("#supplierDropdown").val();
				get_ledger_accounts(c_uuid,"","n_uuid_analysis_account");
				get_analysis_ledger(c_uuid,"n_uuid_analysis_ledger");
			}
			if(ele_select.attr('id')=='c_n_uuid_analysis_ledger'){
				var ledger_uuid= $("#c_n_uuid_analysis_ledger").val();
				get_ledger_accounts("",ledger_uuid,"c_n_uuid_analysis_account");
			}
			if(ele_select.attr('id')=='n_uuid_analysis_ledger'){
				var ledger_uuid= $("#n_uuid_analysis_ledger").val();
				get_ledger_accounts("",ledger_uuid,"n_uuid_analysis_account");
			}
          },
 
          autocompletechange: "_removeIfInvalid"
        });
      },
 
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .mousedown(function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .click(function() {
            input.focus();
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass last search string as value to search for, displaying last results
            input.autocomplete( "search", 'SHOWALL' );
          });
      },
 
      _source: function( request, response ) {
        //var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
		var ele_select= this.element;
		if(request.term=='SHOWALL'){
			response(ele_select.children( "option" ).map(function() {
          var text = $( this ).text();
		 var value= $( this ).val();
          //if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
		
		}
		else
		{
		//console.log(ele_select.attr('class'));
		if(ele_select.attr('class')=='ReceiptLinkCustomers'){
			var jsonRow = 'getcompaniesonsearch.cgi?srch='+request.term;
		}else if(ele_select.attr('class')=='PaymentLinkCustomers'){
			var jsonRow = 'getcompaniesonsearch.cgi?srch='+request.term+'&companies=supplier';
		}else if(ele_select.attr('class')=='companiesDropDown'){
			var jsonRow = 'getcompaniesonsearch.cgi?srch='+request.term+'&companies=supplier';
		}else if(ele_select.attr('id')=='c_n_uuid_analysis_ledger'){
			var jsonRow = 'getledgersonsearch.cgi?srch='+request.term;
		}else if(ele_select.attr('id')=='c_n_uuid_analysis_account'){
			var jsonRow = 'getanalysisaccountsonsearch.cgi?srch='+request.term+'&ledger_uuid='+$("#c_n_uuid_analysis_ledger").val()+'&money=out';
		}else if(ele_select.attr('id')=='n_uuid_analysis_ledger'){
			var jsonRow = 'getledgersonsearch.cgi?srch='+request.term;
		}else if(ele_select.attr('id')=='n_uuid_analysis_account'){
			var jsonRow = 'getanalysisaccountsonsearch.cgi?srch='+request.term+'&ledger_uuid='+$("#n_uuid_analysis_ledger").val()+'&money=out';
		}else{
			var jsonRow = 'getcompaniesonsearch.cgi?srch='+request.term;
		}
		if(xhr) xhr.abort();
		xhr=$.getJSON(jsonRow,function(result){
			
			if(result){
				
				var html='<option value=""></option>';
				if(result.alert){
					
				}else if(result.error){
					
				}else{
					
					$.each(result, function(i,item){
						if(ele_select.attr('id')=='c_n_uuid_analysis_ledger' || ele_select.attr('id')=='n_uuid_analysis_account' || ele_select.attr('id')=='n_uuid_analysis_ledger' || ele_select.attr('id')=='c_n_uuid_analysis_account'){
							html += '<option value="'+item.uuid+'">'+item.name+'</option>';
						}else{
							html += '<option value="'+item.CustoemrUUID+'">'+item.value+'</option>';
						}
					});
				}
				
				ele_select.html(html);
				
				response(ele_select.children( "option" ).map(function() {
          var text = $( this ).text();
		 var value= $( this ).val();
          //if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
				
				
			}
		});
       
	  } 
		
      },
 
      _removeIfInvalid: function( event, ui ) {
 
        // Selected an item, nothing to do
        if ( ui.item ) {

          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
		  var ele_select= this.element;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;	
			if(ele_select.attr('class')=='PaymentLinkCustomers'){
				getCustomerRecInvDetails();
			}
			if(ele_select.attr('class')=='ReceiptLinkCustomers'){
				getCustomerRecInvDetails();
			}	
			if(ele_select.attr('class')=='companiesDropDown'){
				clearAlertMsg();
			}
			if(ele_select.attr('id')=='c_n_supplierDropdown'){
				var c_uuid=$("#c_n_supplierDropdown").val();
				get_ledger_accounts(c_uuid,"","c_n_uuid_analysis_account");
				get_analysis_ledger(c_uuid,"c_n_uuid_analysis_ledger");
			}
			if(ele_select.attr('id')=='supplierDropdown'){
				var c_uuid=$("#supplierDropdown").val();
				get_ledger_accounts(c_uuid,"","n_uuid_analysis_account");
				get_analysis_ledger(c_uuid,"n_uuid_analysis_ledger");
			}
			if(ele_select.attr('id')=='c_n_uuid_analysis_ledger'){
				var ledger_uuid= $("#c_n_uuid_analysis_ledger").val();
				get_ledger_accounts("",ledger_uuid,"c_n_uuid_analysis_account");
			}
			if(ele_select.attr('id')=='n_uuid_analysis_ledger'){
				var ledger_uuid= $("#n_uuid_analysis_ledger").val();
				get_ledger_accounts("",ledger_uuid,"n_uuid_analysis_account");
			}
			return false;
          }
        });
  
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
 
        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.data( "ui-autocomplete" ).term = "";
      },
 
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
  })( jQuery );
  
$(document).ready(function() {
	$('select.selectpicker').on('change', function(e){
  		bank_account='', entry_type='', bill='';
  		$('.selectpicker :selected').each(function(i, selectedElement) {
 			var selectedValues = $(selectedElement).val();
 			var selectedValues = $(selectedElement).val();
 			if(selectedValues.indexOf("bank_")>=0){
 				var valStr = selectedValues.replace("bank_", ""); 
				bank_account= valStr;
 			}else if(selectedValues.indexOf("display_")>=0){
 				var valStr = selectedValues.replace("display_", ""); 
				entry_type=valStr;
 			}
 			else if(selectedValues.indexOf("show_")>=0){
 				var valStr = selectedValues.replace("show_", ""); 
				bill=valStr;
 			}
		});
		
		refreshTable();
	});
	
	$('#keyword').focus();
	load_data();		 
	
	$(window).scroll(function(){
		if ($(window).scrollTop() == $(document).height() - $(window).height()){
			if(complete==false && completeScroll==false) {
				$('#img_loading_div').show();
				start=end+1;
				end=start+25;
				refreshCommonElements();
			}
		}
	});	
	
	//setup before functions
	var typingTimer;                //timer identifier
	var doneTypingInterval = 600;  //time in ms, 5 second for example
	
	//on keyup, start the countdown
	$('#keyword').keyup(function(){
		clearTimeout(typingTimer);
		if ($('#keyword').val) {
			typingTimer = setTimeout(function(){
				//do stuff here e.g ajax call etc....
				$('#content_table').html('');
				start=0;
				end=start+25;
				tab='';
				refreshCommonElements();
			}, doneTypingInterval);
		}
	});		
	
	//on keyup, start the countdown
	var doneTypingInterval = 1000;  //time in ms, 5 second for example
	$('#searchInvoiceField').keyup(function(){
		clearTimeout(typingTimer);
		if ($('#searchInvoiceField').val) {
			typingTimer = setTimeout(function(){
				var formtypeStr= $("#formTypeField").val();
				if(formtypeStr=="Payment"){
					refreshPurInvoiceTable();
				}else if(formtypeStr=="Receipt"){
					refreshInvoicesTable();
				}
			}, doneTypingInterval);
		}
	});		
	$('#start_date').datepicker({"autoclose": true}).on('changeDate', function (ev) {
		start_date=$('#start_date').val();
		var arrStartDate= $('#start_date').val().split('/');
		var dateText = new Date(arrStartDate[1]+'/'+arrStartDate[0]+'/'+arrStartDate[2]);
		$('#end_date').datepicker('setStartDate', dateText);
		
		$('#content_table').html('');
		if(checkAllFlag==true){
			$("#chk_all").trigger('click');
		}
		start=0,end=start+25;
		refreshCommonElements();
	});
	
	$('#end_date').datepicker({"autoclose": true}).on('changeDate', function (ev) {
		end_date=$('#end_date').val();
		var arrEndDate= $('#end_date').val().split('/');
		var dateText = new Date(arrEndDate[1]+'/'+arrEndDate[0]+'/'+arrEndDate[2]);
		
		$('#start_date').datepicker('setEndDate', dateText);
		
		$('#content_table').html('');
		if(checkAllFlag==true){
			$("#chk_all").trigger('click');
		}
		start=0, end=start+25;
		refreshCommonElements();
	});
	
	$('#start_date').datepicker().on('changeDate', function (ev) {
		$(this).datepicker('hide');
	});
	$('#end_date').datepicker().on('changeDate', function (ev) {
		$(this).datepicker('hide');
	});
	
	// toggle all checkboxes from a table when header checkbox is clicked
  	$(".table th input:checkbox").click(function () {
  		$checks = $(this).closest(".table").find("tbody input:checkbox");
  		if ($(this).is(":checked")) {
			checkAllFlag=true;
			$('#chk_all').prop("checked", true);
  			$checks.prop("checked", true);
  		} else {
			checkAllFlag=false;
			$('#chk_all').prop("checked", false);
  			$checks.prop("checked", false);
  		}  		
  	});
	
	$('.num').keypress(function(e){
		var k = e.which;
    	/* numeric inputs can come from the keypad or the numeric row at the top */
   		if ((k<48 || k>57) && (k!=46) && (k!=8) && (k!=0)) {
        	e.preventDefault();
			//alert("Allowed characters are 0-9, +, -, (, )");
        	return false;
    	}
	}); 
	
	$('#n_purchase_amount').change(function(e){
		 clearAlertMsg()
	}); 
});
 