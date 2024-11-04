import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCartToUser1730714467623 implements MigrationInterface {
    name = 'AddCartToUser1730714467623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_products_product" ("cartId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_785ab9c1dbede19ef42bf12280b" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e6ce39be5d354954a88ded1eba" ON "cart_products_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0fc996e42b6330c97f8cffbddf" ON "cart_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_342497b574edb2309ec8c6b62aa" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa"`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cartId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fc996e42b6330c97f8cffbddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6ce39be5d354954a88ded1eba"`);
        await queryRunner.query(`DROP TABLE "cart_products_product"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
