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
                        <div v-if="id && !checkedUser">
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
                            <div class="popup_row rightgap" v-if="selectedOption=='email'">
                                <input type="email" placeholder="이메일 입력" v-on:keyup="keyPress($event, 'email')" ref="sendEmail">
                                <b style="color:red" v-if="email">입력한 이메일을 확인하세요</b>
                            </div>
                            <div class="popup_row" v-if="selectedOption=='phone'">
                              <input type="tel" placeholder="전화번호 입력" v-on:keyup="keyPress($event, 'phone')" ref="sendMessage">
                              <b style="color:red" v-if="phone">입력한 핸드폰번호를 확인하세요</b>
                            </div>
                            <p id="e_phoneNo" class="popup_error"></p>
                        </div>
                        </div>
                        <div v-if="id && checkedUser">
                        <div class="contact_form">
                            <div class="popup_row">
                                회원님의 아이디는 <br/>
                                <em class="accent">{{ checkedUser? checkedUser.id : "" }}</em> 입니다.
                            </div>
                        </div>
                        </div>
                        <div v-if="pwd && !checkedUser">
                        <div class="contact_form">
                            <div class="popup_row" style="margin-bottom: 10px;">
                                가입시 입력하신 정보로 인증해주세요.
                            </div>
                            <div class="popup_row rightgap">
                                <input placeholder="아이디 입력" v-on:keyup="keyPress($event, 'checkId')" type="text" ref="checkId" v-model="beforeId" :disabled="checkEmail || checkMessage">
                            </div>
                            <b style="color:red" v-if="checkId">영문대소문자, 숫자 6-20자 입력하세요</b>
                            <div class="popup_row select">
                                <select id="internationalCode" name="internationalCode" title="옵션" class="popup_input" v-model="selectedOption" v-on:change="changeSelected" :disabled="checkEmail || checkMessage">
                                  <option value="email">이메일 입력</option>
                                  <option value="phone">전화번호 입력</option>
                                </select>
                            </div>
                            <div class="contact_form" v-if="selectedOption=='email'">
                              <div class="popup_row rightgap">
                                  <input type="email" placeholder="이메일 입력" v-on:keyup="keyPress($event, 'email')" ref="sendEmail" class="popup_input" :disabled="checkEmail" style="width: 78%">
                                  <button type="button" class="btn_contact" v-on:click="emailCheck('sendEmail')" :disabled="checkEmail" style="width: 20%">인증</button>
                                  <b style="color:red" v-if="email">입력한 이메일을 확인하세요</b>                          
                              </div>
                              <div class="popup_row">
                                  <input type="text" placeholder="인증번호를 입력하세요" ref="checkEmail" maxlength="30" class="popup_input" :disabled="!checkEmail">
                              </div>
                            </div>
                            <div class="popup_row" v-if="selectedOption=='phone'">
                              <div class="popup_row rightgap">
                                  <input type="tel" placeholder="전화번호 입력" v-on:keyup="keyPress($event, 'phone')" ref="sendMessage" class="popup_input" :disabled="checkMessage" style="width: 78%">
                                  <button type="button" class="btn_contact" v-on:click="messageCheck('sendMessage')" :disabled="checkMessage" style="width: 20%">인증</button>
                                  <b style="color:red" v-if="phone">입력한 전화번호를 확인하세요</b>                          
                              </div>
                              <div class="popup_row">
                                  <input type="text" placeholder="인증번호를 입력하세요" ref="checkMessage" maxlength="30" class="popup_input" :disabled="!checkMessage">
                              </div>
                            </div>
                        </div>
                        </div>
                        <div v-if="pwd && checkedUser">
                        <div class="contact_form">
                            <div class="popup_row rightgap">
                                <input placeholder="아이디 입력" type="text" ref="checkId" v-model="beforeId" disabled>
                            </div>
                            <div class="popup_row" style="margin-bottom: 10px;">
                                변경하실 패스워드를 입력해주세요.
                            </div>
                            <div class="popup_row">
                                <input class="popup_input" type="password" v-on:keyup="keyPress($event, 'afterPwd')" ref="afterPwd" placeholder="변경할 비밀번호 입력">
                                <b class="popup_input" style="color:red; font-size: 12px;" v-if="afterPwd">영문대소문자, 숫자, 특수문자 10자 이상 입력하세요</b>
                            </div>
                            <div class="popup_row">
                                <input class="popup_input" type="password" v-on:keyup="keyPress($event, 'afterPwdConfirm')" ref="afterPwdConfirm" placeholder="변경할 비밀번호 재입력">
                                <b style="color:red; font-size: 12px;" v-if="afterPwdConfirm">비밀번호가 일치하지 않습니다</b>
                            </div>
                        </div>
                        </div>
                        <div class="btn_duo_popup">
                            <div v-if="!checkedUser || pwd">
                            <a href="javascript:;" class="btn_item" role="button" v-on:click="closePopUp">
                                <span class="btn_text">취소</span>
                            </a>
                            <a href="javascript:;" class="btn_item on" role="button" v-on:click="changePopUp">
                                <span id="b_txt_phoneNo_reg" class="btn_text">확인</span>
                            </a>
                            </div>
                            <div v-if="checkedUser && id">
                              <a href="javascript:;" class="btn_item" role="button" v-on:click="closePopUp" style="width:100%">
                                <span class="btn_text">확인</span>
                            </a>
                            </div>
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
      checkId: true,
      beforeId: '',
      pwd: false,
      email: true,
      sendEmail : true,
      checkEmail : false,
      phone: true,
      sendMessage : true,
      checkMessage : false,
      checkedUser: null,
      afterPwd: true,
      afterPwdConfirm: true,
    }
  },
  methods: {

    // 이미 존재하는 데이터인지 체크
    async existCheck(targetObject, targetData) {
      let failureMessage = "존재하지 않는 정보입니다.";
      let user;
      const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/` + "existCheck",
        {
          params : {
            id: this.pwd && targetData == ''? this.$refs.checkId.value : undefined,
            email: targetObject == "email"? this.$refs.sendEmail.value : undefined,
            phone: targetObject == "phone"? this.$refs.sendMessage.value.replaceAll("-", "") : undefined,
          }
        },
        ).then(res => {
          user = res.data;
          return res;
        });

        if(result.status === 200){
          if(targetData != '') this[targetData] = user;
          return true;
        }
        else {
          alert(failureMessage);
          return false;
        }

      } catch(err){
        alert(failureMessage);
        return false;
      }
    },

    // 이메일 검증
    /* 변수 cycle : 1. 초기화 send : true, check : false -> 이메일 발송 시 check : true -> 인증코드 입력 및 검증완료 시 send : false, check : false */
    async emailCheck(targetObject) {
      if(this.email) {
        alert("이메일을 확인해주세요!");
        return;
      }

      let isExist = await this.existCheck('email', '');
      if(!isExist) {
        return false;
      }

      let successMessage = targetObject == "sendEmail"? "이메일을 정상적으로 발송했습니다." : "";
      let failureMessage = targetObject == "sendEmail"? "이메일발송에 실패하였습니다." : "인증코드를 확인해주세요.";
      
      const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/` + targetObject,
        {
          params : {
            email: this.$refs[targetObject].value
          }
        },
        ).then(res => {
          return res;
        });

        if(result.status === 200){
          if(successMessage) alert(successMessage);
          if(targetObject == "sendEmail") {
            this.checkEmail = true;
          }
          if(targetObject == "checkEmail") {
            this.sendEmail = false;
            this.checkEmail = false;
          }
        }
        else {
          alert(failureMessage);
        }

      } catch(err){
        alert(failureMessage);
      }
    },

    // 핸드폰 검증
    /* 변수 cycle : 1. 초기화 send : true, check : false -> 이메일 발송 시 check : true -> 인증코드 입력 및 검증완료 시 send : false, check : false */
    async messageCheck(targetObject) {
      if(this.phone) {
        alert("핸드폰 번호를 확인해주세요!");
        return;
      }

      let isExist = await this.existCheck('phone', '');
      if(!isExist) {
        return false;
      }

      let successMessage = targetObject == "sendMessage"? "인증번호를 정상적으로 발송했습니다." : "";
      let failureMessage = targetObject == "sendMessage"? "인증번호 발송에 실패하였습니다." : "인증코드를 확인해주세요.";
      
      const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/` + targetObject,
        {
          params : {
            phone : this.$refs[targetObject].value.replaceAll("-", "")
          }
        },
        ).then(res => {
          return res;
        });

        if(result.status === 200){
          if(successMessage) alert(successMessage);
          if(targetObject == "sendMessage") {
            this.checkMessage = true;
          }
          if(targetObject == "checkMessage") {
            this.sendMessage = false;
            this.checkMessage = false;
          }
        }
        else {
          alert(failureMessage);
        }

      } catch(err){
        alert(failureMessage);
      }
    },

    // 검증방식 변경시 변수 초기화 로직
    changeSelected() {
      if(this.id) {
        this.email = true;
        this.phone = true;
      }
      else if(this.pwd) {
        this.email = true;
        this.sendEmail = true;
        this.checkEmail = false;
        this.phone = true;
        this.sendMessage = true;
        this.checkMessage = false;
      }
    },

    // 팝업에서 진행 시
    async changePopUp() {
      // 아이디찾기 진행 시
      if(this.id) {
        if(this[this.selectedOption]) { alert("입력하신 정보를 확인해주세요."); return; }
        let targetObj;
        if(this.selectedOption == "email") targetObj = 'email';
        if(this.selectedOption == "phone") targetObj = 'phone';

        this.existCheck(targetObj, 'checkedUser');
      }
      // 비밀번호 찾기 진행 시 && 이메일/전화번호 인증하는 경우
      else if(this.pwd && !this.checkedUser) {
        if(this.checkId) { alert("입력하신 아이디를 확인해주세요."); return; }
        if(this[this.selectedOption]) { alert("입력하신 정보를 확인해주세요."); return; }

        if(this.selectedOption == 'email') {
          // send : true, check : true 인 경우 인증번호 검증 필요
          if(this.sendEmail && this.checkEmail) {
              await this.emailCheck('checkEmail');
              // send : false, check : false 가 아닌 경우 인증실패
              if(this.sendEmail || this.checkEmail) return;
          }
          // send : true, check : false 인 경우 이메일 인증버튼 클릭 필요
          else if(this.sendEmail) { alert("이메일 인증을 진행해주세요."); return;}
        }
        else if(this.selectedOption == 'phone') {
          // send : true, check : true 인 경우 인증번호 검증 필요
          if(this.sendMessage && this.checkMessage) {
              await this.messageCheck('checkMessage');
              // send : false, check : false 가 아닌 경우 인증실패
              if(this.sendMessage || this.checkMessage) return;
          }
          // send : true, check : false 인 경우 이메일 인증버튼 클릭 필요
          else if(this.sendMessage) { alert("전화번호 인증을 진행해주세요."); return;}
        }
        // send : false, check : false 인 경우 인증완료
        this.checkedUser = true;
      }
      // 비밀번호 찾기 진행 시 && 인증완료 후 비밀번호 변경 시
      else if(this.pwd && this.checkedUser) {
        if(this.afterPwd) { alert("입력하신 비밀번호를 확인해주세요."); return; }
        if(this.afterPwdConfirm) { alert("입력하신 비밀번호 재입력을 확인해주세요."); return; }

        let params = {
            id: this.$refs.checkId.value,
            pwd: this.$refs.afterPwd.value
        };
        let route = null;

        const baseURI = 'https://api.jurospring.o-r.kr';
        try{
            const axiosInstance = axios.create({
            withCredentials: true,
            });
            const result = await axiosInstance.get(`${baseURI}/` + "updatePwd",
            {
            params : params
            },
            ).then(res => {
            return res;
            });

            if(result.status === 200){
                alert("정보수정이 완료되었습니다.");
                if(!route) this.$router.go();
                else this.$router.push(route);
            }
            else {
                alert("정보수정에 실패하였습니다.");
            }

        } catch(err){
            if(this.popUpPwd && err.response.status === 404) {
                 alert("현재 비밀번호가 일치하지 않습니다.");
            }
            else alert("정보수정에 실패하였습니다.");
        }
      }
    },

    // 데이터 입력 시 형식 검증
    keyPress($event, targetObject) {
      let idval = $event.target.value;
      let idvalcheck = null;
      if(targetObject == 'id') idvalcheck = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
      else if(targetObject == 'checkId') idvalcheck = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
      else if(targetObject == 'pwd') idvalcheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/);
      else if(targetObject == 'afterPwd') idvalcheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/);
      else if(targetObject == 'afterPwdConfirm') {
        let pwd = "^" + this.$refs.afterPwd.value + "$";
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
      if (!idvalcheck.test(idval)){
        if(targetObject == 'afterPwd') {
            this.$refs.afterPwdConfirm.value = "";
            this.afterPwdConfirm = true;
        }
        this[targetObject] = true;
      }
      else {
        this[targetObject] = false;
      }
    },

    // 팝업 닫기
    closePopUp() {
      this.$refs.dimmed.style.display = 'none';
      this.$refs.layer.style.display = 'none';
      document.querySelector("*").style.overflow = 'visible';
      this.id = false;
      this.checkId = true;
      this.beforeId = '';
      this.pwd = false;
      this.checkedUser = null;
      this.selectedOption = 'email';
      this.email = true;
      this.phone = true;
      this.sendMessage = true;
      this.checkMessage = false;
      this.sendEmail = true;
      this.checkEmail = false;
      this.afterPwd = true;
      this.afterPwdConfirm = true;
    },

    // 팝업 열기
    popUp(target) {
      this[target] = true;
      this.$refs.dimmed.style.display = 'block';
      this.$refs.layer.style.display = 'block';
      document.querySelector("*").style.overflow = 'hidden';
      //window.scrollTo(0,0);
    },

    // 로그인
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
          return res;
        });

        if(result.status === 200){
          this.$router.push('/');
        } else {
          alert("로그인에 실패하였습니다.");
        }

      } catch(err){
        alert("로그인에 실패하였습니다.");
      }

    },
  }
}
</script>

<style scoped>
.member input:not(input[type=radio], input[type=checkbox]),.member select{
    border: 1px solid #dadada;
    padding: 10px;
    width: 100%;
    margin-bottom: 5px;
    min-height: 45px;
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