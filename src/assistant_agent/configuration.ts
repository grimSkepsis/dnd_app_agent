/**
 * Define the configurable parameters for the agent.
 */
import { RunnableConfig } from "@langchain/core/runnables";
import { DEFAULT_MODEL } from "../utils/constants.js";
import { AssistantConfiguration } from "./schemas/configuration-schema.js";


const DEFAULT_ASSISTANT_TEMPLATE_REF = "dnd-assistant-agent:goblin";

const DEFAULT_ASSISTANT_MODEL = DEFAULT_MODEL;

export function ensureConfiguration(
  config: RunnableConfig,
): AssistantConfiguration {
  /**
   * Ensure the defaults are populated.
   */
  const configurable = config.configurable ?? {};
  return {
    systemPromptTemplateRef:
      configurable.systemPromptTemplate ?? DEFAULT_ASSISTANT_TEMPLATE_REF,
    model: configurable.model ?? DEFAULT_ASSISTANT_MODEL,
  };
}
