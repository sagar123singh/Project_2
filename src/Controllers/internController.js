const internModel= require('../Models/internModel')
const collegeModel = require("../Models/collegeModel");

const isValid = function(value){
    if(typeof value === 'undefined'|| value ===  null) return false
    if(typeof value=== 'string' && value.trim().length ===0) return false
    return true;
  }
  
  
  const isValidRequestBody= function (requestBody){
    return Object.keys(requestBody).length>0
  }


  const createIntern = async function (req, res) {
    try {
        let data = req.body;
        const {name, email, mobile, collegeName} = data
        if(!isValidRequestBody(data)){ return res.status(400).send({status: false, msg:'BAD request plz provide valid data'})
        }
        if(!isValid(name)){ return res.status(400).send({status: false, msg: ' BAD request plz provide valid name'})
        }
      
      const college = await collegeModel.find({ fullName : collegeName})
      if(!isValid(college)){   return res.status(400).send({status: false, msg: ' BAD request  college not found'})
      }

        
      if(!isValid(collegeName)){ return res.status(400).send({status: false, msg: ' BAD request plz provide valid collegeName '})
    }

             ///email validation start
            if(!isValid(mobile)){  return res.status(400).send({status: false, msg: 'BAD request plz provide valid mobile'})
        }
          
        if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {  res.status(400).send({status:false, message:'email should be a valid email address'})
          return
        } 
        
        
        const isEmailAlreadyUsed= await  internModel.findOne({email});

        if(isEmailAlreadyUsed){ return res.status(400).send({status:false, message:`${email} email is already registered`}) }
            ///email validation end



        /// validation mobile
        const isMobileAlreadyUsed= await  internModel.findOne({mobile});

        if(isMobileAlreadyUsed){ return res.status(400).send({status:false, message:`${mobile} mobile is already registered`})
        }

        
      if (/^[1-9]{1}[0-9]{9}$/.test(mobile) == false) {
          console.log("Please enter valid mobile number.");
          return res.status(400).send({status:false, msg:"BAD REQUEST please provided valid mobile which contain only numbers"})
        
      }


        if (mobile.length > 10 || mobile.length < 10) {
          return res.status(422).send({ status: false, msg: `Mobile No : ${mobile} is not valid number` })
        }
          ///mobile validation end

            req.body.collegeId=college[0]._id
            delete req.body["collegeName"]

         let internCreated = await internModel.create(data)
        res.status(201).send({status: true, output: internCreated})
    }
    catch(err) {
        res.status(500).send({status: false, msg: err.message})
    }
}



const getInternCollegeDetails = async function (req, res) {
  try {
    const collegeName =req.query.collegeName
      if (!isValid(req.query.collegeName)) {
       return   res.status(400).send({ status: false, message: 'collegeName is not a valid  name' })
          
      }
      let collegeDetail = await collegeModel.findOne({ name: collegeName, isDeleted: false })
      console.log(collegeDetail);
      if (!collegeDetail) {
     return     res.status(400).send({ status: false, msg: "No college found " })
          
      }

      let { _id, name, fullName, logoLink } = collegeDetail

      let allInterns = await internModel.find({ collegeId: _id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1,_id:1 })
      console.log(allInterns)
      if (allInterns.length === 0) return res.status(400).send({ status: false, msg: "no intern applied for this college" })

      let College = { name, fullName, logoLink, intrests: allInterns }
      return res.status(201).send({status:true,count:allInterns.length,  data:College})
  }
  catch (err) {
      res.status(500).send({ status: false, msg: err.message })
  }

};



  module.exports.createIntern=createIntern;
  module.exports.getInternCollegeDetails=getInternCollegeDetails;