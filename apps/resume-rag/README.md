- 	- Split  resume content into text chunks or sections

	- Generate embeddings for these chunks using OpenAI or other embedding models

	- When a user asks a question, embed the question, find the closest matching chunks (via cosine similarity search), then supply those chunks as context to the AI to answer from.


    pinecone?