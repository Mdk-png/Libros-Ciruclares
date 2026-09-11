import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  static genres: Genre[] = [];

  create(createGenreDto: CreateGenreDto) {
    const newGenre = new Genre();
    newGenre.name = createGenreDto.name;
    newGenre.Id = Math.random();
    GenreService.genres.push(newGenre);

    return newGenre.Id;
  }

  findAll() {
    return GenreService.genres;
  }

  findOne(id: number) {
    const genre = GenreService.genres.find(g => g.Id == id);
    if (!genre){
      throw new NotFoundException;
    }
    return genre;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = GenreService.genres.find(g => g.Id == id)
    if (!genre){
      throw NotFoundException;
    }
    genre.name = updateGenreDto.name;
  }

  remove(id: number) {
    GenreService.genres = GenreService.genres.filter((g) => g.Id != id);
    return true;
  }
}
