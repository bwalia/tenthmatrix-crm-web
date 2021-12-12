<!--HIT_EXECUTE

C_LONGINT(mJSONResult;pCount;mJSONObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
C_TEXT(pSearchStr;pClientStr)

pSearchStr:=_HIT_WebApp_GetField ("srch")
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

if(pSearchStr#"")
QUERY([orders];[orders]full_order_number="@"+pSearchStr+"@";*)
QUERY([orders]; & ;[orders]order_id=Num(pSearchStr))
else
all records([orders])
end if

mJSONResult:=JSON New Array 
ORDER BY([orders];[orders]order_id)
For (pCount;1;Records in selection([orders]))
mJSONObject:=JSON New Object 
JSON Set Number (mJSONObject;"id";[orders]order_id)
JSON Set Text (mJSONObject;"value";[orders]uuid)
JSON Set Object (mJSONResult;"";mJSONObject)
NEXT RECORD([orders])
End for 

End if 

REDUCE SELECTION([orders];0)

If (JSON Is Valid Object (mJSONResult)=1)
Else 
mJSONResult:=JSON New Object 
JSON Set Text (mJSONResult;"Error";"Unknown Error...")
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mJSONResult)
JSON Release (mJSONResult)
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->