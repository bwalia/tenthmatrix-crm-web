<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Timeslip_uuid")
READ WRITE([TimeSlips])
QUERY([TimeSlips];[TimeSlips]uuid=mUUIDStr)

If (Records in selection([TimeSlips])=0)
CREATE RECORD([TimeSlips])
[TimeSlips]slip_id:=Sequence number([TimeSlips])
[TimeSlips]uuid:=Generate UUID
End if

[TimeSlips]task_id:=Num(_HIT_WebApp_GetField ("Task_ID"))
[TimeSlips]emp_id:=Num(_HIT_WebApp_GetField ("Employee_ID"))
[TimeSlips]slip_date:=Date(_HIT_WebApp_GetField ("Slip_Date"))
[TimeSlips]slip_description:=_HIT_WebApp_GetField ("Slip_Description")
[TimeSlips]slip_timer_started:=Num(_HIT_WebApp_GetField ("Slip_TimerStarted"))
[TimeSlips]slip_timer_end:=_HIT_WebApp_GetField ("Slip_Timer_End")
[TimeSlips]slip_hours:=Num(_HIT_WebApp_GetField ("Slip_Hours"))
[TimeSlips]slip_rate:=Num(_HIT_WebApp_GetField ("Slip_Rate"))
[TimeSlips]slip_timer_accumulated_seconds:=Num(_HIT_WebApp_GetField ("slip_timer_accumulated_seconds"))

If (_HIT_WebApp_GetField ("Billing_Status")="Chargeable")
[TimeSlips]billing_status:=1
Else
[TimeSlips]billing_status:=0
End if

[Timeslips]Timestamp_start:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("Slip_Date"));Time(_HIT_WebApp_GetField ("Slip_TimerStarted")))
[Timeslips]Timestamp_end:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("Slip_EndDate"));Time(_HIT_WebApp_GetField ("Slip_Timer_End")))

SAVE RECORD([TimeSlips])
UNLOAD RECORD([TimeSlips])
READ ONLY([TimeSlips])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("timeslips.shtml?"+_HIT_WebApp_GetField ("Task_ID"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->