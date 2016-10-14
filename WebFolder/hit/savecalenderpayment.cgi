<!--HIT_EXECUTE
C_LONGINT(result,mInvoiceNum)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

C_TEXT(muuid)

READ WRITE([Payments])
CREATE RECORD([Payments])
[Payments]uuid:=Generate UUID
muuid:=[Payments]uuid

QUERY([Companies];[Companies]uuid=_HIT_WebApp_GetField ("client_uuid"))
[Payments]client_accountnumber:=[Companies]account_Number
mInvoiceNum:=Num(_HIT_WebApp_GetField ("inv_no"))
[Payments]invoice_number:=mInvoiceNum
[Payments]date_received:=Date(_HIT_WebApp_GetField ("date_received"))
[Payments]amount_received:=Num(_HIT_WebApp_GetField ("amount"))
[Payments]mode_of_payment:=_HIT_WebApp_GetField ("mode_of_payment")
[Payments]notes:=_HIT_WebApp_GetField ("notes")

SAVE RECORD([Payments])
Payment_ActivityLog ("Payment";"Payment Received";"Payment for Invoice "+String([Payments]invoice_number))
Payment_UpdateInvoiceBalance (mInvoiceNum)


result:=JSON New Object 
JSON Set Text (result;"uuid";muuid)

QUERY([Payments];[Payments]uuid=muuid)
If (Records in selection([Payments])>0)
QUERY([Companies];[Companies]uuid=_HIT_WebApp_GetField ("client_uuid"))
payMentDetails:=[Companies]company_Name+"("+string([Payments]invoice_number)+"): "+char(Carriage return)+"Amount Received:"+String([Payments]amount_received)+char(Carriage return)+"Mode:"+[Payments]mode_of_payment
JSON Set Text (result;"Payment_details";payMentDetails)
End if 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)
UNLOAD RECORD([Payments])
READ ONLY([Payments])
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