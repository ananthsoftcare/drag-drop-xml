export interface OutbountIntXML {
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
					"REFERENCEORD": String,
					"TARGETCOMPANY": Number,
					"COMPANYTYPE": String,
					"CREATEDATE": String,
					"NOTES": String,
					"REQUESTEDDATE": String,
					"ROUTINGSET": String,
					"ROUTE": Number,
					"ORDERPRIORITY": String,
					"HOSTORDERID": String,
					"EXPECTEDDATE": String,
					"SHIPTO": String,
					"COMPANYNAME": String,
					"CARRIER": String,
					"HANDCARRY": String,
					"SPECIALINSTRUCTION": String,
					"BILLTOCOMPANY": Number,
					"BILLTOCOMPANYNAME": String,
					"BILLTOTAXID": Number,
					"BILLTOCONTACTID": String,
					"BILLTOSTREET1": String,
					"BILLTOSTREET2": String,
					"BILLTOCITY": String,
					"BILLTOSTATE": String,
					"BILLTOZIP": Number,
					"BILLTOCONTACT1NAME": String,
					"BILLTOCONTACT1PHONE": String,
					"BILLTOCONTACT1FAX": String,
					"BILLTOCONTACT1EMAIL": String,
					"BILLTOCOUNTRY": String,
					"BILLTOATTRIBUTE": String,
					"SHIPTOTAXID": 0,
					"SHIPTOSTREET1": String,
					"SHIPTOSTREET2": String,
					"SHIPTOCITY": String,
					"SHIPTOSTATE": String,
					"SHIPTOZIP": Number,
					"SHIPTOCONTACT1NAME": String,
					"SHIPTOCONTACT1PHONE": Number,
					"SHIPTOCONTACT1FAX": String,
					"SHIPTOCONTACT1EMAIL": String,
					"SHIPTOCOUNTRY": String,
					"SHIPTOATTRIBUTE": String,
					"INCOTERMS": String,
					"VAT": String,
					"DATALEVEL2": {
						"DATA2": {
							"CONSIGNEE": String,
							"ORDERID": String,
							"ORDERLINE": Number,
							"WAREHOUSE": String,
							"REQUESTEDDATE": String,
							"REFERENCEORDLINE": Number,
							"SKU": String,
							"INVENTORYSTATUS": String,
							"QTYORIGINAL": Number,
							"QTYMODIFIED": Number,
							"SERIAL": String,
							"BATCH": String,
							"VALUE": Number,
							"CURRENCY": String
						}[]
					}
				}
			}
	  	}
	}
}

export interface OutbountInt {
		"messageid": Number,
		"messagetype": String
		"sourceid": String
		"senttimestamp": String
		"clientid": String
		"clientsession": Number
		"consignee": String
		"orderid": String
		"ordertype": String
		"referenceord": String
		"targetcompany": Number,
		"companytype": String
		"createdate": String
		"notes": String
		"requesteddate": String
		"routingset": String
		"route": Number,
		"orderpriority": String
		"hostorderid": String
		"expecteddate": String
		"shipto": String
		"companyname": String
		"carrier": String
		"handcarry": String
		"specialinstruction": String
		"billtocompany": Number,
		"billtocompanyname": String
		"billtotaxid": Number,
		"billtocontactid": String
		"billtostreet1": String
		"billtostreet2": String
		"billtocity": String
		"billtostate": String
		"billtozip": Number,
		"billtocontact1name": String
		"billtocontact1phone": String
		"billtocontact1fax": String
		"billtocontact1email": String
		"billtocountry": String
		"billtoattribute": String
		"shiptotaxid": 0,
		"shiptostreet1": String
		"shiptostreet2": String
		"shiptocity": String
		"shiptostate": String
		"shiptozip": Number,
		"shiptocontact1name": String
		"shiptocontact1phone": Number,
		"shiptocontact1fax": String
		"shiptocontact1email": String
		"shiptocountry": String
		"shiptoattribute": String
		"incoterms": String
		"vat": String
		"datalevel2": any
}

// "datalevel2": {
// 	"consignee": String
// 	"orderid": String
// 	"orderline": Number,
// 	"warehouse": String
// 	"requesteddate": String
// 	"referenceordline": Number,
// 	"sku": String
// 	"inventorystatus": String
// 	"qtyoriginal": Number,
// 	"qtymodified": Number,
// 	"serial": String
// 	"batch": String
// 	"value": Number,
// 	"currency": String
// }[]	