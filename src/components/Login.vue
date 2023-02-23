<template>
  <div>
    <div>
      <h2>Please Log In</h2>
      <div id="loginForm">
        <form @submit.prevent="fnLogin">
          <p>
            <input class="w3-input" name="uid" placeholder="Enter your ID" v-model="user_id"><br>
          </p>
          <p>
            <input name="password" class="w3-input" placeholder="Enter your password" v-model="user_pw" type="password">
          </p>
          <p>
            <button type="submit" class="w3-button w3-green w3-round">Login</button>
          </p>
        </form>
        <button v-on:click="getSession">Session</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'login',
  data() {
    return {
      user_id: '',
      user_pw: '',
      loginSuccess:false,
      error:false
    }
  },
  methods: {
    async fnLogin() {
     const baseURI = 'https://www.jurospring.o-r.kr';
      try{
        const result = await axios.get(`${baseURI}/login`,
        {
          params : {
            id:this.user_id,
            pwd:this.user_pw
          }
        },
        {withCredentials : true, xsrfHeaderName : "X-CSRFTOKEN", xsrfCookieName : "csrftoken"}
        );

        if(result.status === 200){
          this.loginSuccess = true;
        }

        console.log("session required");

      } catch(err){
        console.log(err);
      }

    },
    async getSession() {
     const baseURI = 'https://www.jurospring.o-r.kr';
      try{
        const result = await axios.get(`${baseURI}/getSession`,
        {},
        {withCredentials : true, xsrfHeaderName : "X-CSRFTOKEN", xsrfCookieName : "csrftoken"}
        ).then(res => {
          console.log(res);
        });

      } catch(err){
        console.log(err);
      }
    }
  }
}
</script>

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>