-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_auditorias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "tabla" TEXT NOT NULL,
    "registroId" TEXT,
    "datosAntes" TEXT,
    "datosDespues" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "auditorias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_auditorias" ("accion", "createdAt", "datosAntes", "datosDespues", "id", "ipAddress", "modulo", "registroId", "tabla", "usuarioId") SELECT "accion", "createdAt", "datosAntes", "datosDespues", "id", "ipAddress", "modulo", "registroId", "tabla", "usuarioId" FROM "auditorias";
DROP TABLE "auditorias";
ALTER TABLE "new_auditorias" RENAME TO "auditorias";
CREATE INDEX "auditorias_usuarioId_createdAt_idx" ON "auditorias"("usuarioId", "createdAt");
CREATE INDEX "auditorias_modulo_tabla_idx" ON "auditorias"("modulo", "tabla");
CREATE TABLE "new_configuraciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "empresaId" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "modulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "configuraciones_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_configuraciones" ("clave", "createdAt", "descripcion", "empresaId", "id", "modulo", "updatedAt", "valor") SELECT "clave", "createdAt", "descripcion", "empresaId", "id", "modulo", "updatedAt", "valor" FROM "configuraciones";
DROP TABLE "configuraciones";
ALTER TABLE "new_configuraciones" RENAME TO "configuraciones";
CREATE UNIQUE INDEX "configuraciones_empresaId_modulo_clave_key" ON "configuraciones"("empresaId", "modulo", "clave");
CREATE TABLE "new_roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "permisos" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_roles" ("activo", "createdAt", "descripcion", "id", "nombre", "permisos", "updatedAt") SELECT "activo", "createdAt", "descripcion", "id", "nombre", "permisos", "updatedAt" FROM "roles";
DROP TABLE "roles";
ALTER TABLE "new_roles" RENAME TO "roles";
CREATE UNIQUE INDEX "roles_nombre_key" ON "roles"("nombre");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
