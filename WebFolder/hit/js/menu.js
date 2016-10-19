function __alertMessage(msg){
	$.prompt(" ", {
		title: msg,
		buttons: { "Close": false }
	});
}

function openLoadedMenu(){
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var filelink = $("a[href='"+filename+"']");
var ulparent = filelink.parents('.submenu');
var liparent = ulparent.parent('li');
filelink.addClass('active');
ulparent.addClass('active');
liparent.addClass('active');
var mainlink = liparent.children('.dropdown-toggle');
mainlink.after('<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>');
}
var menuxhr;

function load_navigation_data(){
	var jsonRow = 'loadnavigator.cgi';
	var keyword= $("#menu").val();
	if(keyword!='' && keyword!='undefined'){
		jsonRow +='?keyword='+keyword;
	}
	
	if(menuxhr) menuxhr.abort();
	menuxhr=$.getJSON(jsonRow,function(result){
		if(result.Alert){
			//
		}else{
			var table_html='<li><a href="index.shtml"><i class="fa fa-dashboard"></i> <span>Dashboard</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a></li>';
			var urlStr = window.location.pathname;
			var openedFileNameStr = urlStr.substring(urlStr.lastIndexOf('/')+1);
			
			$.each(result, function(i,item){
				var activeMenuFlag=false;
				if(item.Sub_Module){
					if(item.Sub_Module!=""){
						if(item.uuid){
							var iconStr=item.icon_path_1;
							var imagesPathStr=iconStr.indexOf("images/");
							var imgPathStr=iconStr.indexOf("img/");
							var pathStr=iconStr.indexOf("/");
							var subTableHtmlStr="";	
							var loadSetsFileStr="";
							$.each(item.Sub_Module, function(i,row){
								if(openedFileNameStr==row.sub_module_file){
									subTableHtmlStr+='<li class="active ">';
									activeMenuFlag=true;
								}else{
									subTableHtmlStr+='<li>';
								}
								if(i==0 && loadSetsFileStr==""){
									loadSetsFileStr=row.sub_module_file;
								}
								subTableHtmlStr+='<a href="'+row.sub_module_file+'" target="_blank" onclick="saveusermodulepreferences(\''+item.uuid+'\');"><i class="fa fa-circle-o"></i> '+row.sub_module_name+'</a></li>';
							});
									
							if(activeMenuFlag){
								table_html+='<li class="active treeview">';
							}else{
								table_html+='<li class="treeview">';
							}
							table_html+='<a href="javascript:void(0)">';
							if(pathStr>=0 || imgPathStr>=0 || imagesPathStr>=0){
								table_html+='<i><img width="18" height="18" alt="" src="'+iconStr+'"></i>';
							}else{
								table_html+='<i class="'+iconStr+'"></i>';
							}
							table_html+='<span>'+item.module_name+'</span><i class="icon-chevron-down"></i><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>';
							if(activeMenuFlag){
								table_html+='<ul class="submenu active treeview-menu">';
							}else{
								table_html+='<ul class="submenu treeview-menu">';
							}
							table_html+=subTableHtmlStr;
							/**if(item.Sets){
								if(item.Sets!=""){
					        		table_html+='<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;"><strong> Sets</strong></span><i class="icon-chevron-down" style="padding-right: 13px;"></i>';
									table_html+='</a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;">';
									$.each(item.Sets, function(i,set_row){
										table_html+='<li><a href="'+loadSetsFileStr+'?set='+set_row.set_name+'&set_uuid='+set_row.set_uuid+'">'+set_row.set_name+'</a></li>';
									});					
									table_html+='</ul></li>';
								}
							}**/
							table_html+='</ul>';
						}							
					}
				}                
			});
			$('#dashboard-menu').html('');
			$("#dashboard-menu").html(table_html);
			
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

function toggle_left_submenu(id){
	var liparent = $(id).parent('li');
	var ulparent = liparent.find('.submenu');
	if(liparent.hasClass('active')){
		liparent.removeClass('active');
		ulparent.removeClass('active');
	}else{
		liparent.addClass('active');
		ulparent.addClass('active');
	}
}

function saveusermodulepreferences(e){
	var jsonRow="updatemodulecount.cgi?uuid="+e;
	$.getJSON(jsonRow,function(result){
		//console.log(result);
	});
}