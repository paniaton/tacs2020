package com.utn.tacs.handlers

import com.github.kotlintelegrambot.dispatcher.handlers.CommandHandler
import com.github.kotlintelegrambot.entities.InlineKeyboardButton
import com.github.kotlintelegrambot.entities.InlineKeyboardMarkup
import com.github.kotlintelegrambot.entities.Update
import com.github.kotlintelegrambot.updater.Updater
import com.utn.tacs.commandHandlerLogin
import com.utn.tacs.createCallbackQueryHandler

fun startButtons() = InlineKeyboardMarkup(
                        listOf(
                            listOf(
                                InlineKeyboardButton("Mis listas", callbackData = "MisListas"),
                                InlineKeyboardButton("Listas", callbackData = "Listas")
                            ),
                            listOf(
                                InlineKeyboardButton(text = "Logout", callbackData = "Logout")
                            )))

fun startMessageCallBackQuery(update :Update) = startMessageBuilder(update.callbackQuery!!.from.firstName)
fun loginText(update :Update) = startMessageBuilder(update.message!!.from?.firstName ?: "errorName")
fun startMessageBuilder(firstName :String) = "Bienvenido $firstName!"

const val startText = "Bienvenido al bot de Telegram del grupo 4 de TACS 2020!\n\n" +
                    "Para iniciar escriba el comando /login seguido de su usuario y contraseña\n" +
                    "(Ejemplo: /login user pass)"

const val textoLoginIncorrecto = "Usuario o contraseña es incorrecta"

fun addStartCommands(updater :Updater){
    listOf(
            CommandHandler("start") { bot, update->
                bot.sendMessage(
                        chatId = update.message!!.chat.id,
                        text = startText
                )
            },
            CommandHandler("login", commandHandlerLogin { bot, update, args->
                if(args.size != 2){
                    bot.sendMessage(
                        chatId = update.message!!.chat.id,
                        text = "Escriba el comando /login seguido de su usuario y contraseña\n" +
                                "(Ejemplo: /login user pass)"
                    )
                    return@commandHandlerLogin
                }

                if(login(args[0], args[1]))
                    bot.sendMessage(
                        chatId = update.message!!.chat.id,
                        text = loginText(update),
                        replyMarkup = startButtons()
                    )
                else
                    bot.sendMessage(
                        chatId = update.message!!.chat.id,
                        text = textoLoginIncorrecto
                    )

            }),

            createCallbackQueryHandler("startCallBackQuery") { bot, update ->
                update.callbackQuery?.let {
                    val chatId = it.message!!.chat.id
                    bot.sendMessage(chatId = chatId,
                                    text = startMessageCallBackQuery(update),
                                    replyMarkup = startButtons())
                }
            },
            createCallbackQueryHandler("MisListas") { bot, update ->
                update.callbackQuery?.let {
                    val chatId = it.message!!.chat.id

                    bot.sendMessage(
                        chatId = chatId,
                        text = "Listas: ",
                        replyMarkup = InlineKeyboardMarkup(
                            listOf(
                                listOf(
                                    InlineKeyboardButton(text = "Volver", callbackData = "startCallBackQuery")
                                ))
                        )
                    )
                }
            },
            createCallbackQueryHandler("Logout") { bot, update ->
                update.callbackQuery?.let {
                    val chatId = it.message!!.chat.id

                    if(logout())
                        bot.sendMessage(
                            chatId = chatId,
                            text = "Logout exitoso!\n$startText",
                            replyMarkup = startButtons()
                        )
                    else
                        bot.sendMessage(
                            chatId = chatId,
                            text = "Error al procesar la solicitud"
                        )
                }
            }
    ).forEach{updater.dispatcher.addHandler(it)}
}

fun login(username :String, password :String) :Boolean{
    return false
}
fun logout() :Boolean{
    return false
}