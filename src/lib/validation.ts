import { z } from 'zod';
export const emailSchema=z.string().email('Enter a valid email address');
export const registerSchema=z.object({ name:z.string().min(2,'Name must be at least 2 characters'), username:z.string().min(3,'Username must be at least 3 characters').regex(/^[a-z0-9_]+$/i,'Username may only contain letters, numbers and _'), email:emailSchema, password:z.string().min(8,'Password must be at least 8 characters'), accountType:z.enum(['personal','business']), terms:z.boolean().refine(v=>v,'You must accept the Terms of Service') });
export const loginSchema=z.object({ email:emailSchema, password:z.string().min(1,'Password is required') });
export const sendSchema=z.object({ recipient:z.string().min(3,'Enter a GlowIDE username, email or wallet address'), amount:z.number().positive('Amount must be greater than 0').max(100000,'Demo limit: $100,000 per transfer'), asset:z.string().min(1), network:z.string().min(1), note:z.string().max(140).optional() });
export const invoiceSchema=z.object({ customer:z.string().min(2,'Customer name is required'), email:emailSchema, amount:z.number().positive('Amount must be greater than 0'), description:z.string().min(3,'Description is required'), dueDate:z.string().min(1,'Due date is required') });
export const paymentLinkSchema=z.object({ title:z.string().min(2,'Title is required'), amount:z.number().positive('Amount must be greater than 0'), asset:z.string().min(1) });
export const contactSchema=z.object({ name:z.string().min(2,'Name is required'), email:emailSchema, message:z.string().min(10,'Message must be at least 10 characters') });
export type RegisterInput=z.infer<typeof registerSchema>;
export function zodErrors(e:unknown):Record<string,string>{ const out:Record<string,string>={}; if(e instanceof z.ZodError){ for(const i of e.issues) out[String(i.path[0]||'form')]=i.message; } return out; }
