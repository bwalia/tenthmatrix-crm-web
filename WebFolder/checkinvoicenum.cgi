<!--HIT_EXECUTE

C_LONGINT(result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

result:=JSON New Object 

inv_no:=Num(_HIT_WebApp_GetField ("inv_no"))
QUERY([Invoices];[Invoices]inv_number=inv_no)


If (Records in selection([Invoices])>0)
JSON Set Text (result;"exist";"true")
Else
JSON Set Text (result;"exist";"false")
End if

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

Else 

result:=JSON New Object 
JSON Set Text (result;"error";"AUTH FAILED")
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)


End if

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->