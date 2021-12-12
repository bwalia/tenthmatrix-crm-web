<!--HIT_EXECUTE
 
C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("lead_uuid")

READ WRITE([Companies])
QUERY([Companies];[Companies]uuid=mUUIDStr)

If (Records in selection([Companies])=0)
CREATE RECORD([Companies])
[Companies]uuid:=mUUIDStr
[Companies]account_Number:=Sequence number([Companies])

End if 
[Companies]company_Name:=_HIT_WebApp_GetField ("Lead_name")
[Companies]address_line_1:=_HIT_WebApp_GetField ("Address1")
[Companies]address_line_2:=_HIT_WebApp_GetField ("Address2")
[Companies]city_or_town:=_HIT_WebApp_GetField ("Town")
[Companies]county_or_state:=_HIT_WebApp_GetField ("County")
[Companies]post_zip_code:=_HIT_WebApp_GetField ("Postcode")
[Companies]country:=_HIT_WebApp_GetField ("Country")
[Companies]telephone:=_HIT_WebApp_GetField ("Phone")
[Companies]fax:=_HIT_WebApp_GetField ("Fax")
[Companies]email_address:=_HIT_WebApp_GetField ("Email")
[Companies]website_url:=_HIT_WebApp_GetField ("Website")
[Companies]comments:=_HIT_WebApp_GetField ("Comments")
[Companies]contact_firstname:=_HIT_WebApp_GetField ("First_name")
[Companies]contact_Lastname:=_HIT_WebApp_GetField ("Last_name")
[Companies]business_type:=_HIT_WebApp_GetField ("Business_type")
[Companies]interested_in:=_HIT_WebApp_GetField ("Interested_in")
[Companies]enter_date:=Date(_HIT_WebApp_GetField ("Enter_Date"))
[Companies]entered_by:=_HIT_WebApp_GetField ("Entered_By")

If (_HIT_WebApp_GetField ("Inactive")="True")
[Companies]inactive:=True
Else 
[Companies]inactive:=False
End if 

SAVE RECORD([Companies])
UNLOAD RECORD([Companies])
READ ONLY([Companies])
ORDER BY([Companies];[Companies]company_Name;>)
  //_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("customers.shtml?"+"keyword="+_HIT_WebApp_GetField ("Lead_name"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->