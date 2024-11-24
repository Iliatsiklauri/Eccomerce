import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPinnedImageKeyToProduct1727969658793
  implements MigrationInterface
{
  name = "AddPinnedImageKeyToProduct1727969658793";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "pinnedImageFilePath" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "pinnedImageFilePath"`
    );
  }
}
