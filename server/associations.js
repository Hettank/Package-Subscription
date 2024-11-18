import User from "./model/auth.model.js";
import Package from "./model/package.model.js";

Package.hasMany(User)
User.belongsTo(Package)