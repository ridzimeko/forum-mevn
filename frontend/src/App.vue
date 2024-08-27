<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const dataMessage = ref();

onMounted(() => {
	getMessage();
});

async function getMessage() {
	try {
		const { data } = await axios.get("http://localhost:3000");
		dataMessage.value = data;
		console.log(dataMessage.value);
	} catch (error) {
		console.error(error);
	}
}
</script>

<template>
  <p>{{ dataMessage?.message }}</p>
  <h1>Aokwaokwow</h1>
  <p>wkwkwkkw</p>
</template>

