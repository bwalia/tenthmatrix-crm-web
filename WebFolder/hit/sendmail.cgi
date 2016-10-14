<!--HIT_EXECUTE

C_LONGINT(mResultNum;JsonObject;count;Totalcount)
C_BLOB(Web_ResponseDataBLOB)
C_TEXT(Name;ToMail;HostName;Subject;MsgBody;host_name;htmlmailcontent;HTMLHeader;mailcontent)
C_LONGINT(error;smtp_id;senderror;nFiles;refCount)
C_BOOLEAN(SetFlag;SetHasAttachment)
Subject:=_HIT_WebApp_GetField ("Subject")
Subject:=Replace string(Subject;"\r\n";"")
FromlName:=_HIT_WebApp_GetField ("From_name")
FromlName:=Replace string(FromlName;"\r\n";"")


ARRAY TEXT(nTempFiles;0)
FromlName:=_HIT_WebApp_GetField ("From_name")
FromlName:=Replace string(FromlName;"\r\n";"")
ToMailAdress:=_HIT_WebApp_GetField ("ToEmailAddress")
ToMailAdress:=Replace string(ToMailAdress;"\r\n";"")

QUERY([_emailc_queue];[_emailc_queue]_uuid=ToMailAdress)
If (Records in selection([_emailc_queue])=1)
ToMail:=[_emailc_queue]_recipient
Else 
ToMail:=ToMailAdress
End if 

CCAddress:=_HIT_WebApp_GetField ("CCToEmailAddress")
CCAddress:=Replace string(CCAddress;"\r\n";"")
QUERY([_emailc_queue];[_emailc_queue]_uuid=CCAddress)
If (Records in selection([_emailc_queue])=1)
CCAddresses:=[_emailc_queue]_recipient
Else 
CCAddresses:=CCAddress
End if 

BCCAddress:=_HIT_WebApp_GetField ("BCCToEmailAddress")
BCCAddress:=Replace string(BCCAddress;"\r\n";"")
QUERY([_emailc_queue];[_emailc_queue]_uuid=BCCAddress)
If (Records in selection([_emailc_queue])=1)
BCCAddresses:=[_emailc_queue]_recipient
Else 
BCCAddresses:=BCCAddress
End if 

HostName:=_HIT_WebApp_GetField ("HostName")
HostName:=Replace string(HostName;"\r\n";"")
checkbox:=_HIT_WebApp_GetField ("send_html_mail")
checkbox:=Replace string(checkbox;"\r\n";"")


Case of 
: (HostName="Balinder")

HostName:="smtp.sendgrid.net"
userName:="tenthmatrix"
Password:="AugMem8201"
FromAddress:="bwalia@tenthmatrix.co.uk"
ReplyToAddress:=FromAddress

: (HostName="Pat")
HostName:="smtp.sendgrid.net"
userName:="tenthmatrix"
Password:="AugMem8201"
FromAddress:="pat.bensky@tenthmatrix.co.uk"
ReplyToAddress:=FromAddress

: (HostName="Sandeep")
HostName:="smtp.sendgrid.net"
userName:="tenthmatrix"
Password:="AugMem8201"
FromAddress:="sandeep.shah@tenthmatrix.co.uk"
ReplyToAddress:=FromAddress
End case 


Subject:=_HIT_WebApp_GetField ("Subject")
Subject:=Replace string(Subject;"\r\n";"")


error:=SMTP_New (smtp_id)
error:=SMTP_Host (smtp_id;HostName)
error:=SMTP_From (smtp_id;FromAddress)
error:=SMTP_ReplyTo (smtp_id;ReplyToAddress)
error:=SMTP_Subject (smtp_id;Subject)

If (checkbox="true")
htmlmailcontent:=_HIT_WebApp_GetField ("Message_Body")
SET TEXT TO PASTEBOARD(htmlmailcontent)

HTMLHeader:="<!DOCTYPE HTML PUBLIC "+Char(34)+"- //W3C//DTD HTML 4.01 Transitional//EN"+Char(34)+">"+Char(13)
HTMLHeader:=HTMLHeader+"<meta http-equiv=3D"+Char(34)+"Content-Language"+Char(34)+" content=3D"+Char(34)+"en-gb"+Char(34)+">"+Char(13)
SET TEXT TO PASTEBOARD(HTMLHeader)

htmlmailcontent:=HTMLHeader+"<html>"+Char(Carriage return)+htmlmailcontent+Char(Carriage return)

SET TEXT TO PASTEBOARD(htmlmailcontent)

htmlmailcontent:=htmlmailcontent+"</body>"+Char(Carriage return)+"</html>"+Char(Carriage return)

SET TEXT TO PASTEBOARD(htmlmailcontent)

error:=SMTP_AddHeader (smtp_id;"Content-Type:";"text/html;charset=us-ascii";1)
error:=SMTP_Body (smtp_id;htmlmailcontent)
Else 
Mailcontent:=_HIT_WebApp_GetField ("Message_Body")
SET TEXT TO PASTEBOARD(Mailcontent)
error:=SMTP_Body (smtp_id;Mailcontent)
End if 

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("email_uuid")
mUUIDStr:=Replace string(mUUIDStr;"\r\n";"")
READ WRITE([_emailc_queue])
QUERY([_emailc_queue];[_emailc_queue]_uuid=mUUIDStr)

If (Records in selection([_emailc_queue])=0)
CREATE RECORD([_emailc_queue])
[_emailc_queue]_uuid:=Generate UUID
mUUIDStr:=[_emailc_queue]_uuid

End if 


[_emailc_queue]_from_name:=FromlName
[_emailc_queue]_recipient:=ToMail

If (checkbox="true")
[_emailc_queue]_email_body_html:=htmlmailcontent
Else 
[_emailc_queue]_email_body:=Mailcontent
End if 

[_emailc_queue]_subject:=Subject
[_emailc_queue]_cc:=CCAddresses
[_emailc_queue]_bcc:=BCCAddresses
[_emailc_queue]_replyTo:=ReplyToAddress


C_TEXT(File_Name;_HIT_HTMLTXT)
C_LONGINT(nFiles)
nFiles:=Num(_HIT_WebApp_GetField ("num_files"))
For (count;0;nFiles)

file_content:="file_content_F"+String(count)
_HIT_WebApp_GetFileUploadInfo (file_content;"AUTO-PARSE-JSON";->_HIT_JSON_LONG)

If (JSON Is Valid Object (_HIT_JSON_LONG)=1)
SetHasAttachment:=True
TempFolder:=web_SetupTemp_Folder 

_HIT_HTMLTXT:=JSON Get Text (_HIT_JSON_LONG;"filename")

File_Name:=_HIT_HTMLTXT

Extension:=JSON Get Text (_HIT_JSON_LONG;"extension")
ContentType:=JSON Get Text (_HIT_JSON_LONG;"content-type")
FilePathname:=JSON Get Text (_HIT_JSON_LONG;"temppath")


If (Test path name(FilePathname)=Is a document)
  //Web_fileto_Attachment(FilePathname;mUUIDStr)

FileName:=TempFolder+File_Name
If (Test path name(FileName)=Is a document)

DELETE DOCUMENT(FileName)
End if 

error:=IT_Encode (FilePathname;FileName;2)
If (error=0)


If (Test path name(FileName)=Is a document)

error:=SMTP_Attachment (smtp_id;FileName;-2)
If (error#0)
ALERT("Error: SMTP_Attachment"+Char(13)+IT_ErrorText (error))
End if 
End if 
Else 

ALERT("Error: IT_Encode"+Char(13)+IT_ErrorText (error)+Char(Carriage return)+File_Name+Char(Space)+"File Could not be attached")

End if 

End if 

JSON Release (_HIT_JSON_LONG)

End if 

End for 

Case of 

: (ToMail="Send-To-All")
ALL RECORDS([_emailc_queue])

For (count;1;Records in table([[_emailc_queue]]))

ToMail:=[_emailc_queue]_recipient
If (ToMail="Send-To-All")

Else 
error:=SMTP_To (smtp_id;ToMail;1)

error:=SMTP_Auth (smtp_id;userName;Password;1)
If (error=0)
senderror:=SMTP_Send (smtp_id)
End if 
End if 
NEXT RECORD([_emailc_queue])

End for 


If (senderror#0)

SetFlag:=False

Else 
SetFlag:=True

End if 

If (JSON Is Valid Object (mResultNum)=1)
JSON Release (mResultNum)
End if 

error:=SMTP_Clear (smtp_id)

Else 

error:=SMTP_To (smtp_id;ToMail;1)

If (CCAddresses#"")

error:=SMTP_Cc (smtp_id;CCAddresses;1)

End if 

If (BCCAddresses#"")

error:=SMTP_Bcc (smtp_id;BCCAddresses;1)
End if 


error:=SMTP_Auth (smtp_id;userName;Password;1)
If (error=0)
senderror:=SMTP_Send (smtp_id)
End if 

error:=SMTP_Clear (smtp_id)

If (senderror#0)
SetFlag:=False
Else 
SetFlag:=True
End if 


If (SetFlag)
[_emailc_queue]_email_state:=1
Else 
[_emailc_queue]_email_state:=0
End if 

If (checkbox="true")
[_emailc_queue]_email_type:=1
Else 
[_emailc_queue]_email_type:=0
End if 

SAVE RECORD([_emailc_queue])
UNLOAD RECORD([_emailc_queue])
READ ONLY([_emailc_queue])

End case 

_HIT_HTTPD_RedirectToURL ("emailqueue.shtml")

-->
