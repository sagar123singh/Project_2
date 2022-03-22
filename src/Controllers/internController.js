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
        if(!isValidRequestBody(data)){
            return res.status(400).send({status: false, msg:'BAD request plz provide valid data'})
        }
        if(!isValid(name)){
            return res.status(400).send({status: false, msg: ' BAD request plz provide valid name'})
        }
      
        if(!isValid(collegeName)){
          return res.status(400).send({status: false, msg: ' BAD request plz provide valid collegeName '})
      }
      const college = await collegeModel.find({ fullName : collegeName})
      if(!isValid(college)){
          return res.status(400).send({status: false, msg: ' BAD request  college not found'})
      }

        

             ///email validation start
            if(!isValid(mobile)){
            return res.status(400).send({status: false, msg: 'BAD request plz provide valid mobile'})
        }
          
        if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
          res.status(400).send({status:false, message:'email should be a valid email address'})
          return
        } 
        
        
        const isEmailAlreadyUsed= await  internModel.findOne({email});

        if(isEmailAlreadyUsed){
        res.status(400).send({status:false, message:`${email} email is already registered`})
        return
          }
            ///email validation end



        /// validation mobile
        const isMobileAlreadyUsed= await  internModel.findOne({mobile});

        if(isMobileAlreadyUsed){
        res.status(400).send({status:false, message:`${mobile} mobile is already registered`})
        return
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







const getInternCollegeDetails = async function(req,res){
  try{
    const collegeName= req.query.collegeName
    if(!isValid(collegeName)) { return res.status(400).send({status:false,msg:"BAD REQUEST please provide valid college"})}

    const college =await collegeModel.find({name:collegeName, isDeleted:false})
    if(!isValid(college)){
            return res.status(400).send({status: false, msg: ' BAD request  college not found'})
    }
           const collegeId= college[0]._id

      //       const internName =await internModel.find({collegeId:collegeId, isDeleted:false})

      //       const interns=[];
      //       for(let i=0;i<internName.length;i++){
      //         let object ={}
      //         object._id =internName[i]._id
      //         object.name=internName[i].name
      //         object.email= internName[i].email
      //         object.mobile= internName[i].mobile
      //         interns.push(object)
      //       }

      //       const ObjectData ={name:college[0].name,
      //       fullName:college[0].fullName,
      //     logoLink:college[0].logoLink,
      //   interns:interns
      // }

      let interns = await internModel.find({ collegeId: collegeId }).select({ name: 1, email: 1, mobile: 1, _id: 1 });
    let result = await collegeModel.find({ name: collegeName }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 });

    const object = {
      name: result[0].name,
      fullName: result[0].fullName,
      logoLink: result[0].logoLink,
      intrests: interns,
    };
      return res.status(201).send({status:true,count: interns.length,data:object})


  } catch(error){
    res.status(500).send({status:false,msg:error.message})
  }
}


  module.exports.createIntern=createIntern;
  module.exports.getInternCollegeDetails=getInternCollegeDetails;