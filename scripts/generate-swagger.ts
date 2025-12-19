import { writeFileSync } from 'fs';
import { createSwaggerSpec } from 'next-swagger-doc';

const spec = createSwaggerSpec({
  apiFolder: 'app/api',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  },
});

writeFileSync('public/swagger.json', JSON.stringify(spec, null, 2));
console.log('swagger.json generated');