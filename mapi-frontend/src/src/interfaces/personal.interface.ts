export interface PersonalState {
  personal: Personal[];
  search: string;
  totalPages: number;
}

export interface Personal {
  id_personal: number;
  personal_names: string;
  personal_surnames: string;
  personal_document: string;
  personal_phone: string;
  personal_photo: string;
  technician_name: string;
  personal_technician: number;
  personal_salary: number;
}
