export default {
  methods: {
    $toPrice (num) {
      if (!num && num !== 0) return ''
      if (typeof num === 'string') {
        num -= 0
      }
      num = num.toFixed(2)
      num = num.toLocaleString()
      return num
    }
  }
}
