import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { AuthorService } from '../author/author.service';
import { GenreService } from '../genre/genre.service';

@Injectable()
export class BookService {
  books: Book[] = [];
  create(createBookDto: CreateBookDto) {
    const genre = this.genreService.findOne(createBookDto.genreId);
    const authors = createBookDto.authorsId.map(a => this.authorService.findOne(a));
    const newBook = new Book();
    newBook.Id = Math.random();
    newBook.name = createBookDto.name;
    if (genre) {
      newBook.genre = genre;
    }
    newBook.authors = authors;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find(b => b.Id == id);
    if (!book){
      throw NotFoundException;
    }
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.books.find(b => b.Id == id)
    if (!book){
      throw NotFoundException;
    }
    if (updateBookDto.name) {
      book.name = updateBookDto.name;
    }
    if (updateBookDto.genreId) {
      book.genre = this.genreService.findOne(updateBookDto.genreId);
    }
    if (updateBookDto.authorsId) {
      book.authors = updateBookDto.authorsId.map(a => this.authorService.findOne(a));
    }
  }

  remove(id: number) {
    this.books = this.books.filter((g) => g.Id != id);
    return true;
  }

  constructor (
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService){

  }
}
