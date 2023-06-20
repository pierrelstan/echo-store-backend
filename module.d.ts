declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string | undefined;
        MONGODB_API_KEY: string;
        RANDOM_TOKEN_SECRET: 'Secret | GetPublicKeyOrSecret';
    }
}
