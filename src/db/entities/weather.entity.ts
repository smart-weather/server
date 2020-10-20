import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from './base.entity';


@Entity()
export class Weather extends BaseEntity {
    @Property()
    temperature?: string;

    @Property()
    pressure?: number;

    @Property()
    humidity?: number;

    @Property()
    altitude?: number;

    constructor() {
        super();
    }
}