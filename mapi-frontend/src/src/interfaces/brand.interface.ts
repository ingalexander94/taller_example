export interface Brand {
  id_brand: number;
  brand_code: string;
  brand_name: string;
  brand_team: number;
  brand_models: Model[];
}

export interface Model {
  id_model: number;
  model_code: string;
  model_name: string;
  model_init_year: number | null;
  model_final_year: number | null;
  model_engine: string;
  model_transmission: string;
  model_suspension: string;
  model_rear_bridge: string;
  model_application: string;
  model_brand: number;
}
export interface InitialValuesBrand {
  brands: Brand[];
}

export interface Component {
  id_component: number;
  component_code: string;
  component_name: string;
  component_team: number;
  component_systems: System[];
}

export interface System {
  id_system: number;
  system_code: string;
  system_name: string;
  system_component: number;
}

export interface InitialValuesComponent {
  components: Component[];
}
