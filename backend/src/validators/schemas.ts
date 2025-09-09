import { z } from 'zod';

export const researchSchema = z.object({
  question: z.string().min(10),
  jurisdiction: z.string().optional(),
  frameworks: z.array(z.enum(['GAAP', 'IFRS', 'Both'])).optional(),
  companyContext: z.string().optional(),
});

export const policySchema = z.object({
  changeDescription: z.string().min(10),
  objectives: z.array(z.string()).optional(),
  stakeholders: z.array(z.string()).optional(),
});

export const reportingSchema = z.object({
  period: z.string(),
  issues: z.array(z.string()).optional(),
  materialityNotes: z.string().optional(),
});

export const systemSchema = z.object({
  systems: z.array(z.string()),
  risks: z.array(z.string()).optional(),
});

export const auditSchema = z.object({
  scope: z.string(),
  auditors: z.array(z.string()).optional(),
});

export const adviceSchema = z.object({
  topic: z.string().min(5),
  details: z.string().optional(),
});