import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive,HostListener,HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { DataService } from './data.service';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages/pages.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component'

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'pagedetail/:pageId', component: PageDetailComponent},
  {path: 'demo', component: MyNewComponentComponent},
  {path: 'post', component: PostComponent},
  {path: 'postdetail/:postId', component: PostDetailComponent},
  {path: 'hero-form', component: HeroFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MyNewComponentComponent,
    HomeComponent,
    PagesComponent,
    PageDetailComponent,
    HeroFormComponent,
    PostComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
