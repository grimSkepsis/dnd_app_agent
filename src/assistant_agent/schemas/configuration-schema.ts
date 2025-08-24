import { z } from "zod";

export const AssistantConfigurationSchema = z.object({
  model: z.string(),
  systemPromptTemplateRef: z.string(),
});

export type AssistantConfiguration = z.infer<typeof AssistantConfigurationSchema>;