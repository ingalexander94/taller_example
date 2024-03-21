const envs = {
  PORT: parseInt(process.env.PORT || "3000"),
  DEFAULT_AVATAR: process.env.DEFAULT_AVATAR,
  PLACEHOLDER: process.env.PLACEHOLDER,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "3306"),
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
  JWT_SEED: process.env.JWT_SEED || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_HOST: process.env.EMAIL_HOST || "",
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || "465"),
  AWS_KEY_S3: process.env.AWS_KEY_S3,
  AWS_SECRET_S3: process.env.AWS_SECRET_S3,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET: process.env.AWS_BUCKET,
};

module.exports = envs;
