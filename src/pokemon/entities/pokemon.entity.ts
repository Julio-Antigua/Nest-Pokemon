import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    //id: string // Mongo me da el id
    @Prop({
        unique: true,
        index: true,
    })
    name: string;
    @Prop({
        unique: true,
        index: true,
    })
    no  : number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon ); // esto se encarga de referenciar de que la clase Pokemon como el esquema de la BD