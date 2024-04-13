require("dotenv/config");
const { get } = require("env-var");

// Skip Husky install in production and CI
if (
  get("NODE_ENV").asString() !== "development" ||
  get("CI").default("false").asString() === "true"
) {
  process.exit(0);
}
const husky = async () => await import("husky").default;
console.log("Husky install:", husky());
