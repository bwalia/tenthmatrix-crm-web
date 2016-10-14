<!--HIT_EXECUTE


C_TEXT(_HIT_HTMLTXT)

C_BLOB(Web_ResponseDataBLOB)
C_LONGINT(mitemID;mResultNum)
C_TEXT(mOrderUUIDStr)

C_TEXT(mUUIDStr;mDeleteuuid)
mDeleteuuid:=_HIT_WebApp_GetField ("delitem_uuid")
mOrderUUIDStr:=_HIT_WebApp_GetField ("order_uuid")

Case of 
: (mDeleteuuid#"")

READ WRITE([order_items])
QUERY([order_items];[order_items]uuid=mDeleteuuid)
//QUERY([order_items];&;[order_items]uuid_order=mOrderUUIDStr)
If (Records in selection([order_items])#0)
DELETE RECORD([order_items])

READ WRITE([orders])
QUERY([orders];[orders]uuid=_HIT_WebApp_GetField ("order_uuid"))
If (Records in selection([orders])=1)
QUERY([order_items];[order_items]uuid_order=_HIT_WebApp_GetField ("order_uuid"))
Total:=Sum([order_items]item_amount)
Tax_rate:=[orders]tax_rate
Total_paid:=[orders]total_paid
Total_tax:=Round(Total*Tax_rate/100;2)
Balance:=Round(Total+Total_tax-Total_paid;2)
[orders]total_due_without_tax:=Total
[orders]total_tax:=Total_tax
[orders]balance_due:=Balance
[orders]total_due_with_tax:=Round((Total+Total_tax;2)
SAVE RECORD([orders])
UNLOAD RECORD([orders])
READ ONLY([orders])
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
mUUIDStr:=_HIT_WebApp_GetField ("order_item_uuid")
READ WRITE([order_items])
QUERY([order_items];[order_items]uuid=mUUIDStr)

If (Records in selection([order_items])=0)
CREATE RECORD([order_items])
[order_items]uuid:=Generate UUID
mUUIDStr:=[order_items]uuid
[order_items]item_id:=Sequence number([order_items])
mitemID:=[order_items]item_id
End if 

[order_items]uuid_order:=_HIT_WebApp_GetField ("order_uuid")
[order_items]uuid_product:=_HIT_WebApp_GetField ("uuid_product")
[order_items]item_description:=_HIT_WebApp_GetField ("description")
[order_items]item_rate:=Num(_HIT_WebApp_GetField ("rate"))
[order_items]item_amount:=Num(_HIT_WebApp_GetField ("amount"))
[order_items]item_hours:=Num(_HIT_WebApp_GetField ("hours"))
[order_items]item_discount:=Num(_HIT_WebApp_GetField ("discount"))

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"uuid";mUUIDStr)
JSON Set Number (mResultNum;"id";mitemID)
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
SAVE RECORD([order_items])
UNLOAD RECORD([order_items])
READ ONLY([order_items])


READ WRITE([orders])
QUERY([orders];[orders]uuid=_HIT_WebApp_GetField ("order_uuid"))
If (Records in selection([orders])=1)
QUERY([order_items];[order_items]uuid_order=_HIT_WebApp_GetField ("order_uuid"))
Total:=Sum([order_items]item_amount)
Tax_rate:=[orders]tax_rate
Total_paid:=[orders]total_paid
Total_tax:=Round(Total*Tax_rate/100;2)
Balance:=Round(Total+Total_tax-Total_paid;2)
[orders]total_due_without_tax:=Total
[orders]total_tax:=Total_tax
[orders]balance_due:=Balance
[orders]total_due_with_tax:=Round((Total+Total_tax;2)
SAVE RECORD([orders])
UNLOAD RECORD([orders])
READ ONLY([orders])
End if 


If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
End case 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->