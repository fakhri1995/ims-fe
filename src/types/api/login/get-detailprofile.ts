export interface IGetDetailProfile {
  success: boolean;
  data: GetDetailProfileData;
  status: number;
}

export interface GetDetailProfileData {
  id: number;
  email: string;
  name: string;
  nip: string;
  profile_image: string;
  phone_number: string;
  role: number;
  position: string;
  created_time: Date;
  features: any[];
  company: Company;
  groups: Group[];
  roles: Group[];
}

export interface Company {
  id: number;
  name: string;
  image_logo: string;
  phone_number: string;
  address: string;
  role: number;
  is_enabled: number;
}

export interface Group {
  id: number;
  name: string;
}
