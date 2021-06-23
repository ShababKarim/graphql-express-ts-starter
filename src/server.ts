import 'reflect-metadata';

import express from 'express';

import { createApolloServer } from './graphql';
import logger from './utils/logger';

async function main() {
	const server = await createApolloServer();
	const app = express();
	server.applyMiddleware({ app });

	app.get('/default', (req, res) => {
		logger.info('I am an info msg');
		logger.warn('I am a warn msg');
		logger.error('I am a error msg');
	})

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server listenting on port ${PORT}`));
}

main().catch((err) => console.log('Error: ', err));
