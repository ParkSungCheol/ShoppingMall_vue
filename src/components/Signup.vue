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
            <b style="color:red" v-show="id">아이디는 영문대소문자, 숫자 조합의 6-20자로 구성해주세요!</b>
        </div>
        <div class="field">
            <b>비밀번호</b>
            <input class="userpw" type="password" v-on:keyup="keyPress($event, 'pwd')">
            <b style="color:red" v-show="pwd">비밀번호는 영문대소문자, 숫자, 특수문자 조합의 10자 이상으로 구성해주세요!</b>
        </div>
        <div class="field">
            <b>비밀번호 재확인</b>
            <input class="userpw-confirm" type="password">
        </div>
        <div class="field">
            <b>이름</b>
            <input type="text">
        </div>

        <!-- 3. 필드(생년월일) -->
        <div class="field birth">
            <b>생년월일</b>
            <div>
                <input type="number" placeholder="년(4자)">                
                <select>
                    <option value="">월</option>
                    <option value="">1월</option>
                    <option value="">2월</option>
                    <option value="">3월</option>
                    <option value="">4월</option>
                    <option value="">5월</option>
                    <option value="">6월</option>
                    <option value="">7월</option>
                    <option value="">8월</option>
                    <option value="">9월</option>
                    <option value="">10월</option>
                    <option value="">11월</option>
                    <option value="">12월</option>
                </select>
                <input type="number" placeholder="일">
            </div>
        </div>

        <!-- 4. 필드(성별) -->
        <div class="field gender">
            <b>성별</b>
            <div>
                <label><input type="radio" name="gender">남자</label>
                <label><input type="radio" name="gender">여자</label>
                <label><input type="radio" name="gender">선택안함</label>
            </div>
        </div>

        <!-- 5. 이메일_전화번호 -->
        <div class="field">
            <b>본인 확인 이메일<small>(선택)</small></b>
            <input type="email" placeholder="선택입력">
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
      loginSuccess:false,
      error:false
    }
  },
  methods: {
    async fnLogin() {
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
    keyPress($event, targetObject) {
      let idval = $event.target.value;
      let idvalcheck = null;
      if(targetObject == 'id') idvalcheck = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
      if(targetObject == 'pwd') idvalcheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/);
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

input[type=radio] {
  margin-left: 10px;
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