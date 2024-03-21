const jwt = require("jsonwebtoken");
const envs = require("./environments");

class JWT {
  static async generateToken(payload, duration = "12h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SEED,
        { expiresIn: duration },
        (error, token) => {
          if (error) return resolve(null);
          return resolve(token);
        }
      );
    });
  }

  static validateToken(token) {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (error, decoded) => {
        if (error) return resolve(null);
        return resolve(decoded);
      });
    });
  }
}

module.exports = JWT;
