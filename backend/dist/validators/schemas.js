"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adviceSchema = exports.auditSchema = exports.systemSchema = exports.reportingSchema = exports.policySchema = exports.researchSchema = void 0;
const zod_1 = require("zod");
exports.researchSchema = zod_1.z.object({
    question: zod_1.z.string().min(10),
    jurisdiction: zod_1.z.string().optional(),
    frameworks: zod_1.z.array(zod_1.z.enum(['GAAP', 'IFRS', 'Both'])).optional(),
    companyContext: zod_1.z.string().optional(),
});
exports.policySchema = zod_1.z.object({
    changeDescription: zod_1.z.string().min(10),
    objectives: zod_1.z.array(zod_1.z.string()).optional(),
    stakeholders: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.reportingSchema = zod_1.z.object({
    period: zod_1.z.string(),
    issues: zod_1.z.array(zod_1.z.string()).optional(),
    materialityNotes: zod_1.z.string().optional(),
});
exports.systemSchema = zod_1.z.object({
    systems: zod_1.z.array(zod_1.z.string()),
    risks: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.auditSchema = zod_1.z.object({
    scope: zod_1.z.string(),
    auditors: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.adviceSchema = zod_1.z.object({
    topic: zod_1.z.string().min(5),
    details: zod_1.z.string().optional(),
});
