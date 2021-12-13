const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  companytel: {
    type: String,
    required: true,
  },
  markerpath: {
    type: String,
    required: false,
  },

});

const Company = mongoose.model("Company", CompanySchema);

Company.getCompanyById = function (id, callback) {
  Company.findById(id, callback);
};


Company.getAll = function (callback) {
  Company.find(callback);
};

Company.getCompanyByUsername = function (username, callback) {
  const query = { username: username };
  Company.findOne(query, callback);
};

Company.addCompany = function (newCompany, callback) {
  newCompany.save(callback);
};

Company.updateCompany = function (username, newCompany, callback) {
  const query = { username: username };
  const update = {
    companyname: newCompany.companyname,
    companytel: newCompany.companytel,
    markerpath: newCompany.markerpath,
  };

  Company.findOneAndUpdate(
    query,
    update,
    { new: true, useFindAndModify: false },
    callback
  );
};

module.exports = Company