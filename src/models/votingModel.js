import sequelize from "../config/sequelize.js";

const votingModel = sequelize.define('tbVoting', {
    idVoting: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.Sequelize.INTEGER
    },
    idEmployee: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    },
    idCompany: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    },
    previousDay: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: false
    },
    previousDayScore: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    },
    currentDay: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: false
    },
    currentDayScore: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

export default votingModel;

/*
CREATE TABLE IF NOT EXISTS `tripulaciones`.`tbVoting` (
  `idVoting` INT NOT NULL AUTO_INCREMENT,
  `idEmployee` INT NOT NULL,
  `idCompany` INT NOT NULL,
  `previousDay` DATE NOT NULL,
  `previousDayScore` INT NOT NULL,
  `currentDay` DATE NOT NULL,
  `currentDayScore` INT NOT NULL,
  PRIMARY KEY (`idVoting`),
  INDEX `fk_tbVoting_tbEmployees1_idx` (`idEmployee` ASC) VISIBLE,
  INDEX `fk_tbVoting_tbScores1_idx` (`previousDayScore` ASC) VISIBLE,
  INDEX `fk_tbVoting_tbScores2_idx` (`currentDayScore` ASC) VISIBLE,
  INDEX `fk_tbVoting_tbCompanies1_idx` (`idCompany` ASC) VISIBLE,
  CONSTRAINT `fk_tbVoting_tbEmployees1`
    FOREIGN KEY (`idEmployee`)
    REFERENCES `tripulaciones`.`tbEmployees` (`idEmployee`),
  CONSTRAINT `fk_tbVoting_tbScores1`
    FOREIGN KEY (`previousDayScore`)
    REFERENCES `tripulaciones`.`tbScores` (`idScore`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbVoting_tbScores2`
    FOREIGN KEY (`currentDayScore`)
    REFERENCES `tripulaciones`.`tbScores` (`idScore`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbVoting_tbCompanies1`
    FOREIGN KEY (`idCompany`)
    REFERENCES `tripulaciones`.`tbCompanies` (`idCompany`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
*/