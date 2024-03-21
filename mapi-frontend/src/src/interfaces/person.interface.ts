export interface PersonState {
  list_persons: Person[];
  person: Person;
  search: string;
  totalPagesPerson: number;
}

export interface PersonResponse {
  total: number;
  list_persons: Person[];
  person: Person;
}

export interface Person {
  id_user: number;
  user_photo: string;
  user_names: string;
  user_surnames: string;
  user_salary: number;
  user_position: string;
  user_document: string;
  user_phone: string;
}
