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
	var discount_perc=0;
	var discount=0;
	
  	$('.hours').each(function(i){
   		hour = $(this).val();
		if (!isNaN(hour)) tot_hour += Number(hour);
  	});

	tot_hour = roundNumber(tot_hour,2);
  	total = $('#total_due_without_tax').val();
  	tot_tax = $('#total_tax').val();
  	total_with_tax = roundNumber(Number(total)+Number(tot_tax),2);  
	$('#total_hours').val(tot_hour);
	$('#total_due_with_tax').val(total_with_tax);
  	update_balance();	
}


function update_total() {
	var sub_total = 0;
	var tot_rate = 0;
	var tot_hour = 0;
	var total_with_tax = 0;
	var total_due_without_tax = 0;
	var hour=0;
	var discount_perc=0;
	var discount=0;
	
  	$('.hours').each(function(i){
    	hour = $(this).val();
		if (!isNaN(hour)) tot_hour += Number(hour);
  	});
 	$('.price').each(function(i){
   		price = $(this).val();
    	if (!isNaN(price)) sub_total += Number(price);
  	});
  
	tot_hour = roundNumber(tot_hour,2);
	sub_total = roundNumber(sub_total,2);
	
	//discount applied if any
	discount_perc= $("#discount_applied").val();
	discount = roundNumber(sub_total*discount_perc/100,2);
	total_due_without_tax = roundNumber(sub_total - discount,2);
	
	//evaluate total with tax applied
	tot_rate=$('#tax_rate').val();
	tot_tax = roundNumber(total_due_without_tax*tot_rate/100,2);
	//alert(tot_tax);
	total_with_tax = roundNumber(Number(total_due_without_tax)+Number(tot_tax),2);
	
  	$('#order_subtotal').val(sub_total);
  	$('#total_hours').val(tot_hour);
  	$('#total_due_without_tax').val(total_due_without_tax);
  	$('#total_tax').val(tot_tax);
 	$('#total_due_with_tax').val(total_with_tax);
  	update_balance();
}

function update_balance() {
	var total_due_with_tax= $("#total_due_with_tax").val();
	$('#total').val(total_due_with_tax);
	$('#balance_due').val(total_due_with_tax);
}

function evaluateTaxRateID(v){
	$("#taxErrMsgID").remove();
	if(v==1) {
		var dlg_tax_rate=$('#dlg_tax_rate').val();
		if(dlg_tax_rate!=null && dlg_tax_rate!=""){
			$('#tax_rate').val(dlg_tax_rate);
			update_total();
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
			var jsonRowURLStr = 'checkordernum.cgi?order_no='+newIDNum;
			$.getJSON(jsonRowURLStr,function(result){
				if(result.exist=='false'){
					$('#order_numbr').val(newIDNum);
					$('#order_id').val(newIDNum);
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
		$('#order_numbr').val(newOrdNum);
		$('#order_id').val(newOrdNum);
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
$(document).ready(function() {
	$("#TaskForm").validate({
        rules: {
          	clientNameStr: { required: true  },
			order_id : { required: true },
			ordered_date : { required: true },
			project_code : { required: true },
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
  
    if(newEntry==true){
		var taxCodeSelected = $('#tax_code').val();
		if(taxCodeSelected=="" || taxCodeSelected=="UK"){
	 		$('#tax_rate').val("20");
			$('#tax_code').val("UK");
		}else if(taxCodeSelected=="US"){
			$('#tax_rate').val("");
			update_total();
		}
	}else{
		var taxCodeSelected = $('#tax_code').val();
		if(taxCodeSelected==""){
			$('#tax_rate').val("20");
			$('#tax_code').val("UK");
		}else if(taxCodeSelected=="US"){
			$('#tax_rate').val("");
		}else if(taxCodeSelected=="UK"){
			$('#tax_rate').val("20");
		}
		update_total();
	}
	
	$("#paid").blur(update_balance);
 		
 	$('#tax_code').change(function(){
		var tax_code=$(this).val();
		if(tax_code=='Rest of the world' || tax_code=='EU'){
			$('#popupForTax').popup('open');
		}else if(tax_code=='US'){
			$('#tax_rate').val("");
		}else	{
			$('#tax_rate').val("20");
		}
		update_total();
	});
	
	$("#discount_applied").blur( function() {
		update_total();
	});
 	$("#tax_rate").blur( function() {
		update_total();
	}); 
	$('.num').keypress(function(e){
		checknumber(e);	
	});
	$(".new_entry").blur( function() {
		update_price();
	}); 
});


function get_client_info()	{
	var jsonRow = 'returncustomerValues.cgi?client='+$('#Client_ID').val();
	$.getJSON(jsonRow,function(html){	
		if(html){
			$("#order_bill_to").val(html.bill_to);
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

function generate_invoice(){
		var statesdemo = {
			state0: {
				title: "Do you want to generate Invoice?",
				html:'',
				buttons: { No : 0, Yes: 1 },																
				submit:function(e,v,m,f){ 
					//console.log(f);
					if(v==1) {
						var order_id= $("#order_id").val();
						var uuid= $("#order_uuid").val();
						var jsonRow = 'OrderGenerateInvoice.cgi?order_uuid='+uuid+'&order_id='+order_id;
						$.getJSON(jsonRow,function(result){	
							if(result.Success){
								var statesdemo = {
									state0: {
										title: "Invoice successfully generated. Do you want to go to invoice?",
										html:'',
										buttons: { Cancel : 0, Ok: 1 },																
										submit:function(e,v,m,f){ 
											//console.log(f);
											if(v==1) {
												if(result.InvoiceUUID!=''){
												window.location.href='invoice.shtml?uuid='+result.InvoiceUUID;
												}else{
													$.prompt.close();
												}
											}
											if(v==0) {
												$.prompt.close();
											}
											
										}
									},
									
								};
								if(!($(".jqibox").length))
								$.prompt(statesdemo);
							}else if(result.Error){
								var statesdemo = {
									state0: {
										title: result.Error,
										html:'',
										buttons: { Ok: 1 },																
										submit:function(e,v,m,f){ 
											if(v==1) {
												$.prompt.close();
											}
											
										}
									},
									
								};
								if(!($(".jqibox").length))
								$.prompt(statesdemo);
							}
						});
						document.getElementById("generate_inv").disabled=true;
					}
					if(v==0) {
						$.prompt.close();
					}
					
				}
			},
			
		};
		if(!($(".jqibox").length))
		$.prompt(statesdemo);
	}
	
	function get_projects(){
		var jsonRow = 'getprojectsonsearch.cgi?srch=&client='+$('#Client_ID').val();
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';
				$.each(result, function(i,item)	{
					html += '<option value="'+item.value+'">'+item.value+'</option>';
				});
				$('#project_code').html("");
				$('#project_code').html(html);
				$('#project_code').selectmenu('refresh', true);
			}
		});
	}
	
function update_price() {
	var hours =$('#new_quantity').val();
	var rate=$('#new_rate').val();
	var discount=$('#new_discount').val();
  	var sub_price = roundNumber(hours * rate,2);
  	var item_discount = roundNumber(sub_price * discount/100,2);
  	var price= sub_price - item_discount;
  	isNaN(price) ? $('#new_amount').val("N/A") : $('#new_amount').val(price);
  	update_total();
}
function addnewOrderItem(){
	$("#invErr").remove();
	
	var order_uuid=$('#order_uuid').val();
	var description =$("#new_product option:selected").text();
	var uuid_product =$('#new_product').val();
	var hours =$('#new_quantity').val();
	var rate=$('#new_rate').val();
	var discount=$('#new_discount').val();
	var amount = $('#new_amount').val();
	alert(amount);
	if(description!='' && rate!='' && amount!='' && hours!=''){
		if(!isNaN(rate)){
			if(!isNaN(hours) && hours!=0){
				var dataString = 'description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&discount='+discount+'&order_uuid='+order_uuid+'&uuid_product='+uuid_product+'&redirect=false';	
				alert(dataString);
				$.ajax({
					type: "GET",
					url: "saveorderitem.cgi",
					data: dataString,
					cache: false,
					success: function(html){
						if(html.uuid) {
							$('#popupForNewInvoice').popup('close');
							var tablerow="<tr><td>"+html.id+"<input class='item_uuid' name='item_uuid' type='hidden' value='"+html.uuid+"'/></td><td>"+description+"</td><td>"+rate+"</td><td>"+hours+"<input class='hours' name='hours' type='hidden' value='"+rate+"' /></td><td>"+discount+"</td><td>"+amount+"<input type='hidden' class='price' value='"+amount+"'></td></tr>";
							$("#contentoftable").append(tablerow);
							$( ".loadedTable" ).table( "rebuild" );
							update_total();
							
						}	
					},error(){
						$('#popupForNewInvoice').popup('close');
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