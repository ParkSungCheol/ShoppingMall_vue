<template>
  <div>
    <div id="loginForm">
      <div>
        <form @submit.prevent="fnLogin">
          <p>
            <input style="margin-top: 20px;" class="w3-input inputText" name="uid" placeholder="Enter your ID" v-model="user_id"><br>
          </p>
          <p>
            <input name="password" class="w3-input inputText" placeholder="Enter your password" v-model="user_pw" type="password">
          </p>
          <div class="login_keep_wrap" id="login_keep_wrap">
              <div class="keep_check">
                  <input type="checkbox" id="keep" name="nvlong" class="input_keep" v-model="selected">
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
        <li><input type="button" class="find_text" value="아이디 찾기" v-on:click="popUp('popUpPhone')"></li>
        <li><router-link class="find_text" to="/signup">비밀번호 찾기</router-link></li>
        <li><router-link class="find_text" to="/signup">회원가입</router-link></li>
      </ul>
      <div class="dimmed" area-hidden="true" style="display:none;" ref="dimmed"></div>
        <form>
          <div class="layer" area-hidden="true" style="display:none;" ref="layer">
            <div class="popup_layer">
            <div class="popup_layer_inner">
                <div class="popup_content">
                    <!--팝업콘텐츠영역-->
                    <div class="contact_edit_popup" style="width:329px;">
                        <h4 class="contact_edit_title">
                                <em class="accent">{{ popUpPhone? '아이디' : '패스워드' }}</em>를 <span id="p_txt_phoneNo_changeYn">찾기 위해</span><br/>
                                인증절차가 필요합니다.
                        </h4>
                        <div v-show="popUpPhone">
                        <div class="contact_form">
                            <div class="popup_row select">
                                <select id="internationalCode" name="internationalCode" title="전화번호" class="popup_input">
                                  <option value="82"> 대한민국 +82</option>
                                </select>
                            </div>
                            <div class="popup_row rightgap">
                                <input type="tel" placeholder="변경할 전화번호 입력" v-on:keyup="keyPress($event, 'phone')" ref="sendMessage" class="popup_input" :disabled="!sendMessage">
                                <button type="button" class="btn_contact" v-on:click="messageCheck('sendMessage')" :disabled="!sendMessage">인증</button>
                                <b style="color:red" v-show="phone">입력한 전화번호를 확인하세요</b>                          
                            </div>
                            <div class="popup_row">
                                <input type="text" placeholder="인증번호를 입력하세요" ref="checkMessage" maxlength="30" class="popup_input" :disabled="!checkMessage">
                            </div>
                            <p id="e_phoneNo" class="popup_error"></p>
                        </div>
                        </div>
                        <div class="btn_duo_popup">
                            <a href="javascript:;" class="btn_item" role="button" v-on:click="closePopUp">
                                <span class="btn_text">취소</span>
                            </a>
                            <a href="javascript:;" class="btn_item on" role="button" v-on:click="changePopUp">
                                <span id="b_txt_phoneNo_reg" class="btn_text">변경</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          </div>
        </form>
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
      error:false,
      selected: false,
      phone: true,
      sendMessage : true,
      checkMessage : false,
    }
  },
  methods: {
    closePopUp() {
      this.$refs.dimmed.style.display = 'none';
      this.$refs.layer.style.display = 'none';
      document.querySelector("*").style.overflow = 'visible';
      this.$refs.sendMessage.value = "";
      this.$refs.checkMessage.value = "";
      this.phone = true;
      this.sendMessage = true;
      this.checkMessage = false;
    },
    popUp(target) {
      this[target] = true;
      this.$refs.dimmed.style.display = 'block';
      this.$refs.layer.style.display = 'block';
      document.querySelector("*").style.overflow = 'hidden';
      //window.scrollTo(0,0);
    },
    async fnLogin() {
      if(!this.user_id) { alert("아이디를 입력해주세요!"); return; }
      if(!this.user_pw) { alert("패스워드를 입력해주세요!"); return; }
     const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/login`,
        {
          params : {
            id:this.user_id,
            pwd:this.user_pw,
            selected:this.selected? "1" : "0",
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
.login_keep_wrap {
    position: relative;
    margin-top: 13px;
    padding-right: 90px;
}
.keep_check {
    position: relative;
    padding-left: 23px;
}
.keep_check .input_keep {
    position: relative;
    top: 2px;
    left: 3px;
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
.keep_check .keep_text {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: #777;
}
</style>