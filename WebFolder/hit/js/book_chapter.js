
function save() {

var row = $(this).parents('.item-row');
var book_id=$('#book_id').val();
var chapter_uuid=row.find('.chapter_uuid').val();
var title =row.find('.title').val();
var ChapterSection =row.find('.ChapterSection').val();
var SectionTitle=row.find('.SectionTitle').val();
var PartTitle =row.find('.PartTitle').val();


if(title!='' && ChapterSection!='')
{

		
var dataString = 'book_id='+ book_id +'&chapter_uuid='+chapter_uuid+'&title='+title+'&ChapterSection='+ChapterSection+'&SectionTitle='+SectionTitle+'&PartTitle='+PartTitle+'&redirect=false';

	
$.ajax({
type: "GET",
dataType: "json",
url: "savebookchapter.cgi",
data: dataString,
cache: false,
success: function(html)
{
	//alert(html);
	if(chapter_uuid==''){

	row.find('.chapter_uuid').val(html);
	}
	
row.find('.s_title').html(title);
	row.find('.s_ChapterSection').html(ChapterSection);
	row.find('.s_SectionTitle').html(SectionTitle);
	
	row.find('.s_PartTitle').html(PartTitle);
	
	row.find('.s_title').show();
	row.find('.s_ChapterSection').show();
	row.find('.s_SectionTitle').show();
	
	row.find('.s_PartTitle').show();
	
	row.find('.title').hide();
	row.find('.ChapterSection').hide();
	row.find('.SectionTitle').hide();
	
	row.find('.PartTitle').hide();
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
 bind();
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
	row.find('.s_title').hide();
	row.find('.s_ChapterSection').hide();
	row.find('.s_SectionTitle').hide();
	
	row.find('.s_PartTitle').hide();
	
	row.find('.title').show();
	row.find('.ChapterSection').show();
	row.find('.SectionTitle').show();
	
	row.find('.PartTitle').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.title').focus();
		
	}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var chapter_uuid=row.find('.chapter_uuid').val();
		if(chapter_uuid!=''){
			
	row.find('.s_title').show();
	row.find('.s_ChapterSection').show();
	row.find('.s_SectionTitle').show();
	
	row.find('.s_PartTitle').show();
	
	row.find('.title').hide();
	row.find('.ChapterSection').hide();
	row.find('.SectionTitle').hide();
	
	row.find('.PartTitle').hide();
	
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
		
		var chapter_uuid=row.find('.chapter_uuid').val();

var dataString = 'delchapter_uuid='+chapter_uuid;

$.ajax({
type: "GET",
dataType: "json",
url: "savebookchapter.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
row.hide();
 bind();
}
});
}	



function bind() {
	
  
  $(".savelink").unbind();
  $(".editlink").unbind();
  $(".cancellink").unbind();
  $(".removelink").unbind();
 
  $(".savelink").click(save);
  $(".editlink").click(edit);
  $(".cancellink").click(cancel);
  $(".removelink").click(remove);
}

$(function() {

 
  $("#addrow").click(function(){
    $(".item").after('<tr class="item-row" ><td ><span class="s_title" style="display:none;" ></span><input class="chapter_uuid" type="hidden" /><input type="text" class="title" value="" ></td><td ><span class="s_ChapterSection" style="display:none;" ></span><input type="text" class="ChapterSection" ></td><td><span class="s_SectionTitle" style="display:none;" ></span><input type="text" class="SectionTitle" ></td><td><span class="s_PartTitle" style="display:none;" ></span><input type="text" class="PartTitle" ></td><td ><a href="javascript:void(0)" class="editlink" style="display:none;">Edit</a><a href="javascript:void(0)" class="savelink">Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none;" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
	var curr_row = $('.item').next();
	curr_row.find('.title').focus();
	
   
    bind();
  });
  
  bind();
  
 
  
 
  
});