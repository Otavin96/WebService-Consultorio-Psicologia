import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1745767972030 implements MigrationInterface {
    name = 'CreateDatabase1745767972030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."clients_roles_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clients_roles_enum" AS ENUM('secretaria', 'profissional_saude', 'usuario')`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "roles" "public"."clients_roles_enum" NOT NULL`);
    }

}
