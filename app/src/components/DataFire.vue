<template>
    <div>

    </div>
</template>

<script setup>
let result
async function fireData() {
    try {
        const data = await fetch("https://data.cityofnewyork.us/resource/8m42-w767.json")
         result = await data.json()
    } catch (error) {
        alert("bruh")
    }
}
fireData()
console.log(1)
console.log(result)

</script>

<style  scoped>

</style>