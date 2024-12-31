
import { ISkuInt, ISkuIntXML } from "../interface/skuint";
import { getSkuDatalevel } from "./common";

export const processSkuInt = async (data: ISkuIntXML) => {
	const { NETLOGMESSAGE, NETLOGMESSAGE: { MESSAGE : { HEADER : { DATA }}}  } = data;
	const datalevel = await getSkuDatalevel(DATA?.DATALEVEL2?.DATA2);
	
	const response: ISkuInt = {
		"messageid": NETLOGMESSAGE.MESSAGEID,
		"messagetype": NETLOGMESSAGE.MESSAGETYPE,
		"sourceid": NETLOGMESSAGE.SOURCEID,
		"senttimestamp": NETLOGMESSAGE.SENTTIMESTAMP,
		"clientid": NETLOGMESSAGE.CLIENTID,
		"clientsession": NETLOGMESSAGE.CLIENTSESSION,		
		"consignee": DATA.CONSIGNEE,
		"sku": DATA.SKU,
		"skudesc": DATA.SKUDESC,
		"skushortdesc": DATA.SKUSHORTDESC,
		"manufacturersku": DATA.MANUFACTURERSKU,
		"vendorsku": DATA.VENDORSKU,
		"othersku": DATA.OTHERSKU,
		"skugroup": DATA.SKUGROUP,
		"classname": DATA.CLASSNAME,
		"status": DATA.STATUS,
		"inventory": DATA.INVENTORY,
		"newsku": DATA.NEWSKU,
		"initialstatus": DATA.INITIALSTATUS,
		"velocity": DATA.VELOCITY,
		"onsitemin": DATA.ONSITEMIN,
		"onsitemax": DATA.ONSITEMAX,
		"lastcyclecount": DATA.LASTCYCLECOUNT,
		"cyclecountint": DATA.CYCLECOUNTINT,
		"lowlimitcount": DATA.LOWLIMITCOUNT,
		"preflocation": DATA.PREFLOCATION,
		"prefputregion": DATA.PREFPUTREGION,
		"unitprice": DATA.UNITPRICE,
		"picture": DATA.PICTURE,
		"picksortorder": DATA.PICKSORTORDER,
		"defaultuom": DATA.DEFAULTUOM,
		"editdate": DATA.EDITDATE,
		"edituser": DATA.EDITUSER,
		"overpickpct": DATA.OVERPICKPCT,
		"overreceivepct": DATA.OVERRECEIVEPCT,
		"jobtype": DATA.JOBTYPE,
		"rohoscompatiable": DATA.RoHoSCOMPATIABLE,
		"hsc": DATA.HSC,
		"countryoforigin": DATA.COUNTRYOFORIGIN,
		"weight": DATA.WEIGHT,
		"height": DATA.HEIGHT,
		"depth": DATA.DEPTH,
		"width": DATA.WIDTH,
		"volume": DATA.VOLUME,
		"flammable": DATA.FLAMMABLE,
		"shelflife": DATA.SHELFLIFE,
		"attribute2": DATA.ATTRIBUTE2,
		"attribute3": DATA.ATTRIBUTE3,
		"attribute4": DATA.ATTRIBUTE4,
		"currency": DATA.CURRENCY,
		"exported": DATA.EXPORTED,
		"datalevel2": datalevel
	};
	
	return { response, datalevel };
}