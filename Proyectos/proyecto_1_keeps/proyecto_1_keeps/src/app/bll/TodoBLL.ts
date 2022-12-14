import { Todo } from '../models/Todo';
import { DbService } from '../services/db/db.service';

export class TodoBLL {
  async insert(
    db: DbService,
    content: string,
    checked: boolean,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    note_id: number
  ) {
    if (!db.database) {
      await db.createDb();
    }
    const sqlText = `INSERT INTO todos(content, checked, note_id) VALUES (?,?,?)`;

    return await db.database
      .executeSql(sqlText, [content, checked, note_id])
      .catch((e) => console.log(`Error en el insert`, e));
  }

  async selectByNote(db: DbService, id: number) {
    if (!db.database) {
      await db.createDb();
    }
    const sqlText = `SELECT * FROM todos where note_id = ?`;
    const todo: Todo[] = [];

    await db.database
      .executeSql(sqlText, [id])
      .then((res) => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const row = res.rows.item(i);
            todo.push(row);
          }
        }
      })
      .catch((e) => console.log(`Error en el selectByNote`, e));

    return todo;
  }

  async updateContent(db: DbService, id: number, content: string) {
    if (!db.database) {
      await db.createDb();
    }
    const sqlText = `update todos set content = ? WHERE id = ?`;
    let responseDB: any;

    await db.database
      .executeSql(sqlText, [content, id])
      .then((res) => {
        responseDB = res;
        console.log(`Todos Actualizados`, res);
      })
      .catch((e) => console.log(`Error al Actualizar`, e));

    return responseDB;
  }

  async updateChecked(db: DbService, id: number, checked: boolean) {
    if (!db.database) {
      await db.createDb();
    }
    const sqlText = `UPDATE todos SET checked= ? WHERE id = ?`;
    let validateChecked: number;
    // eslint-disable-next-line prefer-const
    validateChecked = checked === true ? 0 : 1;
    await db.database
      .executeSql(sqlText, [validateChecked, id])
      .then((res) => {
        console.log(`Todos Actualizados ${res.rowsAffected} + checked: ${validateChecked}`);
      })
      .catch((e) => console.log(`Error al Actualizar`, e));
  }


  async delete(db: DbService, id: number) {
    if (!db.database) {
      await db.createDb();
    }
    const sqlText = `DELETE FROM todos where id = ?`;
    let responseDB: any;

    await db.database
      .executeSql(sqlText, [id])
      .then((res) => {
        responseDB = res;
        console.log(`Todo deleted`, res);
      })
      .catch((e) => console.log(`Error al Eliminar`, e));

    return responseDB;
  }
}
