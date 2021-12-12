<!--HIT_EXECUTE

READ WRITE([Invoices])
QUERY([Invoices];[Invoices]uuid="893F2F55-CFA5-41BB-8792-D1BB0479F399")
[Invoices]inv_date_paid:=!00/00/0000!
[Invoices]invoice_status:="Invoiced"
SAVE RECORD([Invoices])


-->