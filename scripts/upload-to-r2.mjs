import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET_NAME, R2_PUBLIC_URL } =
  process.env;

if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT || !R2_BUCKET_NAME) {
  console.error('Error: Missing R2 environment variables');
  process.exit(1);
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tiff'];

async function processAndUpload(filePath, customWidth, customHeight) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext)) {
      console.log(`Skipping (not an image): ${filePath}`);
      return null;
    }

    const fileName = path.basename(filePath, ext);
    const webpFileName = `${fileName}-${Date.now()}.webp`;

    console.log(`Processing: ${filePath}`);

    let sharpInstance = sharp(filePath);
    
    const width = customWidth ? parseInt(customWidth) : 1200;
    const height = customHeight ? parseInt(customHeight) : null;

    sharpInstance = sharpInstance.resize(width, height, {
      withoutEnlargement: true,
      fit: height ? 'cover' : 'inside'
    });

    const webpBuffer = await sharpInstance
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    console.log(`Converted: ${webpFileName} (${(webpBuffer.length / 1024).toFixed(2)} KB) @ ${width}x${height || 'auto'}`);

    const uploadParams = {
      Bucket: R2_BUCKET_NAME,
      Key: `blog/${webpFileName}`,
      Body: webpBuffer,
      ContentType: 'image/webp',
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const finalUrl = `${R2_PUBLIC_URL}/blog/${webpFileName}`;
    return finalUrl;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const targetPath = args[0];
  const width = args[1];
  const height = args[2];

  if (!targetPath) {
    console.error('Usage: npm run upload <file_or_directory> [width] [height]');
    process.exit(1);
  }

  if (!fs.existsSync(targetPath)) {
    console.error(`Error: Path does not exist: ${targetPath}`);
    process.exit(1);
  }

  const stats = fs.statSync(targetPath);
  const results = [];

  if (stats.isDirectory()) {
    console.log(`Scanning directory: ${targetPath}`);
    const files = fs.readdirSync(targetPath);
    for (const file of files) {
      const fullPath = path.join(targetPath, file);
      if (fs.statSync(fullPath).isFile()) {
        const url = await processAndUpload(fullPath, width, height);
        if (url) results.push({ name: file, url });
      }
    }
  } else {
    const url = await processAndUpload(targetPath, width, height);
    if (url) results.push({ name: path.basename(targetPath), url });
  }

  if (results.length > 0) {
    console.log('\n--- UPLOAD SUMMARY ---');
    results.forEach((res) => {
      console.log(`\nFile: ${res.name}`);
      console.log(`Markdown: ![${res.name}](${res.url})`);
    });
    console.log('\n----------------------\n');
  } else {
    console.log('\nNo images were uploaded.');
  }
}

main();
