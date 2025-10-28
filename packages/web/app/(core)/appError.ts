/** アプリケーション固有の例外 */
export class AppError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/** データベース例外 */
export class DatabaseError extends AppError {
  /** ステータスコード（api用） */
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 500
  }
}
