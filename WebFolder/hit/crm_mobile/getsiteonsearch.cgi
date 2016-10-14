<!--HIT_EXECUTE

C_TEXT($0;$1)
C_LONGINT(mResultNum;count;JsonObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

C_TEXT(Search;Client)
mResultNum:=JSON New Array 
Search:=_HIT_WebApp_GetField ("srch")
QUERY([Sites];[Sites]name="@"+Search+"@";*)
QUERY([Sites]; | ;[Sites]code="@"+Search+"@")


For (count;1;Records in selection([Sites]))

JsonObject:=JSON New Object 

JSON Set Text (JsonObject;"uuid";[Sites]uuid)
JSON Set Text (JsonObject;"value";[Sites]name)
JSON Set Object (mResultNum;"";JsonObject)
NEXT RECORD([Sites])
End for 

JSON Save As Document (mResultNum;"sites.txt")
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->