import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { isNull } from "util";
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
        try {
          const pokemon = await this.pokemonModel.create( createPokemonDto );
          return pokemon;
        } catch (error) {
          this.handlerExceptions(error);
        }
      }
    
      FindAll() {
        return this.pokemonModel.find();
      }
    
      async FindOne(term: string) {
        let pokemon: Pokemon;

        //No
        if(!isNaN(+term)){
          pokemon = await this.pokemonModel.findOne({no: term});
        }

        // MongoId
        if( !pokemon && isValidObjectId(term)){
          pokemon = await this.pokemonModel.findById(term);
        }

        //Name
        if(!pokemon){
          pokemon = await this.pokemonModel.findOne({name: term.toLocaleLowerCase().trim()});
        }

        //Exception
        if(!pokemon)
          throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);

        return pokemon;
      }
    
      async Update(term: string, updatePokemonDto: UpdatePokemonDto) {

        try{
          const pokemon = await this.FindOne(term);
          if(updatePokemonDto.name)
            updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
  
            await pokemon.updateOne(updatePokemonDto, {new: true});
  
          return {...pokemon.toJSON(), ...updatePokemonDto};
        }
        catch(error){
          this.handlerExceptions(error);
        }
       
      }
    
      async Remove(id: string) {
        // const pokemon = await this.FindOne(id);
        // await pokemon.deleteOne();
        // return {id};
        // const result = await this.pokemonModel.findByIdAndDelete(id);

        //nota: lo mejor es hacer la menores consultas a la base de datos para mayor y mehor flujo de los datos

        const {deletedCount} = await this.pokemonModel.deleteOne({ _id: id});
        if(deletedCount === 0)
          throw new BadRequestException(`Pokemon with id "${ id }" not found`);
        return;
      }

      private handlerExceptions(error: any){
        if(error.code === 11000){
          throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
      }
}