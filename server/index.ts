import { postgraphile, PostGraphileOptions } from "postgraphile";
import { Plugin } from "postgraphile-core";
import express from "express";
//Relative import, based on PWD
const result = require("dotenv").config({ path: "./db/database.env" });

if (result.error) {
  throw result.error;
}

const plugins: Plugin[] = [
  // require('@graphile-contrib/pg-simplify-inflector'),
  // require('@graphile/postgis'),
  // require('postgraphile-plugin-connection-filter-postgis'
  require("@graphile-contrib/pg-simplify-inflector"),
  require("postgraphile-plugin-connection-filter"),
  require("@graphile-contrib/pg-order-by-related"),
];
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  GRAPHQL_PORT,
  POSTGRES_DATABASE,
} = process.env;

const app = express();
const postgraphileOptionsDev: PostGraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: plugins,
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  // pgSettings(req) {
  //   /* TODO */
  // }
};

app.use(
  postgraphile(
    {
      database: POSTGRES_DATABASE,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT) ?? 5432,
    },
    ["recipe", "personal"],
    {
      ...postgraphileOptionsDev,
    }
  )
);

app.listen(GRAPHQL_PORT, () =>
  console.log(`Server running on port ${GRAPHQL_PORT}`)
);
