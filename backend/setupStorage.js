import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const setupStorage = async () => {
  console.log('Checking for "portfolio" bucket...');
  
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    console.error('Error listing buckets:', listError.message);
    return;
  }

  const bucketExists = buckets.find(b => b.name === 'portfolio');

  if (!bucketExists) {
    console.log('Creating "portfolio" bucket...');
    const { data, error: createError } = await supabase.storage.createBucket('portfolio', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (createError) {
      console.error('Error creating bucket:', createError.message);
    } else {
      console.log('Bucket "portfolio" created successfully and set to public!');
    }
  } else {
    console.log('Bucket "portfolio" already exists.');
  }
};

setupStorage();
