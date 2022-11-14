import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";

@Controller('pokemon')
export class PokemonController{
    constructor(private readonly pokemonService: PokemonService) {}

    @Post()
    Create(@Body() createPokemonDto: CreatePokemonDto){
        return this.pokemonService.Create(createPokemonDto);
    }

    @Get()
    FindAll(){
        return this.pokemonService.FindAll();
    }

    @Get(':id')
    FindOne(@Param('id') id: string){
        return this.pokemonService.FindOne(+id);
    }

    @Patch(':id')
    Update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto){
        return this.pokemonService.Update(+id, updatePokemonDto);
    }

    @Delete(':id')
    Remove(@Param('id') id: string){
        return this.pokemonService.Remove(+id);
    }
}