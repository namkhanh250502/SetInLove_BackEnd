import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { StoriesModule } from './stories/stories.module';
import { PrismaService } from './prisma.service';


@Module({
  imports: [AccountModule, StoriesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
