import 'reflect-metadata';

import express from 'express';

import { createApolloServer } from './graphql';

async function main() {
	const server = await createApolloServer();
	const app = express();
	server.applyMiddleware({ app });

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server listenting on port ${PORT}`));
}

main().catch((err) => console.log('Error: ', err));
