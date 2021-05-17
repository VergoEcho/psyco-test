import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import BaseCard from "./components/BaseCard";
import BaseButton from "./components/BaseButton";

const app = createApp(App);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.use(router);

app.mount("#app");
