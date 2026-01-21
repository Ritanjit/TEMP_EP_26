/// <reference path="../.astro/types.d.ts" />

// Environment variable types for TypeScript
interface ImportMetaEnv {
  readonly VITE_DATABASE: string;
  readonly VITE_FQ_BASE_URL: string;
  readonly VITE_FQ_LOCAL_SERVER: string;
  readonly VITE_FQ_TOKEN_PATH: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_FEST_YEAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
