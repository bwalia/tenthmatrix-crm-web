<!--HIT_EXECUTE

C_LONGINT(mJSONResult;pCount;mJSONObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

mJSONResult:=JSON New Array 
pSearchStr:=_HIT_WebApp_GetField ("srch")

QUERY([Invoices];[Invoices]Full_Invoice_Number="@"+pSearchStr+"@")

ORDER BY([Invoices];[Invoices]Full_Invoice_Number)
For (pCount;1;Records in selection([Invoices]))
mJSONObject:=JSON New Object 
JSON Set Number (mJSONObject;"id";[Invoices]inv_id)
JSON Set Text (mJSONObject;"value";[Invoices]Full_Invoice_Number)
JSON Set Object (mJSONResult;"";mJSONObject)
NEXT RECORD([Invoices])
End for 

REDUCE SELECTION([Invoices];0)

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