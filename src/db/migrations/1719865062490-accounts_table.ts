import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountsTable1719865062490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
        CREATE TABLE account (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            nome VARCHAR(100) NOT NULL,
            tipo_de_conta VARCHAR(50) NOT NULL,
            saldo_inicial DECIMAL(10, 2) NOT NULL
        );
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS account;`);
  }
}
