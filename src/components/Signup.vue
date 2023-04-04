<template>
  <div>
    <div>
      <h2>Please Sign In</h2>
      <div class="member">
        <!-- 1. 로고 -->

        <!-- 2. 필드 -->
        <div class="field">
            <b>아이디</b>
            <span class="placehold-text"><input type="text"></span>
        </div>
        <div class="field">
            <b>비밀번호</b>
            <input class="userpw" type="password">
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

        <!-- 7. 푸터 -->
        <div class="member-footer">
            <div>
                <a href="#none">이용약관</a>
                <a href="#none">개인정보처리방침</a>
                <a href="#none">책임의 한계와 법적고지</a>
                <a href="#none">회원정보 고객센터</a>
            </div>
            <span><a href="#none">NAVER Corp.</a></span>
        </div>
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

<style>
#loginForm {
  width: 500px;
  margin: auto;
}
</style>