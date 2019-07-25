import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { GithubReposComponent } from './github-repos/github-repos.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule],
  declarations: [GithubReposComponent],
  entryComponents: [GithubReposComponent]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const GithubReposElement = createCustomElement(GithubReposComponent, { injector: this.injector });
    customElements.define('github-repos', GithubReposElement);
  }

}
