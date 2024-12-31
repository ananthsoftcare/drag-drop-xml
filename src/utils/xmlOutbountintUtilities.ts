
import { OutbountInt, OutbountIntXML } from "../interface/outboundInt";
import { getOutbountDatalevel } from "./common";

export const processOutbountInt = async (data: OutbountIntXML) => {
	const { NETLOGMESSAGE, NETLOGMESSAGE: { MESSAGE : { HEADER : { DATA }}}  } = data;
	const datalevel = await getOutbountDatalevel(DATA?.DATALEVEL2?.DATA2);
	
	const response: OutbountInt = {
		"messageid": NETLOGMESSAGE.MESSAGEID,
		"messagetype": NETLOGMESSAGE.MESSAGETYPE,
		"sourceid": NETLOGMESSAGE.SOURCEID,
		"senttimestamp": NETLOGMESSAGE.SENTTIMESTAMP,
		"clientid": NETLOGMESSAGE.CLIENTID,
		"clientsession": NETLOGMESSAGE.CLIENTSESSION,		
		"consignee": DATA.CONSIGNEE,
		"orderid": DATA.ORDERID,
		"ordertype": DATA.ORDERTYPE,
		"referenceord": DATA.REFERENCEORD,
		"targetcompany": DATA.TARGETCOMPANY,
		"companytype": DATA.COMPANYTYPE,
		"createdate": DATA.CREATEDATE,
		"notes": DATA.NOTES,
		"requesteddate": DATA.REQUESTEDDATE,
		"routingset": DATA.ROUTINGSET,
		"route": DATA.ROUTE,
		"orderpriority": DATA.ORDERPRIORITY,
		"hostorderid": DATA.HOSTORDERID,
		"expecteddate": DATA.EXPECTEDDATE,
		"shipto": DATA.SHIPTO,
		"companyname": DATA.COMPANYNAME,
		"carrier": DATA.CARRIER,
		"handcarry": DATA.HANDCARRY,
		"specialinstruction": DATA.SPECIALINSTRUCTION,
		"billtocompany": DATA.BILLTOCOMPANY,
		"billtocompanyname": DATA.BILLTOCOMPANYNAME,
		"billtotaxid": DATA.BILLTOTAXID,
		"billtocontactid": DATA.BILLTOCONTACTID,
		"billtostreet1": DATA.BILLTOSTREET1,
		"billtostreet2": DATA.BILLTOSTREET2,
		"billtocity": DATA.BILLTOCITY,
		"billtostate": DATA.BILLTOSTATE,
		"billtozip": DATA.BILLTOZIP,
		"billtocontact1name": DATA.BILLTOCONTACT1NAME,
		"billtocontact1phone": DATA.BILLTOCONTACT1PHONE,
		"billtocontact1fax": DATA.BILLTOCONTACT1FAX,
		"billtocontact1email": DATA.BILLTOCONTACT1EMAIL,
		"billtocountry": DATA.BILLTOCOUNTRY,
		"billtoattribute": DATA.BILLTOATTRIBUTE,
		"shiptotaxid": DATA.SHIPTOTAXID,
		"shiptostreet1": DATA.SHIPTOSTREET1,
		"shiptostreet2": DATA.SHIPTOSTREET2,
		"shiptocity": DATA.SHIPTOCITY,
		"shiptostate": DATA.SHIPTOSTATE,
		"shiptozip": DATA.SHIPTOZIP,
		"shiptocontact1name": DATA.SHIPTOCONTACT1NAME,
		"shiptocontact1phone": DATA.SHIPTOCONTACT1PHONE,
		"shiptocontact1fax": DATA.SHIPTOCONTACT1FAX,
		"shiptocontact1email": DATA.SHIPTOCONTACT1EMAIL,
		"shiptocountry": DATA.SHIPTOCOUNTRY,
		"shiptoattribute": DATA.SHIPTOATTRIBUTE,
		"incoterms": DATA.INCOTERMS,
		"vat": DATA.VAT,
		"datalevel2": datalevel
	};
	
	return { response, datalevel };
}