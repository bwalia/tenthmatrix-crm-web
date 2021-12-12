<!--HIT_EXECUTE
C_LONGINT(iCounter;jsonobject;result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

sdate:=Num(timestamp_unix_Get (Date(_HIT_WebApp_GetField ("s_date"));Time(_HIT_WebApp_GetField ("s_time"))))
eDate:=Num(timestamp_unix_Get (Date(_HIT_WebApp_GetField ("e_date"));Time(_HIT_WebApp_GetField ("e_time"))))

QUERY([employee_holidays];[employee_holidays]timestamp_start>=sdate;*)
QUERY([employee_holidays]; & ;[employee_holidays]timestamp_end<=eDate)

result:=JSON New Array 
For (iCounter;1;Records in selection([employee_holidays]))
jsonobject:=JSON New Object 

JSON Set Number (jsonobject;"id";[employee_holidays]uuid)
QUERY([employee_holidays];[employee_holidays]task_id=[employee_holidays]task_id)
JSON Set Text (jsonobject;"uuid";[employee_holidays]uuid)
JSON Set Text (jsonobject;"Subject";[employee_holidays]subject)
JSON Set Text (jsonobject;"Start_date";String(timestamp_unix_toDate([employee_holidays]timestamp_start)))
JSON Set Text (jsonobject;"End_date";String(timestamp_unix_toTime([employee_holidays]timestamp_end)))
JSON Set Object (result;"";jsonobject)
NEXT RECORD([employee_holidays])
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