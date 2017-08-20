<!--HIT_EXECUTE
C_TEXT(_HIT_HTMLTXT)
C_BLOB(Web_ResponseDataBLOB)
C_LONGINT(mcontactID)
C_TEXT(muuid)

_HIT_HTMLTXT:=_HIT_AuthenticateSession 
If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)

mUUIDStr:=_HIT_WebApp_GetField ("item_uuid")
READ WRITE([Expense_Items]))
QUERY([Expense_Items];[Expense_Items]uuid=mUUIDStr)

If (Records in selection([Expense_Items])=0)
CREATE RECORD([Expense_Items])
[Expense_Items]uuid:=Generate UUID

muuid:=[Expense_Items]uuid
End if 

[Expense_Items]uuid_mileage:=_HIT_WebApp_GetField ("m_uuid")
[Expense_Items]Expense_Desc:=_HIT_WebApp_GetField ("description")
[Expense_Items]expense_type:=_HIT_WebApp_GetField ("type")
[Expense_Items]Expense_Amount:=Num(_HIT_WebApp_GetField ("amount"))

SAVE RECORD([Expense_Items])
UNLOAD RECORD([Expense_Items])
READ ONLY([Expense_Items])

//_HIT_HTMLTXT:="{\"m_uuid\": "+muuid+"}"
_HIT_HTMLTXT:=muuid

//SET BLOB SIZE(Web_ResponseDataBLOB;0)
//TEXT TO BLOB(_HIT_HTMLTXT;Web_ResponseDataBLOB;UTF8 text without length)
//_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

Else

_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->