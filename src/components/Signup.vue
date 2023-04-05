<template>
  <div>
    <div>
      <h2>Please Sign In</h2>
      <div class="member">
        <!-- 1. 로고 -->

        <!-- 2. 필드 -->
        <div class="field">
            <b>아이디</b>
            <span class="placehold-text"><input v-on:keyup="keyPress($event, 'id')" type="text"></span>
            <b style="color:red" v-show="id">영문대소문자, 숫자 6-20자 입력하세요</b>
        </div>
        <div class="field">
            <b>비밀번호</b>
            <input class="userpw" type="password" v-on:keyup="keyPress($event, 'pwd')" ref="pwd">
            <b style="color:red" v-show="pwd">영문대소문자, 숫자, 특수문자 10자 이상 입력하세요</b>
        </div>
        <div class="field">
            <b>비밀번호 재확인</b>
            <input class="userpw-confirm" type="password" v-on:keyup="keyPress($event, 'pwdConfirm')">
            <b style="color:red" v-show="pwdConfirm">비밀번호가 일치하지 않습니다</b>
        </div>
        <div class="field">
            <b>이름</b>
            <input type="text" v-on:keyup="keyPress($event, 'name')">
            <b style="color:red" v-show="name">한글 2-4자 입력하세요</b>
        </div>

        <!-- 3. 필드(생년월일) -->
        <div class="field birth">
            <b>생년월일</b>
            <div>
                <input type="number" placeholder="년(4자)" ref="year" v-on:change="keyPress($event, 'birthday')" v-on:keyup="keyPress($event, 'birthday')" 
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="4">                
                <select ref="month" v-on:change="keyPress($event, 'birthday')">
                    <option value="">월</option>
                    <option value="01">1월</option>
                    <option value="02">2월</option>
                    <option value="03">3월</option>
                    <option value="04">4월</option>
                    <option value="05">5월</option>
                    <option value="06">6월</option>
                    <option value="07">7월</option>
                    <option value="08">8월</option>
                    <option value="09">9월</option>
                    <option value="10">10월</option>
                    <option value="11">11월</option>
                    <option value="12">12월</option>
                </select>
                <input type="number" placeholder="일" ref="day" v-on:change="keyPress($event, 'birthday')" v-on:keyup="keyPress($event, 'birthday')" 
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="2">
            </div>
            <b style="color:red" v-show="birthday">연도 4자리, 일 2자리로 입력하세요</b>
        </div>

        <!-- 4. 주소 -->
        <div class="field">
            <b>주소</b>
            <input type="address">
        </div>

        <!-- 5. 이메일_전화번호 -->
        <div class="field">
            <b>본인 확인 이메일</b>
            <div>
              <input type="email" v-on:keyup="keyPress($event, 'email')">
              <input type="button" value="인증번호 받기">
            </div>
            <b style="color:red" v-show="email">입력한 이메일을 확인하세요</b>
            <input type="number" placeholder="인증번호를 입력하세요">
        </div>
        
        <div class="field tel-number">
            <b>휴대전화</b>
            <select>
                <option value="">대한민국 +82</option>
            </select>
            <div>
                <input type="tel" placeholder="전화번호 입력">
                <input type="button" value="인증번호 받기">
            </div>
            <input type="number" placeholder="인증번호를 입력하세요">
        </div>

        <!-- 6. 가입하기 버튼 -->
        <input type="submit" value="가입하기">
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
      id: true,
      pwd: true,
      pwdConfirm: true,
      name: true,
      birthday: true,
      email: true,
    }
  },
  methods: {
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
        let day = this.$refs.day.value < 10? "0"+this.$refs.day.value : this.$refs.day.value;
        idval = year + month + day;
      }
      else if(targetObject == 'email') idvalcheck = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
      console.log(idval);
      console.log(idvalcheck.test(idval));
      if (!idvalcheck.test(idval)){
        this[targetObject] = true;
      }
      else {
        this[targetObject] = false;
      }
    }
  }
}
</script>

<style scope>
*{
    box-sizing: border-box; /*전체에 박스사이징*/
    outline: none; /*focus 했을때 테두리 나오게 */
}

body{
    font-family: 'Noto Sans KR', sans-serif;
    font-size:14px;
    background-color: #f5f6f7;
    line-height: 1.5em;
    color : #222;
    margin: 0;
}

a{
    text-decoration: none;
    color: #222;
}

/*member sign in*/
.member{
    width: 400px;
    /* border: 1px solid #000; */
    margin: auto; /*중앙 정렬*/
    padding: 0 20px;
    margin-bottom: 20px;
}

.member .logo{
    /*로고는 이미지라 인라인 블록이니까 마진 오토 안됨 블록요소만 됨 */
    display: block;
    margin :50px auto;
}

.member .field{
    margin :5px 0; /*상하로 좀 띄워주기*/
}

.member b{
    /* border: 1px solid #000; */
    display: block; /*수직 정렬하기 */
    margin-bottom: 5px;
}

/*input 중 radio 는 width 가 100%면 안되니까 */
.member input:not(input[type=radio]),.member select{
    border: 1px solid #dadada;
    padding: 15px;
    width: 100%;
    margin-bottom: 5px;
}

.member input[type=button],
.member input[type=submit]{
background-color: black;
color:#fff
}

.member input:focus, .member select:focus{
    border: 1px solid black;
}

.field.birth div{ /*field 이면서 birth*/
    display: flex;
    gap:10px; /*간격 벌려줄때 공식처럼 사용핟나 */
}

/* .field.birth div > * {  gap 사용한거랑 같은 효과를 줌 
    flex:1;
} */

.field.tel-number div {
    display: flex;
}

.field.tel-number div input:nth-child(1){
    flex:2;
}

.field.tel-number div input:nth-child(2){
    flex:1;
}

.field.gender div{
    border: 1px solid #dadada;
    padding: 15px 5px;
    background-color: #fff;
}

.placehold-text{
    display: block; /*span 으로 감싸서 크기영역을 블록요소로 만들어ㅜ저야한다*/
    position:relative;
    /* border: 1px solid #000; */
}

.placehold-text:before{ 
    position:absolute; /*before은 inline 요소이기 때문에 span으로 감싸줌 */
    right : 20px;
    top:13px;
    pointer-events: none; /*자체가 가지고 있는 pointer event 를 없애준다 */
}

.userpw{
    background-size: 20px;
    background-color: #fff;
}

.userpw-confirm{
    background-size: 20px;
    background-color: #fff;
}

.member-footer {
    text-align: center;
    font-size: 12px;
    margin-top: 20px;
}

.member-footer div a:hover{
    text-decoration: underline;
    color:#2db400
}

.member-footer div a:after{
    content:'|';
    font-size: 10px;
    color:#bbb;
    margin-right: 5px;
    margin-left: 7px;
    /*살짝 내려가 있기 때문에 위로 올려주기 위해 transform 사용하기*/
    display: inline-block;
    transform: translateY(-1px);

}

.member-footer div a:last-child:after{
    display: none;
}

@media (max-width:768px) {
    .member{
        width: 100%;
    }
}
</style>