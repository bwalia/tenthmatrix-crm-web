<!--HIT_EXECUTE

C_LONGINT(mResultNum;count;JsonObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

C_TEXT(Search;Client)
mResultNum:=JSON New Array 
Search:=_HIT_WebApp_GetField ("srch")
QUERY([_emailc_queue];[_emailc_queue]_recipient="@"+Search+"@";*)
QUERY([_emailc_queue]; | ;[_emailc_queue]_cc="@"+Search+"@";*)
QUERY([_emailc_queue]; | ;[_emailc_queue]_bcc="@"+Search+"@")

REDUCE SELECTION([_emailc_queue];200)


For (iCount;1;Records in selection([_emailc_queue]))
JsonObject:=JSON New Object 
JSON Set Text (JsonObject;"id";[_emailc_queue]_uuid)
JSON Set Text (JsonObject;"value";[_emailc_queue]_recipient)

JSON Set Object (mResultNum;"";JsonObject)
NEXT RECORD([_emailc_queue])
End for 

JSON Save As Document (mResultNum;"email.txt")
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)


If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->