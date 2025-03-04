import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";
import MyBookingsView from "@/views/MyBookingsView.vue";
import TattooArtistView from "@/views/TattooArtistView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import LoginFormView from "@/views/LoginForm.vue";
import MapBoxView from "@/views/MapSessionsView.vue";
import TattooDetailsView from "@/views/TattooDetailsView.vue";
import MesSessionsView from "@/views/MesSessionsView.vue";
import AllTattoosFiltered from "@/views/AllTattoosFilteredView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboardPage",
    component: AdminDashboardView,
  },
  {
    path: "/my-bookings",
    name: "MyBookingsPage",
    component: MyBookingsView,
  },
  {
    path: "/tattoo-artist",
    name: "TattooArtistPage",
    component: TattooArtistView,
  },
  {
    path: "/tattoo-details/:id",
    name: "TattooDetailsPage",
    component: TattooDetailsView,
    props: true, // Pour passer l'ID en prop
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/login-form",
    name: "LoginForm",
    component: LoginFormView,
  },
  {
    path: "/map-box",
    name: "MapBox",
    component: MapBoxView,
  },
  {
    path: "/mes-sessions",
    name: "MesSessions",
    component: MesSessionsView,
  },
  {
    path: "/mes-tattoos-filtered",
    name: "AllTattoosFiltered",
    component: AllTattoosFiltered,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
