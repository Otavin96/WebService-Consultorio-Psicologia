import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1746751523376 implements MigrationInterface {
    name = 'CreateDatabase1746751523376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_450e525c98e99d57898f999afdd"`);
        await queryRunner.query(`ALTER TABLE "consultations" ALTER COLUMN "professional" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_450e525c98e99d57898f999afdd" FOREIGN KEY ("professional") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_450e525c98e99d57898f999afdd"`);
        await queryRunner.query(`ALTER TABLE "consultations" ALTER COLUMN "professional" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_450e525c98e99d57898f999afdd" FOREIGN KEY ("professional") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
