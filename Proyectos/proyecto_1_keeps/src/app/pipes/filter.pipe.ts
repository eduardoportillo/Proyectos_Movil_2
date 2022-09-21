import { Pipe, PipeTransform } from '@angular/core';
import { Note } from 'src/app/models/Note';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(notes: Note[], text: string): Note[] {
    if (text === '') {
      return notes;
    }

    text = text.toLowerCase();

    return notes.filter((note) => {
      if (!note.description) {
        note.title.toLowerCase().includes(text);
      } else {
        return note.description.toLowerCase().includes(text);
      }
    });
  }
}
