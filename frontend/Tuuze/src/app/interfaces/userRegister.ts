
export interface userRegister{
  // user_id:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string,
}



export  interface allUsers {

  message: [

    {
    user_id:string,
    firstName: string,
    lastName: string,
    email: string,
    password: string}],

   token: [{}],

    error: []

}


export interface oneUser {
  message: [
     {
      firstName: string,
      lastName: string,
      email: string,
       password: string}
      ],

  token: [{}],

  error: []
}
