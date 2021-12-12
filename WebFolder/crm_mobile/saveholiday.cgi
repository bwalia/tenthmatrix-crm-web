<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)

C_TEXT(mUUIDStr)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")

mUUIDStr:=_HIT_WebApp_GetField ("holiday_uuid")
READ WRITE([employee_holidays])
QUERY([employee_holidays];[employee_holidays]uuid=mUUIDStr)

If (Records in selection([employee_holidays])=0)
CREATE RECORD([employee_holidays])
[employee_holidays]uuid:=Generate UUID
muuid:=[employee_holidays]uuid
End if 

[employee_holidays]uuid_employee:=_HIT_WebApp_GetField ("Employee_ID")
[employee_holidays]timestamp_start:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("Start_Date")))
[employee_holidays]timestamp_end:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("End_Date")))

//[employee_holidays]timestamp_start:=_HIT_WebApp_GetField ("Start_Date")
//[employee_holidays]timestamp_end:=_HIT_WebApp_GetField ("End_Date")

[employee_holidays]type_of_holiday:=_HIT_WebApp_GetField ("type_of_holiday")
[employee_holidays]subject:=_HIT_WebApp_GetField ("Subject")
[employee_holidays]comments:=_HIT_WebApp_GetField ("Comments")
[employee_holidays]status:=_HIT_WebApp_GetField ("status")

SAVE RECORD([employee_holidays])

UNLOAD RECORD([employee_holidays])
READ ONLY([employee_holidays])

ORDER BY([employee_holidays];[employee_holidays]Start_Date;>)

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("holidays.shtml")

Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 


-->