"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openai = void 0;
exports.generateText = generateText;
const openai_1 = __importDefault(require("openai"));
const apiKey = process.env.OPENAI_API_KEY;
exports.openai = new openai_1.default({ apiKey });
async function generateText(systemPrompt, userPrompt) {
    if (!apiKey) {
        throw Object.assign(new Error('Missing OPENAI_API_KEY'), { status: 500 });
    }
    const completion = await exports.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
    });
    const content = completion.choices?.[0]?.message?.content || '';
    return content;
}
