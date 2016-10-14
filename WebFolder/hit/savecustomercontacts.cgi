<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
C_BLOB(Web_ResponseDataBLOB)
C_LONGINT(mcontactID;mResultNum)
C_TEXT(muuid)
 

If (_HIT_AuthenticateSession ="Session-Authenticated-OK")
C_TEXT(mUUIDStr;mDeleteuuid)
mDeleteuuid:=_HIT_WebApp_GetField ("delcontact_uuid")
mUUIDStr:=_HIT_WebApp_GetField ("contact_uuid")

Case of 
: (mDeleteuuid#"")
READ WRITE([Contacts])
QUERY([Contacts];[Contacts]uuid=mDeleteuuid)
If (Records in selection([Contacts])=1)
DELETE RECORD([Contacts])

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"succ";"success")

Else 
mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"error";"ERR")

End if 
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)
JSON Release (mResultNum)
 
Else 
READ WRITE([Contacts])
QUERY([Contacts];[Contacts]uuid=mUUIDStr)

If (Records in selection([Contacts])=0)
CREATE RECORD([Contacts])
[Contacts]uuid:=Generate UUID
mUUIDStr:=[Contacts]uuid
End if 

[Contacts]client_id:=Num(_HIT_WebApp_GetField ("Client_id"))
[Contacts]First name:=_HIT_WebApp_GetField ("first_name")
[Contacts]Surname:=_HIT_WebApp_GetField ("surname")
[Contacts]Email:=_HIT_WebApp_GetField ("email")
[Contacts]DateAdded:=Current date
[Contacts]Mobile:=_HIT_WebApp_GetField ("mobile")

mResultNum:=JSON New Object 
JSON Set Text (mResultNum;"uuid";mUUIDStr)
Web_ResponseDataBLOB:=JSON Save As Blob (mResultNum)

SAVE RECORD([Contacts])
UNLOAD RECORD([Contacts])
READ ONLY([Contacts])
ORDER BY([Contacts];[Contacts]First name)
If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 

End case 

End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
 
-->