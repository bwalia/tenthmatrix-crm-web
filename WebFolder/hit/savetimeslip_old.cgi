<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")
CREATE RECORD([TimeSlips])
[TimeSlips]slip_id:=Sequence number([TimeSlips])
[TimeSlips]task_id:=Num(_HIT_WebApp_GetField ("Task_ID"))
[TimeSlips]emp_id:=Num(_HIT_WebApp_GetField ("Employee_ID"))
[TimeSlips]slip_date:=Date(_HIT_WebApp_GetField ("Slip_Date"))
[TimeSlips]slip_description:=_HIT_WebApp_GetField ("Slip_Description")
[TimeSlips]slip_timer_started:=Num(_HIT_WebApp_GetField ("Slip_TimerStarted"))
[TimeSlips]slip_hours:=Num(_HIT_WebApp_GetField ("Slip_Hours"))
[TimeSlips]slip_rate:=Num(_HIT_WebApp_GetField ("Slip_Rate"))
[TimeSlips]slip_timer_accumulated_seconds:=Num(_HIT_WebApp_GetField ("slip_timer_accumulated_seconds"))
[TimeSlips]billing_status:=Num(_HIT_WebApp_GetField ("Billing_Status"))
[TimeSlips]uuid:=Generate UUID

SAVE RECORD([TimeSlips])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("timeslips.shtml")
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->