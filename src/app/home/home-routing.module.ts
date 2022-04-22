import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './home-container/add-user/add-user.component';
import { HomeContainerComponent } from './home-container/home-container.component';

const routes: Routes = [
    {
        path: "",
        children: [
            { path: "", component: HomeContainerComponent },
            { path: "add-user", component: AddUserComponent },
            { path: "edit-user/:username", component: AddUserComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }