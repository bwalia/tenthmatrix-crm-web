<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Contact_uuid")
READ WRITE([Contacts])
QUERY([Contacts];[Contacts]uuid=mUUIDStr)

If (Records in selection([Contacts])=0)
CREATE RECORD([Contacts])
[Contacts]uuid:=Generate UUID
End if

[Contacts]client_id:=Num(_HIT_WebApp_GetField ("Client_ID"))
[Contacts]First name:=_HIT_WebApp_GetField ("First_Name")
[Contacts]Surname:=_HIT_WebApp_GetField ("Surname")
[Contacts]Title:=_HIT_WebApp_GetField ("Title")
[Contacts]Salutation:=_HIT_WebApp_GetField ("Salutation")
[Contacts]Direct Phone:=_HIT_WebApp_GetField ("Direct_Phone")
[Contacts]Email:=_HIT_WebApp_GetField ("Email")
[Contacts]DateAdded:=date(_HIT_WebApp_GetField ("Date_Added"))
[Contacts]Direct fax:=_HIT_WebApp_GetField ("Direct_fax")
[Contacts]Mobile:=_HIT_WebApp_GetField ("Mobile")
[Contacts]Comments:=_HIT_WebApp_GetField ("Comments")

If (_HIT_WebApp_GetField ("News_Letter_Status")="Subscriber")
[Contacts]GetsNewsletter:=True
Else
[Contacts]GetsNewsletter:=False
End if

SAVE RECORD([Contacts])
UNLOAD RECORD([Contacts])
READ ONLY([Contacts])
ORDER BY([Contacts];[Contacts]First_Name;>)

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("Contacts.shtml?"+"keyword="+_HIT_WebApp_GetField ("First_Name"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->