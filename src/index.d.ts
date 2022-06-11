interface RolePatientInfo {
  deviceId: number | null;
  hasDeviceConnected: boolean;
  weight: number;
  height: number;
  covid: boolean;
  smoking: boolean;
  hypertension: boolean;
  diabetes: boolean;
  otherDiseases: string;
}
