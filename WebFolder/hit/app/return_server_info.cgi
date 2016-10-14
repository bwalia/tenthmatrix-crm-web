<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
C_LONGINT(client_ID)

//_HIT_HTMLTXT:=_HIT_AuthenticateSession 

//If (_HIT_HTMLTXT="Session-Authenticated-OK")
 
server_uuid:=_HIT_WebApp_GetField ("server_uuid"))
QUERY([servers];[servers]uuid=server_uuid)
If (Records in selection([servers])>0)

mJSONObject:=JSON New Object 
JSON Set Text (mJSONObject;"www_root_path";[servers]www_root_path)
JSON Set Text (mJSONObject;"lan_ip_addr";[servers]lan_ip_addr)
JSON Set Text (mJSONObject;"wan_ip_addr";[servers]wan_ip_addr)
JSON Set Object (mJSONResult;"";mJSONObject)

End if

If (JSON Is Valid Object (mJSONResult)=1)
Else 
mJSONResult:=JSON New Object 
JSON Set Text (mJSONResult;"Error";"Unknow Error...")
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mJSONResult)
JSON Release (mJSONResult)
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->