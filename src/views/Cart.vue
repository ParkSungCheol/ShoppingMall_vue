<template>
  <Header></Header>
  <Navigation></Navigation>
  <table>
      <thead>
        <tr>
          <th>검색어</th>
          <th>가격</th>
          <th>조건</th>
          <th>사용여부</th>
          <th>
            <button @click="createItem(item)">Create</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.searchValue }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.condition }}</td>
          <td>{{ item.useYn }}</td>
          <td>
            <button @click="deleteItem(item)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  <Footer></Footer>
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
        price: null,
        condition: null,
        useYn: 1
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
        useYn: this.newItem.useYn
      };
      this.items.push(newItem);
    }
  }
}
</script>
