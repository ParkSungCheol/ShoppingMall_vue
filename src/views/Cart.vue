<template>
  <div>
    <Header></Header>
    <Navigation v-bind:getUser="getUser"></Navigation>
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
            <select v-model="item.condition" class="select-field">
              <option value="under">미만</option>
              <option value="below">이하</option>
              <option value="more">이상</option>
              <option value="over">초과</option>
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
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Cart',
  components: {
    Header,
    Footer,
    Navigation
  },
  data() {
    return {
      user: null,
      items: [
      ],
      newItem: {
        searchValue: '',
        price: 0,
        condition: 'under',
        useYn: 1,
        isPriceValid: true,
        isSearchValueValid: true
      }
    }
  },
  props : {
    getUser : Function,
  },
  mounted : function() {
    this.user = this.getUser();
  },
  methods: {
    deleteItem(item) {
      // Delete item logic
      const index = this.items.indexOf(item); // 아이템의 인덱스를 찾습니다.
      if (index !== -1) {
        this.items.splice(index, 1); // 배열에서 아이템을 제거합니다.
      }
    },
    createItem() {
      // Create item logic
      let maxId;
      if (this.items.length === 0) {
        maxId = 1; // 배열이 비어있다면 1을 반환합니다.
      }
      else {
        maxId = Math.max(...this.items.map(item => item.id));
      }
      const newItem = {
        id: maxId,
        searchValue: this.newItem.searchValue,
        price: this.newItem.price,
        condition: this.newItem.condition,
        useYn: this.newItem.useYn,
        isPriceValid: this.newItem.isPriceValid,
        isSearchValueValid: this.newItem.isSearchValueValid
      };
      this.items.push(newItem);
    },
    validatePrice(item) {
      const regex = /^\d+$/;
      item.isPriceValid = regex.test(item.price);
    },
    validateSearchValue(item) {
      const searchValuePattern = /\S+/;
      item.isSearchValueValid = searchValuePattern.test(item.searchValue);
    },
    saveItems() {
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

      // Save items logic
      // 정상적인 처리 로직을 추가하세요
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