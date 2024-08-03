-- AlterTable
ALTER TABLE "journal_entries" ADD COLUMN     "isBookmarked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reminders" ALTER COLUMN "time" SET DEFAULT '09:00:00';
