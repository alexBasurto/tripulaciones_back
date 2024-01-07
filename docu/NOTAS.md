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

## Plazos
- Back: día 9
- Front: días 11 - 12
    - Gráficos de data: día 13
- VPS: día 15-16

## Estructura SQL
Este es el esquema de la base de datos.

La tabla trabajadores posee un trigger before insert que comprueba que el trabajador, el departamento, el turno y la sede pertenezcan a la misma empresa. En caso contrario, devuelve un error 45000.

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
    tbCompanies |o--o{ tbBranchs : allow
    tbCompanies |o--o{ tbShifts : allow
    tbCompanies |o--o{ tbEmployees : allow
    tbCompanies |o--o{ tbComments : allow

    tbDepartments {
        id idDepartment PK
        id idCompany FK
        string name
        string comments
    }
    tbDepartments |o--o{ tbEmployees : allow

    
    tbBranchs {
        id idBranch PK
        id idCompany FK
        string name
        string location
        string comments
    }
    tbBranchs |o--o{ tbEmployees : allow

    tbShifts {
        id idShift PK
        id idCompany FK
        string name
        string comments

    }
    tbShifts |o--o{ tbEmployees : allow

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
    tbEmployees |o--o{ tbComments : allow

    tbScores |o--o{ tbVoting : allow
    tbScores |o--o{ tbVoting : allow
    tbScores {
        id idScore PK
        string name
    }

    tbFeelings {
        id idFeeling PK
        string name
    }
    tbFeelings |o--o{ tbVotingFeelings : allow

    tbReasons {
        id idReason PK
        string name
    }
    tbReasons |o--o{ tbVotingReasons : allow
    
    tbVoting {
        id idVoting PK
        id idEmployee FK
        id idCompany FK
        date previousDay
        int previousDayScore FK
        date currentDay
        int currentDayScore FK
    }
    tbVoting |o--o{ tbVotingFeelings : allow
    tbVoting |o--o{ tbVotingReasons : allow

    tbVotingFeelings {
        id idVotingFeelings PK
        id idVoting FK
        id idFeeling FK
    }

    tbVotingReasons {
        id idVotingReasons PK
        id idVoting FK
        id idReason FK
    }


    tbComments {
        id idComment PK
        id idEmployee FK
        id idCompany FK
        string report
    }

```

## Notas rápidas:

Sacar la IP del contenedor de docker de node:
```docker inspect node_tripulaciones | grep IPAddress```


#### Ventanas inicio sesión:
Usuario:
- localhost:3020/
- dni

Admin y superadmin:	
- localhost:3020/admin
- mail
