<!--HIT_EXECUTE

C_LONGINT(iCounter;jsonobject;result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

inv_no:=Num(_HIT_WebApp_GetField ("inv_no"))
QUERY([Invoices];[Invoices]inv_number=inv_no)
If (Records in selection([Invoices])>0)
RELATE ONE([Invoices]client_id)
If (Records in selection([Companies])>0)
CustomerID:=[Companies]uuid
CustomerName:=[Companies]company_Name
End if 
End if 

result:=JSON New Object 
JSON Set Text (result;"CustomerID";CustomerID)
JSON Set Text (result;"CustomerName";CustomerName)

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