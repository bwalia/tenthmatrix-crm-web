<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
//_HIT_HTMLTXT:=_HIT_AuthenticateSession 

//If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("lead_uuid")
READ WRITE([Leads])
QUERY([Leads];[Leads]uuid=mUUIDStr)

If (Records in selection([Leads])=0)
CREATE RECORD([Leads])
[Leads]uuid:=Generate UUID
[Leads]RecordNumber:=Num(_HIT_WebApp_GetField ("lead_id"))

End if

[Leads]Product:=_HIT_WebApp_GetField ("Product")
[Leads]CompanyName:=_HIT_WebApp_GetField ("Lead_name")
[Leads]Address1:=_HIT_WebApp_GetField ("Address1")
[Leads]Address2:=_HIT_WebApp_GetField ("Address2")
[Leads]Town:=_HIT_WebApp_GetField ("Town")
[Leads]County:=_HIT_WebApp_GetField ("County")
[Leads]PostCode:=_HIT_WebApp_GetField ("Postcode")
[Leads]Country:=_HIT_WebApp_GetField ("Country")
[Leads]Phone:=_HIT_WebApp_GetField ("Phone")
[Leads]Fax:=_HIT_WebApp_GetField ("Fax")
[Leads]Email:=_HIT_WebApp_GetField ("Email")
[Leads]WebSite:=_HIT_WebApp_GetField ("Website")
[Leads]SourceType:=_HIT_WebApp_GetField ("Source_type")
[Leads]Source:=_HIT_WebApp_GetField ("Source")
[Leads]Comments:=_HIT_WebApp_GetField ("Comments")
[Leads]MaincontactFirstName:=_HIT_WebApp_GetField ("First_name")
[Leads]MainContactLastName:=_HIT_WebApp_GetField ("Last_name")
[Leads]Job title:=_HIT_WebApp_GetField ("Jobtitle")
[Leads]Mobile:=_HIT_WebApp_GetField ("Mobile")

[Leads]First name:=_HIT_WebApp_GetField ("First_name")
[Leads]CompanySize:=_HIT_WebApp_GetField ("Company_Size")
[Leads]BusinessType:=_HIT_WebApp_GetField ("Business_type")
[Leads]Requests:=_HIT_WebApp_GetField ("Requests")
[Leads]InterestedKeywords:=_HIT_WebApp_GetField ("Interested_in")
[Leads]Given to reseller:=_HIT_WebApp_GetField ("Given_to_reseller")
[Leads]EnterDate:=Date(_HIT_WebApp_GetField ("Enter_Date"))
[Leads]EnteredBy:=_HIT_WebApp_GetField ("Entered_By")
[Leads]InactiveDate:=Date(_HIT_WebApp_GetField ("Inactive_Date"))
[Leads]rating:=_HIT_WebApp_GetField ("rating")

If (_HIT_WebApp_GetField ("QuarkUser")="True")
[Leads]QuarkUser:=True
Else
[Leads]QuarkUser:=False
End if
If (_HIT_WebApp_GetField ("InDesign_user")="True")
[Leads]InDesign user:=True
Else
[Leads]InDesign user:=False
End if
If (_HIT_WebApp_GetField ("Responded")="True")
[Leads]Responded:=True
Else
[Leads]Responded:=False
End if
If (_HIT_WebApp_GetField ("Affiliate")="True")
[Leads]Affiliate:=True
Else
[Leads]Affiliate:=False
End if
If (_HIT_WebApp_GetField ("Send_Info")="True")
[Leads]Send Info:=True
Else
[Leads]Send Info:=False
End if
If (_HIT_WebApp_GetField ("Keep_Us_Posted")="True")
[Leads]KeepUsPosted:=True
Else
[Leads]KeepUsPosted:=False
End if
If (_HIT_WebApp_GetField ("Give_to_reseller")="True")
[Leads]Give to reseller:=True
Else
[Leads]Give to reseller:=False
End if
If (_HIT_WebApp_GetField ("Inactive")="True")
[Leads]Inactive:=True
Else
[Leads]Inactive:=False
End if

SAVE RECORD([Leads])
UNLOAD RECORD([Leads])
READ ONLY([Leads])
ORDER BY([Leads];[Leads]CompanyName;>)
//_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("leads.shtml?"+"keyword="+_HIT_WebApp_GetField ("Lead_name"))
//Else
//_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
//_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

//End if

-->