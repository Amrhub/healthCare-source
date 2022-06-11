// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

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