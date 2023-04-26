<template>
  <div>
    <div id="loginForm">
      <h2>Please Log In</h2>
      <div>
        <form @submit.prevent="fnLogin">
          <p>
            <input class="w3-input inputText" name="uid" placeholder="Enter your ID" v-model="user_id"><br>
          </p>
          <p>
            <input name="password" class="w3-input inputText" placeholder="Enter your password" v-model="user_pw" type="password">
          </p>
          <div class="login_keep_wrap" id="login_keep_wrap">
              <div class="keep_check">
                  <input type="checkbox" id="keep" name="nvlong" class="input_keep" value="off">
                  <label for="keep" class="keep_text">로그인 상태 유지</label>
              </div>
          </div>
          <p>
            <div class="btn_login_wrap">
            <button type="submit" class="btn_login"><span class="btn_text">로그인</span></button>
            </div>
          </p>
        </form>
      </div>
      <ul class="find_wrap">
        <li><router-link class="find_text" to="/signup">아이디 찾기</router-link></li>
        <li><router-link class="find_text" to="/signup">비밀번호 찾기</router-link></li>
        <li><router-link class="find_text" to="/signup">회원가입</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'Login',
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
      if(!user_id) { alert("아이디를 입력해주세요!"); return; }
      if(!user_pw) { alert("패스워드를 입력해주세요!"); return; }
     const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/login`,
        {
          params : {
            id:this.user_id,
            pwd:this.user_pw
          }
        },
        ).then(res => {
          console.log(res);
          return res;
        });

        if(result.status === 200){
          this.loginSuccess = true;
          this.$router.push('/');
        } else {
          alert("로그인에 실패하였습니다.");
        }

      } catch(err){
        console.log(err);
        alert("로그인에 실패하였습니다.");
      }

    },
  }
}
</script>

<style scoped>
#loginForm {
  text-align: center;
}
.btn_login_wrap {
    margin-top: 38px;
}
.inputText {
  width: 20% !important;
  min-width: 200px;
}
.btn_login {
    align-items: center;
    display: inline-block;
    width: 20%;
    min-width: 200px;
    padding: 13px 0 13px;
    border-radius: 6px;
    border: solid 1px rgba(0,0,0,.15);
    color: white;
    background-color: black;
    box-sizing: border-box;
}
.btn_login .btn_text {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
}
.find_wrap {
    padding: 20px 0 35px;
    text-align: center;
}
ul {
    list-style: none;
}
.find_wrap li {
    position: relative;
    display: inline-block;
}
.find_wrap .find_text {
  margin-left: 10px;
    display: inline-block;
    font-size: 14px;
    line-height: 17px;
    text-decoration: none;
    color: #888;
}
</style>