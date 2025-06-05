import { BlobServiceClient } from '@azure/storage-blob';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const file = formData?.find((f) => f.name === 'file');
  if (!file || !file.data || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid upload request' });
  }

  const config = useRuntimeConfig();
  const connectionString = config.azureStorageConnectionString;
  const containerName = config.public.azureStorageContainerName;

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(file.filename);

  await blockBlobClient.uploadData(file.data, {
    blobHTTPHeaders: { blobContentType: file.type || 'application/octet-stream' }
  });

  return { url: blockBlobClient.url };
});