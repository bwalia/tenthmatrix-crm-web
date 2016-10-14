<!--HIT_EXECUTE

C_LONGINT(mInvoiceNum)
C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")

mUUIDStr:=_HIT_WebApp_GetField ("uuid")

READ WRITE([Payments])
QUERY([Payments];[Payments]uuid=mUUIDStr)

If (Records in selection([Payments])=0)
CREATE RECORD([Payments])
[Payments]uuid:=Generate UUID
End if 

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
UNLOAD RECORD([Payments])
READ ONLY([Payments])
_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("payments.shtml?"+"keyword="+_HIT_WebApp_GetField ("company_name"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 


-->