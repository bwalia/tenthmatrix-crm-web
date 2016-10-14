// JavaScript Document
$('#detailsPage').live('pageshow', function(event) {
	var code = getUrlVars()["code"];
	$.getJSON('../jqm/includes/getjob.php?code='+code, displayJob);
});

function displayJob(data) {
	var job = data.item;
	console.log(job);
	$('#applyButton').html('<a data-role="button" data-transition="fade" data-theme="a" href="applynow.php?jobId='+job.ID+'" class="ui-btn-left">Apply</a>');
	$('#jobName').text(job.Document);
	$('#jobDetail').html(job.Body);

	if (job.Published_timestamp>0) {
		var publish = timeConverter(job.Published_timestamp);
		$('#actionList').append('<li><h3>Date posted</h3>' +
				'<p>' + publish + '</p></li>');
	}
	
	if (job.FFAlpha80_2!='' || job.FFAlpha80_2!=0) {
		$('#actionList').append('<li><h3>Salary</h3>' +
				'<p>' + job.FFAlpha80_2 + '</p></li>');
	}
	
	if (job.FFAlpha80_1) {
		$('#actionList').append('<li><h3>Location</h3>' +
				'<p>' + job.FFAlpha80_1 + '</p></li>');
	}
	
	if (job.FFAlpha80_3) {
		$('#actionList').append('<li><h3>Type</h3>' +
				'<p>' + job.FFAlpha80_3 + '</p></li>');
	}
	
	if (job.FFAlpha80_4) {
		$('#actionList').append('<li><h3>Company</h3>' +
				'<p>' + job.FFAlpha80_4 + '</p></li>');
	}
				
	if (job.Title) {
		$('#actionList').append('<li><h3>Division</h3>' +
				'<p>' + job.Title + '</p></li>');
	}
				
	/*if (job.cellPhone) {
		$('#actionList').append('<li><h3>Consultant</h3>' +
				'<p>' + job.cellPhone + '</p></li>');
	}*/
	
	$('#actionList').listview('refresh');
	
}

function timeConverter(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
     var day = days[a.getDay()];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     var sec = a.getSeconds();
     var time = day+' '+date+','+month+' '+year+' '+hour+':'+min+':'+sec ;
     return time;
}
 
/*function Salary_GetRangeCode($startSalaryReal, $endSalaryReal){
if($startSalaryReal==0) $startSalaryReal=15000;
if($endSalaryReal==0) $endSalaryReal=20000;

if(($startSalaryReal>=15000) & ($endSalaryReal<=20000)) return "15_20";
if(($startSalaryReal>=20000) & ($endSalaryReal<=30000)) return "20_30";
if(($startSalaryReal>=30000) & ($endSalaryReal<=40000)) return "30_40";
if(($startSalaryReal>=40000) & ($endSalaryReal<=50000)) return "40_50";
if(($startSalaryReal>=50000) & ($endSalaryReal<=50000)) return "50+";
return "";
}*/

