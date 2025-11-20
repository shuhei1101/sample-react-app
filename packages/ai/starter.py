from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage
from llama_index.core.agent.workflow import FunctionAgent
from llama_index.llms.openai import OpenAI
import asyncio

load_dotenv()

# LlamaIndex を使用して RAG ツールを作成する
documents = SimpleDirectoryReader("data").load_data()
# インデックスを作成する
index = VectorStoreIndex.from_documents(documents)
# インデックスのストレージコンテキストを保存する
index.storage_context.persist("storage")
# 保存したストレージコンテキストを読み込む
storage_context = StorageContext.from_defaults(persist_dir="storage")
# ストレージコンテキストからインデックスを読み込む
index = load_index_from_storage(storage_context)

# クエリ用のエンジンを作成する
query_engine = index.as_query_engine()


def multiply(a: float, b: float) -> float:
    """Useful for multiplying two numbers."""
    return a * b


async def search_documents(query: str) -> str:
    """Useful for answering natural language questions about an personal essay written by Paul Graham."""
    # プロンプトを投げる
    response = await query_engine.aquery(query)
    return str(response)


# Create an enhanced workflow with both tools
agent = FunctionAgent(
    tools=[multiply, search_documents],
    llm=OpenAI(model="gpt-4o-mini"),
    system_prompt="""You are a helpful assistant that can perform calculations
    and search through documents to answer questions.""",
)


# Now we can ask questions about the documents or do calculations
async def main():
    response = await agent.run(
        "What did the author do in college? Also, what's 7 * 8?（日本語で回答してください）"
    )
    print(response)


# Run the agent
if __name__ == "__main__":
    asyncio.run(main())
