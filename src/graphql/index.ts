import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import RecipeResolver from './resolvers/recipe-resolver';

export async function createApolloServer() {
	const schema = await buildSchema({
		resolvers: [RecipeResolver],
		emitSchemaFile: true,
		validate: false,
		// registering 3rd party container
		container: Container
	});

	return new ApolloServer({ schema });
}
