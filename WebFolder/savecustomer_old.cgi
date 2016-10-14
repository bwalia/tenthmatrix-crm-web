<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")


CREATE RECORD([Companies])
[Companies]account_Number:=Sequence number([Companies])
[Companies]company_Name:=_HIT_WebApp_GetField ("Company_Name"))
[Companies]city_or_town:=_HIT_WebApp_GetField ("City")
[Companies]country:=_HIT_WebApp_GetField ("Country")
[Companies]post_zip_code:=_HIT_WebApp_GetField ("Post_Code")
[Companies]telephone:=_HIT_WebApp_GetField ("Phone")
[Companies]address_line_1:=_HIT_WebApp_GetField ("Address_1")
[Companies]address_line_2:=_HIT_WebApp_GetField ("Address_2")
[Companies]relationship:=_HIT_WebApp_GetField ("Relation")
[Companies]email_address:=_HIT_WebApp_GetField ("Email")
[Companies]contact_firstname:=_HIT_WebApp_GetField ("Contact_First_Name")
[Companies]contact_Lastname:=_HIT_WebApp_GetField ("Contact_Last_Name")
[Companies]referred_by:=_HIT_WebApp_GetField ("Referred_by")
[Companies]enter_date:=Date(_HIT_WebApp_GetField ("Enter_Date"))
[Companies]comments:=_HIT_WebApp_GetField ("Comments")
[Companies]uuid:=Generate UUID

SAVE RECORD([Companies])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("Customers.shtml")
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->