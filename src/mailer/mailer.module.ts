import { Module } from '@nestjs/common';
import { MailerModule as MailModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
      MailModule.forRootAsync({
        useFactory: () => ({
          transport: 'smtps://user@domain.com:pass@smtp.domain.com',
          defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }),
      }),
    ],
  })
export class MailerModule {}
