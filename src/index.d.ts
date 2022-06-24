interface RoleDoctorInfo {
  type: 'doctor'
  specialization: string;
  experience: number;
  salary: number;
  certificates: string[];
  consultations: Consultations[];
}

interface RolePatientInfo {
  type: 'patient'
  deviceId: number | null;
  hasDeviceConnected: boolean;
  weight: number;
  height: number;
  covid: boolean;
  smoking: boolean;
  hypertension: boolean;
  diabetes: boolean;
  otherDiseases: string;
  consultants: Consultations[];
}

interface Consultations {
  id: number,
  doctor_id: number,
  patient_id: number,
  status: 'pending' | 'accepted',
  created_at: string,
  updated_at: string,
  patientInfo: {
    id: number;
    name: string;
    profilePic?: string;
  }
}