import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CreateOfferComponent } from "./create-offer/create-offer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DeleteComponent } from "./delete/delete.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
    {
        path: 'offers',
        component: DashboardComponent
    },
    {
        path: 'offers/create',
        canActivate: [AuthGuard],
        component: CreateOfferComponent
    },
    {
        path: 'offers/edit/:id',
        canActivate: [AuthGuard],
        component: EditComponent
    },
    {
        path: 'offers/:id',
        component: DetailsComponent
    },
    {
        path: 'offers/delete/:id',
        canActivate: [AuthGuard],
        component: DeleteComponent
    }
];

export const OfferRouter = RouterModule.forChild(routes);