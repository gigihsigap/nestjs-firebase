import { Migration } from '@mikro-orm/migrations';

export class Migration20211219155639 extends Migration {

  async up(): Promise<void> {
    // this.addSql('CREATE TABLE "user" (id SERIAL PRIMARY KEY, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);');

    this.addSql('CREATE TABLE "user" (id SERIAL PRIMARY KEY, uid VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL);');
    this.addSql('ALTER TABLE "user" ADD COLUMN "latest_login" TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP;');
    this.addSql('ALTER TABLE "user" ADD COLUMN "deleted_at" TIMESTAMP(0) WITHOUT TIME ZONE;');

  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE "user";');
  }
}
  

