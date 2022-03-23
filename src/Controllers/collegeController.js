const collegeModel = require("../Models/collegeModel");

const isValid = function(value){
  if(typeof value === 'undefined'|| value ===  null) return false
  if(typeof value=== 'string' && value.trim().length ===0) return false
  return true;
}


const isValidRequestBody= function (requestBody){
  return Object.keys(requestBody).length>0
}



const createCollege = async function (req, res) {
  try {
    let college=req.body;
    const { name, fullName, logoLink } = college;

    if (!isValidRequestBody(req.body)){
      return res.status(400).send({ status: false, message: "Please fill all the details" });
    }
////name validations starts
    if (!isValid(name)) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST please provided valid name" });
    }
    var nameRules = /^[a-z]*$/;
     
    if (nameRules.test(name) == false) {
       
        return res.status(400).send({status:false, msg:"BAD REQUEST please provided valid name which do not contain any special chatecters and capital letters"})
      
    }
    const nameAlreadyUsed= await  collegeModel.findOne({name});

    if(nameAlreadyUsed){
    res.status(400).send({status:false, message:`${name} this name is already registered`})
    return
    }
      /// name validation ends

    if (!isValid(!fullName)) {  return res.status(400).send({status: false,msg: "BAD REQUEST please provided valid fullName",});
    }
    if (!isValid(logoLink)) {  return res.status(400).send({status: false,msg: "BAD REQUEST please provided valid logoLink", });
    }

    let collegeCreated = await collegeModel.create(college);
    return res.status(201).send({ status: true, data: collegeCreated });
  } catch (err) {  return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createCollege = createCollege;
