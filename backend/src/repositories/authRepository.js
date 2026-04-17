const { getPool } = require('../config/db')
const { getAllUsers } = require('../repositories/userRepository')
const { hashPassword } = require('../services/authServices')
const { sql } = require('../config/db')

async function registerUser(userEmail, password, firstName, lastName, companyId){

    
    const users = await getAllUsers()
    // const existingUser = users.find((user) => user.username === userEmail)
    const role = 'user'

    // if (existingUser){
    //     return "User already exists"
    // }

    console.log(password, userEmail)
    const hashedPassword = await hashPassword(password)

    try{

        const pool = await getPool()
        const result = await pool
            .request()
            .input('firstName', firstName)
            .input('lastName', lastName)
            .input('userEmail', userEmail)
            .input('hashedPassword', hashedPassword)
            .input('role', role)
            .input('companyId', companyId)
            .query(`
                INSERT INTO Users (FirstName, LastName, Email, PasswordHash, role, CompanyID)
                OUTPUT INSERTED.*
                VALUES (@firstName, @lastName, @userEmail, @hashedPassword, @role, @companyId)
            `)

        return result.recordset
                
    } catch(error){
        throw error
    }
}

async function registerSMECompany(companyName, companyEmail, registrationNumber){

    try{

        const pool = await getPool()
        
        const result = await pool
        .request()
        .input("companyName", companyName)
        .input("companyEmail", companyEmail)
        .input("registrationNumber", registrationNumber)
        .query(`
            INSERT INTO Companies (CompanyName, CompanyEmail, RegistrationNumber)
            OUTPUT INSERTED.*
            VALUES (@companyName, @companyEmail, @registrationNumber)
        `)
            
        return result.recordset

    } catch(error){
        console.log("Error registering SME account")
        throw error
    }
}

module.exports = {
    registerUser,
    registerSMECompany
}