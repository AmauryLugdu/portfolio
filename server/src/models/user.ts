export class User {
    id!: number;
    lastname!: string;
    firstname!: string;
    description!: string;
    email!: string;
    city!: string;
    country!: string;
    gitHub!: string;
    linkedIn!: string;
    language!: string;
    personality!: string;
    password!: string;
    miniature!: string;
   
    constructor(input: User) {
      Object.assign(this, input);
  }
  }