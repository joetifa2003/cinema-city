export default class Base {
  constructor(
    public id: string,
    public timestamp: firebase.firestore.Timestamp
  ) {}
}