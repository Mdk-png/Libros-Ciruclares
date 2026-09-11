import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  authors: Author[] = [];

  create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = new Author();
    newAuthor.Id = Math.random();
    newAuthor.name = createAuthorDto.name;
    newAuthor.lastName = createAuthorDto.lastName;
    newAuthor.nationality = createAuthorDto.nationality;
    newAuthor.residency = createAuthorDto.residency;
    this.authors.push(newAuthor);
  }

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    const author = this.authors.find(a => a.Id == id);
    if (!author){
      throw NotFoundException;
    }
    return author;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = this.authors.find(a => a.Id == id);
    if (!author){
      throw NotFoundException;
    }
    author.name = updateAuthorDto.name;
    author.lastName = updateAuthorDto.lastName;
    author.nationality = updateAuthorDto.nationality;
    author.residency = updateAuthorDto.residency;
  }

  remove(id: number) {
    this.authors = this.authors.filter((a) => a.Id != id);
    return true;
  }
}
