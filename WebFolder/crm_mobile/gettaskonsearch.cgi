<!--HIT_EXECUTE
C_LONGINT(mResultNum;count;JsonObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

mResultNum:=JSON New Array 
Search:=_HIT_WebApp_GetField ("srch")
QUERY([Tasks];[Tasks]task_name="@"+Search+"@")
ORDER BY([Tasks];[Tasks]task_name)

For (count;1;Records in selection([Tasks]))

JsonObject:=JSON New Object 
JSON Set Number (JsonObject;"id";[Tasks]task_id)
JSON Set Text (JsonObject;"value";[Tasks]task_name)
JSON Set Object (mResultNum;"";JsonObject)
NEXT RECORD([Tasks])
End for 

Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

Else 

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"error";"AUTH FAILED")
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

End if 

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
-->