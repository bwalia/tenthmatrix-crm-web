<!--HIT_EXECUTE

C_LONGINT(mResultNum)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

mResultNum:=JSON New Object

QUERY([Invoices];[Invoices]inv_number=Num(_HIT_WebApp_GetField ("inv_no")))

JSON Set Text (mResultNum;"invoiceuuid";[Invoices]uuid)
JSON Set Number (mResultNum;"Amount";[Invoices]inv_total_due_with_tax)

If (Records in selection([Invoices])=1)
RELATE ONE([Invoices]client_id)
If (Records in selection([Companies])=1)
JSON Set Text (mResultNum;"CustomerID";[Companies]uuid)
JSON Set Text (mResultNum;"CustomerName";[Companies]company_Name)
End if 
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

Else 

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"error";"AUTH FAILED")
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

End if

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->