<!--HIT_EXECUTE

C_BOOLEAN(mUserIsCurrentBool)
mUserIsCurrentBool:=userHasAccessToDelete 
ARRAY STRING(36;mUUIDStrArr;0)
Selectedvalues:=_HIT_WebApp_GetField ("selected")
SelectedStatus:=Num(_HIT_WebApp_GetField ("changed_status"))

API Text To Array (Selectedvalues;",";mUUIDStrArr)
nSelecteditems:=Size of array(mUUIDStrArr)

READ WRITE([Timeslips])
For (count;1;nSelecteditems)
UUID:=mUUIDStrArr{count}
QUERY([Timeslips];[Timeslips]uuid=UUID)
If (Records in selection([Timeslips])=1)

If ([Timeslips]billing_status#SelectedStatus)
[Timeslips]billing_status:=SelectedStatus
SAVE RECORD([Timeslips])
End if 
End if 
End for 

Path:=Get 4D folder(Database Folder)+"savedset.4st"
LOAD SET([Timeslips];"SetA";Path)
USE SET("SetA")

If (Records in selection([Timeslips])>0)
nJSONResult:=JSON New Array 
For (count;1;Records in selection([Timeslips]))
nJSONObject:=JSON New Object 
APPEND TO ARRAY(TaskSlipHourArr;[Timeslips]slip_hours)
JSON Set Number (nJSONObject;"Hours";[Timeslips]slip_hours)
APPEND TO ARRAY(TaskSlipRateArr;[Timeslips]slip_rate)
JSON Set Number (nJSONObject;"Rate";[Timeslips]slip_rate)
Amount:=[Timeslips]slip_hours*[Timeslips]slip_rate
JSON Set Number (nJSONObject;"Amount";Round(Amount;2))

JSON Set Text (nJSONObject;"UUID";[Timeslips]uuid)
QUERY([Tasks];[Tasks]task_id=[Timeslips]task_id)
APPEND TO ARRAY(TaskNameArr;[Tasks]task_name)
JSON Set Text (nJSONObject;"Task";[Tasks]task_name)


Case of 
: ([Timeslips]billing_status=1)
status:="Chargeable"
: ([Timeslips]billing_status=2)
status:="Billed"
: ([Timeslips]billing_status#1)
status:="Non Chargeable"
End case 

JSON Set Text (nJSONObject;"Status";status)

JSON Set Object (nJSONResult;"";nJSONObject)

NEXT RECORD([Timeslips])
End for 

nJSONObject:=JSON New Object 
JSON Set Number (nJSONObject;"Hours";Sum([Timeslips]slip_hours))
JSON Set Number (nJSONObject;"Rate";Sum([Timeslips]slip_rate))
JSON Set Number (nJSONObject;"Amount";Round(Sum([Timeslips]slip_value);2))
JSON Set Text (nJSONObject;"Task";"TOTAL")
JSON Set Object (nJSONResult;"";nJSONObject)

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
JSON Save As Document (nJSONResult;"timeslip.txt")

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nResult";"No Records found.")
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
End if 

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

 
-->