import { Subject } from 'rxjs'

export default class LogObservable<T> {
  // private _handler?: Function | null

  private _observable: Subject<T>

  public constructor() {
    this._observable = this.create()
  }

  private create(): Subject<T> {
    this._observable = new Subject<T>()
    return this._observable
    // return new Observable<T>(subscriber => {
    //   const handler = logs => subscriber.next(logs)
    //   this.register(handler)
    //   return this.unRegister
    // })
  }

  private getObservable(): Subject<T> {
    return this._observable || this.create()
  }

  public subscribe(callback: (value: T) => void): void {
    this.getObservable().subscribe(callback)
  }

  public unsubscribe(): void {
    this.getObservable().unsubscribe()
  }

  public next(message: T): void {
    this.getObservable().next(message)
  }
}
