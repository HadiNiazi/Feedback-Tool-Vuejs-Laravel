<template>
<router-view></router-view>
</template>


<script>
import axios from 'axios';
export default {

    created () {
        axios.defaults.headers.common["Authorization"] = 'Bearer '+ localStorage.getItem('auth_token');
    }

}
</script>
