<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: new Date
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
  border: 5px solid red;
}
</style>
