import { Author } from '../../author/entities/author.entity';
import { Genre } from '../../genre/entities/genre.entity';
export declare class Book {
    Id: number;
    name: string;
    genre: Genre;
    authors: Author[];
}
