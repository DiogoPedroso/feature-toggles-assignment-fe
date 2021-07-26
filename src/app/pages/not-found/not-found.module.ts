import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [RouterModule.forChild(routes), BrowserModule, BrowserAnimationsModule,AppRoutingModule],
  providers: [RouterModule],
})
export class NotFoundModule {}
