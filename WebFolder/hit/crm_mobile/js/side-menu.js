var menuxhr;
function load_navigation_data(){
	var jsonRow = 'loadnavigator.cgi';
	var search= $("#menu").val();
	if(search!='' && search!='undefined'){
		jsonRow +='?keyword='+search;
	}
	
	if(menuxhr) menuxhr.abort();
	menuxhr=$.getJSON(jsonRow,function(result){
		if(result.Alert){
			//
		}else{
			var table_html='<li data-filtertext="demos homepage" data-icon="home"><a href="index.shtml" data-ajax="false">Home</a></li>';
			
			$.each(result, function(i,item){
				if(item.module_name!="Documents"){
				if(item.Sub_Module){
					if(item.Sub_Module!=""){
						if(item.uuid){
							var subTableHtmlStr="";	
								subTableHtmlStr+='<li data-role="collapsible" data-enhanced="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-iconpos="right" data-inset="false" class="ui-collapsible ui-collapsible-themed-content ui-collapsible-collapsed">';
								subTableHtmlStr+='<h3 class="ui-collapsible-heading ui-collapsible-heading-collapsed">';
								subTableHtmlStr+='<a href="#" class="ui-collapsible-heading-toggle ui-btn ui-btn-icon-right ui-btn-inherit ui-icon-carat-d">';
								subTableHtmlStr+=item.module_name+'<span class="ui-collapsible-heading-status"> click to expand contents</span>';
								subTableHtmlStr+='</a>';
								subTableHtmlStr+='</h3>';
								subTableHtmlStr+='<div class="ui-collapsible-content ui-body-inherit ui-collapsible-content-collapsed" aria-hidden="true">';
								subTableHtmlStr+='<ul class="ui-listview">';
							$.each(item.Sub_Module, function(i,row){
								if(row.sub_module_file!="calender.shtml"){
								subTableHtmlStr+='<li data-filtertext="form checkboxradio widget checkbox input checkboxes controlgroups"><a href="'+row.sub_module_file+'" data-ajax="false" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+row.sub_module_name+'</a></li>';
								}
							});
								subTableHtmlStr+='</ul>';
								subTableHtmlStr+='</div>';
								subTableHtmlStr+='</li>';
							table_html+=subTableHtmlStr;
						}							
					}
				}     
				}           
			});
			$('#dashboard-menu').html('');
			$("#dashboard-menu").html(table_html);
			//$("#dashboard-menu").trigger( "updatelayout" );
			$( "[data-role=panel]" ).panel().enhanceWithin();
			$('ul.ui-listview').listview('refresh');
		}
	});
}
$(document).ready(function() {
   load_navigation_data();
   	
   	var typingTimer;                //timer identifier
	var doneTypingInterval = 100;  //time in ms, 5 second for example
	
	$('#menu').keyup(function(){
		clearTimeout(typingTimer);
		if ($('#menu').val) {
			typingTimer = setTimeout(function(){
				load_navigation_data();
			}, doneTypingInterval);
		}
	});			
});