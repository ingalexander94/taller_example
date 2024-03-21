export interface UIState {
  checking: boolean;
  step: number;
  email: string;
  code: string;
  refreshTechnicians: boolean;
}

export interface RouteUI {
  path: string;
  title: string;
  icon: any;
}
