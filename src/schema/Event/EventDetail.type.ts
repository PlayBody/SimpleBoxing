import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { GraphQLISODateTime } from 'type-graphql';
import { FightType } from '../Fight/Fight.type';
import { Fight } from '../../entities/Fight.entity';

export const EventDetailType = new GraphQLObjectType({
  name: 'EventDetail',
  fields: ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    fights: { 
      type: new GraphQLList(FightType),
      async resolve(parent: any){
        return await Fight.findBy({event_id: parent.id});
      }
    },
    created_at: { type: GraphQLISODateTime },
    updated_at: { type: GraphQLISODateTime },
  }),
});