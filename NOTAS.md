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
- Las etiquetas son universales, no dependen de la puntuación del 1 al 5 previa
- Los reportes a RRHH llegan solo por el dashboard, y en 2a fase, por mail.
- Notificaciones del navegador.

## Estructura SQL
Este es el esquema de la base de datos.

La base de datos tiene la siguiente carencia: a un trabajador le puedes añadir departamentos, sedes, turnos y empresas que estén vinculados a empresas distintas entre sí. Para solucionarlo, la tabla empleados tiene un trigger before insert, que comprueba que empresa, departamento, sede y turno pertenezcan a la misma empresa o sean Null. En caso contrario, devuelve error 45000.

```mermaid
erDiagram

    tbCompanies {
        id idCompany PK
        string CIF
        string displayName
        string razonSocial
        string horaEntrada
        string comments
    }

    tbCompanies |o--o{ tbDepartments : allow
    tbDepartments {
        id idDepartment PK
        id idCompany FK
        string departmentName
        string departmentCode
        string comments
    }

    tbCompanies |o--o{ tbBranchs : allow
    tbBranchs {
        id idBranch PK
        id idCompany FK
        string branchName
        string branchCode
        string location
        string comments
    }

    tbCompanies |o--o{ tbShifts : allow
    tbShifts {
        id idShift PK
        id idCompany FK
        string shiftName
        string shiftCode
        string horaEntrada
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

    tbEmployees |o--o{ tbReports : allow
    tbCompanies |o--o{ tbReports : allow
    tbReports {
        id idReport PK
        id idEmployee FK
        id idCompany FK
        string report
    }

```