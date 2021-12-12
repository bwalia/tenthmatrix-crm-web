<!--HIT_EXECUTE

C_LONGINT(mResultNum)
C_BOOLEAN(mUserIsCurrentBool)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
mUserIsCurrentBool:=false
mUserIsCurrentBool:=userHasAccessToDelete
mResultNum:=JSON New Object 

If (mUserIsCurrentBool)
SelectedUUID:=_HIT_WebApp_GetField ("deleteuuid")
READ WRITE([Module])
QUERY([Module];[Module]uuid=SelectedUUID)
If (Records in selection([Module])=1)
DELETE RECORD([Module])
If (OK=1)
SetFlag:=True
End if 
End if 
If (SetFlag)
JSON Set Text (mResultNum;"Result";"Deleted Successfully.")
Else 
JSON Set Text (mResultNum;"Result";"Deletion Failed.")
End if 
Else 
JSON Set Text (mResultNum;"Result";"Sorry, you do not have access to delete record.")
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->