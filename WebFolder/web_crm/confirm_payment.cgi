<!--HIT_EXECUTE

_HIT_WebSession_SetVar("payment_full_invoice_no";_HIT_WebApp_GetField ("invoice_no"))
_HIT_WebSession_SetVar("payment_project_code";_HIT_WebApp_GetField ("cartId"))
_HIT_WebSession_SetVar("payment_message";_HIT_WebApp_GetField ("message"))
_HIT_WebSession_SetVar("payment_email";_HIT_WebApp_GetField ("email"))
_HIT_WebSession_SetVar("payment_amount";_HIT_WebApp_GetField ("amount"))

_HIT_HTTPD_RedirectToURL ("confirm_payment.shtml")


-->