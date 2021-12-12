
	function applyTaxEntered(){
		$("tax_message").remove();
		if($('#dlg_tax_rate').val()!=null && $('#dlg_tax_rate').val()!=""){
			$('#invoice_tax_rate').val($('#dlg_tax_rate').val());
			$('#addTaxRate').modal('hide');
			$('#dlg_tax_rate').val('');
		}	else {
			$('#taxmessageId').before('<span id="tax_message" style="color:#CC0000;">* Please enter Tax Rate.</span>');
			$('#dlg_tax_rate').focus();
		}
	}
	
	function generate_manual_id(){
		$("#msgSpan").remove();
		if($('#invoice_numbr').val()!=null && $('#invoice_numbr').val()!=""){
			var jsonRowURLStr = 'checkinvoicenum.cgi?inv_no='+$('#invoice_numbr').val();
			$.getJSON(jsonRowURLStr,function(result){
				if(result.exist=='false'){
					$('#inv_number').val($('#invoice_numbr').val());
					$('#invoice_id').val($('#invoice_numbr').val());
					$('#enterNewInvoice').modal('hide');
				}	else{
					$("#messageId").before('<span id="msgSpan" style="color:#CC0000;">* Invoice number '+$('#invoice_numbr').val()+' already exists!</span>');
					$('#invoice_numbr').val('');
					$('#invoice_numbr').focus();
				}
			});
		}else {
			$("#messageId").before('<span id="msgSpan" style="color:#CC0000;">* Please enter Invoice number!</span>');
			$('#invoice_numbr').focus();
		}
	}
	
	function checknumber(e)	{
		var k = e.which;
		/* numeric inputs can come from the keypad or the numeric row at the top */
		 if ((k<48 || k>57) && (k!=46) && (k!=8) && (k!=0)) {
			e.preventDefault();
			//alert("Allowed characters are 0-9, +, -, (, )");
			return false;
		}
	}
	
	function get_customer_analysisaccounts(l_uuid,a_uuid){
		l_uuid = typeof l_uuid !== 'undefined' ? l_uuid : $('#uuid_analysis_ledger').val();
		a_uuid = typeof a_uuid !== 'undefined' ? a_uuid : '';
		$('#account_div').find('.ui-autocomplete-input').val('');
		var jsonRow = 'getanalysisaccountsonsearch.cgi?srch=&money=in';
		if(l_uuid!=""){
			jsonRow+='&ledger_uuid='+l_uuid;
		}
		
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';
				if(result.error){
			
				}else{
					$.each(result, function(i,item){
						html += '<option value="'+item.uuid+'"';
						if(item.uuid==a_uuid){
							html += ' selected ';
						}
						html += '>'+item.name+'</option>';
					});
				}
				$('#uuid_analysis_account').html(html);
				if(a_uuid!=""){
					$("#uuid_analysis_account").val(a_uuid);
					$('#uuid_analysis_account').combobox("destroy");
					$('#uuid_analysis_account').combobox();
				}
			}
		});
	}
	
	function get_customer_ledger(l_uuid){
		l_uuid = typeof l_uuid !== 'undefined' ? l_uuid : '';
		$('#ledger_div').find('.ui-autocomplete-input').val('');
		var jsonRow = 'getledgersonsearch.cgi?srch=';
		
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';
				if(result.error){
			
				}else{
					$.each(result, function(i,item){
						html += '<option value="'+item.uuid+'"';
						if(item.uuid==l_uuid){
							html += ' selected ';
						}
						html += '>'+item.name+'</option>';
					});
				}
				$('#uuid_analysis_ledger').html(html);
				if(l_uuid!=""){
					$('#uuid_analysis_ledger').val(l_uuid);
					$('#uuid_analysis_ledger').combobox("destroy");
					$('#uuid_analysis_ledger').combobox();
				}
			}
		});
	}
	function get_client_info()	{
		/**var Client_ID=	$("#Client_ID").val();
		var dataString = 'Client_ID='+Client_ID;
		$.ajax({
			type: "GET",
			url: "Returnvalues.cgi",
			data: dataString,
			cache: false,
			success: function(html){
				$("#invoice_bill_to").val(html);
				get_customer_ledger_accounts();
			}
		});**/
		var jsonRow = 'returncustomerValues.cgi?client='+$('#Client_ID').val();
		$.getJSON(jsonRow,function(html){	
			if(html){
				$("#invoice_bill_to").val(html.bill_to);
				get_customer_analysisaccounts(html.uuid_analysis_ledger,html.uuid_analysis_account);
				get_customer_ledger(html.uuid_analysis_ledger);
			}
		});
	}
	function EditMainNote(){
		$("._neditNote").hide();
		$("#inv_note").attr('disabled', false);
		$(".msaveCancelButtons").show();
		var noteStr= $("#invoice_note").val();
		if(noteStr!=""){
			noteStr+="\n";
		}
		noteStr+=currentdatetime+" : ";
		$("#inv_note").val(noteStr);
	}
	
	function CancelMainNote(){
		var noteStr= $("#invoice_note").val();
		$("#inv_note").val(noteStr);
		$("._neditNote").show();
		$("#inv_note").attr('disabled', true);
		$(".msaveCancelButtons").hide();
	}
	
	function saveMainNote(){
		var noteStr= $("#inv_note").val();
		//console.log(noteStr)
		if(noteStr!=""){
			if(noteStr!=currentdatetime){
				$.ajax({
					type: "GET",
					dataType: "json",
					url: "saveinvoicenote.cgi",
					data: {"uuid" : tableUUIDStr, "note": noteStr},
					cache: false,
					success: function(html)	{
						if(html.success){
							$("#invoice_note").val(noteStr);
							$("._neditNote").show();
							$("#inv_note").attr('disabled', true);
							$(".msaveCancelButtons").hide();
						}else if(html.error){
							$.prompt(html.error);
						}
					}
				});
			}else{
				$.prompt("Please enter some value for note!");
			}
		}else{
			$.prompt("Please enter some value for note!");
		}		
	}
function disableForm(e){
	$('#InvoiceForm :input').attr('disabled', true);
	$('#status').attr('disabled', false);
	$('#hiderow').hide();
	$('.td_edit').hide();
	$('.td_remove').hide();
	
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
	

function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}

// from http://www.mediacollege.com/internet/javascript/number/round.html
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

function total_for_edit()
{
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
    price = $(this).html();
    if (!isNaN(price)) total += Number(price);
  });
  
  

tot_hour = roundNumber(tot_hour,2);
  total = roundNumber(total,2);
  tot_rate=$('#invoice_tax_rate').val();
  tot_tax = roundNumber(total*tot_rate/100,2);
  total_with_tax = roundNumber(Number(total)+Number(tot_tax),2);
  
  

  //$('#subtotal').html("$"+total);
  //$('#total').html("$"+total);
  $('#total_hours').val(tot_hour);
  $('#total_due').val(total);
  $('#invoice_total_tax').val(tot_tax);
  $('#invoice_total_due_with_tax').val(total_with_tax);
  //$("#invoice_total_paid").val("$0");
  
  update_balance();
}

function update_balance() {
  var due = $("#invoice_total_due_with_tax").val() - $("#invoice_total_paid").val();
  due = roundNumber(due,2);
  
  $('#total').val($("#invoice_total_due_with_tax").val());
  $('#balance_due').val(due);
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = row.find('.rate').val() * row.find('.hours').val();
  price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html(price);
  
  update_total();
}

function save() {
	var row = $(this).parents('.item-row');
	var ID=row.find('.item_id').html();
	var invoice_id=$('#invoice_id').val();

	var ivcnitem_uuid=row.find('.item_uuid').val();
	var description =row.find('.description').val();
	var rate =row.find('.rate').val();
	var amount=row.find('.price').html();
	var hours =row.find('.hours').val();

	if(description!='' && rate!='' && amount!='' && hours!=''){
		if(!isNaN(rate)){
			if(!isNaN(hours)){
				if(ID!=''){
					var dataString = 'id='+ ID +'&ivcnitem_uuid='+ivcnitem_uuid+'&description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&invoice_id='+invoice_id+'&redirect=false';
				} else {
					var dataString = 'ivcnitem_uuid='+ivcnitem_uuid+'&description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&invoice_id='+invoice_id+'&redirect=false';	
				}
				
				$.ajax({
					type: "POST",
					url: "saveinvoiceitem.cgi",
					data: dataString,
					cache: false,
					success: function(html)
					{
						//__alertMessage(html);
						//var result=html.split(",");
						row.find('.item_id').html(html.id);

						row.find('.item_uuid').val(html.uuid);
						//$('#items').html(html);
						row.find('.s_description').html(description);
						row.find('.s_rate').html(rate);
						row.find('.s_hours').html(hours);
						row.find('.s_description').show();
						row.find('.s_rate').show();
						row.find('.s_hours').show();
						row.find('.description').hide();
						row.find('.rate').hide();
						row.find('.hours').hide();
						
						row.find('.savelink').hide();
						row.find('.editlink').show();
						row.find('.cancellink').hide();
						row.find('.removelink').show();
						
						update_total();
						$('#table-breakpoint').basictable('destroy');	
	
  						$('#table-breakpoint').basictable({
							breakpoint: 751
   						});
					}
				});
			}else{
				__alertMessage('Enter a numeric value');
				$('.hours').focus();
			}
		}else{
			__alertMessage('Enter a numeric value');
			$('.rate').focus();
		}
	} else {
		__alertMessage('Enter all values');
	}
}

function edit() {
	var row = $(this).parents('.item-row');
	row.find('.s_description').hide();
	row.find('.s_rate').hide();
	row.find('.s_hours').hide();
	row.find('.description').show();
	row.find('.rate').show();
	row.find('.hours').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.description').focus();
}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var id=row.find('.item_id').html();
		if(id!=''){
			
	row.find('.s_description').show();
	row.find('.s_rate').show();
	row.find('.s_hours').show();
	row.find('.description').hide();
	row.find('.rate').hide();
	row.find('.hours').hide();
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
		}
		else
		{
			
			row.remove();
		}
		
	}
	
	function remove() {
		
		var row = $(this).parents('.item-row');
		var id=row.find('.item_id').html();
		var ivcnitem_uuid=row.find('.item_uuid').val();
		var invoice_id=$('#invoice_id').val();


var dataString = 'id='+ id+'&delitem_uuid='+ivcnitem_uuid+'&invoice_id='+invoice_id+'&redirect=false';

$.ajax({
type: "POST",
url: "saveinvoiceitem.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
row.remove();
update_total();
}
});
}	



function bind() {
	$(".rate").unbind();
  	$(".hours").unbind();
  	
  	$(".savelink").unbind();
  	$(".editlink").unbind();
  	$(".cancellink").unbind();
  	$(".removelink").unbind();
	
  	$(".rate").blur(update_price);
  	$(".hours").blur(update_price);
  
  	$(".savelink").click(save);
  	$(".editlink").click(edit);
  	$(".cancellink").click(cancel);
  	$(".removelink").click(remove);
}

$(function() {
	if(newEntry==true){
		
		var taxCodeSelected = $('#inv_tax_code').val();
		//alert(taxCodeSelected);
		if(taxCodeSelected=="" || taxCodeSelected=="UK"){
	 		$('#invoice_tax_rate').val("20");
			$('#inv_tax_code').val("UK");
		}else if(taxCodeSelected=="US"){
			$('#invoice_tax_rate').val("");
			update_total();
		}
	}else{
		total_for_edit();
	}
  $('input').click(function(){
    $(this).select();
  });
	
	
  
  $("#paid").blur(update_balance);
   
	$("#addrow").click(function(){
    	$(".item").after('<tr class="item-row"><td class="item-id"><span class="item_id"></span><input class="item_uuid" type="hidden" /></td><td ><span class="s_description" style="display:none" ></span><textarea class="description form-control"></textarea></td><td><span class="s_rate" style="display:none" ></span><input type="text" class="rate num form-control" value="0" style="width:50px" ></td><td><span class="s_hours" style="display:none" ></span><input type="text" class="hours num form-control" value="0" style="width:50px" ></td><td><span class="price">0</span></td><td ><a href="javascript:void(0)" class="editlink" style="display:none " title="Edit"><i CLASS="fa fa-pencil"></i></a><a href="javascript:void(0)" class="savelink" title="Save"><i CLASS="fa fa-save"></i></a></td><td><a href="javascript:void(0)" class="removelink" style="display:none" title="Remove"><i CLASS="fa fa-trash"></i></a><a href="javascript:void(0)" class="cancellink" title="Cancel"><i CLASS="fa fa-remove"></i></a></td></tr>');
		var curr_row = $('.item').next();
		curr_row.find('.description').focus();
		if ($(".delete").length > 0) $(".delete").show();
    	bind();
    	return false;
  	});
  
  bind();
  
 $('#inv_tax_code').change(function(){

	var tax_code=$(this).val();
	if(tax_code=='Rest of the world' || tax_code=='EU'){
		//var tax_rate=prompt("Enter tax rate");
		//$('#invoice_tax_rate').val(tax_rate);
		//code = $('#tax_rate_code').text();
		//(new Function(code))();
		$('#addTaxRate').modal('show');
	}else if(tax_code=='US'){
		$('#invoice_tax_rate').val("");
	}
	else	{
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
  
  /*$(".delete").click(function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 1) $(".delete").hide();
  });
  
  $("#cancel-logo").click(function(){
    $("#logo").removeClass('edit');
  });
  $("#delete-logo").click(function(){
    $("#logo").remove();
  });
  $("#change-logo").click(function(){
    $("#logo").addClass('edit');
    $("#imageloc").val($("#image").attr('src'));
    $("#image").select();
  });
  $("#save-logo").click(function(){
    $("#image").attr('src',$("#imageloc").val());
    $("#logo").removeClass('edit');
  });*/
  
  $("#date").val(print_today());
  
});