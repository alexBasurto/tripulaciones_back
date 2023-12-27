# BACK DESAFIO TRIPULACIONES

## Apuntes varios
- Repositorio privado y con licencia Creative Commons
- Funciones extra como el 'superadministrador' podemos planificarlas, y dependiendo del tiempo que tengamos:
    - No se llevan a cabo.
    - Se llevan a cabo en el back.
    - Se llevan a cabo en back y front.


## Funcionalidad del back
- Superadministrador:
    - CRUD empresas/clientes.
    - CRUD admin. empresas/clientes.
    - Puede ver todas las empresas.
- Administrador:
    - En principio es alguien del dpt. de RRHH de cada empresa.
    - Solo ve datos de su propia empresa.
    - CRUD empleados.
    - CRUD departamentos.
    - CRUD sedes.
    - CRUD turnos.
- Trabajador:
    - Rellenar formulario diario.
    - Canal comunicación RRHH (anónimo por defecto).
- Votaciones:
    - CR de votación por cada trabajador.
    - 

## Dudas
- ¿Los motivos son universales o dependen de la puntuación del 1 al 5 previa?
Necesitamos saber esto para saber como relacionar la tabla tbReasons con el resto de tablas.
Universales en bbdd y separarmos por lógica de JS.
- ¿Cómo deben llegar los reportes a RRHH? Solo por el dashboard.
- ¿Se va a fichar desde esta app? No.
- Notificaciones del navegador.

## Estructura SQL
Este es el esquema de la base de datos.

```mermaid
erDiagram

    tbCompanies {
        id idCompany PK
        string CIF
        string displayName
        string razonSocial
        string comments
    }

    tbCompanies |o--o{ tbDepartments : allow
    tbDepartments {
        id idDepartment PK
        id idCompany FK
        string departmentName
        string comments
    }

    tbCompanies |o--o{ tbBranchs : allow
    tbBranchs {
        id idBranch PK
        id idCompany FK
        string branchName
        string location
        string comments
    }

    tbCompanies |o--o{ tbShifts : allow
    tbShifts {
        id idShift PK
        id idCompany FK
        string shiftName
        string comments

    }

    tbCompanies |o--o{ tbEmployees : allow
    tbEmployees {
        id idEmployee PK
        id idCompany FK
        id idDepartment FK
        id idBranch FK
        id idShift FK
        string name
        string lastName
        string email
        string mobile
        string comments
        string passwordHash
        bool companyAdministrator
        bool superAdministrator
    }

    tbEmployees |o--o{ tbVoting : allow
    tbVoting {
        id idVoting PK
        id idEmployee FK
        id idScore FK
        bool entry
        date dateOfVoting
    }

    tbTags {
        id idTag PK
        string tagName
    }

    tbTags |o--o{ tbVotingTags : allow
    tbVoting |o--o{ tbVotingTags : allow
    tbVotingTags {
        id idVotingTag PK
        id idVoting FK
        id idTag FK
    }

```