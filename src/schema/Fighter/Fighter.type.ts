import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { GraphQLISODateTime } from 'type-graphql';

export const FighterType = new GraphQLObjectType({
  name: 'Fighter',
  fields: ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
    birthdate: { type: GraphQLISODateTime },
    height: { type: GraphQLInt },
    weight_class: { type: GraphQLString },
    nationality: { type: GraphQLString },
    team: { type: GraphQLString },
    wins: { type: GraphQLInt },
    losses: { type: GraphQLInt },
    knockouts: { type: GraphQLInt },
    draws: { type: GraphQLInt },
    submissions: { type: GraphQLInt },
    created_at: { type: GraphQLISODateTime },
    updated_at: { type: GraphQLISODateTime },
  }),
});