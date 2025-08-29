import { END, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph";
import { EXTRACTION_AGENT_KEY, callExtractionAgent } from "./nodes/extraction-agent.js";

// Define a new graph. We use the prebuilt MessagesAnnotation to define state:
// https://langchain-ai.github.io/langgraphjs/concepts/low_level/#messagesannotation
const workflow = new StateGraph(MessagesAnnotation)
  // Define the two nodes we will cycle between
  .addNode(EXTRACTION_AGENT_KEY, callExtractionAgent)
  // Set the entrypoint as `callModel`
  // This means that this node is the first one called
  .addEdge(START, EXTRACTION_AGENT_KEY)
  .addEdge(EXTRACTION_AGENT_KEY, END);

// Finally, we compile it!
// This compiles it into a graph you can invoke and deploy.
export const graph = workflow.compile({
  interruptBefore: [], // if you want to update the state before calling the tools
  interruptAfter: [],
});
