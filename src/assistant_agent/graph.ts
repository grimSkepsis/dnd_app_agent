import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import { AssistantConfigurationSchema } from "./schemas/configuration-schema.js";
import { ASSISTANT_AGENT_KEY, callAssistantAgent } from "./nodes/assistant-agent.js";




// Define a new graph. We use the prebuilt MessagesAnnotation to define state:
// https://langchain-ai.github.io/langgraphjs/concepts/low_level/#messagesannotation
const workflow = new StateGraph(MessagesAnnotation, AssistantConfigurationSchema)
  // Define the two nodes we will cycle between
  .addNode(ASSISTANT_AGENT_KEY, callAssistantAgent)
  // Set the entrypoint as `callModel`
  // This means that this node is the first one called
  .addEdge(START, ASSISTANT_AGENT_KEY)
  .addEdge(ASSISTANT_AGENT_KEY, END);

// Finally, we compile it!
// This compiles it into a graph you can invoke and deploy.
export const graph = workflow.compile({
  interruptBefore: [], // if you want to update the state before calling the tools
  interruptAfter: [],
});
