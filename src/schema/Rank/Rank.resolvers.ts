import { GraphQLList, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'; 
import { RankType } from './Rank.type'; 
import { MessageType } from '../Message.type'; 
import { Rank } from '../../entities/Rank.entity'; 
import { GraphQLISODateTime } from 'type-graphql';
 
export const RankResolver = { 
  Query: { 
    getRanks: {
      description: "Return score sorted rank list.",
      type: new GraphQLList(RankType),
      args: {
        weight_class: { type: GraphQLString },
        fighter_id: { type: GraphQLInt },
        score: { type: GraphQLInt },
      },
      async resolve(parent: any, args: any) { 
        return (await Rank.findBy(args)).sort((a:Rank, b:Rank) => {
          return b.score - a.score;
        });
      }, 
    }
  }, 
}; 