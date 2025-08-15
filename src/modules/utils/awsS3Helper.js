import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const uploadFileToAws = async (file) => {
  try {
    const client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY,
      },
    });

    const bucketName = process.env.AWS_BUCKET_NAME;

    const newFileName = `pic_${Date.now().toString()}.${file.mimetype.split('/')[1]}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await client.send(command);

    // Public file URL
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${newFileName}`;

    return {
      fileName: newFileName,
      bucket: bucketName,
      url: fileUrl,
    };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};
