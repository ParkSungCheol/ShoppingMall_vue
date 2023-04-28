<template>
  <div>
    <div id="loginForm" class="member">
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
        <li><a class="find_text" v-on:click.stop="popUp('id')">아이디 찾기</a></li>
        <li><a class="find_text" v-on:click.stop="popUp('pwd')">비밀번호 찾기</a></li>
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
                                <em class="accent">{{ id? '아이디' : '패스워드' }}</em>를 <span id="p_txt_phoneNo_changeYn">찾기 위해</span><br/>
                                인증절차가 필요합니다.
                        </h4>
                        <div v-show="id && !checkedUser">
                        <div class="contact_form">
                            <div class="popup_row" style="margin-bottom: 10px;">
                                가입시 입력하신 정보로 인증해주세요.
                            </div>
                            <div class="popup_row select">
                                <select id="internationalCode" name="internationalCode" title="옵션" class="popup_input" v-model="selectedOption" v-on:change="changeSelected">
                                  <option value="email">이메일 입력</option>
                                  <option value="phone">전화번호 입력</option>
                                </select>
                            </div>
                            <div class="popup_row rightgap" v-show="selectedOption=='email'">
                                <input type="email" placeholder="이메일 입력" v-on:keyup="keyPress($event, 'email')" ref="sendEmail">
                                <b style="color:red" v-show="email">입력한 이메일을 확인하세요</b>
                            </div>
                            <div class="popup_row" v-show="selectedOption=='phone'">
                              <input type="tel" placeholder="전화번호 입력" v-on:keyup="keyPress($event, 'phone')" ref="sendMessage">
                              <b style="color:red" v-show="phone">입력한 핸드폰번호를 확인하세요</b>
                            </div>
                            <p id="e_phoneNo" class="popup_error"></p>
                        </div>
                        </div>
                        <div v-show="checkedUser">
                        <div class="contact_form">
                            <div class="popup_row" style="margin-bottom: 10px;">
                                회원님의 아이디는 {{ checkedUser.id }} 입니다.
                            </div>
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
      selected: false,
      selectedOption: 'email',
      id: false,
      pwd: false,
      email: true,
      phone: true,
      checkedUser: null,
    }
  },
  methods: {
    changeSelected() {
      if(this.id) {
        this.email = true;
        this.phone = true;
        this.$refs.sendEmail.value = "";
        this.$refs.sendMessage.value = "";
      }
    },
    async changePopUp() {
      if(this.id) {
        if(this[this.selectedOption]) { alert("입력하신 정보를 확인해주세요."); return; }
        let user;
        const baseURI = 'https://api.jurospring.o-r.kr';
        try{
          const axiosInstance = axios.create({
            withCredentials: true,
          });
          const result = await axiosInstance.get(`${baseURI}/existCheck`,
          {
            params : {
              email:this.selectedOption == "email"? this.$refs.sendEmail.value : undefined,
              phone:this.selectedOption == "phone"? this.$refs.sendMessage.value : undefined,
            }
          },
          ).then(res => {
            console.log(res);
            this.checkedUser = res.data;
            return res;
          });

          if(result.status === 200){
          } else {
            alert("일치하는 정보가 없습니다.");
          }

        } catch(err){
          console.log(err);
          alert("일치하는 정보가 없습니다.");
        }
      }
    },
    keyPress($event, targetObject) {
      let idval = $event.target.value;
      let idvalcheck = null;
      if(targetObject == 'id') idvalcheck = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
      else if(targetObject == 'pwd') idvalcheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/);
      else if(targetObject == 'pwdConfirm') {
        let pwd = "^" + this.$refs.pwd.value + "$";
        console.log(pwd);
        idvalcheck = new RegExp(pwd);
      }
      else if(targetObject == 'name') idvalcheck = new RegExp(/^[ㄱ-ㅣ가-힣]{2,4}$/);
      else if(targetObject == 'birthday') {
        idvalcheck = new RegExp(/(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/);
        let year = this.$refs.year.value;
        let month = this.$refs.month.value;
        let day = this.$refs.day.value.length < 2 ? "0"+this.$refs.day.value : this.$refs.day.value;
        idval = year + month + day;
      }
      else if(targetObject == 'email') idvalcheck = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
      else if(targetObject == 'phone') idvalcheck = new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/);
      console.log(idval);
      console.log(idvalcheck.test(idval));
      if (!idvalcheck.test(idval)){
        if(targetObject == 'pwd') {
            this.$refs.pwdConfirm.value = "";
            this.pwdConfirm = true;
        }
        this[targetObject] = true;
      }
      else {
        this[targetObject] = false;
      }
      console.log(this[targetObject]);
    },
    closePopUp() {
      this.$refs.dimmed.style.display = 'none';
      this.$refs.layer.style.display = 'none';
      document.querySelector("*").style.overflow = 'visible';
      this.id = false;
      this.pwd = false;
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
.member input:not(input[type=radio], input[type=checkbox]),.member select{
    border: 1px solid #dadada;
    padding: 15px;
    width: 100%;
    margin-bottom: 5px;
}
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