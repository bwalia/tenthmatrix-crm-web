<!--HIT_EXECUTE
 
C_LONGINT(iCounter;jsonobject;result;edatetimeStamp;sdatetimeStamp)
C_DATE(start_date;end_date)
start_date:=Current date
start_date:=Add to date(start_date;0;0;-7)
end_date:=start_date

sdatetimeStamp:=timestamp_unix_Get (start_date;?00:00:01?)
loop_count:=7
diff:=1

result:=JSON New Array 
For (iCounter;1;loop_count)
start_date:=end_date
end_date:=Add to date(start_date;0;0;diff)
edatetimeStamp:=timestamp_unix_Get (end_date)

jsonobject:=JSON New Object 
JSON Set Date (jsonobject;"Start_Date";start_date)
JSON Set Date (jsonobject;"End_Date";edatetimeStamp)

  //Active Tasks
QUERY([Tasks];[Tasks]Timestamp_start>=sdatetimeStamp;*)
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