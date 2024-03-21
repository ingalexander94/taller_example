export interface TechnicianState {
    list_technician: Technician[];
    technician: Technician;
    search: string;
    totalPages: number;
    showEmpty: boolean;
    last_page: number;
}

export interface TechnicianResponse {
    total: number,
    current_page: number,
    last_page: number,
    technician: Technician[],
}

export interface Technician {
    id_technician: number ,
    technician_name: string,
    technician_code: string,
    technician_description: string | null,
    technician_education: string | null,
    technician_salary: string | null,
    technician_icon: string | null,
}