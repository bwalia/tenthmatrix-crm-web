<!--HIT_EXECUTE

C_TEXT($0;$1)
ARRAY TEXT(TaskNameArr;0)
ARRAY LONGINT(TaskIDArr;0)
ProjectID:=Num(_HIT_WebApp_GetField ("ProjectID"))

QUERY([Projects];[Projects]proj_id=ProjectID)

If (Records in selection([Projects])>0)
RELATE MANY SELECTION([Tasks]proj_id)
SELECTION TO ARRAY([Tasks]task_id;nTaskIDArr)

nJSONResult:=JSON New Array 
For (count;1;Records in selection([Tasks]))
nJSONObject:=JSON New Object 
APPEND TO ARRAY(TaskIDArr;[Tasks]task_id)
JSON Set Number (nJSONObject;"id";[Tasks]task_id)

APPEND TO ARRAY(TaskNameArr;[Tasks]task_name)
JSON Set Text (nJSONObject;"value";[Tasks]task_name)

JSON Set Object (nJSONResult;"";nJSONObject)

NEXT RECORD([Tasks])
End for 
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
JSON Save As Document (nJSONResult;"timeslip.txt")

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nResult";"No Records found.")
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
End if 


If (JSON Is Valid Object (nJSONResult)=1)
JSON Release (nJSONResult)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->