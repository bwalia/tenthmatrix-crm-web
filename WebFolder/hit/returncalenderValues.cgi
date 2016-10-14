<!--HIT_EXECUTE
C_LONGINT(iCounter;jsonobject;result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

sdate:=Num(timestamp_unix_Get (Date(_HIT_WebApp_GetField ("s_date"));Time(_HIT_WebApp_GetField ("s_time"))))
eDate:=Num(timestamp_unix_Get (Date(_HIT_WebApp_GetField ("e_date"));Time(_HIT_WebApp_GetField ("e_time"))))

QUERY([Timeslips];[Timeslips]Timestamp_start>=sdate;*)
QUERY([Timeslips]; & ;[Timeslips]Timestamp_end<=eDate)

result:=JSON New Array 
For (iCounter;1;Records in selection([Timeslips]))
jsonobject:=JSON New Object 

JSON Set Number (jsonobject;"id";[Timeslips]task_id)
//QUERY([Tasks];[Tasks]task_id=[Timeslips]task_id)
//JSON Set Text (jsonobject;"Task_Name";[Tasks]task_name)
QUERY([Employees];[Employees]emp_id=[Timeslips]emp_id)
JSON Set Text (jsonobject;"Task_Name";[Employees]emp_first_name+" "+[Employees]emp_last_name+": "+char(Carriage return)+[Timeslips]slip_description)
JSON Set Text (jsonobject;"uuid";[Timeslips]uuid)
JSON Set Number (jsonobject;"billing_status";[Timeslips]billing_status)
JSON Set Text (jsonobject;"Start_date";String(timestamp_unix_toDate([Timeslips]Timestamp_start)))
JSON Set Text (jsonobject;"Start_time";String(timestamp_unix_toTime([Timeslips]Timestamp_start)))
JSON Set Text (jsonobject;"end_date";String(timestamp_unix_toDate([Timeslips]Timestamp_end)))
JSON Set Text (jsonobject;"end_time";String(timestamp_unix_toTime([Timeslips]Timestamp_end)))
JSON Set Object (result;"";jsonobject)
NEXT RECORD([Timeslips])
End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

Else 

result:=JSON New Object 
JSON Set Text (result;"error";"AUTH FAILED")
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
-->