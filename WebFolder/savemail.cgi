<!--HIT_EXECUTE

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

Else 
Mailcontent:=_HIT_WebApp_GetField ("Message_Body")
SET TEXT TO PASTEBOARD(Mailcontent)
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
[_emailc_queue]_email_state:=0

If (checkbox="true")
[_emailc_queue]_email_type:=1
Else 
[_emailc_queue]_email_type:=0
End if 

SAVE RECORD([_emailc_queue])
UNLOAD RECORD([_emailc_queue])
READ ONLY([_emailc_queue])

_HIT_HTTPD_RedirectToURL ("emailqueue.shtml")


-->