import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1746297466597 implements MigrationInterface {
    name = 'CreateDatabase1746297466597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('PROFISSIONAL_SAUDE', 'SECRETARIA')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."users_roles_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD "professional" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_450e525c98e99d57898f999afdd" FOREIGN KEY ("professional") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_450e525c98e99d57898f999afdd"`);
        await queryRunner.query(`ALTER TABLE "consultations" DROP COLUMN "professional"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
    }

}
