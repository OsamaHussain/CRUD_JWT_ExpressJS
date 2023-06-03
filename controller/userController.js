const userModel = require('../model/userModel');
const bcrypt = require('bcrypt-inzi');
const jwtAuthorization = require('../middleware/jsonwebtoken');

const signup = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const existing = await userModel.findOne({email});
        if(existing){
            return res.status(400).json({message: "User already Exist"});
        }
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are Required (i.e name, email, password)"});
        }
        const hashedPassword = await bcrypt.stringToHash(password, 10);
        const user = await new userModel({name, email, password:hashedPassword});
        await user.save();
        const token = jwtAuthorization.signToken(req.body);
        return res.status(200).json({message: "User Successfully Registered", user, token});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Registration" : error});
    }
}

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All Fields are Required to be Filled (i.e email, password)"});
        }
        const user = await userModel.findOne({email});
        const verifyHash = await bcrypt.varifyHash(password,user.password);
        if(email == user.email){
            if(!verifyHash){
                return res.status(400).json({message: "Wrong Password"});
            }
            return res.status(200).json({message: "User Successfully Logged In", user});
        }else {
            return res.status(400).json({message: "User Email Does not Exist"})
        }
    }
    catch (error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Login" : error});
    }
}

const getAllUsers = async (req, res)=>{
    try {
        const users = await userModel.find();
        if(!users){
            return res.status(400).json({message: "No Users Found"});
        }
        return res.status(200).json({message: "User Found Successfully", users});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Login" : error});
    }
}

const getUserByEmail = async (req, res)=>{
    try {
        const {email} = req.body;
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(400).json({message: "No User Found with Email You Provide."});
        }
        return res.status(200).json({message: "User Found Successfully", user});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Finding User by Email" : error});
    }
}

const getUserById = async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user){
            return res.status(400).json({message: "No User Found with ID You Provide."});
        }
        return res.status(200).json({message: "User Found Successfully", user});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Finding User by ID" : error});
    }
}

const updateUserByEmail = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const user = await userModel.findOneAndUpdate({email}, {name,password});
        if (!user){
            return res.status(400).json({message: "No User Found with Email You Provide."});
        }
        const updatedUser = await userModel.findOne({email});
        return res.status(200).json({message: "User Successfully Updated", updatedUser});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Updating User by Email" : error});
    }
}

const updateUserById = async (req, res)=>{
    try {
        const id = req.params.id;
        const {name, email, password} = req.body;
        const user = await userModel.findByIdAndUpdate(id, {name,email,password});
        if (!user){
            return res.status(400).json({message: "No User Found with ID You Provide."});
        }
        const updatedUser = await userModel.findById(id);
        return res.status(200).json({message: "User Successfully Updated", updatedUser});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Updating User by ID" : error});
    }
}

const deleteUserByEmail = async (req, res)=>{
    try {
        const {email} = req.body;
        const user = await userModel.findOneAndRemove({email});
        if (!user){
            return res.status(400).json({message: "No User Found with Email You Provide."});
        }
        return res.status(200).json({message: "User Successfully Deleted", user});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Deleting User by Email" : error});
    }
}

const deleteUserById = async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndRemove(id);
        if (!user){
            return res.status(400).json({message: "No User Found with ID You Provide."});
        }
        return res.status(200).json({message: "User Successfully Deleted", user});
    }
    catch(error){
        const isEmpty = Object.keys(error).length === 0;
        return res.status(400).json({message: isEmpty ? "Error Occur while Deleting User by ID" : error});
    }
}

module.exports = {signup, login, getAllUsers, getUserByEmail, getUserById, updateUserByEmail, updateUserById, deleteUserByEmail, deleteUserById};