import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrieverTool } from "langchain/tools/retriever";

// Function to initialize vector store lazily
export async function initializeVectorStore() {
  // if (vectorStore) return vectorStore;
  // vector stores - initialize lazily
  let vectorStore: MemoryVectorStore | null = null;

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large"
  });
  try {
    console.log('Loading and embedding documents...');
    const loader = new CheerioWebBaseLoader("https://classics.mit.edu/Aristotle/nicomachaen.mb.txt");
    const docs = await loader.load();

    // Split into smaller, more manageable chunks
    const textChunks = docs[0].pageContent
      .split(/\n/)
      .filter(chunk => chunk.trim().length > 50) // Filter out very short chunks
      // .forEach(chunk => console.log(`${chunk.length} - %o`, chunk.slice(0,10)))
      .slice(0, 100); // Limit to first 100 chunks to avoid overwhelming the API

    console.log(`Processing ${textChunks.length} text chunks...`);
    vectorStore = await MemoryVectorStore.fromTexts(
      textChunks,
      textChunks.map((_, index) => ({ chunkIndex: index })),
      embeddings
    );

    const retriever = vectorStore.asRetriever()

    const retrieverTool = createRetrieverTool(
        retriever,
        "search_documents"
    );

    console.log('Vector store initialized successfully!');
    return retrieverTool;
  } catch (error) {
    console.error('Error initializing vector store:', error);
    throw error;
  }
}