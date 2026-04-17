const {authenticateUser} = require('../services/authServices')
const sanitizeUser = require('../utils/sanitizeUser')
const {registerUser, registerSMECompany} = require('../repositories/authRepository')
const { getAllCompanies, getUserByUsername } = require('../repositories/userRepository')

async function login(req, res){
    const { username, password } = req.body
    
    const token = await authenticateUser(username, password)

    if (!token){
        return res.status(401).json({error: 'Invalid credentials'})
    }

    console.log(token)
    res.json(token)
}

async function register(req, res){
    const {
            username, 
            password, 
            role,
            companyName,
            registrationNumber
        } = req.body

    const newUser = await registerUser({username, password, companyName, registrationNumber, role})

    if (!newUser){
        return res.status(409).json({error: 'Username already exits'})
    }

    res.status(201).json(
        {
            message: 'User created',
        }
    )
}

async function registerSME(req, res){
    
    const { companyName, registrationNumber, companyEmail} = req.body
    const companies = await getAllCompanies()
    const companyExists = companies.find((company) => {
        company.CompanyEmail.toLowerCase() === companyEmail.toLowerCase()})

    if (companyExists){
        return res.status(400).json({ message: "Company already exists" })
    }

    const newSME = await registerSMECompany(companyName, companyEmail, registrationNumber)

    res.status(201).json({message : "SME account created successfully"})

}

async function registerSMEUser(req, res){
    console.log(req.body)
    const {userEmail, password, firstName, lastName, assignSME} = req.body
    const existingUser = getUserByUsername(userEmail)

    if (existingUser){
        res.status(409).json({message: "User already exists!"})
    }

    const result = await registerUser(userEmail, password, firstName, lastName, assignSME)

    console.log("That was awesome")
    console.log(result)
}

module.exports = {
    login,
    register,
    registerSME,
    registerSMEUser
}