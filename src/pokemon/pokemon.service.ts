import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { Pokemon } from "./entities/pokemon.entity";


@Injectable()
export class PokemonService{

      constructor(
        @InjectModel( Pokemon.name )
        private readonly pokemonModel: Model<Pokemon> //esta es la forma de inyectar modelos en el servicio
      ) {}

      async Create(createPokemonDto: CreatePokemonDto) {
        createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
        const pokemon = await this.pokemonModel.create( createPokemonDto );
        return pokemon;
      }
    
      FindAll() {
        return `This action returns all pokemon`;
      }
    
      FindOne(id: number) {
        return `This action returns a #${id} pokemon`;
      }
    
      Update(id: number, updatePokemonDto: UpdatePokemonDto) {
        return `This action updates a #${id} pokemon`;
      }
    
      Remove(id: number) {
        return `This action removes a #${id} pokemon`;
      }
}