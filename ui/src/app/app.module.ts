import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Inject } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { ByebyeComponent } from './byebye/byebye.component';

import { ApmService } from '@elastic/apm-rum-angular';

const routes: Routes = [
  { path: '', redirectTo: 'hello', pathMatch: 'full'},
  { path: 'hello', component: HelloComponent },
  { path: 'byebye', component: ByebyeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ByebyeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ { provide: ApmService, useClass: ApmService, deps: [Router] }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(ApmService) service: ApmService) {
    const apm = service.init({
      serviceName: 'angular-app',
      secretToken: 'ZfVHp79CkJW0mxLlwC',
      serverUrl: 'https://4d458b255b50424a8409932348d0cdb4.apm.us-east-1.aws.cloud.es.io',
      logLevel: 'trace',
      serviceVersion: '0.1',
      distributedTracingOrigins: ['http://localhost:3000'],
      captureBody: true,
      captureHeaders: true,
      captureErrorLogStackTraces: 'always',
      usePathAsTransactionName: true,
      sourceLinesErrorAppFrames: 5
    });
  }
}
