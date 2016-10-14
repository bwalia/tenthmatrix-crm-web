<!--HIT_EXECUTE

//drilldownSeries=[{ name:"Assigned", id:"Assigned", data:[["Sandy", 4], ["Neha", 3], ["Tanima", 3]]}, { name:"acknowledged ", id:"acknowledged ", data:[["Sandy", 5], ["Neha", 5], ["Tanima", 5]]}, { name:"closed ", id:"closed ", data:[["Sandy", 5], ["Neha", 5], ["Tanima", 5]]}, { name:"confirmed ", id:"confirmed ", data:[["Sandy", 4], ["Neha", 4], ["Tanima", 5]]}, { name:"feedback ", id:"feedback ", data:[["Sandy", 3], ["Neha", 3], ["Tanima", 2]]}, { name:"new ", id:"new ", data:[["Sandy", 3], ["Neha", 4], ["Tanima", 4]]}, { name:"resolved ", id:"resolved ", data:[["Sandy", 6], ["Neha", 5], ["Tanima", 6]]}];

C_LONGINT(iCounter;jsonobject;result;Employeeobject;resultEmployee)
ARRAY LONGINT(status;0)
result:=JSON New Array 

//Assigned 
jsonobject:=JSON New Object 
QUERY([Tasks]; & ;[Tasks]task_status="assigned")
If (Records in selection([Tasks])>0)
resultEmployee:=JSON New Array 
For (iCounter;1;Records in selection([Tasks]))
	QUERY([Employees];[Employees]uuid=[Tasks]uuid_assigned_to)
	Employeeobject:=JSON New Array 
	JSON Set Text (Employeeobject;"name";[Employees]emp_first_name+" "+[Employees]emp_last_name)
	JSON Set Number (Employeeobject;"value";Records in selection([Tasks]))
End for 
JSON Set Array (resultEmployee;"";Employeeobject)
End if 
JSON Set Array (jsonobject;"data";resultEmployee)


JSON Set Text (jsonobject;"name";"Assigned")
JSON Set Text (jsonobject;"drilldown";"Assigned")
JSON Set Number (jsonobject;"y";Records in selection([Tasks]))
JSON Set Object (result;"";jsonobject)

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->