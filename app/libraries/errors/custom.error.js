export default class CustomError extends Error {

  constructor(message, Obj){
    super(message, Obj);
    this.status = Obj.status || 500;
    this.message = message;
  }

}
