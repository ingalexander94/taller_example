export interface Operation {
  id_operation: number;
  system: string | null;
  code: string | null;
  operation_team: number;
  operation_component: string;
  operation_measure: number;
  operation_description: string;
  operation_technician: number | null;
  technician_code: string;
  operation_duration_hours: number | null;
  operation_duration_minutes: number | null;
  operation_maintenance_type: number | null;
  maintenance_type_name: string;
  operation_kilometres: number | null;
  operation_hours: number | null;
  operation_total: number | null;
  operation_models: ModelOperation[];
}

export interface MaintenanceType {
  id_maintenance_type: number;
  maintenance_type_name: string;
}

export interface TechnicianOperation {
  id_technician: number;
  technician_name: string;
  technician_code: string;
}

export interface ComponentOperation {
  type_component: string;
  id_component: number;
  component_code: string;
  component_name: string;
  hasSystems: boolean;
  systems: SystemComponent[];
}

export interface ModelOperation {
  id_model: number;
  model_code: string;
}

export interface SystemComponent {
  id_system: string | null;
  system_code: string | null;
  system_name: string | null;
}
