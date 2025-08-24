import { z } from "zod";

export const AssistantConfigurationSchema = z.object({
  model: z.string().optional(),
  systemPromptTemplate: z.string().optional(),
});

export type AssistantConfiguration = z.infer<typeof AssistantConfigurationSchema>;