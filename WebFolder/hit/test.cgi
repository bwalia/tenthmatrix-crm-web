<!--HIT_EXECUTE

C_TEXT($0;$1)

QUERY([Employees];[Employees]emp_active=True)
ORDER BY([Employees];[Employees]emp_last_name;>)

If (Records in selection([Employees])>0)
nJSONResult:=JSON New Array 

For (count;1;Records in selection([Employees]))
nJSONObject:=JSON New Object 
JSON Set Text (nJSONObject;"EmpName";[Employees]emp_first_name+" "+[Employees]emp_last_name)
JSON Set Text (nJSONObject;"uuid";[Employees]uuid)
QUERY([employee_work_schedule];[employee_work_schedule]uuid_employee=[Employees]uuid)
JSON Set Text (nJSONObject;"action";[employee_work_schedule]action)
JSON Set Number (nJSONObject;"start_time";[employee_work_schedule]start_timestamp)

JSON Set Object (nJSONResult;"";nJSONObject)

NEXT RECORD([Employees])
End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nError";"No Records found.")
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
End if 


If (JSON Is Valid Object (nJSONResult)=1)
JSON Release (nJSONResult)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->