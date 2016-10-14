<!--HIT_EXECUTE

C_BOOLEAN(mUserIsCurrentBool)
mUserIsCurrentBool:=(_HIT_WebSession_GetVar ("auth_user_type")="Admin")

ARRAY STRING(36;mUUIDStrArr;0)
Selectedvalues:=_HIT_WebApp_GetField ("selected")
API Text To Array (Selectedvalues;",";mUUIDStrArr)

nSelecteditems:=Size of array(mUUIDStrArr)

READ WRITE([Contacts])
For (count;1;nSelecteditems)

UUID:=mUUIDStrArr{count}
QUERY([Contacts];[Contacts]uuid=UUID)
If (Records in selection([Contacts])=1)
DELETE RECORD([Contacts])
End if 
End for
UNLOAD RECORD([Contacts]) 
mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"Succ";"Deleted")
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->