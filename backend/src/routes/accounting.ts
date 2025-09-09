import { Express, Request, Response } from 'express';
import { z } from 'zod';
import { generateText } from '../services/aiClient';
import { researchSchema, policySchema, reportingSchema, systemSchema, auditSchema, adviceSchema } from '../validators/schemas';

function validate<T extends z.ZodTypeAny>(schema: T, req: Request) {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    const error = new Error(parsed.error.message) as Error & { status?: number };
    error.status = 400;
    throw error;
  }
  return parsed.data as z.infer<T>;
}

export function registerAccountingRoutes(app: Express) {
  app.post('/api/research', async (req: Request, res: Response) => {
    const input = validate(researchSchema, req);
    const system = 'You are a senior technical accountant. Provide authoritative, citation-backed analysis aligned to GAAP/IFRS where applicable. Return concise, practical guidance and quote relevant sections.';
    const prompt = `Question: ${input.question}\nJurisdiction: ${input.jurisdiction || 'unspecified'}\nFrameworks: ${input.frameworks?.join(', ') || 'unspecified'}\nCompany context: ${input.companyContext || 'n/a'}\nPlease provide: summary, key guidance, citations, risks, recommended next actions.`;
    const content = await generateText(system, prompt);
    res.json({ content });
  });

  app.post('/api/policy', async (req: Request, res: Response) => {
    const input = validate(policySchema, req);
    const system = 'You draft internal accounting policies with control considerations, operational steps, approval matrices, and monitoring KPIs.';
    const prompt = `Change: ${input.changeDescription}\nObjectives: ${(input.objectives||[]).join(', ')}\nStakeholders: ${(input.stakeholders||[]).join(', ')}\nDeliver a policy draft with: scope, definitions, policy, procedures, controls, approvals, exceptions, effective date.`;
    const content = await generateText(system, prompt);
    res.json({ content });
  });

  app.post('/api/reporting', async (req: Request, res: Response) => {
    const input = validate(reportingSchema, req);
    const system = 'You assist with financial reporting and close. Provide disclosure checklists, JE outlines, tie-out steps, and review points.';
    const prompt = `Period: ${input.period}\nIssues: ${(input.issues||[]).join('; ')}\nMateriality: ${input.materialityNotes || 'n/a'}\nReturn: close checklist, JE proposals, disclosures to consider, review procedures.`;
    const content = await generateText(system, prompt);
    res.json({ content });
  });

  app.post('/api/system', async (req: Request, res: Response) => {
    const input = validate(systemSchema, req);
    const system = 'You evaluate accounting systems and controls. Provide risks, recommended controls, and implementation plan.';
    const prompt = `Systems: ${input.systems.join(', ')}\nKnown risks: ${(input.risks||[]).join('; ')}\nReturn: risks, control activities (preventive/detective), config guidance, monitoring.`;
    const content = await generateText(system, prompt);
    res.json({ content });
  });

  app.post('/api/audit', async (req: Request, res: Response) => {
    const input = validate(auditSchema, req);
    const system = 'You prepare companies for external audits. Provide PBC lists, walkthrough guidance, sampling approaches, and common pitfalls.';
    const prompt = `Scope: ${input.scope}\nAuditors: ${(input.auditors||[]).join(', ')}\nReturn: PBC list, walkthrough map, sampling plan, key controls, common findings.`;
    const content = await generateText(system, prompt);
    res.json({ content });
  });

  app.post('/api/advice', async (req: Request, res: Response) => {
    const input = validate(adviceSchema, req);
    const system = 'You are a technical accounting advisor. Provide precise guidance and decision trees where helpful.';
    const prompt = `Topic: ${input.topic}\nDetails: ${input.details || 'n/a'}\nReturn a succinct answer, risks, and next steps.`;
    const content = await generateText(system, prompt);
    res.json({ content });
  });
}