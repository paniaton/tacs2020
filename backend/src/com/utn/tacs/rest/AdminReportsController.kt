package com.utn.tacs.rest

import com.utn.tacs.User
import com.utn.tacs.UserCountriesList
import com.utn.tacs.reports.AdminReportsService
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.route
import io.ktor.routing.routing
import org.litote.kmongo.Id
import org.litote.kmongo.toId
import java.time.LocalDate
import io.ktor.request.header

fun Application.adminReports(adminReportsService: AdminReportsService) {
    routing {
        route("/api/admin/report/{userId}") {
            get {
                try {
                    authorizeUserAdmin(call.request.header("Authorization") ?: "")
                    val userId: Id<User> = call.parameters["userId"]!!.toId()
                    call.respond(adminReportsService.getUserData(userId) ?: HttpStatusCode.NotFound)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.Unauthorized)
                }
            }
        }
        route("/api/admin/report/lists/compare") {
            get {
                try {
                    authorizeUserAdmin(call.request.header("Authorization") ?: "")
                    val userCountriesListId1: Id<UserCountriesList> = call.request.queryParameters["list1"]!!.toId()
                    val userCountriesListId2: Id<UserCountriesList> = call.request.queryParameters["list2"]!!.toId()
                    val response = adminReportsService.getListComparison(userCountriesListId1, userCountriesListId2)
                    if (response != null) {
                        call.respond(response)
                    } else {
                        call.respond(HttpStatusCode.NotFound)
                    }
                } catch (e: Exception) {
                    logger.error("Parameters where not correct...", e)
                    call.respond(HttpStatusCode.BadRequest)
                }
            }
        }
        route("/api/admin/report/{country}/list") {
            get {
                authorizeUserAdmin(call.request.header("Authorization") ?: "")
                val country: String = call.parameters["country"]!!.toString()
                val response = adminReportsService.getUsersByCountry(country)
                call.respond(response)
            }
        }
        route("/api/admin/report/lists/total") {
            get {
                authorizeUserAdmin(call.request.header("Authorization") ?: "")
                val response = adminReportsService.getListsQuantity()
                call.respond(response)
            }
        }
        route("/api/admin/report/lists") {
            get {
                try {
                    authorizeUserAdmin(call.request.header("Authorization") ?: "")
                    val startDate: String = call.request.queryParameters["startDate"]!!.toString()
                    val endDate: String = call.request.queryParameters["endDate"]!!.toString()

                    val response = adminReportsService.getRegisteredUserListsBetween(LocalDate.parse(startDate), LocalDate.parse(endDate))
                    call.respond(response)
                } catch (e: Exception) {
                    logger.error("Parameters where not correct...", e)
                    call.respond(HttpStatusCode.BadRequest)
                }
            }
        }
    }
}
