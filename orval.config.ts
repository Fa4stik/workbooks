import { defineConfig } from 'orval';

export default defineConfig({
    speechToText: {
        output: {
            mode: 'tags-split',
            target: 'src/05_shared/orval/api',
            schemas: 'src/05_shared/api/orval/schemas',
            client: 'react-query',
            mock: false,
            baseUrl: 'http://localhost:8000',
            prettier: true,
        },
        input: {
            target: 'src/05_shared/api/orval/openapi.json'
        },
    },
})