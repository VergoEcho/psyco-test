<template>
  <the-navigation />
  <router-view />
</template>

<script>
import TheNavigation from "@/components/admin/TheNavigation";
export default {
  components: {
    TheNavigation,
  },
};
</script>
