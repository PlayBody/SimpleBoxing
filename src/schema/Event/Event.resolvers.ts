import { GraphQLList, GraphQLString, GraphQLID, GraphQLInt } from 'graphql';

import { EventType } from './Event.type';
import { EventDetailType } from './EventDetail.type';
import { MessageType } from '../Message.type';
import { Event } from '../../entities/Event.entity';

export const EventResolver = {
  Query: {
    getEvents: {
      type: new GraphQLList(EventDetailType),
      async resolve() {
        return await Event.find();
      }
    },
    getEvent: {
      type: EventDetailType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent: any, args: any){
        const { id } = args;
        const item = await Event.findOneBy({ id });
        if (!item) {
          throw new Error(`The event ${id} doesn't exist!`);
        }
      }
    },
  },
  
  Mutation: {
    createEvent: {
      type: MessageType,
      args: {
        name: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      async resolve(parent: any, args: any) {
        await Event.insert(args);
        return { message: 'The event created!' };
      },
    },
  },
}
  