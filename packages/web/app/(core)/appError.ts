/** データベース例外 */
export class DatabaseError extends Error {
  /** ステータスコード（api用） */
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 500
  }
}
