export const getInbountDatalevel = async DATA => {
	let datalevel;

	if (DATA && DATA[0]) {
		datalevel = await DATA?.map(data => {
			return {
				"consignee": data.CONSIGNEE,
				"orderid": data.ORDERID,
				"orderline": data.ORDERLINE,
				"referenceordline": data.REFERENCEORDLINE,
				"expecteddate": data.EXPECTEDDATE,
				"sku": data.SKU,
				"qtyordered": data.QTYORDERED,
				"qtyadjusted": data.QTYADJUSTED,
				"inventorystatus": data.INVENTORYSTATUS,
				"serial": data.SERIAL,
				"batch": data.BATCH,
				"expirydate": data.EXPIRYDATE
			}
		})
	} else {
		datalevel = [{
			"consignee": DATA['CONSIGNEE'],
			"orderid": DATA['ORDERID'],
			"orderline": DATA['ORDERLINE'],
			"referenceordline": DATA['REFERENCEORDLINE'],
			"expecteddate": DATA['EXPECTEDDATE'],
			"sku": DATA['SKU'],
			"qtyordered": DATA['QTYORDERED'],
			"qtyadjusted": DATA['QTYADJUSTED'],
			"inventorystatus": DATA['INVENTORYSTATUS'],
			"serial": DATA['SERIAL'],
			"batch": DATA['BATCH'],
			"expirydate": DATA['EXPIRYDATE']
		}]
	}

	return datalevel;
}

export const getOutbountDatalevel = async DATA => {
	let datalevel;

	if (DATA && DATA[0]) {
		datalevel = await DATA?.map(data => {
			return {
				"consignee": data.CONSIGNEE,
				"orderid": data.ORDERID,
				"orderline": data.ORDERLINE,
				"warehouse": data.WAREHOUSE,
				"requesteddate": data.REQUESTEDDATE,
				"referenceordline": data.REFERENCEORDLINE,
				"sku": data.SKU,
				"inventorystatus": data.INVENTORYSTATUS,
				"qtyoriginal": data.QTYORIGINAL,
				"qtymodified": data.QTYMODIFIED,
				"serial": data.SERIAL,
				"batch": data.BATCH,
				"value": data.VALUE,
				"currency": data.CURRENCY
			}
		})
	} else {
		datalevel = [{
			"consignee": DATA?.['CONSIGNEE'],
			"orderid": DATA?.['ORDERID'],
			"orderline": DATA?.['ORDERLINE'],
			"warehouse": DATA?.['WAREHOUSE'],
			"requesteddate": DATA?.['REQUESTEDDATE'],
			"referenceordline": DATA?.['REFERENCEORDLINE'],
			"sku": DATA?.['SKU'],
			"inventorystatus": DATA?.['INVENTORYSTATUS'],
			"qtyoriginal": DATA?.['QTYORIGINAL'],
			"qtymodified": DATA?.['QTYMODIFIED'],
			"serial": DATA?.['SERIAL'],
			"batch": DATA?.['BATCH'],
			"value": DATA?.['VALUE'],
			"currency": DATA?.['CURRENCY']
		}]
	}

	return datalevel;
}

export const getSkuDatalevel = async DATA => {
	let datalevel;

	if (DATA && DATA[0]) {
		datalevel = await DATA?.map(data => {
			return {
				"consignee": data.CONSIGNEE,
				"sku": data.SKU,
				"uom": data.UOM,
				"eanupc": data.EANUPC,
				"grossweight": data.GROSSWEIGHT,
				"netweight": data.NETWEIGHT,
				"length": data.LENGTH,
				"width": data.WIDTH,
				"height": data.HEIGHT,
				"volume": data.VOLUME,
				"loweruom": data.LOWERUOM,
				"unitspermeasure": data.UNITSPERMEASURE,
				"unitsperlowestuom": data.UNITSPERLOWESTUOM,
				"shippable": data.SHIPPABLE,
				"editdate": data.EDITDATE,
				"edituser": data.EDITUSER
			}
		})
	} else {
		datalevel = [{
			"consignee": DATA['CONSIGNEE'],
			"sku": DATA['SKU'],
			"uom": DATA['UOM'],
			"eanupc": DATA['EANUPC'],
			"grossweight": DATA['GROSSWEIGHT'],
			"netweight": DATA['NETWEIGHT'],
			"length": DATA['LENGTH'],
			"width": DATA['WIDTH'],
			"height": DATA['HEIGHT'],
			"volume": DATA['VOLUME'],
			"loweruom": DATA['LOWERUOM'],
			"unitspermeasure": DATA['UNITSPERMEASURE'],
			"unitsperlowestuom": DATA['UNITSPERLOWESTUOM'],
			"shippable": DATA['SHIPPABLE'],
			"editdate": DATA['EDITDATE'],
			"edituser": DATA['EDITUSER']
		}]
	}

	return datalevel;
}

export const getXmlType = (type: string) => {
	const types = {
		inbount: 'inbount',
		outbount: 'outbount'
	}
	return types[type];
}
