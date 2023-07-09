<template>
    <div>
        <table class="item-table">
            <thead>
            <tr>
                <th style="width:30em">검색어</th>
                <th style="width:20em">가격</th>
                <th style="width:20em">조건</th>
                <th style="width:20em">사용여부</th>
                <th class="button-container">
                <button @click="createItem(item)" class="create-button">Create</button>
                <button @click="saveItems" class="save-button">Save</button>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>
                <input type="text" v-model="item.searchValue" class="input-field" @input="validateSearchValue(item)">
                <div v-if="!item.isSearchValueValid" class="error-feedback">검색어를 입력해주세요!</div>
                </td>
                <td>
                <input type="text" v-model="item.price" class="input-field" @input="validatePrice(item)">
                <div v-if="!item.isPriceValid" class="error-feedback">숫자만 입력해주세요!</div>
                </td>
                <td>
                <select v-model="item.term" class="select-field">
                    <option value="1">미만</option>
                    <option value="2">이하</option>
                    <option value="3">이상</option>
                    <option value="4">초과</option>
                </select>
                </td>
                <td>
                <select v-model="item.useYn" class="select-field">
                    <option value="1">사용</option>
                    <option value="0">사용안함</option>
                </select>
                </td>
                <td>
                <button @click="deleteItem(item)" class="delete-button">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Cart',
    data() {
      return {
        user: null,
        items: [
        ],
        newItem: {
          searchValue: '',
          price: "0",
          term: "1",
          useYn: "1",
          isPriceValid: true,
          isSearchValueValid: false
        }
      }
    },
    //router 의 getUser function
    props : {
      getUser : Function,
    },
    mounted : function() {
      debugger;
      this.user = this.getUser();
      this.getSearch();
    },
    methods: {
      // 로딩바 표시
      showLoadingOverlay() {
        this.loader = this.$loading.show({
          container: null,
          width: 100,
          height: 100,
          loader: "bars",
          canCancel: false,
        });
      },
      // 유저의 데이터 가져오기
      async getSearch() {
        this.showLoadingOverlay();
        
        try {
          const baseURI = 'https://api.jurospring.o-r.kr';
          const axiosInstance = axios.create({
            withCredentials: true,
          });
          const result = await axiosInstance.get(`${baseURI}/` + "selectSearch",
          {
            params : {
              userId : this.user.id
            }
          },
          ).then((result) => {
            console.log(result);
            result.data.forEach(e => {
              e.isPriceValid = true;
              e.isSearchValueValid = true;
              this.items.push(e);
            });
            console.log(this.items);
          });
        } catch(e) {
          console.log(e);
        } finally {
          // 로딩바 숨김
          this.loader.hide();
        }
      },
      // item 배열에서 제거
      deleteItem(item) {
        const index = this.items.indexOf(item); // 아이템의 인덱스를 찾습니다.
        if (index !== -1) {
          this.items.splice(index, 1); // 배열에서 아이템을 제거합니다.
        }
      },
      // item 배열에 추가
      createItem() {
        let maxId;
        if (this.items.length === 0) {
          maxId = 1; // 배열이 비어있다면 1을 반환합니다.
        }
        else {
          maxId = Math.max(...this.items.map(item => item.id)) + 1;
        }
        const newItem = {
          id: maxId,
          searchValue: this.newItem.searchValue,
          price: this.newItem.price,
          term: this.newItem.term,
          useYn: this.newItem.useYn,
          isPriceValid: this.newItem.isPriceValid,
          isSearchValueValid: this.newItem.isSearchValueValid
        };
        this.items.push(newItem);
      },
      // 가격데이터 검증
      validatePrice(item) {
        const regex = /^\d+$/;
        item.isPriceValid = regex.test(item.price);
      },
      // 검색어 검증
      validateSearchValue(item) {
        item.isSearchValueValid = item.searchValue.trim() !== '';
      },
      // item 배열 DB에 저장
      async saveItems() {
        const isSearchValueValid = this.items.every(item => item.isSearchValueValid);
        if (!isSearchValueValid) {
          alert('검색어가 입력되지 않은 항목이 있습니다!');
          return;
        }
        const isPriceValid = this.items.every(item => item.isPriceValid);
        if (!isPriceValid) {
          alert('가격이 올바르게 입력되지 않은 항목이 있습니다!');
          return;
        }
        const baseURI = 'https://api.jurospring.o-r.kr';
        try{
            axios.defaults.withCredentials = true;
            
            const encodedSearchList = encodeURIComponent(JSON.stringify(this.items));

            // 배열데이터 length가 길어서 POST요청
            const result = await axios.post(`${baseURI}/` + "updateSearch",
            {
              userId : this.user.id,
              searchList : encodedSearchList
            }).then(res => {
              return res;
            });
  
            if(result.status === 200){
              alert("정보수정이 완료되었습니다.");
              this.$router.go();
            }
            else {
              alert("정보수정에 실패하였습니다.");
            }
  
          } catch(err){
            alert("정보수정에 실패하였습니다.");
          }
      }
    }
  }
  </script>
  <style scoped>
  .item-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .item-table th,
  .item-table td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  
  .item-table th {
    background-color: #f2f2f2;
  }
  
  .item-table tbody tr:hover {
    background-color: #f5f5f5;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .create-button {
    background-color: rgb(73, 94, 209);
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #d32f2f;
  }
  
  .create-button:hover {
    background-color: rgb(28, 25, 202);
  }
  
  .input-field {
    width: 100%;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s ease-in-out;
  }
  
  .input-field:focus {
    outline: none;
  }
  
  .select-field {
    width: 100%;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s ease-in-out;
  }
  
  .error-feedback {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
  }
  
  .save-button {
    background-color: rgb(36, 123, 160);
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  .save-button:hover {
    background-color: rgb(26, 103, 135);
  }
  </style>