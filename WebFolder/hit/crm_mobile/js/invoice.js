var xhrAbortLoad, xhrAbortClientSearch;
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function total_for_edit(){
	var total = 0;
 	var tot_rate = 0;
  	var tot_hour = 0;
  	var total_with_tax = 0;
  	var hour=0;
  
  	$('.hours').each(function(i){
   		hour = $(this).val();
		if (!isNaN(hour)) tot_hour += Number(hour);
  	});
 	
 	tot_hour = roundNumber(tot_hour,2);
  	total = $('#total_due').val();
  	tot_tax = $('#invoice_total_tax').val();
  	total_with_tax = roundNumber(Number(total)+Number(tot_tax),2);  
	$('#total_hours').val(tot_hour);
	$('#invoice_total_due_with_tax').val(total_with_tax);
  	update_balance();	
}

function update_total() {
	var total = 0;
  	var tot_rate = 0;
  	var tot_hour = 0;
  	var total_with_tax = 0;
  	var hour=0;
  
  	$('.hours').each(function(i){
		hour = $(this).val();
		if (!isNaN(hour)) tot_hour += Number(hour);
  	});
  
 	 $('.price').each(function(i){
   		price = $(this).val();
   		if (!isNaN(price)) total += Number(price);
  	});
  	tot_hour = roundNumber(tot_hour,2);
  	total = roundNumber(total,2);
  	tot_rate=$('#invoice_tax_rate').val();
  	if(tot_rate!=0){
  		tot_tax = roundNumber(total*tot_rate/100,2);
  	}else{
  		tot_tax = 0;
  	}
  	
  	total_with_tax = roundNumber(Number(total)+Number(tot_tax),2);
  	
  	//console.log(total_with_tax);
  	//console.log(tot_hour);
  	//console.log(tot_tax);
  	$('#total_hours').val(tot_hour);
  	$('#total_due').val(total);
  	$('#invoice_total_tax').val(tot_tax);
  	$('#invoice_total_due_with_tax').val(total_with_tax);
	update_balance();
}

function update_balance() {
  var due = $("#invoice_total_due_with_tax").val() - $("#invoice_total_paid").val();
  due = roundNumber(due,2);
  
  $('#total').val($("#invoice_total_due_with_tax").val());
  $('#balance_due').val(due);
}

function evaluateTaxRateID(v){
	$("#taxErrMsgID").remove();
	if(v==1) {
		var dlg_tax_rate=$('#dlg_tax_rate').val();
		if(dlg_tax_rate!=null && dlg_tax_rate!=""){
			$('#tax_rate').val(dlg_tax_rate);
			calculate_tax();
			$('#dlg_tax_rate').val("");
			$('#popupForTax').popup('close');
		}else{
			var e_msg = "<span id='taxErrMsgID' style='color:#CC0000; font-size:14px;font-style:italic;'>* Please enter Tax Rate.</span>" ;
			$("#dlg_tax_rate").before(e_msg);
			$('#dlg_tax_rate').focus();
		}
	}
	if(v==0){
		$('#dlg_tax_rate').val("");
		$('#popupForTax').popup('close');
	}
}
function addNewID(v){
	$("#errMsgID").remove();
	if(v==1) {
		var newIDNum=$('#newIDNum').val();
		if(newIDNum!=null && newIDNum!=""){
			var jsonRowURLStr = 'checkinvoicenum.cgi?inv_no='+newIDNum;
			$.getJSON(jsonRowURLStr,function(result){
				if(result.exist=='false'){
					$('#inv_number').val(newIDNum);
					$('#invoice_id').val(newIDNum);
					$('#popupForNewID').popup('close');
				}else{
					var e_msg  = "<span id='errMsgID' style='color:#CC0000;font-size:14px;font-style:italic;'>* Invoice number "+newIDNum+" already exists.</span>" ;
					$(".newMsgStr").before(e_msg);
					$('#newIDNum').val('');
					$('#newIDNum').focus();
				}
															
			});
		}else {
			var e_msg = "<span id='errMsgID' style='color:#CC0000; font-size:14px;font-style:italic;'>* Please enter Purchase invoice number</span>" ;
			$(".newMsgStr").before(e_msg);
			$('#newIDNum').focus();
		}
	}
	if(v==0) {
		$('#popupForNewID').popup('close');
		$('#inv_number').val(new_inv_num);
		$('#invoice_id').val(new_inv_num);
	}
}
function checknumber(e)	{
	var k = e.which;
	/* numeric inputs can come from the keypad or the numeric row at the top */
	 if ((k<48 || k>57) && (k!=46) && (k!=8) && (k!=0)) {
		e.preventDefault();
		return false;
	}
}
function disableForm(e){
	$('#TaskForm :input').attr('disabled', true);
	$('#status-button').attr('disabled', false);
	$('#addnewitem').hide();
	$(".ui-input-clear").hide();
	$("select.s_dropdown").selectmenu("disable");
	
	
	$('#status').change(function(){
		if($(this).val()!='Paid'){
			$('#InvoiceForm :input').attr('disabled', false);
			$('#hiderow').show();
			$('.td_edit').show();
			$('.td_remove').show();
		}	
	});
	
	if(e){
		$("._neditNote").show();
		$("._neditNote").attr('disabled', false);
		$("._nsaveNote").attr('disabled', false);
		$("._nCancelNote").attr('disabled', false);
	}
}
$(document).ready(function() {
	$("#TaskForm").validate({
        rules: {
          	clientNameStr: { required: true  },
			inv_number : { required: true },
			invoice_terms : { required: true },
			invoice_date : { required: true },
			invoice_due_date : { required: true },
			projectNameStr : { required: true },
        }
    });
       
    //on keyup, start the countdown
	$('.clientNameStr').keyup(function(){
    	if ($('.clientNameStr').val()) {
      		var jsonRow='getcompaniesonsearch.cgi?srch='+$('.clientNameStr').val()+'&'+Math.random();
      		if(xhrAbortClientSearch) xhrAbortClientSearch.abort();
			xhrAbortClientSearch=$.getJSON(jsonRow,function(result){
				var html='';
				if(result.error){
				
				}else{
					$.each(result, function(i,item){
						html += '<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="javascript:void(0)" onClick="selectClient(\''+item.id+'\',\''+item.value+'\')">'+item.value+'</a></li>';
					});
				}
				$( ".clientListView").html("");
				$( ".clientListView").html(html);
			});
          
    	}
    });
  
     //on keyup, start the countdown
	$('.projectNameStr').keyup(function(){
    	if ($('.projectNameStr').val()) {
      		var jsonRow="getprojectsonsearch.cgi?srch="+$('.projectNameStr').val()+"&"+Math.random()+"&client="+$('#Client_ID').val();
			if(xhrAbortLoad) xhrAbortLoad.abort();
			xhrAbortLoad=$.getJSON(jsonRow,function(result){
				var html='';
				if(result.error){
				
				}else{
					$.each(result, function(i,item){
						html += '<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="javascript:void(0)" onClick="selectValue(\''+item.value+'\',\''+item.value+'\')">'+item.value+'</a></li>';
					});
				}
				$( ".projectListView").html("");
				$( ".projectListView").html(html);
			});
          
    	}
    });
    $('.ui-input-clear').click(function(){
    	$("#Project_ID").val("");
    });
    
    
    if(newEntry==true){
		var taxCodeSelected = $('#inv_tax_code').val();
		if(taxCodeSelected=="" || taxCodeSelected=="UK"){
	 		$('#invoice_tax_rate').val("20");
			$('#inv_tax_code').val("UK");
		}else if(taxCodeSelected=="US"){
			$('#invoice_tax_rate').val("");
			update_total();
		}
	}else{
		var taxCodeSelected = $('#inv_tax_code').val();
		if(taxCodeSelected=="" || taxCodeSelected=="UK"){
	 		$('#invoice_tax_rate').val("20");
			$('#inv_tax_code').val("UK");
		}else if(taxCodeSelected=="US"){
			$('#invoice_tax_rate').val("");
		}
		//alert();
		update_total();
	}
	
	$("#paid").blur(update_balance);
 		
 	$('#inv_tax_code').change(function(){
		var tax_code=$(this).val();
		if(tax_code=='Rest of the world' || tax_code=='EU'){
			$('#popupForTax').popup('open');
		}else if(tax_code=='US'){
			$('#invoice_tax_rate').val("");
		}else	{
			$('#invoice_tax_rate').val("20");
		}
		update_total();
	});
 
 	$("#invoice_total_paid").blur( function() {
		update_balance();
	});
  	$("#invoice_tax_rate").blur( function() {
		update_total();
	});
});
	
function get_client_info()	{
	var jsonRow = 'returncustomerValues.cgi?client='+$('#Client_ID').val();
	$.getJSON(jsonRow,function(html){	
		if(html){
			$("#invoice_bill_to").val(html.bill_to);
		}
	});
}
function get_projects(){
	if($('#Client_ID').val() && $('#Client_ID').val()!=''){
		$('.projectNameStr').val('');
		var jsonRow = 'getprojectsonsearch.cgi?srch=&client='+$('#Client_ID').val();
	}else{
		var jsonRow = 'getprojectsonsearch.cgi?srch=';
	}
	$.getJSON(jsonRow,function(result){	
		if(result){
			var html='';
			$.each(result, function(i,item){
				html += '<li class="ui-screen-hidden"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="javascript:void(0)" onClick="selectValue(\''+item.value+'\',\''+item.value+'\')">'+item.value+'</a></li>';
			});
			$( ".projectListView").html("");
			$( ".projectListView").html(html);
		}
	});
}
function selectClient(val, name){
	$(".clientNameStr").val(name);
	$("#Client_ID").val(val);
	$( ".clientListView" ).listview( "refresh" );
	get_client_info();
	get_projects();
	$( ".clientListView li" ).addClass("ui-screen-hidden");
}

function selectValue(val, name){
	$(".projectNameStr").val(name);
	$("#project_code").val(val);
	$( ".projectListView" ).listview( "refresh" );
	$( ".projectListView li" ).addClass("ui-screen-hidden");
}

function addnewInvoiceItem(){
	$("#invErr").remove();
	
	var invoice_id=$('#invoice_id').val();
	var description =$('#new_item').val();
	var hours =$('#new_quantity').val();
	var rate=$('#new_unit_price').val();
	var amount = $('#new_quantity').val() * $('#new_unit_price').val();
	amount= roundNumber(amount, 2);
	
	if(description!='' && rate!='' && amount!='' && hours!=''){
		if(!isNaN(rate)){
			if(!isNaN(hours)){
				var dataString = 'description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&invoice_id='+invoice_id+'&redirect=false';
				
				$.ajax({
					type: "GET",
					url: "saveinvoiceitem.cgi",
					data: dataString,
					cache: false,
					success: function(html){
						if(html.uuid) {
							$('#popupForNewInvoice').popup('close');
							var tablerow="<tr><td>"+html.id+"</td><td>"+description+"</td><td>"+hours+"</td><td>"+rate+"<input class='hours' name='hours' type='hidden' value='"+rate+"' /></td><td>"+amount+"<input type='hidden' class='price' value='"+amount+"'></td></tr>";
							$("#contentoftable").append(tablerow);
							$( ".loadedTable" ).table( "rebuild" );
							update_total();
							
						}	
					}
				});
			}else{
				var e_msg = "<div id='invErr' style='color:#CC0000; font-size:14px;font-style:italic;'>* Enter a numeric value for unit price</div>" ;
				$(".newPurInvMsg").after(e_msg);
				$('#new_unit_price').val('');
				$('#new_unit_price').focus();
			}
		}else{
			var e_msg = "<div id='invErr' style='color:#CC0000; font-size:14px;font-style:italic;'>* Enter a numeric value for quantity</div>" ;
			$(".newPurInvMsg").after(e_msg);
			$('#new_quantity').val('');
			$('#new_quantity').focus();
		}
	}else {
		var e_msg = "<div id='invErr' style='color:#CC0000; font-size:14px;font-style:italic;'>* Enter all fields!</div>" ;
		$(".newPurInvMsg").after(e_msg);
	}
}