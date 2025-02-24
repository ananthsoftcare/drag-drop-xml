import { config } from "../../config";

export const getXmlType = (type: string) => {
	const types = {
		inbound: config.xmlType.INBOUND,
		outbound: config.xmlType.OUTBOUND,
		sku: config.xmlType.SKU,
		warehouse: config.xmlType.WAREHOUSE,
		packingslip: config.xmlType.PACKINGSLIP
	}
	return types[type];
}

export const generateFileName = (type, message_id, order_id) => {
	const now = new Date();
	// Format the date as YYYY-MM-DD
	const date = now.toISOString().split('T')[0].split('.')[0].replace(/-/g, '');
  	// Format the time as HH-MM-SS
	const time = now.toISOString().split('T')[1].split('.')[0].replace(/:/g, '');

	if(type === config.xmlType.INBOUND) {
		return `CS_ReturnOrder_${date}_${time}_${message_id}_${order_id}`;
	} else if (type === config.xmlType.OUTBOUND) {
		return `CS_SalesOrder_${date}_${time}_${message_id}_${order_id}`;
	}
	return `${date}_${time}_${message_id}_${order_id}`;
}