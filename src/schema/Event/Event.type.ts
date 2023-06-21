import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { GraphQLISODateTime } from 'type-graphql';

export const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    created_at: { type: GraphQLISODateTime },
    updated_at: { type: GraphQLISODateTime },
  }),
});

