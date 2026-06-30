import { AsyncLocalStorage } from 'node:async_hooks';

export class UserContext {
  private static readonly storage = new AsyncLocalStorage<string>();

  static setUser(userId: string) {
    this.storage.enterWith(userId);
  }

  static getUserId(): string | undefined {
    return this.storage.getStore();
  }

  static run<T>(userId: string, callback: () => T): T {
    return this.storage.run(userId, callback);
  }
}
