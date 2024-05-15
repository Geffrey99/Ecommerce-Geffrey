import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
    {path: '', component: HomeComponent , pathMatch: 'full'},
    // { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirecciona a la página de inicio por defecto
     { path: 'iniciar-sesion', component: LoginComponent},
     { path: 'app-user', component: UserComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}