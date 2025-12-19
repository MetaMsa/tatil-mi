import { createSwaggerSpec } from "next-swagger-doc";

export const getSwaggerSpec = () =>
  createSwaggerSpec({
    apiFolder: `${process.env.apiFolder}`,
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API",
        version: "1.0.0",
      },
    },
  });
