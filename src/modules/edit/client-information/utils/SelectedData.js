/**
 * Maps the raw data from the grid row and related lists into the full selectedData object.
 * @param prev The previous selectedData state.
 * @param rowData The row data clicked in the grid.
 * @param atmCashPrefixes The sysPrinsPrefixes list.
 * @param clientEmails The clientEmail list.
 * @param reportOptions The reportOptions list.
 * @param sysPrinsList The sysPrins list.
 * @returns Updated selectedData object.
 */
export function mapRowDataToSelectedData(prev, rowData, atmCashPrefixes, clientEmails, reportOptions, sysPrinsList) {
    const matchedSysPrin = sysPrinsList.find(sp =>
        sp?.id?.sysPrin === rowData.sysPrin || sp?.sysPrin === rowData.sysPrin
    );

    const specificInvalidDelivAreas = (matchedSysPrin?.invalidDelivAreas || []).map(area => ({
        ...area,
        sysPrin: matchedSysPrin?.id?.sysPrin || area.sysPrin,
    }));

    return {
        ...prev,
        ...rowData,
        sysPrinsPrefixes: atmCashPrefixes,
        clientEmail: clientEmails,
        reportOptions: reportOptions,
        sysPrins: sysPrinsList,
        sysPrin: rowData.sysPrin || '',
        invalidDelivAreas: specificInvalidDelivAreas,
        notes: rowData.notes || matchedSysPrin?.notes || '',
        statA: rowData.statA || matchedSysPrin?.statA || '',
        statB: rowData.statB || matchedSysPrin?.statB || '',
        statC: rowData.statC || matchedSysPrin?.statC || '',
        statE: rowData.statE || matchedSysPrin?.statE || '',
        statF: rowData.statF || matchedSysPrin?.statF || '',
        statI: rowData.statI || matchedSysPrin?.statI || '',
        statL: rowData.statL || matchedSysPrin?.statL || '',
        statU: rowData.statU || matchedSysPrin?.statU || '',
        statD: rowData.statD || matchedSysPrin?.statD || '',
        statO: rowData.statO || matchedSysPrin?.statO || '',
        statX: rowData.statX || matchedSysPrin?.statX || '',
        statZ: rowData.statZ || matchedSysPrin?.statZ || '',
        special: rowData.special || matchedSysPrin?.special || '',
        pinMailer: rowData.pinMailer || matchedSysPrin?.pinMailer || '',
        destroyStatus: rowData.destroyStatus || matchedSysPrin?.destroyStatus || '',
        custType: rowData.custType || matchedSysPrin?.custType || '',
        returnStatus: rowData.returnStatus || matchedSysPrin?.returnStatus || '',
        addrFlag: rowData.addrFlag || matchedSysPrin?.addrFlag || '',
        astatRch: rowData.astatRch || matchedSysPrin?.astatRch || '',
        active: rowData.active || matchedSysPrin?.active || '',
        nm13: rowData.nm13 || matchedSysPrin?.nm13 || '',
    };
}

export const defaultSelectedData = {
  client: '',
  name: '',
  address: '',
  billingSp: '',
  atmCashRule: '',
  notes: '',
  special: '',
  pinMailer: '',
  destroyStatus: '',
  custType: '',
  returnStatus: '',
  addrFlag: '',
  astatRch: '',
  active: '',
  nm13: '',
  sysPrinsPrefixes: [],
  clientEmail: [],
  reportOptions: [],
  sysPrins: [],
  sysPrin: '',
  invalidDelivAreas: [],
  statA: '',
  statB: '',
  statC: '',
  statE: '',
  statF: '',
  statI: '',
  statL: '',
  statU: '',
  statD: '',
  statO: '',
  statX: '',
  statZ: '',
};
