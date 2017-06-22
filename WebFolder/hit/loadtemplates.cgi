<!--HIT_EXECUTE

If (_HIT_AuthenticateSession="Session-Authenticated-OK")

C_TEXT($0;$1)
C_TEXT(mSearchStr)
mSearchStr:=_HIT_WebApp_GetField ("keyword")

if(mSearchStr#"")
QUERY([Templates];[Templates]code="@"+mSearchStr+"@";*)
QUERY([Templates]; | ;[Templates]subject="@"+mSearchStr+"@"; *)
QUERY([Templates]; | ;[Templates]comments="@"+mSearchStr+"@")
Else
ALL RECORDS([Templates])
End If
ORDER BY([Templates];[Templates]code;>)

If (Records in selection([Templates])>0)
nJSONResult:=JSON New Array 

For (count;1;Records in selection([Templates]))
nJSONObject:=JSON New Object 
JSON Set Text (nJSONObject;"code";[Templates]code)
JSON Set Text (nJSONObject;"uuid";[Templates]uuid)
JSON Set Text (nJSONObject;"subject";[Templates]subject)
JSON Set Number (nJSONObject;"modified_timestamp";[Templates]modified_timestamp)

JSON Set Object (nJSONResult;"";nJSONObject)

NEXT RECORD([Templates])
End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nError";"No Records found.")
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
End if 

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nError";"Sorry, you are not authorised!")
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
End if

If (JSON Is Valid Object (nJSONResult)=1)
JSON Release (nJSONResult)
End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
 
-->