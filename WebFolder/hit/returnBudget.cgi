<!--HIT_EXECUTE
 
C_LONGINT(jsonobject)

project_id:=_HIT_WebApp_GetField ("project_id")
jsonobject:=JSON New Object 

If (project_id#"")
	QUERY([Projects];[Projects]proj_id=Num(project_id))
	TotalBudget:= Num([Projects]budget)
	If (Records in selection([Projects])>0)
		RELATE MANY SELECTION([Tasks]proj_id)
		SELECTION TO ARRAY([Tasks]task_id;nTaskIDArr)
		QUERY WITH ARRAY([Timeslips]task_id;nTaskIDArr)
		If (Records in selection([Timeslips])>0)
			QUERY SELECTION([Timeslips];[Timeslips]billing_status=1)
			TotalRate:= Round(Sum([Timeslips]slip_value);2)
		End if
	End if
Else
	ALL RECORDS([Projects])
	TotalBudget:= Num(Sum([Projects]budget))
	QUERY([Timeslips];[Timeslips]billing_status=1)
	TotalRate:= Round(Sum([Timeslips]slip_value);2)
End if

JSON Set Number (jsonobject;"budget";TotalBudget)
JSON Set Number (jsonobject;"rate";TotalRate)

End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (jsonobject)
JSON Release (jsonobject)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->