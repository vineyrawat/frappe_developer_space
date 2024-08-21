import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import authRoutes from './auth';
import SidebarSubMenu from "@/components/Home/SidebarSubMenu.vue";
import ServerScripts from "@/components/Home/ServerScripts/ServerScripts.vue";
import ServerScriptEditor from "@/components/Home/ServerScripts/ServerScriptEditor.vue";
import ServerScriptDetails from "@/components/Home/ServerScripts/ServerScriptDetails.vue";

const routes = [
  {
    path: "/",
    children: [
      {
        path: '',
        name: "Home",
        component: Home,
        children: [
          {
            path: ":id",
            component: SidebarSubMenu,
            children: [
              {
                path: 'server-scripts',
                name: 'serverScripts',
                component: ServerScripts
              },
              {
                path: 'server-scripts/:script',
                name: 'serverScriptsDetail',
                component: ServerScriptDetails
              },
              {
                path: 'server-scripts/:script/edit',
                name: 'serverScriptsEdit',
                component: ServerScriptEditor
              }
            ]
          }
        ]
      },
    ]
  },
  ...authRoutes,
];

const router = createRouter({
  base: "/developer_space/",
  history: createWebHistory(),
  routes,
});

export default router;
