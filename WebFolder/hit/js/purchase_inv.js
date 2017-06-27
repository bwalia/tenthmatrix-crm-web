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


function update_total() {
  var subtotal = 0;
 var item_amount=0;
  
  $('.s_item_total').each(function(i){
    item_amount = $(this).html();
	
    if (!isNaN(item_amount)) subtotal += Number(item_amount);
  });
  
subtotal = roundNumber(subtotal,2);

  $('#payment_subtotal').val(subtotal);
	calculate_tax();
}

function calculate_tax(){
	/*var tax_rate= $('#tax_rate').val();
	$('.item-row').each(function(){
		var total_price = $(this).find('.item_quantity').val() * $(this).find('.item_unit_price').val();
		var tax= roundNumber((total_price * tax_rate)/100, 2);
		$(this).find('.s_item_tax').html(tax);
		var amount= roundNumber(total_price + tax, 2);
		$(this).find('.s_item_total').html(amount);
		if($(this).find('.item_uuid').val()!=''){
			$(this).find('.savelink').trigger(click);
		}
	});
	update_total();*/
	var tax_rate= $('#tax_rate').val();
	var subtotal= $('#payment_subtotal').val();
	var tax= roundNumber((subtotal * tax_rate)/100, 2);
	var total= Number(subtotal) + Number(tax);
	
	$('#payment_tax').val(tax);
	$('#payment_total').val(total);
	
}



function update_price() {
	var tax=0;
  var row = $(this).parents('.item-row');
  var total_price = row.find('.item_quantity').val() * row.find('.item_unit_price').val();

	total_price= roundNumber(total_price, 2);

  isNaN(total_price) ? row.find('.s_item_total').html("N/A") : row.find('.s_item_total').html(total_price);
  
  //update_total();
}

function save() {

	var row = $(this).parents('.item-row');
	var item_uuid=row.find('.item_uuid').val();
	var payment_id=$('#purchase_id').val();
	var payment_uuid=$('#purchase_uuid').val();
	var line_number=row.find('.line_number').val();
	var item_purchased =row.find('.item_purchased').val();
	var item_quantity =row.find('.item_quantity').val();
	var item_unit_price=row.find('.item_unit_price').val();
	//var item_tax =row.find('.item_tax').val();
	var item_total =row.find('.s_item_total').html();
	//var item_category_uuid =row.find('.item_category_uuid').val();
	var tax_rate =$('#tax_rate').val();
	
	$('.form_validation_reg').removeData('validator');
	if(line_number!='' && item_purchased!='' && item_quantity!='' && item_unit_price!=''){
		if(!isNaN(line_number)){
		if(!isNaN(item_quantity)){
			if(!isNaN(item_unit_price)){
		
				if(item_uuid!=''){
					var dataString = 'item_uuid='+ item_uuid +'&line_number='+line_number+'&item_purchased='+item_purchased+'&item_quantity='+item_quantity+'&item_unit_price='+item_unit_price+'&item_total='+item_total+'&payment_id='+payment_id+'&payment_uuid='+payment_uuid+'&tax_rate='+tax_rate+'&redirect=false&action=Save';
				} else {
					var dataString = 'line_number='+line_number+'&item_purchased='+item_purchased+'&item_quantity='+item_quantity+'&item_unit_price='+item_unit_price+'&item_total='+item_total+'&payment_id='+payment_id+'&payment_uuid='+payment_uuid+'&tax_rate='+tax_rate+'&redirect=false&action=Save';
				}
				// __alertMessage(dataString);
				$.ajax({
					type: "GET",
					url: "savepurchaseitem.cgi",
					data: dataString,
					cache: false,
					success: function(html)
					{
						//__alertMessage(html);
						//var result=html.split(",");
						if(html.Success) {
							row.find('.item_uuid').val(html.ItemUUID);
							//$('#items').html(html);
							row.find('.s_line_number').html(line_number);
							row.find('.s_item_purchased').html(item_purchased);
							row.find('.s_item_quantity').html(item_quantity);
							row.find('.s_item_unit_price').html(item_unit_price);
							//row.find('.s_item_tax').html(item_tax);
						//	row.find('.s_item_category_uuid').html(item_category_uuid);
	
							row.find('.s_line_number').show();
							row.find('.s_item_purchased').show();
							row.find('.s_item_quantity').show();
							row.find('.s_item_unit_price').show();
							//row.find('.s_item_tax').show();
							//row.find('.s_item_category_uuid').show();
							
							row.find('.line_number').hide();
							row.find('.item_purchased').hide();
							row.find('.item_quantity').hide();
							row.find('.item_unit_price').hide();
							//row.find('.item_tax').hide();
							//row.find('.item_category_uuid').hide();
							
							row.find('.savelink').hide();
							row.find('.editlink').show();
							row.find('.cancellink').hide();
							row.find('.removelink').show();

							if(html.Total){
								$('#payment_subtotal').val(html.Subtotal);
								$('#payment_tax').val(html.Payment_Tax);
								$('#payment_total').val(html.Total);
							}
							else{
								update_total();
							}
						}	
					}
				});
			}else{
				__alertMessage('Enter a numeric value for unit price');
				$('.item_unit_price').val('');
				$('.item_unit_price').focus();
			}
		}else{
			__alertMessage('Enter a numeric value for quantity');
			$('.item_quantity').val('');
			$('.item_quantity').focus();
		}
		}else{
			__alertMessage('Enter a numeric value for line number');
			$('.line_number').val('');
			$('.line_number').focus();
		}
	}else {
		__alertMessage('Enter all values');
	}
}

function edit() {
	$('#items').find(".cancellink").trigger('click');
	var row = $(this).parents('.item-row');
	row.find('.s_line_number').hide();
	row.find('.s_item_purchased').hide();
	row.find('.s_item_quantity').hide();
	row.find('.s_item_unit_price').hide();
	//row.find('.s_item_tax').hide();
	//row.find('.s_item_category_uuid').hide();
	
	row.find('.line_number').show();
	row.find('.item_purchased').show();
	row.find('.item_quantity').show();
	row.find('.item_unit_price').show();
	//row.find('.item_tax').show();
	//row.find('.item_category_uuid').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.line_number').focus();
}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var item_uuid=row.find('.item_uuid').val();
		if(item_uuid!=''){
			
	row.find('.s_line_number').show();
	row.find('.s_item_purchased').show();
	row.find('.s_item_quantity').show();
	row.find('.s_item_unit_price').show();
	//row.find('.s_item_tax').show();
	//row.find('.s_item_category_uuid').show();
	
	row.find('.line_number').hide();
	row.find('.item_purchased').hide();
	row.find('.item_quantity').hide();
	row.find('.item_unit_price').hide();
	//row.find('.item_tax').hide();
	//row.find('.item_category_uuid').hide();
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
	$('label.error').remove();
		}
		else
		{
			
			row.remove();
		}
		
	}
	
function remove() {

	var row = $(this).parents('.item-row');
	var item_uuid=row.find('.item_uuid').val();
	var payment_id=$('#purchase_id').val();
	var payment_uuid=$('#purchase_uuid').val();
	var tax_rate =$('#tax_rate').val();
	
	var dataString = 'item_uuid='+item_uuid+'&payment_id='+payment_id+'&payment_uuid='+payment_uuid+'&tax_rate='+tax_rate+'&redirect=false&action=Delete';
	
	$.ajax({
		type: "GET",
		url: "savepurchaseitem.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			if(html.Success) {
				row.remove();
				if(html.Total){
					$('#payment_subtotal').val(html.Subtotal);
					$('#payment_tax').val(html.Payment_Tax);
					$('#payment_total').val(html.Total);
				}
				else{
					update_total();
				}
			}
		}
	});
}	



function bind() {
	$(".item_quantity").unbind();
  $(".item_unit_price").unbind();

  
  $(".savelink").unbind();
  $(".editlink").unbind();
  $(".cancellink").unbind();
  $(".removelink").unbind();
	
  $(".item_quantity").blur(update_price);
 $(".item_unit_price").blur(update_price);

  
  $(".savelink").click(save);
  $(".editlink").click(edit);
  $(".cancellink").click(cancel);
  $(".removelink").click(remove);
}

$(function() {

	var tax_code_selected=$('#tax_code').val();
   	if(tax_code_selected=='UK'){
		$('#tax_rate').val("20");
   	}else if(tax_code_selected=="US"){
		$('#tax_rate').val(0);
	}
	$("#addrow").click(function(){
		$('#items').find(".cancellink").trigger('click');
  	  	$(".item").after('<tr class="item-row" id=""><td class="item-id"><span class="s_line_number" style="display:none;" ></span><div><input type="text" class="line_number form-control"  name="line_number" value="" ></div><input class="item_id form-control" name="item_id" type="hidden" value="" /><input class="item_uuid" name="item_uuid" type="hidden" value="" /></td><td ><span class="s_item_purchased" style="display:none;" ></span><div><input type="text" class="item_purchased form-control" name="item_purchased"  value="" ></div></td><td><span class="s_item_quantity" style="display:none;" ></span><div><input type="text" class="item_quantity form-control"  name="item_quantity" value="" ></div></td><td><span class="s_item_unit_price" style="display:none;" ></span><div><input type="text" class="item_unit_price form-control" name="item_unit_price" value="" ></div></td><td><span class="s_item_total" ></span></td><td><a href="javascript:void(0)" class="editlink" style="display:none;" title="Edit"><i class="fa fa-pencil"></i></a><a href="javascript:void(0)" class="savelink" title="Save"><i class="fa fa-save"></i></a></td><td><a href="javascript:void(0)" class="removelink" style="display:none;" title="Delete"><i class="fa fa-trash"></i></a><a href="javascript:void(0)" class="cancellink" title="Cancel"><i class="fa fa-remove"></i></a></td></tr>');
		var curr_row = $('.item').next();
		curr_row.find('.line_number').focus();
	    bind();
  	});
  
  	bind();
  
  	$('#tax_code').change(function(){
		var tax_code=$(this).val();
		if(tax_code=='Rest of the world' || tax_code=='EU'){
			$('#addTaxRate').modal('show');
		}else if(tax_code=='US'){
			$('#tax_rate').val(0);
		}	else	{
			$('#tax_rate').val("20");
		}
		update_total();
	});

	$("#date").val(print_today());
  	
  	$('#table-breakpoint').basictable({
		breakpoint: 751
   	});
  	if(!$( "#Client_ID" ).val() || $( "#Client_ID" ).val()==''){
		get_clients();
	}
	if(!$( "#Project_UUID" ).val() || $( "#Project_UUID" ).val()==''){
		get_projects();
	}
	if(!$( "#bank_paid_from_id" ).val() || $( "#bank_paid_from_id" ).val()=='' || $( "#bank_paid_from_id" ).val()==0){
		get_accounts();
	}
		
	$('#payment_date').datepicker().on('changeDate', function (ev) {
		$(this).datepicker('hide');
	});
				
	$('.num').keypress(function(e){
		checknumber(e);	
	}); 
		
	// validate form on keyup and submit
	$("#PurchaseInvoiceForm").validate({
		ignore: "",
		onkeyup: false,
		errorClass: 'error',
		validClass: 'valid',
		errorElement: "em",
		errorPlacement: function(error, element) {
			$(element).closest('div').append(error);
		},
		onfocusout: false,
		invalidHandler: function(form, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {                    
				validator.errorList[0].element.focus();
			}
		},
		rules: {
			payment_date: { required: true  },
			Client_ID: { required: true  },
			payment_method: { required: true  },
			employee_uuid: { required: true  },
		},
	});
	$( "#Client_ID" ).combobox();
	$( "#Project_UUID" ).combobox();
	$('#bank_paid_from_id').combobox();
	$("#uuid_analysis_ledger" ).combobox();
    $("#uuid_analysis_account").combobox();
});
	function generate_manual_id(){
		$("#msgSpan").remove();
		if($('#invoice_numbr').val()!=null && $('#invoice_numbr').val()!=""){
			var jsonRowURLStr = 'checkpin.cgi?inv_no='+$('#invoice_numbr').val();
			$.getJSON(jsonRowURLStr,function(result){
				if(result.success){
					$("#messageId").before('<span id="msgSpan" style="color:#CC0000;">'+result.success+'</span>');
					$('#invoice_numbr').val('');
					$('#invoice_numbr').focus();
				}else{
					$('#purchase_inv_no').val($('#invoice_numbr').val());
					$('#purchase_id').val($('#invoice_numbr').val());
					$('#enterNewInvoice').modal('hide');
				}
			});
		}else {
			$("#messageId").before('<span id="msgSpan" style="color:#CC0000;">* Please enter Purchase Invoice number!</span>');
			$('#invoice_numbr').focus();
		}
	}
	function applyTaxEntered(){
		$("tax_message").remove();
		if($('#dlg_tax_rate').val()!=null && $('#dlg_tax_rate').val()!=""){
			$('#tax_rate').val($('#dlg_tax_rate').val());
			calculate_tax();
			$('#addTaxRate').modal('hide');
			$('#dlg_tax_rate').val('');
		}	else {
			$('#taxmessageId').before('<span id="tax_message" style="color:#CC0000;">* Please enter Tax Rate.</span>');
			$('#dlg_tax_rate').focus();
		}
	}
	
	function checknumber(e){
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
		var jsonRow = 'getanalysisaccountsonsearch.cgi?srch=&money=out';
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
				var nameStr="";
				$.each(result, function(i,item){
					html += '<option value="'+item.uuid+'"';
					if(item.uuid==l_uuid){
						html += ' selected ';
						nameStr=item.name;
					}
					html += '>'+item.name+'</option>';
				});
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
		var jsonRow = 'returncustomerValues.cgi?client='+$('#Client_ID').val();
		$.getJSON(jsonRow,function(html){	
			if(html){
				$("#beneficiary_address").val(html.bill_to);
				get_customer_analysisaccounts(html.uuid_analysis_ledger,html.uuid_analysis_account);
				get_customer_ledger(html.uuid_analysis_ledger);
			}
		});
	}
	
function get_account_info(){
	var account_id=	$("#bank_paid_from_id").val();
	var dataString = 'Account_ID='+account_id;
		//alert(dataString);
			
	$.ajax({
		type: "GET",
		url: "returnaccountdetail.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			$("#sort_code").val(html.Sort_Code);
			$("#swift_code").val(html.Swift_Code);
			$("#routing").val(html.Routing);
			$("#iban").val(html.Iban);
			$("#bic_code").val(html.Bic_Code);
			$("#currency_code").val(html.Currency_Code);
		}
	});

}
	
	function get_projects(){
		if($('#Client_ID').val() && $('#Client_ID').val()!=''){
			$('#div_proj').find('.ui-autocomplete-input').val('');
			var jsonRow = 'getprojectsonsearch.cgi?srch=&client_uuid='+$('#Client_ID').val();
		}
		else{
			var jsonRow = 'getprojectsonsearch.cgi?srch=';
		}
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';

				$.each(result, function(i,item)
				{
					html += '<option value="'+item.ProjectUUID+'">'+item.value+'</option>';
				});
				
				$('#Project_UUID').html(html);
			}
		});
	}
	
	function get_clients(){
		var jsonRow = 'getcompaniesonsearch.cgi?srch=&companies=supplier';
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';

				$.each(result, function(i,item)
				{
					html += '<option value="'+item.CustoemrUUID+'">'+item.value+'</option>';
				});
				
				$('#Client_ID').html(html);
			}
		});
	}
	
	function get_accounts(){
		var jsonRow = 'getaccountonsearch.cgi?srch=';
		$.getJSON(jsonRow,function(result){	
			if(result){
				var html='<option value=""></option>';

				$.each(result, function(i,item)
				{
					html += '<option value="'+item.AccountID+'">'+item.AccountName+'</option>';
				});
				
				$('#bank_paid_from_id').html(html);
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
			
			if(ele_select.attr('id')=='Client_ID'){
				get_client_info();
				get_projects();
			}
			else if(ele_select.attr('id')=='bank_paid_from_id'){
				get_account_info();
			}
			else if(ele_select.attr('id')=='uuid_analysis_ledger'){
				get_customer_analysisaccounts();
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
		if(ele_select.attr('id')=='Client_ID'){
		var jsonRow = 'getcompaniesonsearch.cgi?srch='+request.term+'&companies=supplier';
		}
		else if(ele_select.attr('id')=='Project_UUID'){
			var jsonRow = 'getprojectsonsearch.cgi?srch='+request.term+'&client_uuid='+$('#Client_ID').val();
		}
		else if(ele_select.attr('id')=='bank_paid_from_id'){
			var jsonRow = 'getaccountonsearch.cgi?srch='+request.term;
		}
		else if(ele_select.attr('id')=='uuid_analysis_ledger'){
			var jsonRow = 'getledgersonsearch.cgi?srch='+request.term;
		}
		else if(ele_select.attr('id')=='uuid_analysis_account'){
			var jsonRow = 'getanalysisaccountsonsearch.cgi?srch='+request.term+'&ledger_uuid='+$('#uuid_analysis_ledger').val()+'&money=out';
		}
		

		//alert(jsonRowURLStr);
		if(xhr) xhr.abort();
		xhr=$.getJSON(jsonRow,function(result){
			
			if(result){
				var html='<option value=""></option>';
				if(result.error){
				
				}else{
				$.each(result, function(i,item)
				{
					if(ele_select.attr('id')=='Client_ID'){
						html += '<option value="'+item.CustoemrUUID+'">'+item.value+'</option>';
					}
					else if(ele_select.attr('id')=='Project_UUID'){
						html += '<option value="'+item.ProjectUUID+'">'+item.value+'</option>';
					}
					else if(ele_select.attr('id')=='bank_paid_from_id'){
						html += '<option value="'+item.AccountID+'">'+item.AccountName+'</option>';
					}else if(ele_select.attr('id')=='uuid_analysis_ledger'){
						html += '<option value="'+item.uuid+'">'+item.name+'</option>';
					}else if(ele_select.attr('id')=='uuid_analysis_account'){
						html += '<option value="'+item.uuid+'">'+item.name+'</option>';
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
		if(ele_select.attr('id')=='Client_ID'){
			get_client_info();
			get_projects();
			}
		else if(ele_select.attr('id')=='bank_paid_from_id'){
				get_account_info();
			}else if(ele_select.attr('id')=='uuid_analysis_ledger'){
				get_customer_analysisaccounts();
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