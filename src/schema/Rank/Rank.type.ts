import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { GraphQLISODateTime } from 'type-graphql';
import { FighterType } from '../Fighter/Fighter.type';
import { Fighter } from '../../entities/Fighter.entity';

export const RankType = new GraphQLObjectType({
  name: 'Rank',
  fields: ({
    id: { type: GraphQLID },
    weight_class: { type: GraphQLString },
    fighter: {
      type: FighterType,
      async resolve(source: any) {
        return await Fighter.findBy({id: source.fighter_id});
      }
    },
    fighter_id: { type: GraphQLInt },
    score: { type: GraphQLInt },
    created_at: { type: GraphQLISODateTime },
    updated_at: { type: GraphQLISODateTime },
  }),
});
