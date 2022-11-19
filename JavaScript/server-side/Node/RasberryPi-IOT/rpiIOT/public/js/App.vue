  <template>
    <b-calendar v-model="value" @context="onContext" block locale="en-US"></b-calendar>
  </template>

<style>
  body { padding: 1rem; }
</style>

<script>
  export default {
      data() {
        return {
          value: '',
          context: null
        }
      },
      methods: {
        onContext(ctx) {
          console.log(ctx.selectedYMD);
          this.context = ctx
        }
      }
    }
</script>