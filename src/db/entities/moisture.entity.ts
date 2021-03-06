import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from './base.entity';


@Entity()
export class Moisture extends BaseEntity {
    @Property()
    moisture?: string;

    constructor() {
        super();
    }
}