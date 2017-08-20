<!--HIT_EXECUTE
C_LONGINT(iCounter;jsonobject;result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

//sdate:=Num(timestamp_unix_Get (Date(_HIT_WebApp_GetField ("s_date"))))
//eDate:=Num(timestamp_unix_Get (Date(_HIT_WebApp_GetField ("e_date"))))

//QUERY([employee_holidays];[employee_holidays]timestamp_start>=sdate;*)
//QUERY([employee_holidays]; & ;[employee_holidays]timestamp_end<=eDate)
ALL RECORDS([employee_holidays])

result:=JSON New Array 
For (iCounter;1;Records in selection([employee_holidays]))
jsonobject:=JSON New Object 

QUERY([Employees];[Employees]uuid=[employee_holidays]uuid_employee)
JSON Set Text (jsonobject;"Employee_Name";[Employees]emp_first_name)
JSON Set Text (jsonobject;"uuid";[employee_holidays]uuid)
JSON Set Text (jsonobject;"subject";[employee_holidays]subject)
JSON Set Text (jsonobject;"start_date";String(timestamp_unix_toDate ([employee_holidays]timestamp_start)))
JSON Set Text (jsonobject;"end_date";String(timestamp_unix_toDate ([employee_holidays]timestamp_end)))
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