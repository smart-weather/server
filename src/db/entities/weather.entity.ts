import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";


@Entity()
export class Weather {
    @PrimaryKey()
    _id!: ObjectId;

    @Property()
    temperature: number = 0;

    @Property()
    pressure: number = 0;

    @Property()
    humidity: number = 0;
}