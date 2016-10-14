<!--HIT_EXECUTE

ARRAY LONGINT(nTaskIDArr;0)
ARRAY LONGINT(resultTaskIdArr;0)
C_LONGINT(iCounter;mJSONOject;mJSOnResult;task_id;project_id;finalhours;testhours;setFlag)
ARRAY REAL(testhoursArr;0)

start_date:=Date(_HIT_WebApp_GetField ("s_date"))
end_date:=Date(_HIT_WebApp_GetField ("e_date"))
emp_id:=_HIT_WebApp_GetField ("emp_id")
task_id:=Num(_HIT_WebApp_GetField ("task_id"))
project_id:=Num(_HIT_WebApp_GetField ("project_id"))
setFlag:=0
  //Compiler_TB4D_Variables 
Case of 
: ((task_id#0) | (project_id#0))
setFlag:=1
If (project_id#0)
QUERY([Projects];[Projects]proj_id=project_id)

If (Records in selection([Projects])>0)
RELATE MANY SELECTION([Tasks]proj_id)
SELECTION TO ARRAY([Tasks]task_id;nTaskIDArr)
If (task_id=0)
QUERY WITH ARRAY([Timeslips]task_id;nTaskIDArr)
Else 
QUERY([Timeslips];[Timeslips]task_id=task_id)
End if 
End if 
End if 
If (task_id#0)
QUERY([Timeslips];[Timeslips]task_id=task_id)
End if 
SELECTION TO ARRAY([Timeslips]task_id;resultTaskIdArr)
CREATE SET([Timeslips];"SetA")
End case 

sdate:=start_date
edate:=start_date
loop_count:=Num(_HIT_WebApp_GetField ("loop"))
diff:=1

mJSOnResult:=JSON New Array 
For (iCounter;1;loop_count)
sdate:=edate
Case of 
: (_HIT_WebApp_GetField ("mode")="year")
edate:=Add to date(edate;0;1;0)
Else 
edate:=Add to date(edate;0;0;1)
End case 

mJSONOject:=JSON New Object 

If (_HIT_WebApp_GetField ("mode")="year")
JSON Set Text (mJSONOject;"Date_Time";String(edate))
Else 
JSON Set Text (mJSONOject;"Date_Time";String(sdate))
End if 

If (setFlag=1)
USE SET("SetA")
QUERY SELECTION([Timeslips];[Timeslips]Timestamp_start>Num(timestamp_unix_Get (sdate;Time("00:00:01")));*)
QUERY SELECTION([Timeslips]; & ;[Timeslips]Timestamp_end<=Num(timestamp_unix_Get (edate;Time("00:00:01"))))
If (emp_id#"")
QUERY SELECTION([Timeslips]; & ;[Timeslips]emp_id=Num(emp_id))
End if 
CREATE SET([Timeslips];"SetC")

USE SET("SetC")
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status=1)
JSON Set Number (mJSONOject;"Chargeble";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetC")
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status=2)
JSON Set Number (mJSONOject;"Billed";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetC")
QUERY SELECTION([Timeslips];[Timeslips]billing_status#1;*)
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status#2) 
JSON Set Number (mJSONOject;"NotChargeble";Round(Sum([Timeslips]slip_hours);2))

Else 

QUERY([Timeslips];[Timeslips]Timestamp_start>Num(timestamp_unix_Get (sdate;Time("00:00:01")));*)
QUERY([Timeslips]; & ;[Timeslips]Timestamp_end<=Num(timestamp_unix_Get (edate;Time("00:00:01"))))
If (emp_id#"")
QUERY SELECTION([Timeslips]; & ;[Timeslips]emp_id=Num(emp_id))
End if 
CREATE SET([Timeslips];"SetC")
USE SET("SetC")
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status=1)
SELECTION TO ARRAY([Timeslips]slip_hours;testhoursArr)
JSON Set Number (mJSONOject;"Chargeble";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetC")
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status=2)
JSON Set Number (mJSONOject;"Billed";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetC")
QUERY SELECTION([Timeslips];[Timeslips]billing_status#1;*)
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status#2)
JSON Set Number (mJSONOject;"NotChargeble";Round(Sum([Timeslips]slip_hours);2))
End if 
JSON Set Object (mJSOnResult;"";mJSONOject)
End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (mJSOnResult)
JSON Release (mJSOnResult)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

 
-->