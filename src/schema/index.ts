import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { FighterResolver } from './Fighter/Fighter.resolvers';
import { EventResolver } from './Event/Event.resolvers';
import { FightResolver } from './Fight/Fight.resolvers';
import { RankResolver } from './Rank/Rank.resolvers';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...FighterResolver.Query,
    ...EventResolver.Query,
    ...FightResolver.Query,
    ...RankResolver.Query,
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    ...FighterResolver.Mutation,
    ...EventResolver.Mutation,
    ...FightResolver.Mutation,
  }
});

export const schema = new GraphQLSchema({
  description: "Fighter GraphQL Backend",
  query: RootQuery,
  mutation: RootMutation,
});
