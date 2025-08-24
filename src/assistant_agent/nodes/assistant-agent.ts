import { RunnableConfig } from "@langchain/core/runnables";
import { MessagesAnnotation } from "@langchain/langgraph";
import { ensureConfiguration } from "../configuration.js";
import { loadChatModel } from "../utils.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { assistantMCPClient } from "../../utils/mcp.js";
import * as hub from "langchain/hub";


const MCP_TOOLS = await assistantMCPClient.getTools();


// Define the function that calls the model
export async function callAssistantAgent(
    state: typeof MessagesAnnotation.State,
    config: RunnableConfig,
  ): Promise<typeof MessagesAnnotation.Update> {
    /** Call the LLM powering our agent. **/
    const configuration = ensureConfiguration(config);
    const systemPromptTemplate = await hub.pull(configuration.systemPromptTemplateRef);

    const systemPrompt =  await systemPromptTemplate.invoke({
        messages: state.messages,
    });

    // Feel free to customize the prompt, model, and other logic!
    const model = (await loadChatModel(configuration.model));
    const agent = createReactAgent({
        llm: model,
        tools: MCP_TOOLS,
      });


      
  
    const response = await agent.invoke(systemPrompt);
  
    // We return a list, because this will get added to the existing list
    return { messages: response.messages };
  }
  
  export const ASSISTANT_AGENT_KEY = "assistant-agent";