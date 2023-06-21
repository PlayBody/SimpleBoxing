import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import { GraphQLISODateTime } from 'type-graphql';
import { RankType } from '../Rank/Rank.type';
import { Rank } from '../../entities/Rank.entity';

export const FighterDetailType = new GraphQLObjectType({
  name: 'FighterDetail',
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
    ranks: { 
      type: new GraphQLList(RankType),
      async resolve(parent: any){
        return await Rank.findBy({fighter_id: parent.id});
      }
    },
    created_at: { type: GraphQLISODateTime },
    updated_at: { type: GraphQLISODateTime },
  }),
});