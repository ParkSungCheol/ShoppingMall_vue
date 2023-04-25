<template>
  <div>
    <div>
      <div class="member">
        <form @submit.prevent="fnUpdate">
        <!-- 1. 로고 -->

        <!-- 2. 필드 -->
        <div class="field">
            <b>아이디</b>
            <input type="text" v-model="id" disabled>
        </div>
        <div class="field email-number">
            <div>
                <input type="button" value="비밀번호 변경" v-on:click="popUp('popUpPwd')">
            </div>
        </div>
        <div class="field">
            <b>이름</b>
            <input type="text" v-on:keyup="keyPress($event, 'nameCheck')" ref="nameCheck" v-model="name">
            <b style="color:red" v-show="nameCheck">한글 2-4자 입력하세요</b>
        </div>

        <!-- 3. 필드(생년월일) -->
        <div class="field birth">
            <b>생년월일</b>
            <div>
                <input type="number" placeholder="년(4자)" ref="year" v-on:change="keyPress($event, 'birthday')" v-on:keyup="keyPress($event, 'birthday')" 
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="4" v-model="year">                
                <select ref="month" v-on:change="keyPress($event, 'birthday')" v-model="month">
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
                oninput="javascript: if (this.value.length > this.maxLength) {this.value = this.value.slice(0, this.maxLength);} if(this.value.length > 1 && this.value < 1) {this.value = null;}" maxlength="2" v-model="day">
            </div>
            <b style="color:red" v-show="birthday">연도 4자리, 일 2자리로 입력하세요</b>
        </div>

        <!-- 4. 주소 -->
        <div class="field tel-number">
          <b>주소</b>
          <div>
            <input type="text" id="postcode" placeholder="우편번호" disabled ref="addressCode" v-model="addressCode">
            <input type="button" value="우편번호 찾기" v-on:click="search()">
          </div>
          <!--onclick이 아니라 @click으로 바꿔야한다. -->
          <input type="text" id="roadAddress" placeholder="도로명주소" disabled ref="addressMain" v-model="addressMain">
          <span id="guide" style="color:#000;display:none"></span>
          <input type="text" id="detailAddress" placeholder="상세주소" ref="addressDetail" v-model="addressDetail">
          <input type="text" id="extraAddress" placeholder="참고항목" disabled ref="addressDetail2" v-model="addressDetail2">
          <b style="color:red" v-show="address">우편번호 찾기를 진행해주세요</b>
        </div>

        <!-- 5. 이메일_전화번호 -->
        <div class="field email-number">
            <div>
                <input type="button" value="이메일 변경" v-on:click="popUp('popUpEmail')">
            </div>
        </div>
        
        <div class="field email-number">
            <div>
                <input type="button" value="휴대전화 변경" v-on:click="popUp('popUpPhone')">
            </div>
        </div>

        <!-- 6. 가입하기 버튼 -->
        <input type="submit" value="수정하기">
        </form>
        <div class="dimmed" area-hidden="true" style="display:none;" ref="dimmed"></div>
        <form>
          <div class="layer" area-hidden="true" style="display:none;" ref="layer">
            <div class="popup_layer">
            <div class="popup_layer_inner">
                <div class="popup_content">
                    <!--팝업콘텐츠영역-->
                    <div class="contact_edit_popup" style="width:329px;">
                        <h4 class="contact_edit_title">
                                <strong class="bold">{{user.name}}님</strong>의 회원정보 중<br/>
                                <em class="accent">{{ popUpPwd? '패스워드' : popUpEmail? '이메일주소' : '전화번호' }}</em>를 <span id="p_txt_phoneNo_changeYn">수정</span>하기 위해<br/>
                                인증절차가 필요합니다.
                        </h4>
                        <div v-show="popUpPwd">
                        <div class="contact_form">
                            <div class="popup_row">
                                <input class="popup_input" type="password" v-on:keyup="keyPress($event, 'beforePwd')" ref="beforePwd" placeholder="기존 비밀번호 입력">
                                <b class="popup_input" style="color:red; font-size: 12px;" v-show="beforePwd">영문대소문자, 숫자, 특수문자 10자 이상 입력하세요</b>
                            </div>
                            <div class="popup_row">
                                <input class="popup_input" type="password" v-on:keyup="keyPress($event, 'afterPwd')" ref="afterPwd" placeholder="변경할 비밀번호 입력">
                                <b class="popup_input" style="color:red; font-size: 12px;" v-show="afterPwd">영문대소문자, 숫자, 특수문자 10자 이상 입력하세요</b>
                            </div>
                            <div class="popup_row">
                                <input class="popup_input" type="password" v-on:keyup="keyPress($event, 'afterPwdConfirm')" ref="afterPwdConfirm" placeholder="변경할 비밀번호 재입력">
                                <b style="color:red" v-show="afterPwdConfirm">비밀번호가 일치하지 않습니다</b>
                            </div>
                            <p id="e_phoneNo" class="popup_error"></p>
                        </div>
                        </div>
                        <div v-show="popUpEmail">
                        <div id="phoneNoForm" class="row_item phone" style="display: block;">
                            <span id="p_txt_phoneNo" class="item_text">[ 기존 이메일 ] <br/>{{ user.email }}</span>
                        </div>
                        <div class="contact_form">
                            <div class="popup_row rightgap">
                                <input type="tel" id="phoneNo" placeholder="변경할 이메일 입력" name="phoneNo" maxlength="14" class="popup_input" onkeydown="check_num_ajax3('phoneNo', '2', 'e_phoneNo')">
                                <button type="button" class="btn_contact" onclick="sendSmsForChangePhoneNo()">인증</button>                          
                            </div>
                            <div class="popup_row">
                                <input type="tel" id="authNo" placeholder="인증번호 입력" class="popup_input" onkeydown="check_num_ajax3('authNo', '2', 'e_phoneNo')" oninput="changeVerifyToPopupInput('authNo')" disabled="">
                            </div>
                            <p id="e_phoneNo" class="popup_error"></p>
                        </div>
                        </div>
                        <div v-show="popUpPhone">
                        <div id="phoneNoForm" class="row_item phone" style="display: block;">
                            <span id="p_txt_phoneNo" class="item_text">[ 기존 전화번호 ] <br/>{{ user.phone }}</span>
                        </div>
                        <div class="contact_form">
                            <div class="popup_row select">
                                <select id="internationalCode" name="internationalCode" title="전화번호" class="popup_input">
                                  <option value="82"> 대한민국 +82</option>
                                </select>
                            </div>
                            <div class="popup_row rightgap">
                                <input type="tel" id="phoneNo" placeholder="변경할 전화번호 입력" name="phoneNo" maxlength="14" class="popup_input" onkeydown="check_num_ajax3('phoneNo', '2', 'e_phoneNo')">
                                <button type="button" class="btn_contact" onclick="sendSmsForChangePhoneNo()">인증</button>                          
                            </div>
                            <div class="popup_row">
                                <input type="tel" id="authNo" placeholder="인증번호 입력" class="popup_input" onkeydown="check_num_ajax3('authNo', '2', 'e_phoneNo')" oninput="changeVerifyToPopupInput('authNo')" disabled="">
                            </div>
                            <p id="e_phoneNo" class="popup_error"></p>
                        </div>
                        </div>
                        <div class="btn_duo_popup">
                            <a href="javascript:;" class="btn_item" role="button" v-on:click="closePopUp">
                                <span class="btn_text">취소</span>
                            </a>
                            <a href="javascript:;" class="btn_item on" role="button" onclick="">
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'MyPage',
  data () {
    return {
      user : null,
      id : null,
      name : false,
      nameCheck : false,
      year : null,
      month : null,
      day : null,
      birthday : false,
      addressCode : null,
      addressMain : null,
      addressDetail : null,
      addressDetail2 : null,
      address : false,
      popUpPwd : false,
      popUpEmail : false,
      popUpPhone : false,
      beforePwd: true,
      afterPwd: true,
      afterPwdConfirm: true,
    }
  },
  props : {
    getUser : Function,
  },
  mounted : function() {
    this.user = this.getUser();
    this.id = this.user.id;
    this.name = this.user.name;
    this.year = this.user.birth.substr(0,4);
    this.month = this.user.birth.substr(4,2);
    this.day = this.user.birth.substr(6,2);
    let str_arr = this.user.address.split('^');
    this.addressCode = str_arr[0];
    this.addressMain = str_arr[1];
    if(str_arr.length == 3) {
        this.addressDetail2 = str_arr[2];
    }
    else {
        this.addressDetail = str_arr[2];
        this.addressDetail2 = str_arr[3];
    }
  },
  methods: {
    closePopUp() {
      this.$refs.dimmed.style.display = 'none';
      this.$refs.layer.style.display = 'none';
      document.querySelector("*").style.overflow = 'visible';
      this.popUpPwd = false;
      this.popUpEmail = false;
      this.popUpPhone = false;
    },
    popUp(target) {
      this[target] = true;
      this.$refs.dimmed.style.display = 'block';
      this.$refs.layer.style.display = 'block';
      document.querySelector("*").style.overflow = 'hidden';
      //window.scrollTo(0,0);
    },
    keyPress($event, targetObject) {
      let idval = $event.target.value;
      let idvalcheck = null;
      if(targetObject == 'id') idvalcheck = new RegExp(/^[a-zA-Z0-9]{6,20}$/);
      else if(targetObject == 'beforePwd') idvalcheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/);
      else if(targetObject == 'afterPwd') idvalcheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/);
      else if(targetObject == 'afterPwdConfirm') {
        let pwd = "^" + this.$refs.afterPwd.value + "$";
        idvalcheck = new RegExp(pwd);
      }
      else if(targetObject == 'nameCheck') idvalcheck = new RegExp(/^[ㄱ-ㅣ가-힣]{2,4}$/);
      else if(targetObject == 'birthday') {
        idvalcheck = new RegExp(/(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])/);
        let year = this.$refs.year.value;
        let month = this.$refs.month.value;
        let day = this.$refs.day.value.length < 2? "0"+this.$refs.day.value : this.$refs.day.value;
        idval = year + month + day;
      }
      else if(targetObject == 'email') idvalcheck = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
      else if(targetObject == 'phone') idvalcheck = new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/);
      console.log(idval);
      console.log(idvalcheck.test(idval));
      if (!idvalcheck.test(idval)){
        this[targetObject] = true;
      }
      else {
        this[targetObject] = false;
      }
      console.log(this[targetObject]);
    },
    search(){ //@click을 사용할 때 함수는 이렇게 작성해야 한다.
        new window.daum.Postcode({
        oncomplete: (data) => { //function이 아니라 => 로 바꿔야한다.
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            this.addressCode = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;
            this.addressMain = roadAddr;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("extraAddress").value = extraRoadAddr;
                this.addressDetail2 = extraRoadAddr;
            } else {
                document.getElementById("extraAddress").value = '';
                this.addressDetail2 = '';
            }

            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
            
            this.address = false;
        }
    }).open();
    },
    async fnUpdate() {
      if(this.nameCheck) { alert("이름을 확인해주세요."); return;}
      if(this.birthday) { alert("생년월일을 확인해주세요."); return;}
      if(this.address) { alert("주소를 확인해주세요."); return;}
      let day = this.$refs.day.value.length < 2? "0"+this.$refs.day.value : this.$refs.day.value;
      let birth = this.$refs.year.value + this.$refs.month.value + day;
      let address = this.$refs.addressDetail.value? this.$refs.addressCode.value+"^"+this.$refs.addressMain.value+"^"+this.$refs.addressDetail.value+"^"+this.$refs.addressDetail2.value : this.$refs.addressCode.value+"^"+this.$refs.addressMain.value+"^"+this.$refs.addressDetail2.value;
      if(this.name == this.user.name && birth == this.user.birth && address == this.user.address) { alert("변경사항이 없습니다."); return; }
      console.log("일치여부");
      console.log(birth);
      console.log(this.user.birth);
      let isConfirmed = confirm("개인정보를 수정하시겠습니까?");
      if(!isConfirmed) return;
      const baseURI = 'https://api.jurospring.o-r.kr';
      try{
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        const result = await axiosInstance.get(`${baseURI}/` + "updateUser",
        {
          params : {
            id: this.user.id,
            name: this.$refs.nameCheck.value,
            year: this.$refs.year.value,
            month: this.$refs.month.value,
            day: this.$refs.day.value,
            addressNumber: this.$refs.addressCode.value,
            address: this.$refs.addressMain.value,
            addressDetail: this.$refs.addressDetail.value,
            addressDetail2: this.$refs.addressDetail2.value,
          }
        },
        ).then(res => {
          console.log(res);
          return res;
        });

        console.log(result);
        if(result.status === 200){
          alert("정보수정이 완료되었습니다.");
          this.$router.push('/');
        }
        else {
          alert("정보수정에 실패하였습니다.");
        }

      } catch(err){
        console.log(err);
        alert("정보수정에 실패하였습니다.");
      }
    }
  }
}
</script>

<style scoped>
.dimmed {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 200;
}
.popup_layer {
    display: table;
    table-layout: fixed;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 210;
}
.popup_layer_inner {
    display: table-cell;
    vertical-align: middle;
}
.popup_content {
    margin: 45px 0;
    vertical-align: top;
    z-index: 220;
}
.contact_2step_popup, .contact_edit_popup {
    position: relative;
    margin: 0 auto;
    padding: 30px 24px 58px;
    border-radius: 12px;
    box-shadow: 0 2px 2px 0 rgba(64,117,161,.1);
    background-color: #fff;
    box-sizing: border-box;
    text-align: left;
}
.contact_edit_title {
    margin-bottom: 20px;
    padding: 30px 0 14px;
    border-bottom: 1px solid #303038;
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;
    letter-spacing: -.8px;
    color: #1e1e23;
    word-break: break-all;
}
.contact_2step_popup .row_item, .contact_edit_popup .row_item {
    padding: 0 0 20px 30px;
}
.contact_2step_popup .row_item+.contact_form, .contact_edit_popup .row_item+.contact_form {
    padding-top: 0;
}
.btn_duo_popup .btn_item.on {
    background-color: #000;
    color: #fff;
}
.btn_duo_popup .btn_item:first-child {
    width: 35%;
    background-color: #959eae;
    border-radius: 0 0 0 12px;
}
.btn_duo_popup .btn_item:last-child {
    width: 65%;
    border-radius: 0 0 12px 0;
}
.btn_duo_popup .btn_item {
    float: left;
    padding: 19px 0 18px;
    vertical-align: middle;
    background-color: #959eae;
}

.btn_duo_popup {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    text-align: center;
}

.popup_row.rightgap .popup_input {
    padding: 9px 20px 9px 11px;
    max-width: max-content;
}
.btn_contact {
  position: relative;
  min-width: 40px;
  min-height: 40px;
  margin-left: 3px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background-color: #000;
}

#member {
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
    text-align: center;
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

.field.tel-number div, .field.email-number div {
    display: flex;
}

.field.email-number div input[type=button],
.field.email-number div input[type=submit]{
    background-color: white;
    color:#000;
    border: 1px solid #000;
}

.field.tel-number div input:nth-child(1), .field.email-number div input:nth-child(1) {
    flex:2;
}

.field.tel-number div input:nth-child(2), .field.email-number div input:nth-child(2) {
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