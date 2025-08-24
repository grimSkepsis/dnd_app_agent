/**
 * Define the configurable parameters for the agent.
 */
import { SYSTEM_PROMPT_TEMPLATE } from "./prompts.js";
import { RunnableConfig } from "@langchain/core/runnables";
import { DEFAULT_MODEL } from "../utils/constants.js";
import { AssistantConfiguration } from "./schemas/configuration-schema.js";

export function ensureConfiguration(
  config: RunnableConfig,
): AssistantConfiguration {
  /**
   * Ensure the defaults are populated.
   */
  const configurable = config.configurable ?? {};
  return {
    systemPromptTemplate:
      configurable.systemPromptTemplate ?? SYSTEM_PROMPT_TEMPLATE,
    model: configurable.model ?? DEFAULT_MODEL,
  };
}
