import dotenv from "dotenv";

// Load .env variables
dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ['GET', 'POST'],
    headers: ['Content-Type']
  },
  paths: {
    templates: `templates/`, // Directory for JSON templates
    uploads: `uploads/`, // Directory for uploaded files
    base: process.cwd(),
    success: "success/",
    processing: "processing/",
    skuTemplate: "templates/skuitems.json",
  },
  watcher: {
    source_path: "E:\\inbounce-outbounce", // Directory to watch for new files
    ignored: /(^|[\\/\\])\../, // Ignore dotfiles
    persistent: true,
    ignoreInitial: true
  },
  xmlType: {
    INBOUND: "inbound",
    OUTBOUND: "outbound",
    SKU: "skuitems",
    WAREHOUSE: "warehouse",
    PACKINGSLIP: "packingslip"
  },
  xmlOptions: {
    arrayNodeName: "NETLOGMESSAGE",
  },
  csv: {
    outputFileName: "output.csv",
  }
};
