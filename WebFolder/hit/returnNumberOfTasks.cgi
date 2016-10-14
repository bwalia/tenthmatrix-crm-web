<!--HIT_EXECUTE
 
C_LONGINT(iCounter;jsonobject;result;sdatetimeStamp;edatetimeStamp)
C_DATE(start_date;end_date)

start_date:=Date(_HIT_WebApp_GetField ("s_date"))
end_date:=Date(_HIT_WebApp_GetField ("e_date"))

sdatetimeStamp:=timestamp_unix_Get (start_date)
end_date:=start_date
loop_count:=Num(_HIT_WebApp_GetField ("loop"))
diff:=Num(_HIT_WebApp_GetField ("diff"))

result:=JSON New Array 
For (iCounter;1;loop_count)
start_date:=end_date
end_date:=Add to date(start_date;0;0;diff)

edatetimeStamp:=timestamp_unix_Get (end_date)

jsonobject:=JSON New Object 

QUERY([Tasks];[Tasks]Timestamp_start>=sdatetimeStamp;*)
QUERY([Tasks]; & ;[Tasks]Timestamp_start<=edatetimeStamp)

JSON Set Number (jsonobject;"All";Records in selection([Tasks]))
JSON Set Text (jsonobject;"Start_Date";String(start_date))
JSON Set Text (jsonobject;"End_Date";String(end_date))

  //Active Tasks
QUERY([Tasks];[Tasks]Timestamp_start>sdatetimeStamp;*)
QUERY([Tasks]; & ;[Tasks]Timestamp_start<=edatetimeStamp;*)
QUERY SELECTION([Tasks];[Tasks]task_active=True)
JSON Set Number (jsonobject;"Active";Records in selection([Tasks]))

  //Inactive Tasks
QUERY([Tasks];[Tasks]Timestamp_start>=sdatetimeStamp;*)
QUERY([Tasks]; & ;[Tasks]Timestamp_start<=edatetimeStamp;*)
QUERY SELECTION([Tasks];[Tasks]task_active=False)
JSON Set Number (jsonobject;"Done";Records in selection([Tasks]))

JSON Set Object (result;"";jsonobject)
End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->