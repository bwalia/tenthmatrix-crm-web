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

function update_total() {
  	var subtotal = 0;
 	var item_amount=0;
 	$('.s_item_total').each(function(i){
    	item_amount = $(this).val();
    	if (!isNaN(item_amount)) subtotal += Number(item_amount);
  	});
 	subtotal = roundNumber(subtotal,2);
 	//alert(subtotal);
	$('#payment_subtotal').val(subtotal);
	calculate_tax();
}

function calculate_tax(){
	var tax_rate= $('#tax_rate').val();
	var subtotal= $('#payment_subtotal').val();
	var tax= roundNumber((subtotal * tax_rate)/100, 2);
	var total= Number(subtotal) + Number(tax);
	
	$('#payment_tax').val(tax);
	$('#payment_total').val(total);
	
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
			var jsonRowURLStr = 'checkpin.cgi?purchase_id='+newIDNum;
			$.getJSON(jsonRowURLStr,function(result){
				if(result.success){
					var e_msg  = "<span id='errMsgID' style='color:#CC0000;font-size:14px;font-style:italic;'>* "+result.error+"</span>" ;
					$(".newMsgStr").before(e_msg);
					$('#newIDNum').val('');
					$('#newIDNum').focus();
				}else{
					$('#purchase_inv_no').val(newIDNum);
					$('#popupForNewID').popup('close');
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
		
		$('#purchase_inv_no').val(new_inv);
	}
}

$(document).ready(function() {
	$("#TaskForm").validate({
        rules: {
          	payment_date: { required: true  },
			clientNameStr: { required: true  },
			payment_method: { required: true  },
			employee_uuid: { required: true  },
        }
    });
       
    //on keyup, start the countdown
	$('.clientNameStr').keyup(function(){
    	if ($('.clientNameStr').val()) {
      		var jsonRow='getcompaniesonsearch.cgi?srch='+$('.clientNameStr').val()+'&companies=supplier&'+Math.random();
      		if(xhrAbortClientSearch) xhrAbortClientSearch.abort();
			xhrAbortClientSearch=$.getJSON(jsonRow,function(result){
				var html='';
				if(result.error){
				
				}else{
					$.each(result, function(i,item){
						html += '<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="javascript:void(0)" onClick="selectClient(\''+item.CustoemrUUID+'\',\''+item.value+'\')">'+item.value+'</a></li>';
					});
				}
				$( ".clientListView").html("");
				$( ".clientListView").html(html);
			});
          
    	}
    });
    
    $('#tax_code').change(function(){
		var tax_code=$(this).val();
		if(tax_code=='Rest of the world' || tax_code=='EU'){
			$('#popupForTax').popup('open');
		}else if(tax_code=='US'){
			$('#tax_rate').val(0);
		}else	{
			$('#tax_rate').val("20");
		}
		update_total();
	});
	
    //on keyup, start the countdown
	$('.projectNameStr').keyup(function(){
    	if ($('.projectNameStr').val()) {
      		var jsonRow="getprojectsonsearch.cgi?srch="+$('.projectNameStr').val()+"&"+Math.random()+"&client_uuid="+$('#Client_ID').val();
			if(xhrAbortLoad) xhrAbortLoad.abort();
			xhrAbortLoad=$.getJSON(jsonRow,function(result){
				var html='';
				if(result.error){
				
				}else{
					$.each(result, function(i,item){
						html += '<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="javascript:void(0)" onClick="selectValue(\''+item.id+'\',\''+item.value+'\')">'+item.value+'</a></li>';
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
    
});
	
function get_client_info()	{
	var jsonRow = 'returncustomerValues.cgi?client='+$('#Client_ID').val();
	$.getJSON(jsonRow,function(html){	
		if(html){
			$("#beneficiary_address").val(html.bill_to);
		}
	});
}
function get_projects(){
	if($('#Client_ID').val() && $('#Client_ID').val()!=''){
		$('.projectNameStr').val('');
		var jsonRow = 'getprojectsonsearch.cgi?srch=&client_uuid='+$('#Client_ID').val();
	}else{
		var jsonRow = 'getprojectsonsearch.cgi?srch=';
	}
	$.getJSON(jsonRow,function(result){	
		if(result){
			var html='';
			$.each(result, function(i,item){
				html += '<li class="ui-screen-hidden"><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="javascript:void(0)" onClick="selectValue(\''+item.id+'\',\''+item.value+'\')">'+item.value+'</a></li>';
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
	$("#Project_ID").val(val);
	$( ".projectListView" ).listview( "refresh" );
	$( ".projectListView li" ).addClass("ui-screen-hidden");
}

function addnewPurchaseItem(){
	$("#invErr").remove();
	
	var payment_id=$('#purchase_id').val();
	var payment_uuid=$('#purchase_uuid').val();
	var line_number=$('#new_line_num').val();
	var item_purchased =$('#new_item').val();
	var item_quantity =$('#new_quantity').val();
	var item_unit_price=$('#new_unit_price').val();
	var item_total = $('#new_quantity').val() * $('#new_unit_price').val();
	item_total= roundNumber(item_total, 2);
	var tax_rate =$('#tax_rate').val();
	
	if(line_number!='' && item_purchased!='' && item_quantity!='' && item_unit_price!=''){
		if(!isNaN(line_number)){
		if(!isNaN(item_quantity)){
			if(!isNaN(item_unit_price)){
		
				var dataString = 'line_number='+line_number+'&item_purchased='+item_purchased+'&item_quantity='+item_quantity+'&item_unit_price='+item_unit_price+'&item_total='+item_total+'&payment_id='+payment_id+'&payment_uuid='+payment_uuid+'&tax_rate='+tax_rate+'&redirect=false&action=Save';
				$.ajax({
					type: "GET",
					url: "savepurchaseitem.cgi",
					data: dataString,
					cache: false,
					success: function(html){
						if(html.Success) {
							var tablerow="<tr><td>"+item_purchased+"</td><td>"+item_quantity+"</td><td>"+item_unit_price+"</td><td>"+item_total+"<input type='hidden' class='s_item_total' value='"+item_total+"'></td></tr>";
							$("#contentoftable").append(tablerow);
							$( ".loadedTable" ).table( "rebuild" );
							update_total();
							$('#popupForNewPurchaseInvoice').popup('close');
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
		}else{
			var e_msg = "<div id='invErr' style='color:#CC0000; font-size:14px;font-style:italic;'>* Enter a numeric value for line number</div>" ;
			$(".newPurInvMsg").after(e_msg);
			$('#new_line_num').val('');
			$('#new_line_num').focus();
		}
	}else {
		var e_msg = "<div id='invErr' style='color:#CC0000; font-size:14px;font-style:italic;'>* Enter all fields!</div>" ;
		$(".newPurInvMsg").after(e_msg);
	}
}