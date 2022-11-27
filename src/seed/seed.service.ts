import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  axios, {AxiosInstance} from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from '../seed/interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {}

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {

    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(async ({name, url})=> {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({name, no});

      pokemonToInsert.push({name,no});

    });

    await this.pokemonModel.insertMany(pokemonToInsert); // todas las inserciones simultaneas

    return 'Seed Executed';
  }

}