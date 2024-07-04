import { MigrationInterface, QueryRunner } from 'typeorm';

export class Payments1719902846193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`
    CREATE TABLE payment (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        id_account uuid NOT NULL,
        valor DECIMAL(10, 2) NOT NULL,
        data TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        descricao VARCHAR(255) NOT NULL,
        FOREIGN KEY (id_account) REFERENCES account(id)
    );
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS payment;`);

  }
}
