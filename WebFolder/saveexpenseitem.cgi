<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
C_TEXT(mUUIDStr;mDeleteuuid)
C_LONGINT(mResultNum)

mDeleteuuid:=_HIT_WebApp_GetField ("delitem_uuid")
mUUIDStr:=_HIT_WebApp_GetField ("item_uuid")

Case of 
: (mDeleteuuid#"")
READ WRITE([Expense_Items])
QUERY([Expense_Items];[Expense_Items]uuid=mDeleteuuid)
If (Records in selection([Expense_Items])#0)
DELETE RECORD([Expense_Items])
If (OK=1)
READ WRITE([Mileage])
QUERY([Mileage];[Mileage]uuid=_HIT_WebApp_GetField ("m_uuid"))
If (Records in selection([Mileage])=1)
QUERY([Expense_Items];[Expense_Items]uuid_mileage=_HIT_WebApp_GetField ("m_uuid"))
Total:=Sum([Expense_Items]Expense_Amount)
Tax_rate:=[Mileage]Tax_Rate
Total_tax:=Round(Total*Tax_rate/100;2)
Total_Amount:=Round(Total+Total_tax;2)
[Mileage]Tax_Total_Amount:=Total_tax
[Mileage]Tax_Rate:=Tax_rate
[Mileage]Total_Amount:=Total_Amount
SAVE RECORD([Mileage])
UNLOAD RECORD([Mileage])
READ ONLY([Mileage])
End if 
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
mUUIDStr:=_HIT_WebApp_GetField ("item_uuid")
READ WRITE([Expense_Items])
QUERY([Expense_Items];[Expense_Items]uuid=mUUIDStr)

If (Records in selection([Expense_Items])=0)
CREATE RECORD([Expense_Items])
[Expense_Items]uuid:=Generate UUID
mUUIDStr:=[Expense_Items]uuid
End if 

[Expense_Items]uuid_mileage:=_HIT_WebApp_GetField ("m_uuid")
[Expense_Items]Expense_Desc:=_HIT_WebApp_GetField ("description")
[Expense_Items]expense_type:=_HIT_WebApp_GetField ("type")
[Expense_Items]Expense_Amount:=Num(_HIT_WebApp_GetField ("amount"))

SAVE RECORD([Expense_Items])
mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"uuid";mUUIDStr)
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
UNLOAD RECORD([Expense_Items])
READ ONLY([Expense_Items])

READ WRITE([Mileage])
QUERY([Mileage];[Mileage]uuid=_HIT_WebApp_GetField ("m_uuid"))

If (Records in selection([Mileage])=1)
QUERY([Expense_Items];[Expense_Items]uuid_mileage=_HIT_WebApp_GetField ("m_uuid"))
Total:=Sum([Expense_Items]Expense_Amount)
Tax_rate:=[Mileage]Tax_Rate
Total_tax:=Round(Total*Tax_rate/100;2)
Total_Amount:=Round(Total+Total_tax;2)
[Mileage]Tax_Total_Amount:=Total_tax
[Mileage]Tax_Rate:=Tax_rate
[Mileage]Total_Amount:=Total_Amount
SAVE RECORD([Mileage])
UNLOAD RECORD([Mileage])
READ ONLY([Mileage])
End if 

UNLOAD RECORD([Mileage])
READ ONLY([Mileage])

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
End case 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->