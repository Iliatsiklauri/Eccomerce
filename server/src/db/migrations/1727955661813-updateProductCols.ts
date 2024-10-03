import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductCols1727955661813 implements MigrationInterface {
    name = 'UpdateProductCols1727955661813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "pinnedImage" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brand" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "inStock" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "inStock" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pinnedImage"`);
    }

}
