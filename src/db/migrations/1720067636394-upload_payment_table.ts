import { MigrationInterface, QueryRunner } from 'typeorm';

export class UploadPaymentTable1720067636394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE payment
              ADD COLUMN url_image VARCHAR(255);
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE payment
            DROP COLUMN url_image;
        `);
  }
}
