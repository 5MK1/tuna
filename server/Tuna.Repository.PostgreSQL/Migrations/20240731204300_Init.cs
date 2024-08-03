using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

#nullable disable

namespace Tuna.Repository.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "document",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(26)", nullable: false),
                    AuthorId = table.Column<string>(type: "character varying(26)", nullable: false),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_document", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "documentNode",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(26)", nullable: false),
                    DocumentId = table.Column<string>(type: "character varying(26)", nullable: false),
                    ParentNodeId = table.Column<string>(type: "character varying(26)", nullable: true),
                    Data = table.Column<DocumentNodeData>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_documentNode", x => x.Id);
                    table.ForeignKey(
                        name: "FK_documentNode_document_DocumentId",
                        column: x => x.DocumentId,
                        principalTable: "document",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "documentNodeAction",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(26)", nullable: false),
                    UserId = table.Column<string>(type: "character varying(26)", nullable: false),
                    DocumentNodeId = table.Column<string>(type: "character varying(26)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ActionType = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Data = table.Column<DocumentNodeActionData>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_documentNodeAction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_documentNodeAction_documentNode_DocumentNodeId",
                        column: x => x.DocumentNodeId,
                        principalTable: "documentNode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_document_AuthorId",
                table: "document",
                column: "AuthorId")
                .Annotation("Npgsql:IndexMethod", "hash");

            migrationBuilder.CreateIndex(
                name: "IX_documentNode_DocumentId",
                table: "documentNode",
                column: "DocumentId")
                .Annotation("Npgsql:IndexMethod", "hash");

            migrationBuilder.CreateIndex(
                name: "IX_documentNodeAction_DocumentNodeId_CreatedAt",
                table: "documentNodeAction",
                columns: new[] { "DocumentNodeId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_documentNodeAction_UserId",
                table: "documentNodeAction",
                column: "UserId")
                .Annotation("Npgsql:IndexMethod", "hash");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "documentNodeAction");

            migrationBuilder.DropTable(
                name: "documentNode");

            migrationBuilder.DropTable(
                name: "document");
        }
    }
}
