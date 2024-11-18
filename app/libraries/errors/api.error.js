export default class ApiError extends Error {

  constructor(message, Obj){
    super(message, Obj);
    this.name = 'ApiError';
    this.status = Obj.status || 500;
    this.message = message;
  }

}
