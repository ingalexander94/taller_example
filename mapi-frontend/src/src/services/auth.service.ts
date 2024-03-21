import axios from "axios";
import { CustomStorage } from "src/lib";
import { AuthEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class AuthService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/auth`;

  private constructor() {}

  static login(email: string, password: string) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${AuthEndpoints.login}`,
        { email, password },
        { signal: controller.signal }
      ),
      controller,
    };
  }

  static validateEmail(email: string) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${AuthEndpoints.validateEmail}`,
        { email },
        { signal: controller.signal }
      ),
      controller,
    };
  }

  static recoveryPassword(email: string) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${AuthEndpoints.recovery}`,
        { email },
        { signal: controller.signal }
      ),
      controller,
    };
  }

  static validateCode(email: string, code: string) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${AuthEndpoints.validateCode}`,
        { email, code },
        { signal: controller.signal }
      ),
      controller,
    };
  }
  static updatePassword(email: string, password: string, code: string) {
    const controller = loadAbort();
    return {
      call: axios.patch(
        `${this.API_URL}/${AuthEndpoints.updatePassword}`,
        { email, password, code },
        { signal: controller.signal }
      ),
      controller,
    };
  }

  static renew() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${AuthEndpoints.renew}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
