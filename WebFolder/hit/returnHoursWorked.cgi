<!--HIT_EXECUTE

C_LONGINT(iCounter;jsonobject;result)

start_date:=Date(_HIT_WebApp_GetField ("s_date"))
end_date:=Date(_HIT_WebApp_GetField ("e_date"))
emp_id:=_HIT_WebApp_GetField ("emp_id")
 
sdate:=start_date
edate:=start_date

loop_count:=Num(_HIT_WebApp_GetField ("loop"))
diff:=Num(_HIT_WebApp_GetField ("diff"))

result:=JSON New Array 
For (iCounter;1;loop_count)
sdate:=edate
edate:=sdate+diff

If (edate>end_date)
edate:=end_date
End if

jsonobject:=JSON New Object
if(_HIT_WebApp_GetField ("chart_mode")="month")
JSON Set Text (jsonobject;"Date_Time";String(edate))
Else
JSON Set Text (jsonobject;"Date_Time";String(sdate))
End if

QUERY([Timeslips];[Timeslips]Timestamp_start>Num(timestamp_unix_Get (sdate));*)
QUERY([Timeslips]; & ;[Timeslips]Timestamp_end<=Num(timestamp_unix_Get (edate));*)
If (emp_id#"")
QUERY([Timeslips]; & ;[Timeslips]emp_id=Num(emp_id);*)
End if
QUERY([Timeslips]; & ;[Timeslips]billing_status=1)

JSON Set Number (jsonobject;"Chargeble";Round(Sum([Timeslips]slip_hours);2))

QUERY([Timeslips];[Timeslips]Timestamp_start>Num(timestamp_unix_Get (sdate));*)
QUERY([Timeslips]; & ;[Timeslips]Timestamp_end<=Num(timestamp_unix_Get (edate));*)
If (emp_id#"")
QUERY([Timeslips]; & ;[Timeslips]emp_id=Num(emp_id);*)
End if
QUERY([Timeslips]; & ;[Timeslips]billing_status#1)

JSON Set Number (jsonobject;"NotChargeble";Round(Sum([Timeslips]slip_hours);2))

JSON Set Object (result;"";jsonobject)

End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
z
-->