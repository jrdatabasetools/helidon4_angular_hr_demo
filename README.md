# PL/SQL Connector Builder Example - Helidon 4 Angular Demo

## Prerequisites

### The MicroProfile/Angular Connector Builder is in Experimental State

## Only the following Configuration is working
- Integer Conversion : java.lang.Integer
- Double Conversion : java.lang.Double
- Date Conversion :  Json-ISO8601 Date-Format
- Timestamp conversion : Json-ISO8601 Date-Time-Format
- Transfer Object Field Access : Public Fields
- Only scalar input parameter parameter types are supported - scalar and complex output parameter types are supported (only subclasses user defined types are unsupported since mapping to Json payloads is not possible)

### Installed Software

- Java 21
- Docker 
- Maven 3.x

### Oracle Database XE 21c

- **Windows** : Run **run_oracle.cmd** from the command line of the project root to start a preconfigured database (git-bash will not work).
- **Linux/OSX** : Run **run_oracle.sh** from the command line of the project root to start 
- An Oracle 21c XE (Express Edition) will be downloaded as Docker image.
- All Sql scripts in the folder **ora_db_startup** will be executed after startup.
- About 5 GB will be downloaded and require about 12 GB in the docker registry.

### Oracle Connection Info

- The default password for the administration users SYS, SYSTEM and PDBADMIN are set to 'oracle'.
- A preconfigured schema 'HR' identified by password 'hr' is created during setup.
- Url to the schema 'HR' is 'jdbc:oracle:thin:@localhost:1521/xepdb1'


## Master-Detail Demonstration
This is a Master-Detail Demonstration written in Angular 17 is using the Oracle HR Demo Schema.

1. The Master-View works as a search dialog for employees.
2. The Detail-View allows editing or deleting of employees.

## Getting Started - Demonstration

- Startup the Oracle DB.
- Run **mvn -Pautorun** from the command line : Runs the PL/SQL Connector Builder, compiles the Application and starts the Application using the Oracle DB.
- Should also startup a browser with this URL **http://localhost:8080**.

## Getting Started - Development

- Startup the Oracle DB.
- Run Helidon4 Server 
    - Use Maven build and run profile : **mvn -Pautorun**
    - Or run separatly **mvn clean install** and start application **java -jar target/helidon4_angular.jar**
- Run Angular
    - **ng serve**
    - URL: **http://localhost:4200**

