/**
 * Canonical vehicle payload for every provider.
 * Nested objects always present; unknown values are null (never invented).
 */

export function emptyOwnership() {
  return {
    ownerName: null,
    registeredRto: null,
    vehicleClass: null,
    fuelType: null,
    fuelNorms: null,
  };
}

export function emptyImportantDates() {
  return {
    registrationDate: null,
    fitnessUpto: null,
    vehicleAge: null,
    pollutionUpto: null,
    insuranceUpto: null,
    insuranceExpiringIn: null,
  };
}

export function emptyOtherInfo() {
  return {
    registrationNo: null,
    unloadedWeightKg: null,
    numberOfSeats: null,
    rcStatus: null,
  };
}

export function emptyVehicleData(registrationNumber = null) {
  return {
    registrationNumber,
    makeAndModel: null,
    ownerNameMasked: null,
    insurance: {
      expiryDate: null,
      status: "unknown",
    },
    rto: {
      code: null,
      registeredOffice: null,
      state: null,
      website: null,
    },
    ownership: emptyOwnership(),
    importantDates: emptyImportantDates(),
    otherInfo: emptyOtherInfo(),
    meta: {
      source: "",
      fetchedAt: "",
      unavailableFields: [],
    },
  };
}

function mergeObj(base, partial) {
  if (partial == null || typeof partial !== "object") return { ...base };
  return { ...base, ...partial };
}

/** Map HTML label bags → ownership schema. */
export function mapOwnershipFromLabels(fields = {}) {
  return {
    ownerName: fields["Owner Name"] ?? fields.ownerName ?? null,
    registeredRto: fields["Registered RTO"] ?? fields.registeredRto ?? null,
    vehicleClass: fields["Vehicle Class"] ?? fields.vehicleClass ?? null,
    fuelType: fields["Fuel Type"] ?? fields.fuelType ?? null,
    fuelNorms: fields["Fuel Norms"] ?? fields.fuelNorms ?? null,
  };
}

export function mapImportantDatesFromLabels(fields = {}) {
  return {
    registrationDate: fields["Registration Date"] ?? fields.registrationDate ?? null,
    fitnessUpto: fields["Fitness Upto"] ?? fields.fitnessUpto ?? null,
    vehicleAge: fields["Vehicle Age"] ?? fields.vehicleAge ?? null,
    pollutionUpto: fields["Pollution Upto"] ?? fields.pollutionUpto ?? null,
    insuranceUpto: fields["Insurance Upto"] ?? fields.insuranceUpto ?? null,
    insuranceExpiringIn:
      fields["Insurance Expiring In"] ?? fields.insuranceExpiringIn ?? null,
  };
}

export function mapOtherInfoFromLabels(fields = {}) {
  return {
    registrationNo: fields["Registration No."] ?? fields["Registration No"] ?? fields.registrationNo ?? null,
    unloadedWeightKg:
      fields["Unloaded Weight (Kg)"] ?? fields.unloadedWeightKg ?? null,
    numberOfSeats: fields["Number of Seats"] ?? fields.numberOfSeats ?? null,
    rcStatus: fields["RC Status"] ?? fields.rcStatus ?? null,
  };
}

/**
 * List leaf paths that are still null (for clear client-facing field errors).
 */
export function collectUnavailableFields(data) {
  const out = [];
  const push = (field, reason) => {
    out.push({
      field,
      code: "field_unavailable",
      message: reason,
    });
  };

  if (data.makeAndModel == null) {
    push("makeAndModel", "Not present in provider response");
  }
  if (data.ownerNameMasked == null) {
    push("ownerNameMasked", "Not present in provider response");
  }
  if (data.insurance?.expiryDate == null) {
    push("insurance.expiryDate", "Not present in provider response");
  }

  for (const [k, v] of Object.entries(data.rto || {})) {
    if (v == null) push(`rto.${k}`, "Not present in provider response");
  }
  for (const [k, v] of Object.entries(data.ownership || emptyOwnership())) {
    if (v == null) {
      push(`ownership.${k}`, "Not available from current provider / public HTML");
    }
  }
  for (const [k, v] of Object.entries(data.importantDates || emptyImportantDates())) {
    if (v == null) {
      push(`importantDates.${k}`, "Not available from current provider / public HTML");
    }
  }
  for (const [k, v] of Object.entries(data.otherInfo || emptyOtherInfo())) {
    if (v == null) {
      push(`otherInfo.${k}`, "Not available from current provider / public HTML");
    }
  }
  return out;
}

export function normalizeVehicleData(partial = {}, { source = "", fetchedAt = "" } = {}) {
  const base = emptyVehicleData(partial.registrationNumber ?? null);
  const ownership =
    partial.ownership === null
      ? emptyOwnership()
      : mergeObj(emptyOwnership(), partial.ownership);
  const importantDates =
    partial.importantDates === null
      ? emptyImportantDates()
      : mergeObj(emptyImportantDates(), partial.importantDates);
  const otherInfo =
    partial.otherInfo === null
      ? emptyOtherInfo()
      : mergeObj(emptyOtherInfo(), partial.otherInfo);

  const data = {
    registrationNumber: partial.registrationNumber ?? base.registrationNumber,
    makeAndModel: partial.makeAndModel ?? null,
    ownerNameMasked: partial.ownerNameMasked ?? null,
    insurance: mergeObj(base.insurance, partial.insurance),
    rto: mergeObj(base.rto, partial.rto),
    ownership,
    importantDates,
    otherInfo,
    meta: {
      source: partial.meta?.source ?? source ?? "",
      fetchedAt: partial.meta?.fetchedAt ?? fetchedAt ?? new Date().toISOString(),
      unavailableFields: [],
    },
  };

  data.meta.unavailableFields = collectUnavailableFields(data);
  return data;
}
