var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var filelink = $("a[href='"+filename+"']");
var ulparent = filelink.parents('.submenu');
var liparent = ulparent.parent('li');
filelink.addClass('active');
ulparent.addClass('active');
liparent.addClass('active');
var mainlink = liparent.children('.dropdown-toggle');
mainlink.after('<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>');

$(document).ready(function() {
    $.widget( "app.autocomplete", $.ui.autocomplete, {
        options: {
            suggest: false    
        },
        _suggest: function( items ) {
            if ( $.isFunction( this.options.suggest ) ) {
                return this.options.suggest( items );
            }
            this._super( items );
        },
    });
	if(clientModeFlag==true){
	var menu_details = [
		{
			label: 'Account Company Contacts',
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-edit"></i><span>Account</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="customers.shtml">Company</a></li><li><a href="contacts.shtml">List Contacts</a></li><li><a href="contact.shtml">Enter New Contact</a></li></ul></li>',
		},
		{
			label: "Tasks",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-tasks"></i><span>Tasks</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="tasks.shtml">List Tasks</a></li><li><a href="task.shtml">Enter New Task</a></li></ul></li>',
		},
		{
			label: "Timeslips",
			value: ' <li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-calendar"></i><span>Timeslips</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="timeslips.shtml">List Timeslips</a></li></ul></li>',
		},
		{
			label: "Documents",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-briefcase"></i><span>Documents</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="documents.shtml">List Documents</a></li><li><a href="document.shtml">Enter New Document</a></li></ul></li>'
		},
		{
			label: "Invoices",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-book"></i><span>Invoices</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="invoices.shtml">List Invoices</a></li></ul></li>',
		},
		{
			label: "Receipts",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-reorder"></i><span>Receipts</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="receipts.shtml">List Receipts</a></li></ul></li> ',
		},
		{
			label: "Projects",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-edit"></i><span>Projects</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="projects.shtml">List Projects</a></li><li><a href="project.shtml">Enter New Project</a></li></ul></li>',
		}
	];
	}else{
	 var menu_details = [
		{
			label: 'Customers Projects projects',
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-group"></i><span>Customers</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="customers.shtml">Customers</a></li><li><a href="customer.shtml">Enter New Customer</a></li><li><a href="projects.shtml">Projects</a></li><li><a href="project.shtml">Enter New Project</a></li><li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;"><strong>Customer Sets</strong></span><i class="icon-chevron-down" style="padding-right: 13px;"></i></a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;"><!--#4DSCRIPT/Web_LoadCustomerSets/--><!--4DLOOP  [saved_sets]--><li><a href="javascript:void(0)" onClick="__showCustomerForm_LoadSet(\'<!--#4DHTMLVAR [saved_sets]name-->\',\'<!--#4DHTMLVAR [saved_sets]uuid-->\')"><!--4DVAR [saved_sets]name--></a></li><!--4DENDLOOP--></ul></li></ul></li>',
		},
		{
			label: "Contacts",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i><img src="img/contact2.png"  alt=""/></i><span>Contacts</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="contacts.shtml">Contacts</a></li><li><a href="contact.shtml">Enter New Contact</a></li><li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;"><strong>Sets</strong></span><i class="icon-chevron-down" style="padding-right: 13px;"></i></a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;"><!--#4DSCRIPT/Web_LoadContactSets/--><!--4DLOOP  [saved_sets]--><li><a href="javascript:void(0)" onClick="__showContactForm_LoadSet(\'<!--#4DHTMLVAR [saved_sets]name-->\',\'<!--#4DHTMLVAR [saved_sets]uuid-->\')"><!--4DVAR [saved_sets]name--></a><!--4DENDLOOP--></ul></li></ul></li>',
		},
		{
			label: "Tasks",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-tasks"></i><span>Tasks</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="tasks.shtml">Tasks</a></li><li><a href="task.shtml">Enter New Task</a></li></ul></li>',
		},
		{
			label: "Timeslips",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-calendar"></i><span>Timeslips</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="timeslips.shtml">Timeslips</a></li><li><a href="calendar.shtml?mode=week">Calendar View</a></li><li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;">View Timeslips of</span><i class="icon-chevron-down"></i></a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;"><li><a href="javascript:void(0)" onClick="__showTimesheets(\'today\');">Today</a></li><li><a href="javascript:void(0)" onClick="__showTimesheets(\'week\');">This week</a></li><li><a href="javascript:void(0)" onClick="__showTimesheets(\'month\');">This month</a></li></ul></li><li><a href="timeslip.shtml">Enter New Timeslip</a></li></ul></li>',
		},
		{
			label: "Documents",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-edit"></i><span>Documents</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="documents.shtml">Documents</a></li><li><a href="document.shtml">Enter New Document</a></li></ul></li>'
		},
		{
			label: "Orders",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i > <img src="img/order.png" width="24" height="24"  alt=""/></i><span>Orders</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="orders.shtml">Orders</a></li><li><a href="order.shtml">Enter New Order</a></li></ul></li>',
		},
		{
			label: "IT inventory Servers Domain",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i ><img src="img/domain.png" width="24" height="24"  alt=""/></i><span>IT inventory</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="servers.shtml">Servers</a></li><li><a href="server.shtml">Enter New Server</a></li><li><a href="domains.shtml">Domains</a></li><li><a href="domain.shtml">Enter New Domain</a></li><li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;"><strong>Sets</strong></span><i class="icon-chevron-down" style="padding-right: 13px;"></i></a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;"><!--#4DSCRIPT/Web_LoadDomainSets/--><!--4DLOOP  [saved_sets]--><li><a href="javascript:void(0)" onClick="__showDomainsForm_LoadSet(\'<!--#4DHTMLVAR [saved_sets]name-->\',\'<!--#4DHTMLVAR [saved_sets]uuid-->\')"><!--4DVAR [saved_sets]name--></a></li><!--4DENDLOOP--></ul></li></ul></li>',
		},
		{
			label: "Invoices",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-book"></i><span>Invoices</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="invoices.shtml">Invoices</a></li><li><a href="invoice.shtml">Enter New Invoice</a></li><li><a href="recurring-invoices.shtml">Recurring Invoices</a></li><li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;"><strong>Sets</strong></span><i class="icon-chevron-down" style="padding-right: 13px;"></i></a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;"><!--#4DSCRIPT/Web_LoadInvoicesSets/--><!--4DLOOP  [saved_sets]--><li><a href="javascript:void(0)" onClick="__showInvoicesForm_LoadSet(\'<!--#4DHTMLVAR [saved_sets]name-->\',\'<!--#4DHTMLVAR [saved_sets]uuid-->\')"><!--4DVAR [saved_sets]name--></a></li><!--4DENDLOOP--></ul></li></ul></li>',
		},
		{
			label: "Analysis Account",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i> <img src="img/analysis-acount.png" width="22" height="22"  alt=""/></i><span>Analysis Account</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="analysisaccounts.shtml">List Analysis Account</a></li><li><a href="analysisaccount.shtml">Enter Analysis Account</a></li></ul></li>',
		},
		{
			label: "Analysis Ledger",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i> <img src="img/ledger.png" width="22" height="22"  alt=""/></i><span>Analysis Ledger</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="analysisledgers.shtml">List Analysis Ledger</a></li><li><a href="analysisledger.shtml">Enter Analysis Ledger</a></li></ul></li>',
		},
		{
			label: "Rsync Scripts",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i> <img src="img/script.png" width="22" height="22"  alt=""/></i><span>Rsync Scripts</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="projectscripts.shtml">List Rsync Scripts</a></li><li><a href="projectscript.shtml">Enter Rsync Script</a></li></ul></li>',
		},
		{
			label: "Receipts",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-reorder"></i><span>Receipts</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="receipts.shtml">List Receipts</a></li><li><a href="receipt.shtml">Enter New Receipt</a></li></ul></li> ',
		},
		{
			label: "VT CashBook Activities",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-book"></i><span>VT CashBook Activities</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="vtcashbooks.shtml">List Activities</a></li><li><a href="vtcashbook.shtml">Enter New Activity</a></li></ul></li>',
		},
		{
			label: "Purchase Invoices",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-book"></i><span>Purchase Invoices</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="purchase_invoices.shtml">List Purchase Invoices</a></li><li><a href="purchase_invoice.shtml">Enter New Purchase Invoice</a></li></ul></li>',
		},
		{
			label: "Payments",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-reorder"></i><span>Payments</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="payments.shtml">List Payments</a></li><li><a href="payment.shtml">Enter New Payment</a></li></ul></li>',
		},
		{
			label: "Leads",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-group"></i><span>Leads</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="leads.shtml">Leads</a></li><li><a href="lead.shtml">Enter New Lead</a></li><ul class="submenu"><li><a href="lead_contacts.shtml">Lead Contacts</a></li><li><a href="lead_contact.shtml">Enter New Lead Contact</a></li></ul><li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;"><strong>Sets</strong></span><i class="icon-chevron-down" style="padding-right: 13px;"></i></a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;"><!--#4DSCRIPT/Web_LoadLeadsSets/--><!--4DLOOP  [saved_sets]--><li><a href="javascript:void(0)" onClick="__showleadForm_LoadSet(\'<!--#4DHTMLVAR [saved_sets]name-->\', \'<!--#4DHTMLVAR [saved_sets]uuid-->\')"><!--4DVAR [saved_sets]name--></a></li><!--4DENDLOOP--></ul></li></ul></li>',
		},
		{
			label: "Products",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-file"></i><span>Products</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="products.shtml">Products</a></li><li><a href="product.shtml">Enter New Product</a></li></ul></li>',
		},
		{
			label: "Mileage",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-edit"></i><span>Mileage</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="travel_expenses.shtml">Travel Expense Sheet</a></li><li><a href="travel_expense.shtml">Enter New Travel Expense Sheet</a></li></ul></li>',
		},
		{
			label: "Holidays",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-tags"></i><span>Holidays</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="holidays.shtml">Holidays</a></li><li><a href="holiday_calender.shtml">Calendar View</a></li><li><a href="holiday.shtml">Request New Holiday</a></li></ul></li>',
		},
		{
			label: "Employees",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-group"></i><span>Employees</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="employees.shtml">Employees</a></li><li><a href="employeeholidays.shtml">Employees Holidays</a></li><li><a href="employee.shtml">Enter New Employee</a></li><li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><span style="margin-left: 1px;"><strong>Manager</strong></span><i class="icon-chevron-down" style="padding-right: 13px;"></i></a><ul class="submenu" style="padding-left: 15px;padding-bottom: 1px;list-style-type: none; border-bottom: 1px ; box-shadow: 0 0px 1px -1px;"><!--#4DSCRIPT/Web_LoadManager/--><!--4DLOOP  [Employees]--><li><a href="javascript:void(0)" onClick="__showEmployeeForm_Loadmanager(\'<!--#4DHTMLVAR [Employees]emp_first_name--> <!--#4DHTMLVAR [Employees]emp_last_name-->\',\'<!--#4DHTMLVAR [Employees]uuid-->\')"><!--#4DHTMLVAR [Employees]emp_first_name--> <!--#4DHTMLVAR [Employees]emp_last_name--></a></li><!--4DENDLOOP--><!--#4DSCRIPT/Web_LoadManager/restore--></ul></li></ul></li>',
		},
		{
			label: "Bank Enteries",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i><img src="img/bank-enteries.png" width="22" height="22"  alt=""/></i><span>Bank Enteries</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="bank_enteries.shtml">List Bank Enteries</a></li><li><a href="bank_entry.shtml">Enter New Bank Entry</a></li></ul></li>',
		},
		{
			label: "Admin System Activity Log Email queue",
			value: '<li><a class="dropdown-toggle" href="javascript:void(0)" onclick="toggle_left_submenu(this)"><i class="icon-share-alt"></i><span>Admin</span><i class="icon-chevron-down"></i></a><ul class="submenu"><li><a href="emailqueue.shtml">Email queue</a></li><li><a href="emailsend.shtml">New Mail</a></li><li><a href="system-activity.shtml">System Activity</a></li></ul></li>',
		}
	];
	}
	$( "#menu" ).autocomplete({
		minLength: 0,
		source: menu_details,
		 focus: function( event, ui ) {
			$( "#project" ).val( ui.item.label );
			return false;
		},
		suggest: function( items ) {
			var menu_val=$( "#menu" ).val();
			
			$( "#dashboard-menu" ).empty();
			var left_menu='<li><a href="index.shtml"><i><img src="img/home.png" alt=""/></i><span>Home</span></a></li>';
			for(var i=0; i<items.length; i++){
				var label = items[i].label;
				var str= label.search(menu_val);
				var value= items[i].value;
				if(str>0 && (label=="Customers Projects projects" || label=="IT inventory Servers Domain")){
					value = value.replace('<li>', '<li class="active">');
					value = value.replace('<ul class="submenu">', '<ul class="submenu active">');
				}
				var url = window.location.pathname;
				var filename = url.substring(url.lastIndexOf('/')+1);
				var searchLink= value.search(filename);
				if(searchLink>0){
					//value = value.replace('<li>', '<li class="active">');
					//value = value.replace('<ul class="submenu">', '<ul class="submenu active">');
					value = value.replace('<i class="icon-chevron-down"></i></a>', '<i class="icon-chevron-down"></i></a><div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>');
				}
				left_menu+=value;
			}
			$('#dashboard-menu').append(left_menu);
		}
	});
	
});

function toggle_left_submenu(id){
	
	var liparent = $(id).parent('li');
	var ulparent = liparent.find('.submenu');
	if(liparent.hasClass('active')){
		liparent.removeClass('active');
		ulparent.removeClass('active');
	}else{
		liparent.addClass('active');
		ulparent.addClass('active');
	}
	//if(ulparent==openedulparent){
		//var mainlink = liparent.children('.dropdown-toggle');
		//mainlink.after('<div class="pointer"><div class="arrow"></div><div class="arrow_border"></div></div>');
	//}
}