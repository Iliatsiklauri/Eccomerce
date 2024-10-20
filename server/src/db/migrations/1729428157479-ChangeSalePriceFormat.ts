import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSalePriceFormat1729428157479 implements MigrationInterface {
  name = "ChangeSalePriceFormat1729428157479";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "salePrice" TYPE double precision USING "salePrice"::double precision`
    );

    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE double precision USING "price"::double precision`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "salePrice" TYPE integer USING "salePrice"::integer`
    );

    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE integer USING "price"::integer`
    );
  }
}
