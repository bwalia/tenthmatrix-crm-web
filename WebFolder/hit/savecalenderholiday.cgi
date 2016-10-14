<!--HIT_EXECUTE
C_LONGINT(result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

C_TEXT(muuid)

READ WRITE([employee_holidays])

CREATE RECORD([employee_holidays])
[employee_holidays]uuid:=Generate UUID
muuid:=[employee_holidays]uuid

[employee_holidays]uuid_employee:=_HIT_WebApp_GetField ("employee_ID")
[employee_holidays]timestamp_start:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("start_date")))
[employee_holidays]timestamp_end:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("end_date")))
[employee_holidays]subject:=_HIT_WebApp_GetField ("subject")
[employee_holidays]status:=_HIT_WebApp_GetField ("status")
RequestStatus:=_HIT_WebApp_GetField ("status")
SAVE RECORD([employee_holidays])

//send mail
HostName:="smtp.sendgrid.net"
userName:="tenthmatrix"
Password:="AugMem8201"
HTMLHeader:="<!DOCTYPE HTML PUBLIC "+Char(34)+"- //W3C//DTD HTML 4.01 Transitional//EN"+Char(34)+">"+Char(13)
HTMLHeader:=HTMLHeader+"<meta http-equiv=3D"+Char(34)+"Content-Language"+Char(34)+" content=3D"+Char(34)+"en-gb"+Char(34)+">"+Char(13)
SET TEXT TO PASTEBOARD(HTMLHeader)
Case of 
: (RequestStatus="Requested")

EmpUUID:=_HIT_WebApp_GetField ("Employee_ID")
QUERY([Employees];[Employees]uuid=EmpUUID)
If (Records in selection([Employees])>0)
FromAddress:=[Employees]email
EmpName:=[Employees]emp_first_name
End if 
ReplyToAddress:=FromAddress
Subject:="Request for Leave"
ToMail:="neha.kapoor@tenthmatrix.co.uk"
mailcontent:=_HIT_WebApp_GetField ("Subject")
SET TEXT TO PASTEBOARD(mailcontent)

If (Is compiled mode)
URL:="https://crm.tenthmatrix.co.uk/hit/holiday.shtml?uuid="+muuid
Else 
URL:="https://dev-billing.tenthmatrix.co.uk/hit/holiday.shtml?uuid="+muuid
End if

URL:="<a href="+Char(Double quote)+URL+Char(Double quote)+Char(Space)+"target="+Char(Double quote)+"_blank"+Char(Double quote)+">"+URL+"</a>"
mailcontent:=mailcontent+"<br>Click here to check:<br>"+Char(Carriage return)+URL
mailcontent:=HTMLHeader+"<html>"+Char(Carriage return)+"<body>"+Char(Carriage return)+mailcontent+Char(Carriage return)
SET TEXT TO PASTEBOARD(mailcontent)
mailcontent:=mailcontent+"</body>"+Char(Carriage return)+"</html>"+Char(Carriage return)
SET TEXT TO PASTEBOARD(mailcontent)
End case 

error:=SMTP_New (smtp_id)
error:=SMTP_Host (smtp_id;HostName)
error:=SMTP_From (smtp_id;FromAddress)
error:=SMTP_ReplyTo (smtp_id;ReplyToAddress)
error:=SMTP_Subject (smtp_id;Subject)
error:=SMTP_AddHeader (smtp_id;"Content-Type:";"text/html;charset=us-ascii";1)
error:=SMTP_Body (smtp_id;mailcontent)
error:=SMTP_To (smtp_id;ToMail;1)

error:=SMTP_Auth (smtp_id;userName;Password;1)
If (error=0)
senderror:=SMTP_Send (smtp_id)
End if 
error:=SMTP_Clear (smtp_id)
UNLOAD RECORD([employee_holidays])
READ ONLY([employee_holidays])

result:=JSON New Object 
JSON Set Text (result;"uuid";muuid)

QUERY([Employees];[Employees]uuid=_HIT_WebApp_GetField ("employee_ID"))
If (Records in selection([Employees])>0)
JSON Set Text (result;"Holiday_Details";[Employees]emp_first_name+" "+[Employees]emp_last_name+": "+char(Carriage return)+_HIT_WebApp_GetField ("subject"))
End if 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

Else 
result:=JSON New Object 
JSON Set Text (result;"error";"AUTH FAILED")
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->