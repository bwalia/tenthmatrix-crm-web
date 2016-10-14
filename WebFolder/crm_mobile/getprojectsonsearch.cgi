<!--HIT_EXECUTE
C_LONGINT(mResultNum;count;JsonObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")
C_TEXT(Search;Client)
mResultNum:=JSON New Array 
Search:=_HIT_WebApp_GetField ("srch")
QUERY([Projects];[Projects]proj_name="@"+Search+"@")
Client:=_HIT_WebApp_GetField ("client")
If (Client#"")
 QUERY([Projects]; & ;[Projects]client_id=Num(Client))
End if


ORDER BY([Projects];[Projects]proj_name)

For (count;1;Records in selection([Projects]))

JsonObject:=JSON New Object 
JSON Set Number (JsonObject;"id";[Projects]proj_id)
JSON Set Text (JsonObject;"value";[Projects]proj_name)
JSON Set Object (mResultNum;"";JsonObject)
NEXT RECORD([Projects])
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