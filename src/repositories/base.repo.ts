import {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from "typeorm";

/**
 * Gắn `manager` theo `dataSource.manager` (động) để `typeorm-transactional`
 * có thể thay EntityManager trong transaction — `this.repo.find/save` hoạt động trong `@Transaction()`.
 */
export abstract class Repo<T extends ObjectLiteral> extends Repository<T> {
  private readonly _dataSource: DataSource;

  protected constructor(
    entity: EntityTarget<T>,
    dataSource: DataSource,
  ) {
    super(entity, dataSource.manager);
    this._dataSource = dataSource;
    Object.defineProperty(this, "manager", {
      get: () => this._dataSource.manager,
      enumerable: true,
      configurable: true,
    });
  }
}
