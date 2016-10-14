<!--HIT_EXECUTE

ARRAY STRING(36;mUUIDStrArr;0)
Selectedvalues:=_HIT_WebApp_GetField ("selected")
API Text To Array (Selectedvalues;",";mUUIDStrArr)

nSelecteditems:=Size of array(mUUIDStrArr)

READ WRITE([Lead_Contacts])
For (count;1;nSelecteditems)

UUID:=mUUIDStrArr{count}
QUERY([Lead_Contacts];[Lead_Contacts]uuid=UUID)
If (Records in selection([Lead_Contacts])=1)
DELETE RECORD([Lead_Contacts])
End if 
End for 
UNLOAD RECORD([Lead_Contacts])

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"Succ";"Deleted")
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->