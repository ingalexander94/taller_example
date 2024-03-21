const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const envs = require("./environments");

const { AWS_KEY_S3, AWS_SECRET_S3, AWS_REGION, AWS_BUCKET } = envs;

const client = new S3Client({
  region: AWS_REGION,
  apiVersion: "latest",
  credentials: {
    accessKeyId: AWS_KEY_S3,
    secretAccessKey: AWS_SECRET_S3,
  },
});

const uploadFile = async (key, contentType, avatar) => {
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET,
    Key: key,
    Body: avatar,
    ContentType: contentType,
  });
  return await client.send(command);
};

const deleteFile = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: AWS_BUCKET,
    Key: key,
  });
  return await client.send(command);
};

const getFile = async (key) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET,
    Key: key,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 900 });
  return url;
};

module.exports = {
  uploadFile,
  deleteFile,
  getFile,
};
