<!--HIT_EXECUTE

nJSONResult:=JSON New Object 
	
If (_HIT_AuthenticateSession="Session-Authenticated-OK")
	JSON Set Text (nJSONResult;"val1";_HIT_WebSession_GetVar("business_uuid"))
	_HIT_WebSession_SetVar("business_uuid";_HIT_WebApp_GetField ("uuid"))
	JSON Set Text (nJSONResult;"val2";_HIT_WebSession_GetVar("business_uuid"))
	JSON Set Text (nJSONResult;"nSuccess";"OK")
Else 
	JSON Set Text (nJSONResult;"nError";"Sorry, you are not authorised!")
End if
 
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
If (JSON Is Valid Object (nJSONResult)=1)
	JSON Release (nJSONResult)
End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
 
-->