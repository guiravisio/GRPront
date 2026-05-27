using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GRProntAPI.Migrations
{
    /// <inheritdoc />
    public partial class AlterPatientsAddressNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GuardianCPF",
                table: "Patients",
                newName: "GuardianPhone");

            migrationBuilder.AddColumn<string>(
                name: "AddressNumber",
                table: "Patients",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressNumber",
                table: "Patients");

            migrationBuilder.RenameColumn(
                name: "GuardianPhone",
                table: "Patients",
                newName: "GuardianCPF");
        }
    }
}
