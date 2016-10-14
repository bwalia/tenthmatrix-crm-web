<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Timeslip_uuid")
READ WRITE([Timeslips])
QUERY([Timeslips];[Timeslips]uuid=mUUIDStr)

If (Records in selection([Timeslips])=0)
CREATE RECORD([Timeslips])
[Timeslips]slip_id:=Sequence number([Timeslips])
mSlipID:=[Timeslips]slip_id
[Timeslips]uuid:=Generate UUID
End if 

[Timeslips]task_id:=Num(_HIT_WebApp_GetField ("Task_ID"))
[Timeslips]emp_id:=Num(_HIT_WebApp_GetField ("Employee_ID"))
[Timeslips]slip_description:=_HIT_WebApp_GetField ("Slip_Description")
[Timeslips]slip_hours:=Num(_HIT_WebApp_GetField ("Slip_Hours"))
[Timeslips]slip_rate:=Num(_HIT_WebApp_GetField ("Slip_Rate"))
[Timeslips]slip_timer_accumulated_seconds:=Num(_HIT_WebApp_GetField ("slip_timer_accumulated_seconds"))
[Timeslips]billing_status:=Num(_HIT_WebApp_GetField ("Billing_Status"))
 
start_date:=_HIT_WebApp_GetField ("Slip_Date")
start_time:=_HIT_WebApp_GetField ("Slip_TimerStarted")
end_date:=_HIT_WebApp_GetField ("Slip_EndDate")
end_time:=_HIT_WebApp_GetField ("Slip_Timer_End")

if(end_date="")
end_date:=start_date
End if
if(end_time="")
end_time:=start_time
End if
 
[Timeslips]Timestamp_start:=timestamp_unix_Get (Date(start_date);Time(start_time))
[Timeslips]Timestamp_end:=timestamp_unix_Get (Date(end_date);Time(end_time))

SAVE RECORD([Timeslips])

UNLOAD RECORD([Timeslips])
READ ONLY([Timeslips])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("timeslips.shtml")
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 


-->