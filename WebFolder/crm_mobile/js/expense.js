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

function update_distance()
{
	
	var start_mile=Number($('#start_mile').val());
	var end_mile=Number($('#end_mile').val());
	if(start_mile!='' && end_mile>0){
		var distance=roundNumber(end_mile-start_mile,2);
		$('#distance').val(distance);
		if($('#items tr.item-row').length==0){
			update_list();
		}
	}
}

function update_tax()
{
	var tax_rate=Number($('#tax_rate').val());
	var total=Number($('#total_amount').val());
	if(tax_rate>0 && total>0){
		var tax_amt=roundNumber((total*tax_rate)/100,2);
		$('#tax_amount').val(tax_amt);
	}
}

function update_total()
{
	
	var total=0;
	$('#items tr.item-row').each(function(){
		//alert($(this).find('.s_amount').html());
		total+=Number($(this).find('.s_amount').html());					   
	});
	$('#total_amount').val(total);
	update_tax();
}

function update_list()
{
	
	var start_mile=Number($('#start_mile').val());
	var end_mile=Number($('#end_mile').val());
	var distance=Number($('#distance').val());
	var price_per=Number($('#price_per').val());
	var amount=roundNumber(distance*price_per,2);
	var type="Travel";
	var description="Distance Travelled "+distance+" Miles. Start Mileage: "+start_mile+" End Mileage: "+end_mile;
	$(".item").after('<tr class="item-row" ><td class="item-id"><span class="s_type" style="display:none;" ></span><input type="text" class="type" value="'+type+'" ><input class="item_uuid" type="hidden" /></td><td ><span class="s_description" style="display:none" ></span><textarea class="description">'+description+'</textarea></td><td><span class="s_amount" style="display:none;" ></span><input type="text" class="amount num1" value="'+amount+'" ></td><td ><a href="javascript:void(0)" class="editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="savelink" >Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
	bind();
	
	var curr_row = $('#items tr.item').next();
	
	curr_row.find('.savelink').trigger('click');
	//alert(curr_row.length);
	//alert(curr_row.find('.savelink').length);
	
}

function save() {

var row = $(this).parents('.item-row');

var m_uuid=$('#mileage_uuid').val();
var item_uuid=row.find('.item_uuid').val();
var type =row.find('.type').val();
var description =row.find('.description').val();
var amount=row.find('.amount').val();

if(description!='' && type!='' && amount!='')
{
	
		
var dataString = 'item_uuid='+item_uuid+'&description='+description+'&type='+type+'&amount='+amount+'&m_uuid='+m_uuid+'&redirect=false';


	
$.ajax({
type: "GET",
url: "savemileageexpenseitem.cgi",
data: dataString,
cache: false,
success: function(html)
{
	//alert(html);
	
	if(html!=''){
		
	row.find('.item_uuid').val(html);
	
	}

row.find('.s_description').html(description);
	row.find('.s_type').html(type);
	row.find('.s_amount').html(amount);
row.find('.s_description').show();
	row.find('.s_type').show();
	row.find('.s_amount').show();
	
	row.find('.description').hide();
	row.find('.type').hide();
	row.find('.amount').hide();
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
 //bind();
 update_total();
}
});
}
else
{
alert('enter all values');
}
}

function edit() {
	
		var row = $(this).parents('.item-row');
	row.find('.s_description').hide();
	row.find('.s_type').hide();
	row.find('.s_amount').hide();
	row.find('.description').show();
	row.find('.type').show();
	row.find('.amount').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.description').focus();
		
	}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var id=row.find('.item_uuid').val();
		if(id!=''){
			
	row.find('.s_description').show();
	row.find('.s_type').show();
	row.find('.s_amount').show();
	row.find('.description').hide();
	row.find('.type').hide();
	row.find('.amount').hide();
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
		}
		else
		{
			
			row.hide();
		}
		
	}
	
	function remove() {
		
		var row = $(this).parents('.item-row');
		
		var item_uuid=row.find('.item_uuid').val();

var dataString = 'delitem_uuid='+item_uuid;
//alert(dataString);
$.ajax({
type: "GET",
url: "delmileageexpenseitem.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
row.hide();
 //bind();
 update_total();
}
});
}	

function get_client()
{
	var inv_no=	$("#inv_no").val();
	if(inv_no!=''){
	var dataString = 'inv_no='+inv_no;
	$.ajax({
type: "GET",
dataType: "json",
url: "getclientinvoice.cgi",
data: dataString,
cache: false,
success: function(html)
{
	if(html.invoiceuuid){
		$('#err_msg').html('');
		$("#client_id").val(html.CustomerID);
		$("#client_name").val(html.CustomerName);
	}
	else{
		//alert("Invoice no "+inv_no+" doesn't exists.");
		$('#err_msg').html("Invoice no "+inv_no+" doesn't exists.");
		$("#inv_no").val('0');
		$("#client_id").val('');
		$("#client_name").val('');
	}
	
}
});
}
}


function bind() {
	
  $(".savelink").unbind();
  $(".editlink").unbind();
  $(".cancellink").unbind();
  $(".removelink").unbind();
	$(".num1").unbind();

  
  $(".savelink").click(save);
  $(".editlink").click(edit);
  $(".cancellink").click(cancel);
  $(".removelink").click(remove);
  $('.num1').keypress(function(e){
	checknumber(e);						
	});
  
}

$(function() {
bind();
  $("#start_mile").blur(function(){
	update_distance();
	});
 
  $("#end_mile").blur(function(){
	update_distance();
	});
  $("#tax_rate").blur(function(){
	update_tax();
	});
 
  $("#distance").change(function(){
	if($('#items tr.item-row').length==0){
		update_list();
	}
	});
  
  $("#inv_no").blur(function(){
	get_client();
	});
  
 $("#addrow").click(function(){
    $(".item").after('<tr class="item-row"><td class="item-id"><span class="s_type" style="display:none;" ></span><input type="text" class="type" ><input class="item_uuid" type="hidden" /></td><td ><span class="s_description" style="display:none" ></span><textarea class="description"></textarea></td><td><span class="s_amount" style="display:none;" ></span><input type="text" class="amount num1" ></td><td ><a href="javascript:void(0)" class="editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="savelink" >Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
	var curr_row = $('.item').next();
	curr_row.find('.type').focus();
	
    //if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  
  
});