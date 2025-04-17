import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1744851820196 implements MigrationInterface {
    name = 'CreateDatabase1744851820196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clients_roles_enum" AS ENUM('secretaria', 'profissional_saude')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" text NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "roles" "public"."clients_roles_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressCep" text NOT NULL, "addressPublicplace" text NOT NULL, "addressNumberhouse" text NOT NULL, "addressNeighborhood" text NOT NULL, "addressState" text NOT NULL, "addressCity" text NOT NULL, "contactPhone" text NOT NULL, "contactWhatsapp" text NOT NULL, "contactEmail" text NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedulings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "time" TIME NOT NULL, "observations" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid NOT NULL, "consultation_id" uuid NOT NULL, CONSTRAINT "REL_b5f560c713e4f6d52b999822c2" UNIQUE ("consultation_id"), CONSTRAINT "PK_1998a31cdba907f98e2624dea5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5b2d9cbfa65fc8b25a0ce84f63" ON "schedulings" ("date", "time") `);
        await queryRunner.query(`CREATE TYPE "public"."consultations_situation_enum" AS ENUM('In progress', 'Completed')`);
        await queryRunner.query(`CREATE TABLE "consultations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "time" TIME NOT NULL, "situation" "public"."consultations_situation_enum" NOT NULL, "prevConsultation" text NOT NULL, "currentQuery" text NOT NULL, "patientAttention" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b78e9424d9bc68464f6a12103" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedulings" ADD CONSTRAINT "FK_8071b335e59137c9b66270cb690" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedulings" ADD CONSTRAINT "FK_b5f560c713e4f6d52b999822c2e" FOREIGN KEY ("consultation_id") REFERENCES "consultations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedulings" DROP CONSTRAINT "FK_b5f560c713e4f6d52b999822c2e"`);
        await queryRunner.query(`ALTER TABLE "schedulings" DROP CONSTRAINT "FK_8071b335e59137c9b66270cb690"`);
        await queryRunner.query(`DROP TABLE "consultations"`);
        await queryRunner.query(`DROP TYPE "public"."consultations_situation_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b2d9cbfa65fc8b25a0ce84f63"`);
        await queryRunner.query(`DROP TABLE "schedulings"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "public"."clients_roles_enum"`);
    }

}
