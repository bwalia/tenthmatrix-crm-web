<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr;mClientName)
mUUIDStr:=_HIT_WebApp_GetField ("invoice_uuid")

minvoiceNum:=Num(_HIT_WebApp_GetField ("inv_number"))

READ WRITE([Invoices])
QUERY([Invoices];[Invoices]uuid=mUUIDStr)

If (Records in selection([Invoices])=0)
CREATE RECORD([Invoices])
[Invoices]uuid:=Generate UUID
If (minvoiceNum#0)
[Invoices]inv_id:=minvoiceNum
Else 
[Invoices]inv_id:=Sequence number([Invoices])
End if 
[Invoices]inv_number:=[Invoices]inv_id
End if 

[Invoices]client_id:=Num(_HIT_WebApp_GetField ("Client_ID"))
[Invoices]inv_bill_to:=_HIT_WebApp_GetField ("invoice_bill_to")
[Invoices]ordered_by:=_HIT_WebApp_GetField ("ordered_by")
[Invoices]inv_customer_ref_po:=_HIT_WebApp_GetField ("inv_customer_ref_po")
[Invoices]inv_tax_rate:=Num(_HIT_WebApp_GetField ("invoice_tax_rate"))
[Invoices]inv_total_due:=Num(_HIT_WebApp_GetField ("total_due"))
[Invoices]inv_date_paid:=Date(_HIT_WebApp_GetField ("invoice_paid_date"))
[Invoices]inv_total_tax:=Num(_HIT_WebApp_GetField ("invoice_total_tax"))
[Invoices]inv_Template:=_HIT_WebApp_GetField ("inv_Template")
[Invoices]print_template_code:=_HIT_WebApp_GetField ("print_template_code")
[Invoices]internal_notes:=_HIT_WebApp_GetField ("inv_note")
[Invoices]project_code:=_HIT_WebApp_GetField ("Project_ID")
[Invoices]inv_total_paid:=Num(_HIT_WebApp_GetField ("invoice_total_paid"))
[Invoices]balance_due:=Num(_HIT_WebApp_GetField ("balance_due"))
[Invoices]inv_terms:=_HIT_WebApp_GetField ("invoice_terms")
[Invoices]inv_date:=Date(_HIT_WebApp_GetField ("invoice_date"))
[Invoices]inv_date_due:=Date(_HIT_WebApp_GetField ("invoice_due_date"))
[Invoices]invoice_status:=_HIT_WebApp_GetField ("status")
[Invoices]Payment_Pin_Or_Passcode:=_HIT_WebApp_GetField ("payment_pin_or_passcode")
[Invoices]inv_currency_code:=_HIT_WebApp_GetField ("currency_code")
[Invoices]inv_base_currency_code:=_HIT_WebApp_GetField ("base_currency_code")
[Invoices]inv_exchange_rate:=Num(_HIT_WebApp_GetField ("inv_exchange_rate"))

SAVE RECORD([Invoices])
UNLOAD RECORD([Invoices])
READ ONLY([Invoices])

QUERY([Companies];[Companies]account_Number=Num(_HIT_WebApp_GetField ("Client_ID")))
mClientName:=[Companies]company_Name


_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("invoices.shtml?"+"keyword="+mClientName)
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")
End if

-->