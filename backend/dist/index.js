"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("express");
const accounting_1 = require("./routes/accounting");
const error_1 = require("./middleware/error");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_2.json)({ limit: '2mb' }));
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'technical-accountant-api' });
});
(0, accounting_1.registerAccountingRoutes)(app);
app.use(error_1.errorHandler);
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
