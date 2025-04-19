import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1745077382209 implements MigrationInterface {
    name = 'CreateDatabase1745077382209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consultations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "situation" "public"."consultations_situation_enum" NOT NULL, "previousConsultations" jsonb, "currentQuery" text NOT NULL, "patientAttention" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "scheduling_id" uuid NOT NULL, CONSTRAINT "REL_11822384b25ba447382b8c3613" UNIQUE ("scheduling_id"), CONSTRAINT "PK_c5b78e9424d9bc68464f6a12103" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "consultations" ADD CONSTRAINT "FK_11822384b25ba447382b8c3613e" FOREIGN KEY ("scheduling_id") REFERENCES "schedulings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultations" DROP CONSTRAINT "FK_11822384b25ba447382b8c3613e"`);
        await queryRunner.query(`DROP TABLE "consultations"`);
    }

}
