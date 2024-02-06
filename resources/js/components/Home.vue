<template>
    Welcome to the Vuejs homepage <br>


    {{ data }}

    <button class="btn btn-danger">Dlete</button>
</template>


<script>
import axios from 'axios';

export default {

    data() {
        return {
            data: ''
        }
    },

    mounted() {
        axios.get('/api/home').then( (response) => {

            this.data = response.data.home
        })
    }

}
</script>
