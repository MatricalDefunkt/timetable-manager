import { Sequelize } from "sequelize";
import Logger from "../../utils/logging";

const sequelize = new Sequelize("sqlite::memory:");

export default sequelize;
