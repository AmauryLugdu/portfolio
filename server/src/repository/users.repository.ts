import { User } from './../models/user';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class UsersRepository {

    private static instance: UsersRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'user';

    static getInstance() {
        if (!this.instance) {
            this.instance = new UsersRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all posts and return it in a promise.
     */
    findAll(): Promise<User[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((post: any) => new User(post));
          });
    }

    /**
     * Make a query to the database to retrieve one post by its id in parameter. 
     * Return the post found in a promise.
     * @param id post id
     */
    findById(id: number): Promise<User> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new User(results[0]));
    }


    /**
     * Make a query to the database to insert a new post and return the created post in a promise.
     * @param post post to create
     */
    insert(user: User) {
      return this.connection.query(
        `INSERT INTO ${this.table} (lastname, firstname, description, email, city, country, gitHub, linkedIn, language, personality, password, miniature) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [user.lastname, user.firstname, user.description, user.email, user.city, user.country, user.gitHub, user.linkedIn, user.language, user.personality, user.password, user.miniature]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing post and return the updated post in a promise.
     * @param user post to update
     */
    update(user: User) {
      return this.connection.query(
        `UPDATE ${this.table} 
         SET lastname= ?, firstname= ?, description= ?, email= ?, city= ?, country= ?, gitHub= ?, linkedIn= ?, language= ?, personality= ?, password= ?, miniature= ?  WHERE id = ?`,
        [user.lastname, user.firstname, user.description, user.email, user.city, user.country, user.gitHub, user.linkedIn, user.language, user.personality, user.password, user.miniature]
      ).then(() => {
        return this.findById(user.id);
      });
    }

    /**
     * Make a query to the database to delete an existing post and return an empry promise
     * @param id post id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
