
import { InbountInt, InbountIntXML } from "../interface/inbountInt";
import { getInbountDatalevel } from "./common";

export const processInbountInt = async (data: InbountIntXML) => {
	const { NETLOGMESSAGE, NETLOGMESSAGE: { MESSAGE : { HEADER : { DATA }}}  } = data;
	const datalevel = await getInbountDatalevel(DATA?.DATALEVEL2?.DATA2);
	
	const NAVXML: InbountInt = {
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
		"sourcecompany": DATA.SOURCECOMPANY,
		"companytype": DATA.COMPANYTYPE,
		"createdate": DATA.CREATEDATE,
		"notes": DATA.NOTES,
		"hostorderid": DATA.HOSTORDERID,
		"documenttype": DATA.DOCUMENTTYPE,
		"expecteddate": DATA.EXPECTEDDATE,
		"receivedfrom": DATA.RECEIVEDFROM,
		"warehouse": DATA.WAREHOUSE,
		"companyname": DATA.COMPANYNAME,
		"receiveawb": DATA.RECEIVEAWB,
		"street1": DATA.STREET1,
		"street2": DATA.STREET2,
		"city": DATA.CITY,
		"state": DATA.STATE,
		"zip": DATA.ZIP,
		"contact1name": DATA.CONTACT1NAME,
		"contact2name": DATA.CONTACT2NAME,
		"contact1phone": DATA.CONTACT1PHONE,
		"contact2phone": DATA.CONTACT2PHONE,
		"contact1fax": DATA.CONTACT1FAX,
		"contact2fax": DATA.CONTACT2FAX,
		"contact1email": DATA.CONTACT1EMAIL,
		"contact2email": DATA.CONTACT2EMAIL,
		"contacttype": DATA.CONTACTTYPE,
		"datalevel2": datalevel.length > 0 ? datalevel : []
	};
	
	return { NAVXML };
}

export const createInboutXML = (data) => {

}