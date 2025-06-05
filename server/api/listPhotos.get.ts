import { BlobServiceClient } from '@azure/storage-blob';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const connectionString = config.azureStorageConnectionString;
  const containerName = config.public.azureStorageContainerName;

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const urls: string[] = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    const blobClient = containerClient.getBlobClient(blob.name);
    urls.push(blobClient.url);
  }

  return { urls };
});
