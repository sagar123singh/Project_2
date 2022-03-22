const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
      required: "name is required",
    },
    fullName: {
      type: String,
      trim:true,
      required: "fullName is required",
    },
    logoLink: {
      type: String,
      required: "URL can't be empty"
       // url: {
        //     work: mongoose.SchemaTypes.Url,
        //     profile: mongoose.SchemaTypes.Url
        // }
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  }
);
module.exports = mongoose.model("College", collegeSchema);
