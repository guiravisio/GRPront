using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GRProntAPI.Migrations
{
    /// <inheritdoc />
    public partial class CreateTriggerPatients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE TRIGGER trg_Patients_Insert
                ON Patients
                AFTER INSERT
                AS
                BEGIN
                    SET NOCOUNT ON;
                    UPDATE Patients
                    SET CreatedAt = SYSUTCDATETIME(),
                        UpdatedAt = SYSUTCDATETIME()
                    WHERE Id IN (SELECT Id FROM inserted);
                END;
            ");

            migrationBuilder.Sql(@"
                CREATE TRIGGER trg_Patients_Update
                ON Patients
                AFTER UPDATE
                AS
                BEGIN
                    SET NOCOUNT ON;
                    UPDATE Patients
                    SET UpdatedAt = GETDATE()
                    WHERE Id IN (SELECT Id FROM inserted);
                END;
            ");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_Patients_Update;");
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_Patients_Insert;");
        }
    }
}
