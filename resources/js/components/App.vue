<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Feedback App</a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                    <li><a href="#">Page 1</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><router-link to="/dashboard"><span class="glyphicon glyphicon-home"></span> Dashboard</router-link></li>
                    <li><router-link to="/logout"><span class="glyphicon glyphicon-log-out"></span> Logout</router-link></li>
                    <li><router-link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</router-link></li>
                    <li><router-link to="/register"><span class="glyphicon glyphicon-user"></span> Sign Up</router-link></li>
                </ul>
                </div>
            </div>
        </nav>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
    </template>



<script>
import axios from 'axios';
export default {

    created () {
        axios.defaults.headers.common["Authorization"] = 'Bearer '+ localStorage.getItem('auth_token');
    }

}
</script>


<style>
</style>
