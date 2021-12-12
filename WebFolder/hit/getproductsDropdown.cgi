<!--HIT_EXECUTE
C_LONGINT(mResultNum;count;JsonObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

C_TEXT(Search;Client)
mResultNum:=JSON New Array 
Search:=_HIT_WebApp_GetField ("srch")

If (Search#"")
QUERY([Products];[Products]ProductName="@"+Search+"@")
Else
ALL RECORDS([Products])
End if

ORDER BY([Products];[Products]ProductName)

For (count;1;Records in selection([Products]))

JsonObject:=JSON New Object 
JSON Set Number (JsonObject;"id";[Products]ProductID)
JSON Set Text (JsonObject;"uuid";[Products]uuid)
JSON Set Text (JsonObject;"value";[Products]ProductName)
JSON Set Object (mResultNum;"";JsonObject)
NEXT RECORD([Products])
End for 
 
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
JSON Save As Document(mResultNum;"product.txt")
Else 

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"error";"AUTH FAILED")
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
JSON Save As Document(mResultNum;"product.txt")
End if 

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
-->