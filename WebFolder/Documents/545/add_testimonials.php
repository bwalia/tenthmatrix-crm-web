<?php 
require_once("../config/config-connection.php");
if(!isset($_SESSION['admin_scan'])) { echo "<script language='javascript'>window.location.href='index.php'</script>"; }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<?php include_once("admin_meta.php"); ?>
<link rel="stylesheet" type="text/css" href="style.css" /> 
</head>
<body>
<table width="100%" border="0" cellspacing="0" cellpadding="0" height="100%">
  <tr>
    <td valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" height="100%">
  <tr>
    <td style="width:1%;">&nbsp;</td>
    <td style="width:98%;" valign="top"><?php include_once("admin_top.php"); ?></td>
    <td style="width:1%;">&nbsp;</td>
  </tr>
  
  <tr>
    <td style="width:1%;">&nbsp;</td>
    <td height="400" valign="top" style="width:98%;" ><?php include_once("add_testimonials_inc.php"); ?></td>
    <td style="width:1%;">&nbsp;</td>
  </tr>
  
  <tr><td class="footer" colspan="3"><?php include_once("admin_bottom.php"); ?></td>
  </tr>
  </table></td></tr>
</table>
</body>
</html>

