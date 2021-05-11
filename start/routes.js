"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "HomeController.index").as('home');

Route.get("auth/register", "Auth/RegisterController.index").as("auth.register").middleware('guest');;
Route.post("auth/register", "Auth/RegisterController.store").as("auth.register").middleware('guest');;

Route.get("auth/login", "Auth/LoginController.index").as("auth.login").middleware('guest');
Route.post("auth/login", "Auth/LoginController.login").as("auth.login").middleware('guest');

Route.get("auth/profile", "Auth/LoginController.profile").as("auth.profile").middleware('authenticated');
Route.post("auth/logout", "Auth/LoginController.logout").as("auth.logout").middleware('authenticated');

Route.get("posts/new", "PostController.new").as("posts.new").middleware('authenticated');
Route.post("posts", "PostController.store").as("posts.store").middleware('authenticated');

Route.get("posts/unanswered", "HomeController.unanswered").as("posts.unanswered");
Route.get("posts/own", "HomeController.own").as("posts.own");

Route.get("posts/:slug", "HomeController.show").as("posts.show");
Route.post("posts/:slug/reply", "PostReplyController.store").as("posts.reply.store").middleware('authenticated');

Route.get("tag/:slug", "HomeController.postsByTag").as("posts.by.tag");
