export const AppRoutes = [
  {
    path: '',
    redirectTo: 'question-show',  //项目启动的第一个路由为showmain
    pathMatch: 'full'
  },
  {
    path: 'question-show',
    loadChildren: './question-show/question-show.module#QuestionShowModule'
  },
  {
    path: 'class-show',
    loadChildren: './class-show/class-show.module#ClassShowModule'
  }
];
