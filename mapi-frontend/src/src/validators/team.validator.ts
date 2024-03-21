import * as Yup from "yup";

interface InitialStateTeam {
  id_team: number;
  team_name: string;
}

export class TeamValidatorForm {
  static initialState: InitialStateTeam = {
    id_team: 0,
    team_name: "",
  };

  static validatorSchemaTeam = Yup.object({
    team_name: Yup.string()
      .trim()
      .required("El nombre del equipo es necesario"),
  });
}
