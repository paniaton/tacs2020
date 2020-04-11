package com.utn.tacs

import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.request.get
import io.ktor.client.statement.HttpResponse
import java.util.*
import com.google.gson.Gson

data class location (
    val lat: Double,
    val lon: Double
)

data class countryCode (
    val iso2: String,
    val iso3: String
)

data class CountryRegion (
    val name: String,
    val confirmed: Int,
    val deaths: Int,
    val recovered: Int,
    val lastUpdate: Date
)


suspend fun getExternalData(): String {
    val client = HttpClient(CIO)
    val response: String = client.get("https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true")
    return response
}
