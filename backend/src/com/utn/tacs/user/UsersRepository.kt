package com.utn.tacs.user

import com.mongodb.MongoException
import com.mongodb.client.MongoDatabase
import com.utn.tacs.User
import org.bson.types.ObjectId
import org.litote.kmongo.*
import org.litote.kmongo.id.toId
import com.typesafe.config.ConfigFactory
import io.ktor.features.NotFoundException
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

const val USERS_COLLECTION_NAME = "users"
class UsersRepository(private val database: MongoDatabase) {
    private val adminUserName = ConfigFactory.load().getString("adminUser.name")
    private val adminUserEmail = ConfigFactory.load().getString("adminUser.email")
    private val adminUserPass = ConfigFactory.load().getString("adminUser.pass")
    init {
        getUserByEmailAndPass(adminUserEmail, adminUserPass) ?:
            createUser( User( adminUserName, adminUserEmail, adminUserPass, "Argentina",true))
    }

    /**
     * Get user by Object id
     *
     * @param id Id<User>
     * @return User?
     */
    fun getUserById(id: Id<User>): User? {
        return database.getCollection<User>(USERS_COLLECTION_NAME).findOneById(id)
    }

    /**
     * Get user by id
     *
     * @param id String
     * @return User?
     */
    fun getUserById(id: String): User? {
        return getUserById(ObjectId(id).toId())
    }

    /**
     * Get user by id
     *
     * @param id String
     * @return User
     */
    fun getUserOrFail(id: String): User {
        return getUserById(id) ?: throw NotFoundException("User was not found")
    }

    /**
     * Get user by email and pass
     *
     * @param email String
     * @param password String
     * @return User?
     */
    fun getUserByEmailAndPass(email: String, password: String): User? {
        return database.getCollection<User>(USERS_COLLECTION_NAME).findOne(User::email eq email, User::password eq password)
    }

    /**
     * Get user by email
     *
     * @param email String
     * @return User?
     */
    fun getUserByEmail(email: String): User? {
        return database.getCollection<User>(USERS_COLLECTION_NAME).findOne(User::email eq email)
    }

    /**
     * Create user
     *
     * @param user User
     * @return User?
     */
    fun createUser(user: User): User? {
        try {
            database.getCollection<User>(USERS_COLLECTION_NAME).insertOne(user)
            return getUserById(user._id)
        } catch (e: MongoException) {
            throw e
        }
    }

    /**
     * Delete user by user object
     * @param user User
     * @throws Exception
     */
    fun delete(user: User) {
        val deleted = database.getCollection<User>(USERS_COLLECTION_NAME).deleteOneById(user._id.toString())
        if (! deleted.wasAcknowledged()) {
            throw Exception("User not deleted")
        }
    }

    /**
     * Updates user las access login date and time
     *
     * @param user User
     * @return User
     */
    fun setUserLastLogin(user: User): User {
        user.lastConection = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"))
        database.getCollection<User>(USERS_COLLECTION_NAME).findOneAndUpdate(User::_id eq user._id, set(User::lastConection setTo user.lastConection))
        return user
    }
}