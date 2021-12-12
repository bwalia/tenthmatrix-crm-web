<!--HIT_EXECUTE


C_TEXT(_HIT_HTMLTXT)

C_BLOB(Web_ResponseDataBLOB)
C_LONGINT(mitemID;mResultNum)
C_TEXT(mUUIDStr)

C_TEXT(mUUIDStr;mDeleteuuid)
mDeleteuuid:=_HIT_WebApp_GetField ("delitem_uuid")
mUUIDStr:=_HIT_WebApp_GetField ("ivcnitem_uuid")

Case of 
: (mDeleteuuid#"")

READ WRITE([Invoice_Items])
QUERY([Invoice_Items];[Invoice_Items]uuid=mDeleteuuid)
If (Records in selection([Invoice_Items])#0)
DELETE RECORD([Invoice_Items])

READ WRITE([Invoices])
QUERY([Invoices];[Invoices]inv_id=Num(_HIT_WebApp_GetField ("invoice_id")))
If (Records in selection([Invoices])=1)
QUERY([Invoice_Items];[Invoice_Items]inv_id=Num(_HIT_WebApp_GetField ("invoice_id")))
Total:=Sum([Invoice_Items]item_amount)
Tax_rate:=[Invoices]inv_tax_rate
Total_paid:=[Invoices]inv_total_paid
Total_tax:=Round(Total*Tax_rate/100;2)
Balance:=Round(Total+Total_tax-Total_paid;2)
[Invoices]inv_total_due:=Total
[Invoices]inv_total_tax:=Total_tax
[Invoices]balance_due:=Balance
SAVE RECORD([Invoices])
UNLOAD RECORD([Invoices])
READ ONLY([Invoices])
End if 

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"succ";"OK")

Else 
mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"error";"ERR")

End if 
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
JSON Release (mResultNum)


Else 
mUUIDStr:=_HIT_WebApp_GetField ("ivcnitem_uuid")
READ WRITE([Invoice_Items])
QUERY([Invoice_Items];[Invoice_Items]uuid=mUUIDStr)

If (Records in selection([Invoice_Items])=0)
CREATE RECORD([Invoice_Items])
[Invoice_Items]uuid:=Generate UUID
mUUIDStr:=[Invoice_Items]uuid
[Invoice_Items]item_id:=Sequence number([Invoice_Items])
mitemID:=[Invoice_Items]item_id
End if 

[Invoice_Items]inv_id:=Num(_HIT_WebApp_GetField ("invoice_id"))
[Invoice_Items]item_description:=_HIT_WebApp_GetField ("description")
[Invoice_Items]item_rate:=Num(_HIT_WebApp_GetField ("rate"))
[Invoice_Items]item_amount:=Num(_HIT_WebApp_GetField ("amount"))
[Invoice_Items]item_hours:=Num(_HIT_WebApp_GetField ("hours"))

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"uuid";mUUIDStr)
JSON Set Number (mResultNum;"id";mitemID)
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
SAVE RECORD([Invoice_Items])
UNLOAD RECORD([Invoice_Items])
READ ONLY([Invoice_Items])


READ WRITE([Invoices])
QUERY([Invoices];[Invoices]inv_id=Num(_HIT_WebApp_GetField ("invoice_id")))
If (Records in selection([Invoices])=1)
QUERY([Invoice_Items];[Invoice_Items]inv_id=Num(_HIT_WebApp_GetField ("invoice_id")))
Total:=Sum([Invoice_Items]item_amount)
Tax_rate:=[Invoices]inv_tax_rate
Total_paid:=[Invoices]inv_total_paid
Total_tax:=Round(Total*Tax_rate/100;2)
Balance:=Round(Total+Total_tax-Total_paid;2)
[Invoices]inv_total_due:=Total
[Invoices]inv_total_tax:=Total_tax
[Invoices]balance_due:=Balance
SAVE RECORD([Invoices])
UNLOAD RECORD([Invoices])
READ ONLY([Invoices])
End if 


If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
End case 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->