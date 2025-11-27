import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { FinanceModule } from './finance/finance.module';
import { DocumentsModule } from './documents/documents.module';
import { TasksModule } from './tasks/tasks.module';
import { PostSalesModule } from './post-sales/post-sales.module';
import { CommissionsModule } from './commissions/commissions.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'adminpassword',
      database: 'inmoapp_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    ClientsModule,
    SalesModule,
    FinanceModule,
    DocumentsModule,
    TasksModule,
    PostSalesModule,
    CommissionsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
