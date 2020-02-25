<template>
    <div  class="check-button" :class="{check:check}">
        <img  src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name:'CheckBotton',
        props: {
            check: {
                type: Boolean,
                default: true
            },
        },
    }
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ccc;
}
.check {
  background-color: #f00;
  border: 1px solid #ff0000;
}

</style>