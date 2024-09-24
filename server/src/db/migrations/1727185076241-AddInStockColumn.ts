import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInStockColumn1727185076241 implements MigrationInterface {
    name = 'AddInStockColumn1727185076241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "inStock" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "inStock"`);
    }

}
