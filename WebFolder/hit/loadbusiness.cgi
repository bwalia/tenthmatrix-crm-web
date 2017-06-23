<!--HIT_EXECUTE

If (_HIT_AuthenticateSession="Session-Authenticated-OK")

nJSONResult:=JSON New Object 
JSON Set Number (nJSONResult;"iTotalRecords";2)

nJsonArray:=JSON New Array

nJSONObject1:=JSON New Object 
JSON Set Text (nJSONObject1;"name";"Business 1")
JSON Set Text (nJSONObject1;"uuid";"111")
JSON Set Object (nJsonArray;"";nJSONObject1)

nJSONObject:=JSON New Object 
JSON Set Text (nJSONObject;"name";"Business 2")
JSON Set Text (nJSONObject;"uuid";"222")
JSON Set Object (nJsonArray;"";nJSONObject)

JSON Set Array (nJSONResult;"aaData";nJsonArray)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nError";"Sorry, you are not authorised!")
End if

Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)

If (JSON Is Valid Object (nJSONResult)=1)
JSON Release (nJSONResult)
End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
 
-->