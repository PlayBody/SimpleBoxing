import { GraphQLList, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } from 'graphql';

import { FightType } from './Fight.type';
import { MessageType } from '../Message.type';
import { Fight } from '../../entities/Fight.entity';
import { Fighter } from '../../entities/Fighter.entity';
import { Rank } from '../../entities/Rank.entity';

export const FightResolver = {
  Query: {
    getFights: {
      description: "Get all fights.",
      type: new GraphQLList(FightType),
      async resolve() {
        return await Fight.find();
      }
    },
    getFight: {
      description: "Get fight by id.",
      type: FightType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent: any, args: any){
        const { id } = args;
        const item = await Fight.findOneBy({id});
        if (!item) {
          throw new Error(`The fight ${id} doesn't exist!`);
        }
        return item;
      }
    },
  },
  
  Mutation: {
    createFight: {
      description: "Create a new fight result.\n - Result values: [-, 0, +]\n - '-' represents fighter1 win\n - '0' represents draw\n - '+' represents fighter2 win\n - If the absolute value of the result is greater than or equal to 10, it is considered a knockout!\n - Throws error if fighter IDs are same or invalid event ID or weight class does not match.\n\nScore update logic:\n - draw: +1:+1\n - 1 win:+3:0\n - 1 knockout: +5:0",
      type: MessageType,
      args: {
        event_id: {type: GraphQLInt},
        fighter1_id: {type: GraphQLInt},
        fighter2_id: {type: GraphQLInt},
        result: { type: GraphQLInt },
        method: {type: GraphQLString},
        round: {type: GraphQLInt},
      },
      async resolve(parent: any, args: any) {
        const { result, fighter1_id, fighter2_id, event_id } = args;
        if(fighter1_id == fighter2_id){
          throw new Error(`${fighter1_id}! Fight match cannot have same fighter's id`);
        }
        if(event_id <= 0){
          throw new Error(`Invalid event id`);
        }
        const f1 = await Fighter.findOneBy({id:fighter1_id, del_flag:0});
        const f2 = await Fighter.findOneBy({id:fighter2_id, del_flag:0});
        if(!f1 || !f2){
          throw new Error(`Invalid figter id: ${fighter1_id} or ${fighter2_id}`);
        }
        if(f1.weight_class != f2.weight_class){
          throw new Error(`Weight match error: child vs Kungfu Master ?`);
        }
        const weight = f1.weight_class;
        // dont nessessary check event record.
        await Fight.insert(args);
        // if err occ ? auto throw
        f1.submissions++;
        f2.submissions++;
        let s1 = 0;
        let s2 = 0;
        const res = Math.abs(result);
        if(result == 0){
          f1.draws++;
          f2.draws++;
          s1++; s2++;
        } else if(result < 0) {
          if(res >= 10){
            f1.knockouts++;
            s1+=2;
          }
          s1+=3;
          f1.wins++;
          f2.losses++;
        } else if(result > 0){
          if(res >= 10){
            f2.knockouts++;
            s2+=2;
          }
          s2+=3;
          f1.losses++;
          f1.wins++;
        }
        f1.save();
        f2.save();
        const ff = [fighter1_id, fighter2_id];
        const ss = [s1, s2];
        for (let index = 0; index < ff.length; index++) {
          const e = ff[index];
          let r = await Rank.findOneBy({fighter_id: e, weight_class:weight});
          if(!r){
            r = new Rank();
            r.fighter_id = e;
            r.fighter = e;
            r.weight_class = weight;
            r.score = 0;
          }
          r.score += ss[index];
          r.save();
        }
        
        return { message: 'The fight created! & Rank changed.' };
      },
    },
  },
}
  