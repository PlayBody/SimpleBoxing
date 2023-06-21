import { GraphQLList, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';

import { FighterType } from './Fighter.type';
import { MessageType } from '../Message.type';
import { Fighter } from '../../entities/Fighter.entity';
import { GraphQLISODateTime } from 'type-graphql';
import { FighterDetailType } from './FighterDetail.type';

export const FighterResolver = {
  Query: {
    getFighters: {
      description: "Get all fighters.",
      type: new GraphQLList(FighterDetailType),
      async resolve() {
        return await Fighter.findBy({del_flag:0});
      }
    },
    getFighter: {
      description: "Get fighter by id.",
      type: FighterDetailType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent: any, args: any){
        const { id } = args;
        const item = await Fighter.findOneBy({ id, del_flag:0 });
        if (!item) {
          throw new Error(`The fighter ${id} doesn't exist!`);
        }
      }
    },
  },
  
  Mutation: {
    createFighter: {
      description: "Create new fighter.",
      type: MessageType,
      args: {
        name: { type: GraphQLString },
        nickname: { type: GraphQLString },
        birthdate: { type: GraphQLISODateTime },
        height: { type: GraphQLInt },
        weight_class: { type: GraphQLString },
        nationality: { type: GraphQLString },
        team: { type: GraphQLString },
      },
      async resolve(parent: any, args: any) {
        await Fighter.insert(args);
        return { message: 'The fighter created!' };
      },
    },
    updateFighter: {
      description: "update fighter's information that can be changed.",
      type: FighterDetailType,
      args: {
        id: { type: GraphQLID },
        nickname: { type: GraphQLString },
        height: { type: GraphQLInt },
        weight_class: { type: GraphQLString },
        nationality: { type: GraphQLString },
        team: { type: GraphQLString },
      },
      async resolve(parent: any, args: any) {
        const { id, ...updateData } = args;
        await Fighter.update({ id }, updateData);
        return Fighter.findOneBy({ id });
      },
    },
    deleteFighter: {
      description: "Remove fighter by id.",
      type: MessageType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent: any, args: any) {
        const { id } = args;
        await Fighter.update({ id }, {del_flag: 1});
        return { message: 'The fighter deleted!' };
      },
    },
  },
}
  