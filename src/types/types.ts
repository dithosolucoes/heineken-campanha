
export type UserRole = 'pdv' | 'admin' | 'superadmin';

export interface User {
  id: string;
  role: UserRole;
  name?: string;
  cnpj?: string;
  email?: string;
}

export interface Campaign {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  rules: string;
  status: 'active' | 'inactive' | 'completed';
  pdvIds: string[];
}

export type UploadCategory = 
  | 'check_stand' 
  | 'cooler' 
  | 'island' 
  | 'shelf' 
  | 'window' 
  | 'other';

export interface UploadStatus {
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
}

export interface PhotoUpload {
  id: string;
  pdvId: string;
  pdvName?: string;
  campaignId: string;
  category: UploadCategory;
  photoUrl: string;
  observation?: string;
  createdAt: Date;
  status: UploadStatus;
}

export interface PDV {
  id: string;
  name: string;
  cnpj: string;
  city: string;
  state: string;
  campaignIds: string[];
}

export interface DashboardStats {
  totalCampaigns: number;
  totalPdvs: number;
  totalUploads: number;
  approvedUploads: number;
  rejectedUploads: number;
  pendingUploads: number;
}
