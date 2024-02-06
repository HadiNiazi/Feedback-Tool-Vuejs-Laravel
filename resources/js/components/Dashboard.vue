<template>
    Dashboard <br>

    Name is {{ name }} <br>
    Email is {{ email }} <br>

</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            name: '',
            email: ''
        }
    },

    mounted() {
        axios.get('/api/user').then( (response) => {

            this.name = response.data.name,
            this.email = response.data.email
        })
    }

}
</script>
