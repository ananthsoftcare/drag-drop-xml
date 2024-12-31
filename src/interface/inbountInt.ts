export interface InbountIntXML {
	"NETLOGMESSAGE": {
	  "MESSAGEID": Number,
	  "MESSAGETYPE": String,
	  "SOURCEID": String,
	  "SENTTIMESTAMP": String,
	  "CLIENTID": String,
	  "CLIENTSESSION": Number,
	  "MESSAGE": {
		"HEADER": {
		  "DATA": {
			"CONSIGNEE": String,
			"ORDERID": String,
			"ORDERTYPE": String,
			"REFERENCEORD": Number,
			"SOURCECOMPANY": String,
			"COMPANYTYPE": String,
			"CREATEDATE": String,
			"NOTES": String,
			"HOSTORDERID": String,
			"DOCUMENTTYPE": String,
			"EXPECTEDDATE": String,
			"RECEIVEDFROM": String,
			"WAREHOUSE": String,
			"COMPANYNAME": String,
			"RECEIVEAWB": String,
			"STREET1": String,
			"STREET2": String,
			"CITY": String,
			"STATE": String,
			"ZIP": String,
			"CONTACT1NAME": String,
			"CONTACT2NAME": String,
			"CONTACT1PHONE": String,
			"CONTACT2PHONE": String,
			"CONTACT1FAX": String,
			"CONTACT2FAX": String,
			"CONTACT1EMAIL": String,
			"CONTACT2EMAIL": String,
			"CONTACTTYPE": String,
			"DATALEVEL2": {
			  "DATA2": 
				{
				  "CONSIGNEE": String,
				  "ORDERID": String,
				  "ORDERLINE": Number,
				  "REFERENCEORDLINE": Number,
				  "EXPECTEDDATE": String,
				  "SKU": String,
				  "QTYORDERED": Number,
				  "QTYADJUSTED": Number,
				  "INVENTORYSTATUS": String,
				  "SERIAL": String,
				  "BATCH": String,
				  "EXPIRYDATE": String
				}[]			  
			}
		  }
		}
	  }
	}
}

export interface InbountInt {
	"messageid": Number,
	"messagetype": String,
	"sourceid": String,
	"senttimestamp": String,
	"clientid": String,
	"clientsession": Number,
	"consignee": String,
	"orderid": String,
	"ordertype": String,
	"referenceord": Number,
	"sourcecompany": String,
	"companytype": String,
	"createdate": String,
	"notes": String,
	"hostorderid": String,
	"documenttype": String,
	"expecteddate": String,
	"receivedfrom": String,
	"warehouse": String,
	"companyname": String,
	"receiveawb": String,
	"street1": String,
	"street2": String,
	"city": String,
	"state": String,
	"zip": String,
	"contact1name": String,
	"contact2name": String,
	"contact1phone": String,
	"contact2phone": String,
	"contact1fax": String,
	"contact2fax": String,
	"contact1email": String,
	"contact2email": String,
	"contacttype": String,
	"datalevel2": {
		"consignee": String,
		"orderid": String,
		"orderline": Number,
		"referenceordline": Number,
		"expecteddate": String,
		"sku": String,
		"qtyordered": Number,
		"qtyadjusted": Number,
		"inventorystatus": String,
		"serial": String,
		"batch": String,
		"expirydate": String
	}[]
}

export interface DATALEVEL2 {
	"consignee": String,
	"orderid": String,
	"orderline": Number,
	"referenceordline": Number,
	"expecteddate": String,
	"sku": String,
	"qtyordered": Number,
	"qtyadjusted": Number,
	"inventorystatus": String,
	"serial": String,
	"batch": String,
	"expirydate": String
}[]

// export interface InbountInt {
//         "messageid": Number,
//         "messagetype": String,
//         "sourceid": String,
//         "senttimestamp": String,
//         "clientid": String,
//         "clientsession": Number,
//         "message": {
//             "header": {
//                 "data": {
//                     "consignee": String,
//                     "orderid": String,
//                     "ordertype": String,
//                     "referenceord": Number,
//                     "sourcecompany": String,
//                     "companytype": String,
//                     "createdate": String,
//                     "notes": String,
//                     "hostorderid": String,
//                     "documenttype": String,
//                     "expecteddate": String,
//                     "receivedfrom": String,
//                     "warehouse": String,
//                     "companyname": String,
//                     "receiveawb": String,
//                     "street1": String,
//                     "street2": String,
//                     "city": String,
//                     "state": String,
//                     "zip": String,
//                     "contact1name": String,
//                     "contact2name": String,
//                     "contact1phone": String,
//                     "contact2phone": String,
//                     "contact1fax": String,
//                     "contact2fax": String,
//                     "contact1email": String,
//                     "contact2email": String,
//                     "contacttype": String,
//                     "datalevel2": {
//                         "data2": 
//                             {
//                                 "consignee": String,
//                                 "orderid": String,
//                                 "orderline": Number,
//                                 "referenceordline": Number,
//                                 "expecteddate": String,
//                                 "sku": String,
//                                 "qtyordered": Number,
//                                 "qtyadjusted": Number,
//                                 "inventorystatus": String,
//                                 "serial": String,
//                                 "batch": String,
//                                 "expirydate": String
//                             }[]                        
//                     }
//                 }
//             }
//         }
// }