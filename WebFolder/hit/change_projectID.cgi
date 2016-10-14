<!--HIT_EXECUTE

ALL RECORDS([Invoices])

For (count;1;Records in selection([Invoices]))
Invoice:=[Invoices]project_code
if(isTextNumber (Invoice))
QUERY([Projects];[Projects]proj_id=[Invoices]project_code)
[Invoices]project_code:=[Projects]proj_name
SAVE RECORD([Invoices])
End if
NEXT RECORD([Invoices])
End for 

_HIT_HTTPD_RedirectToURL ("invoices.shtml")

-->