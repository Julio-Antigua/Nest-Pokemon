import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller('pokemon')
export class PokemonController{
    constructor(private readonly pokemonService: PokemonService) {}

    @Post()
    Create(@Body() createPokemonDto: CreatePokemonDto){
        return this.pokemonService.Create(createPokemonDto);
    }

    @Get()
    @HttpCode( HttpStatus.OK )
    FindAll(@Query() queryParameters: PaginationDto){
        return this.pokemonService.FindAll(queryParameters);
    }

    @Get(':term')
    FindOne(@Param('term') term: string){
        return this.pokemonService.FindOne(term);
    }

    @Patch(':term')
    Update(@Param('term',) term: string, @Body() updatePokemonDto: UpdatePokemonDto){
        return this.pokemonService.Update(term, updatePokemonDto);
    }

    @Delete(':id')
    Remove(@Param('id', ParseMongoIdPipe) id: string){
        return this.pokemonService.Remove(id);
    }
}