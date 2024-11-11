import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderEntity1731063967110 implements MigrationInterface {
    name = 'AddOrderEntity1731063967110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`);
        await queryRunner.query(`CREATE TYPE "public"."order_orderstatus_enum" AS ENUM('pending', 'failed', 'fullfiled')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "products" json NOT NULL, "address" json NOT NULL, "orderStatus" "public"."order_orderstatus_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_orderstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
