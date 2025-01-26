import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadEnv = (mode = 'development') => {
  const envPath = path.resolve(__dirname, `.env.${mode}`);
  dotenv.config({ path: envPath });

  console.log(`Environment mode set to: ${mode}`);
  console.log(`Loading environment variables from: ${envPath}`);
};

export const setMode = (mode = 'development') => {
  if (!['development', 'production', 'test'].includes(mode)) {
    console.warn(
      `Invalid mode provided: "${mode}". Falling back to "development".`
    );
    mode = 'development';
  }
  loadEnv(mode);
};

export const getEnvVar = (key, defaultValue = null) => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue === null) {
      throw new Error(`Environment variable "${key}" is not defined.`);
    }
    return defaultValue;
  }
  return value;
};

const defaultMode = process.env.NODE_ENV || 'development';
loadEnv(defaultMode);

export default { setMode, getEnvVar };