<!--HIT_EXECUTE

C_LONGINT(mResultNum)
C_BOOLEAN(mUserIsCurrentBool)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
mUserIsCurrentBool:=False
mUserIsCurrentBool:=userHasAccessToDelete
mResultNum:=JSON New Object
 
If (mUserIsCurrentBool)
SelectedUUID:=_HIT_WebApp_GetField ("deleteuuid")
READ WRITE([Companies])
QUERY([Companies];[Companies]uuid=SelectedUUID)

If (Records in selection([Companies])=1)
QUERY([Contacts];[Contacts]client_id=[Companies]account_Number)
If (Records in selection([Contacts])>0)
For (count;1;Records in selection([Contacts]))
DELETE RECORD([Contacts])
NEXT RECORD([Contacts])
End for 
End if

DELETE RECORD([Companies])
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
JSON Set Text (mResultNum;"Result";"Sorry, you do not have permissions to delete record.")
End if

Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)




-->