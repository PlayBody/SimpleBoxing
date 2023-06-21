import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { FighterType } from '../Fighter/Fighter.type';
import { EventType } from '../Event/Event.type';
import { Event } from '../../entities/Event.entity'
import { GraphQLISODateTime } from 'type-graphql';
import { Fighter } from '../../entities/Fighter.entity';

export const FightType = new GraphQLObjectType({
  name: 'Fight',
  fields: ({
    id: { type: GraphQLID },
    event_id: { type: GraphQLInt },
    event: {
      type: EventType,
      async resolve(parent:any) {
        return await Event.findOneBy({id: parent.event_id});
      }
    },
    fighter1_id: { type: GraphQLInt },
    fighter1: {
      type: FighterType,
      async resolve(parent:any) {
        return await Fighter.findOneBy({id: parent.fighter1_id});
      }
    },
    fighter2_id: { type: GraphQLInt },
    fighter2: {
      type: FighterType,
      async resolve(parent:any) {
        return await Fighter.findOneBy({id: parent.fighter2_id});
      }
    },
    result: {type: GraphQLInt},
    winner: {
      type: FighterType,
      async resolve(parent:any) {
        if(parent.result < 0){
          return await Fighter.findOneBy({id: parent.fighter1_id});
        } else if(parent.result > 0){
          return await Fighter.findOneBy({id: parent.fighter2_id});
        } else {
          return null;
        }
      }
    },
    method: {type: GraphQLString},
    round: {type: GraphQLInt},
    created_at: { type: GraphQLISODateTime },
    updated_at: { type: GraphQLISODateTime },
  }),
});