<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")
CREATE RECORD([Contacts])

[Contacts]client_id:=Num(_HIT_WebApp_GetField ("Client_ID"))
[Contacts]First name:=_HIT_WebApp_GetField ("First_Name")
[Contacts]Surname:=_HIT_WebApp_GetField ("Surname")
[Contacts]Title:=_HIT_WebApp_GetField ("Title")
[Contacts]Salutation:=_HIT_WebApp_GetField ("Salutation")
[Contacts]Direct Phone:=_HIT_WebApp_GetField ("Direct_Phone")
[Contacts]Email:=_HIT_WebApp_GetField ("Email")
[Contacts]DateAdded:=Date(_HIT_WebApp_GetField ("Date_Added"))
[Contacts]Direct fax:=_HIT_WebApp_GetField ("Direct_fax")
[Contacts]Mobile:=_HIT_WebApp_GetField ("Mobile")
[Contacts]Comments:=_HIT_WebApp_GetField ("Comments")
[Contacts]uuid:=Generate UUID

SAVE RECORD([Contacts])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("Contacts.shtml")
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->