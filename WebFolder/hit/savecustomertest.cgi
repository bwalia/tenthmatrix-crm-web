<!--HIT_EXECUTE


C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 
If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Company_uuid")
maccountNo:=Num(_HIT_WebApp_GetField ("inv_number"))

READ WRITE([Companies])
QUERY([Companies];[Companies]uuid=mUUIDStr)

If (Records in selection([Companies])=0)
CREATE RECORD([Companies])

If (mUUIDStr#"")
[Companies]uuid:=mUUIDStr
Else 
[Companies]uuid:=Generate UUID
End if 

If (maccountNo#0)
[Companies]account_Number:=maccountNo
Else 
[Companies]account_Number:=Sequence number([Companies])
End if 

End if 

[Companies]company_Name:=_HIT_WebApp_GetField ("Company_Name")

If (_HIT_WebApp_GetField ("inactive")="True")
[Companies]inactive:=True
Else 
[Companies]inactive:=False
End if 

[Companies]city_or_town:=_HIT_WebApp_GetField ("City")
[Companies]country:=_HIT_WebApp_GetField ("Country")
[Companies]post_zip_code:=_HIT_WebApp_GetField ("Post_Code")
[Companies]telephone:=_HIT_WebApp_GetField ("Phone")
[Companies]address_line_1:=_HIT_WebApp_GetField ("Address_1")
[Companies]address_line_2:=_HIT_WebApp_GetField ("Address_2")
[Companies]relationship:=_HIT_WebApp_GetField ("Relation")
[Companies]email_address:=_HIT_WebApp_GetField ("Email")
[Companies]fax:=_HIT_WebApp_GetField ("Fax")
[Companies]business_type:=_HIT_WebApp_GetField ("business_type")
[Companies]catBase_type:=_HIT_WebApp_GetField ("catBase_type")
[Companies]contact_firstname:=_HIT_WebApp_GetField ("Contact_First_Name")
[Companies]contact_Lastname:=_HIT_WebApp_GetField ("Contact_Last_Name")
[Companies]referred_by:=_HIT_WebApp_GetField ("Referred_by")
[Companies]enter_date:=Current date
[Companies]followup_date:=Date(_HIT_WebApp_GetField ("follow_date"))
[Companies]comments:=_HIT_WebApp_GetField ("Comments")
[Companies]licence_number:=_HIT_WebApp_GetField ("license_number")
[Companies]bank_account_number:=_HIT_WebApp_GetField ("bank_account_number")
[Companies]bank_isbn_number:=_HIT_WebApp_GetField ("bank_isbn_number")
[Companies]invoice_address:=_HIT_WebApp_GetField ("invoice_address")

SAVE RECORD([Companies])
UNLOAD RECORD([Companies])
READ ONLY([Companies])
ORDER BY([Companies];[Companies]company_Name;>)
_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("Customers.shtml?"+"keyword="+_HIT_WebApp_GetField ("Company_Name"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 


-->