<!--HIT_EXECUTE

C_LONGINT(pJSONObject)

pJSONObject:=JSON New Object 

If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

QUERY([Receipts];[Receipts]invoice_number=Num(_HIT_WebApp_GetField ("invoice_Num")))
If (Records in selection([Receipts])=1)
JSON Set Text (pJSONObject;"success";"Record Found")
JSON Set Text (pJSONObject;"Amount";[Receipts]amount_received)

QUERY([Companies];[Companies]account_Number=[Receipts]client_accountnumber)
If (Records in selection([Companies])=1)
JSON Set Text (pJSONObject;"CustomerUUID";[Companies]uuid)
JSON Set Text (pJSONObject;"CustomerName";[Companies]company_Name)
End if 

Else 
JSON Set Text (pJSONObject;"error";"No receipt found")
End if 

Else 
JSON Set Text (pJSONObject;"error";"AUTH FAILED")
End if 
Web_ResponseDataBLOB:=JSON Save As Blob (pJSONObject)
If (JSON Is Valid Object (pJSONObject)=1)
JSON Release (pJSONObject)
End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->